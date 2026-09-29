"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Check, Download, Undo2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PortfolioCard } from "@/components/portfolio-card";

type BuilderLanguage = "en" | "bm";
type BlockColor = "red" | "green" | "blue";
type BlockShape = "brick" | "long" | "round" | "spire";
type BuildPhase = "spin" | "idle" | "building" | "done";

type ReferenceBlock = Omit<PlacedBlock, "id">;

interface Landmark {
  id: string;
  name: Record<BuilderLanguage, string>;
  blocks: readonly ReferenceBlock[];
}

interface RoundResult {
  landmark: Landmark;
  yours: string;
  reference: string;
  seconds: number;
}
type ThreeModule = typeof import("three");

interface PlacedBlock {
  id: number;
  shape: BlockShape;
  color: BlockColor;
  x: number;
  z: number;
  level: number;
}

interface Cell {
  x: number;
  z: number;
  // Set when aiming at the side of a block: place beside it at this level.
  level?: number;
}

interface Placement {
  x: number;
  z: number;
  level: number;
}

interface ThreeRuntime {
  THREE: ThreeModule;
  scene: import("three").Scene;
  camera: import("three").PerspectiveCamera;
  renderer: import("three").WebGLRenderer;
  model: import("three").Group;
  blocks: import("three").Group;
  plate: import("three").Mesh<import("three").BoxGeometry, import("three").MeshStandardMaterial>;
  cursor: import("three").Mesh<import("three").BoxGeometry, import("three").MeshBasicMaterial>;
  raycaster: import("three").Raycaster;
}

const BUILD_SECONDS = 30;
const PLATE_SIZE = 8;
const LEVEL_HEIGHT = 0.8;
const MAX_LEVELS = 12;
const TAP_TOLERANCE = 6;
const LIVE_CAMERA_POSITION = [0, 12, 15] as const;
const LIVE_CAMERA_TARGET_Y = 1.4;
const REEL_ITEM_HEIGHT = 56;
const REEL_LOOPS = 4;
const SPIN_MS = 2200;

const column = (shape: BlockShape, color: BlockColor, x: number, z: number, from: number, to: number): ReferenceBlock[] =>
  Array.from({ length: to - from + 1 }, (_, index) => ({ shape, color, x, z, level: from + index }));

const LANDMARKS: readonly Landmark[] = [
  {
    id: "klcc",
    name: { en: "Petronas Twin Towers", bm: "Menara Berkembar Petronas" },
    blocks: [
      ...column("brick", "blue", 2, 3, 0, 5), ...column("brick", "blue", 5, 3, 0, 5),
      { shape: "round", color: "green", x: 2, z: 3, level: 6 }, { shape: "round", color: "green", x: 5, z: 3, level: 6 },
      { shape: "spire", color: "red", x: 2, z: 3, level: 7 }, { shape: "spire", color: "red", x: 5, z: 3, level: 7 },
      { shape: "long", color: "red", x: 3, z: 3, level: 3 },
    ],
  },
  {
    id: "kl-tower",
    name: { en: "KL Tower", bm: "Menara KL" },
    blocks: [
      ...column("round", "blue", 3, 3, 0, 5),
      { shape: "long", color: "green", x: 3, z: 3, level: 6 }, { shape: "long", color: "green", x: 3, z: 4, level: 6 },
      { shape: "round", color: "blue", x: 3, z: 3, level: 7 }, { shape: "spire", color: "red", x: 3, z: 3, level: 8 },
    ],
  },
  {
    id: "merdeka-118",
    name: { en: "Merdeka 118", bm: "Merdeka 118" },
    blocks: [
      ...column("long", "blue", 3, 3, 0, 5), ...column("long", "blue", 3, 4, 0, 3),
      ...column("brick", "green", 3, 3, 6, 8), { shape: "spire", color: "red", x: 3, z: 3, level: 9 },
    ],
  },
  {
    id: "sultan-abdul-samad",
    name: { en: "Sultan Abdul Samad Building", bm: "Bangunan Sultan Abdul Samad" },
    blocks: [
      ...[1, 3, 5].flatMap((x) => column("long", "red", x, 3, 0, 1)),
      { shape: "round", color: "green", x: 1, z: 3, level: 2 }, { shape: "round", color: "green", x: 6, z: 3, level: 2 },
      ...column("brick", "red", 4, 3, 2, 3), { shape: "round", color: "green", x: 4, z: 3, level: 4 },
      { shape: "spire", color: "blue", x: 4, z: 3, level: 5 },
    ],
  },
];
const REEL_ITEMS = Array.from({ length: REEL_LOOPS + 1 }, () => LANDMARKS).flat();

const BLOCK_COLORS: Record<BlockColor, number> = { red: 0xe5484d, green: 0x30a46c, blue: 0x3e63dd };
const COLOR_ORDER: readonly BlockColor[] = ["red", "green", "blue"];
const SHAPE_ORDER: readonly BlockShape[] = ["brick", "long", "round", "spire"];

// Cell coordinates run 0..PLATE_SIZE-1; the plate is centred on the origin.
const toWorld = (cell: number) => cell - PLATE_SIZE / 2 + 0.5;
const inPlate = (cell: number) => cell >= 0 && cell < PLATE_SIZE;

function footprint(shape: BlockShape, x: number, z: number): Cell[] {
  return shape === "long" ? [{ x, z }, { x: x + 1, z }] : [{ x, z }];
}

function stackTop(blocks: PlacedBlock[], cells: Cell[]): number {
  let top = 0;
  for (const block of blocks) {
    const covers = footprint(block.shape, block.x, block.z).some((own) => cells.some((cell) => cell.x === own.x && cell.z === own.z));
    if (!covers) continue;
    // Nothing stacks on a spire.
    top = Math.max(top, block.shape === "spire" ? Infinity : block.level + 1);
  }
  return top;
}

function occupied(blocks: PlacedBlock[], cells: Cell[], level: number): boolean {
  return blocks.some((block) => block.level === level
    && footprint(block.shape, block.x, block.z).some((own) => cells.some((cell) => cell.x === own.x && cell.z === own.z)));
}

function placement(blocks: PlacedBlock[], shape: BlockShape, cell: Cell): Placement | null {
  // A long block aimed from the right-hand side extends left instead of into the block it touches.
  const anchors = shape === "long" && cell.level !== undefined ? [cell.x, cell.x - 1] : [cell.x];
  for (const x of anchors) {
    const cells = footprint(shape, x, cell.z);
    if (!cells.every((own) => inPlate(own.x) && inPlate(own.z))) continue;
    if (cell.level !== undefined) {
      if (!occupied(blocks, cells, cell.level)) return { x, z: cell.z, level: cell.level };
      continue;
    }
    const level = stackTop(blocks, cells);
    if (level < MAX_LEVELS) return { x, z: cell.z, level };
  }
  return null;
}

function disposeGroup(THREE: ThreeModule, group: import("three").Group) {
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => material.dispose());
  });
  group.clear();
}

function drawBlocks(runtime: ThreeRuntime, blocks: PlacedBlock[]) {
  const { THREE, blocks: group } = runtime;
  disposeGroup(THREE, group);
  for (const block of blocks) {
    const material = new THREE.MeshStandardMaterial({ color: BLOCK_COLORS[block.color], roughness: 0.42, metalness: 0.05 });
    const width = block.shape === "long" ? 1.96 : 0.96;
    const centreX = block.shape === "long" ? toWorld(block.x) + 0.5 : toWorld(block.x);
    const baseY = block.level * LEVEL_HEIGHT;
    let body: import("three").Mesh;
    if (block.shape === "round") body = new THREE.Mesh(new THREE.CylinderGeometry(0.47, 0.47, LEVEL_HEIGHT, 28), material);
    else if (block.shape === "spire") body = new THREE.Mesh(new THREE.ConeGeometry(0.47, LEVEL_HEIGHT * 1.6, 28), material);
    else body = new THREE.Mesh(new THREE.BoxGeometry(width, LEVEL_HEIGHT, 0.96), material);
    const bodyHeight = block.shape === "spire" ? LEVEL_HEIGHT * 1.6 : LEVEL_HEIGHT;
    body.position.set(centreX, baseY + bodyHeight / 2, toWorld(block.z));
    body.castShadow = true;
    body.receiveShadow = true;
    body.userData.level = block.level;
    group.add(body);

    if (block.shape === "spire") continue;
    const studs = block.shape === "long" ? [toWorld(block.x), toWorld(block.x + 1)] : [toWorld(block.x)];
    for (const studX of studs) {
      const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.14, 20), material.clone());
      stud.position.set(studX, baseY + LEVEL_HEIGHT + 0.07, toWorld(block.z));
      stud.castShadow = true;
      stud.userData.stud = true;
      group.add(stud);
    }
  }
}

const SWATCH_HEX: Record<BlockColor, { face: string; top: string; side: string }> = {
  red: { face: "#e5484d", top: "#f07a7e", side: "#b8343a" },
  green: { face: "#30a46c", top: "#5cc392", side: "#237a50" },
  blue: { face: "#3e63dd", top: "#7090ec", side: "#2c49a8" },
};

function BlockIcon({ shape, color }: { shape: BlockShape; color: BlockColor }) {
  const tone = SWATCH_HEX[color];
  if (shape === "round") {
    return (
      <svg className="tray-glyph" viewBox="0 0 40 32" aria-hidden="true">
        <path d="M9 11v12a11 5 0 0 0 22 0V11" fill={tone.face} />
        <ellipse cx="20" cy="11" rx="11" ry="5" fill={tone.top} />
        <ellipse cx="20" cy="9" rx="4" ry="2" fill={tone.face} />
      </svg>
    );
  }
  if (shape === "spire") {
    return (
      <svg className="tray-glyph" viewBox="0 0 40 32" aria-hidden="true">
        <path d="M20 3 31 26a11 4 0 0 1-22 0Z" fill={tone.face} />
        <path d="M20 3 31 26a11 4 0 0 1-11 4Z" fill={tone.side} />
      </svg>
    );
  }
  const width = shape === "long" ? 30 : 18;
  const left = 20 - width / 2;
  const studs = shape === "long" ? [left + 8, left + 22] : [20];
  return (
    <svg className="tray-glyph" viewBox="0 0 40 32" aria-hidden="true">
      <path d={`M${left} 12h${width}l4-4H${left + 4}Z`} fill={tone.top} />
      <rect x={left} y="12" width={width} height="14" fill={tone.face} />
      <path d={`M${left + width} 12l4-4v14l-4 4Z`} fill={tone.side} />
      {studs.map((x) => <ellipse key={x} cx={x + 2} cy="9" rx="3" ry="1.4" fill={tone.face} />)}
    </svg>
  );
}

let audioContext: AudioContext | null = null;

// A short plastic brick "clack", synthesised so there is no audio file to ship.
function playSnap() {
  try {
    audioContext ??= new AudioContext();
    const context = audioContext;
    if (context.state === "suspended") void context.resume();
    const now = context.currentTime;

    // Dull body knock.
    const knock = context.createOscillator();
    const knockGain = context.createGain();
    knock.type = "sine";
    knock.frequency.setValueAtTime(190, now);
    knockGain.gain.setValueAtTime(0.35, now);
    knockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    knock.connect(knockGain).connect(context.destination);
    knock.start(now);
    knock.stop(now + 0.06);

    // Two hard plastic clicks: the brick lands, then the studs seat.
    const length = Math.floor(context.sampleRate * 0.012);
    const noise = context.createBuffer(1, length, context.sampleRate);
    const samples = noise.getChannelData(0);
    for (let index = 0; index < length; index += 1) samples[index] = (Math.random() * 2 - 1) * (1 - index / length) ** 3;
    for (const [offset, level] of [[0, 0.6], [0.028, 0.35]] as const) {
      const click = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const clickGain = context.createGain();
      click.buffer = noise;
      filter.type = "bandpass";
      filter.frequency.value = 2600;
      filter.Q.value = 1.4;
      clickGain.gain.value = level;
      click.connect(filter).connect(clickGain).connect(context.destination);
      click.start(now + offset);
    }
  } catch {
    // Sound is a nice-to-have; ignore browsers without Web Audio.
  }
}

function formatSeconds(seconds: number) {
  return `0:${String(Math.max(seconds, 0)).padStart(2, "0")}`;
}

export function TowerBuilder({ language, theme }: { language: BuilderLanguage; theme: "light" | "dark" }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<ThreeRuntime | null>(null);
  const renderRef = useRef<(() => void) | null>(null);
  const blocksRef = useRef<PlacedBlock[]>([]);
  const pointerRef = useRef<{ x: number; y: number; lastX: number; pointerId: number; dragged: boolean } | null>(null);
  const nextIdRef = useRef(1);
  const [blocks, setBlocks] = useState<PlacedBlock[]>([]);
  const [color, setColor] = useState<BlockColor>("red");
  const [shape, setShape] = useState<BlockShape>("brick");
  const [cursor, setCursor] = useState<Cell>({ x: 3, z: 3 });
  const [phase, setPhase] = useState<BuildPhase>("spin");
  const [target, setTarget] = useState<Landmark | null>(null);
  const [reelIndex, setReelIndex] = useState(1);
  const [reelDuration, setReelDuration] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [saving, setSaving] = useState(false);
  const revealRef = useRef<HTMLDialogElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(BUILD_SECONDS);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [rotation, setRotation] = useState(-0.55);
  const [overPlane, setOverPlane] = useState(false);
  const copy = language === "en"
    ? {
        colors: { red: "Red", green: "Green", blue: "Blue" },
        shapes: { brick: "Brick", long: "Long", round: "Round", spire: "Spire" },
        colorGroup: "Block colour", shapeGroup: "Block shape",
        undo: "Undo", done: "I'm done", playAgain: "Play again",
        idle: `Tap the plate to place your first block. You get ${BUILD_SECONDS} seconds from there.`,
        building: "Tap a top to stack, or a side to build outwards.",
        finished: "Time's up. Put the blocks down.",
        endedEarly: "Your turn is over. Put the blocks down.",
        timer: "Time left",
        canvasLabel: "Build area. Tap the plate or a block to place the selected block. With the keyboard, use the arrow keys to move and Enter to place.",
        drag: "Drag to turn · tap to place",
        loading: "Preparing the build space…", failed: "The 3D build space could not load in this browser.",
        rotateLeft: "Rotate left", rotateRight: "Rotate right",
        spinTitle: "Spin. Pray. Build.", spin: "Spin", spinning: "Spinning…", spinAgain: "Spin again", letsBuild: "Let's build",
        landed: "You're building",
        revealTitle: "I hope yours looks somewhat like this.", yours: "Yours", builtIn: "Built in",
        save: "Save picture", tryAgain: "Try again", close: "Close",
      }
    : {
        colors: { red: "Merah", green: "Hijau", blue: "Biru" },
        shapes: { brick: "Bata", long: "Panjang", round: "Bulat", spire: "Puncak" },
        colorGroup: "Warna blok", shapeGroup: "Bentuk blok",
        undo: "Buat asal", done: "Dah siap", playAgain: "Main lagi",
        idle: `Ketik plat untuk letak blok pertama. Anda ada ${BUILD_SECONDS} saat selepas itu.`,
        building: "Ketik atas untuk susun, atau tepi untuk bina ke sisi.",
        finished: "Masa tamat. Letak blok anda.",
        endedEarly: "Giliran anda dah tamat. Letak blok anda.",
        timer: "Masa tinggal",
        canvasLabel: "Ruang binaan. Ketik plat atau blok untuk letak blok yang dipilih. Dengan papan kekunci, guna kekunci anak panah untuk bergerak dan Enter untuk letak.",
        drag: "Seret untuk pusing · ketik untuk letak",
        loading: "Menyediakan ruang binaan…", failed: "Ruang binaan 3D tidak dapat dimuatkan dalam pelayar ini.",
        rotateLeft: "Pusing ke kiri", rotateRight: "Pusing ke kanan",
        spinTitle: "Putar. Doa. Bina.", spin: "Putar", spinning: "Sedang berputar…", spinAgain: "Putar lagi", letsBuild: "Jom bina",
        landed: "Anda akan bina",
        revealTitle: "Harap binaan anda nampak lebih kurang macam ini.", yours: "Binaan anda", builtIn: "Siap dalam",
        save: "Simpan gambar", tryAgain: "Cuba lagi", close: "Tutup",
      };

  useEffect(() => {
    blocksRef.current = blocks;
    const runtime = runtimeRef.current;
    if (!runtime) return;
    drawBlocks(runtime, blocks);
    renderRef.current?.();
  }, [blocks]);

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let runtime: ThreeRuntime | null = null;
    const host = mountRef.current;
    if (!host) return;

    void import("three").then((THREE) => {
      if (cancelled) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xeaf0f8);
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
      camera.position.set(...LIVE_CAMERA_POSITION);
      camera.lookAt(0, LIVE_CAMERA_TARGET_Y, 0);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute("aria-hidden", "true");

      scene.add(new THREE.HemisphereLight(0xffffff, 0x8999b3, 2.4));
      const key = new THREE.DirectionalLight(0xffffff, 2.6);
      key.position.set(-6, 14, 8);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -7;
      key.shadow.camera.right = 7;
      key.shadow.camera.top = 7;
      key.shadow.camera.bottom = -7;
      scene.add(key);

      const model = new THREE.Group();
      model.rotation.y = rotation;
      scene.add(model);

      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(PLATE_SIZE, 0.3, PLATE_SIZE),
        new THREE.MeshStandardMaterial({ color: 0xf6f8fb, roughness: 0.7 }),
      );
      plate.position.y = -0.15;
      plate.receiveShadow = true;
      model.add(plate);
      const plateStudGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 16);
      const plateStudMaterial = new THREE.MeshStandardMaterial({ color: 0xe7ecf3, roughness: 0.7 });
      const plateStuds = new THREE.InstancedMesh(plateStudGeometry, plateStudMaterial, PLATE_SIZE * PLATE_SIZE);
      const matrix = new THREE.Matrix4();
      for (let x = 0; x < PLATE_SIZE; x += 1) {
        for (let z = 0; z < PLATE_SIZE; z += 1) {
          matrix.makeTranslation(toWorld(x), 0.06, toWorld(z));
          plateStuds.setMatrixAt(x * PLATE_SIZE + z, matrix);
        }
      }
      plateStuds.receiveShadow = true;
      plate.userData.studs = plateStuds;
      model.add(plateStuds);

      const cursorMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.98, 0.04, 0.98),
        new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.35, depthWrite: false }),
      );
      model.add(cursorMesh);

      const blockGroup = new THREE.Group();
      model.add(blockGroup);

      runtime = { THREE, scene, camera, renderer, model, blocks: blockGroup, plate, cursor: cursorMesh, raycaster: new THREE.Raycaster() };
      runtimeRef.current = runtime;
      host.append(renderer.domElement);

      const render = () => {
        if (!runtime) return;
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (width === 0 || height === 0) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      renderRef.current = render;
      resizeObserver = new ResizeObserver(render);
      resizeObserver.observe(host);
      drawBlocks(runtime, blocksRef.current);
      render();
      setSceneReady(true);
    }).catch(() => {
      if (!cancelled) setSceneFailed(true);
    });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      renderRef.current = null;
      runtimeRef.current = null;
      if (runtime) {
        disposeGroup(runtime.THREE, runtime.blocks);
        runtime.renderer.dispose();
        runtime.renderer.domElement.remove();
      }
    };
    // The scene is created once; current blocks are read from blocksRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!runtime) return;
    runtime.model.rotation.y = rotation;
    renderRef.current?.();
  }, [rotation]);

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!runtime) return;
    const spot = placement(blocks, shape, cursor);
    runtime.cursor.visible = spot !== null && phase !== "done" && phase !== "spin";
    runtime.cursor.scale.x = shape === "long" ? 2 : 1;
    if (spot) {
      runtime.cursor.position.set(
        shape === "long" ? toWorld(spot.x) + 0.5 : toWorld(spot.x),
        spot.level * LEVEL_HEIGHT + 0.02,
        toWorld(spot.z),
      );
    }
    renderRef.current?.();
  }, [blocks, cursor, phase, shape, sceneReady]);

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!runtime) return;
    const dark = theme === "dark";
    runtime.scene.background = new runtime.THREE.Color(dark ? 0x1d1d1d : 0xeaf0f8);
    runtime.plate.material.color.setHex(dark ? 0x2c2c2c : 0xf6f8fb);
    const studs = runtime.plate.userData.studs as import("three").InstancedMesh<import("three").CylinderGeometry, import("three").MeshStandardMaterial>;
    studs.material.color.setHex(dark ? 0x353535 : 0xe7ecf3);
    renderRef.current?.();
  }, [theme, sceneReady]);

  useEffect(() => {
    if (phase !== "building") return;
    const timer = window.setTimeout(() => {
      setSecondsLeft(Math.max(secondsLeft - 1, 0));
      if (secondsLeft <= 1) endRound(BUILD_SECONDS);
    }, 1000);
    return () => window.clearTimeout(timer);
    // endRound only reads refs and the current render's state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secondsLeft]);

  useEffect(() => {
    const dialog = revealRef.current;
    if (!dialog) return;
    if (result && !dialog.open) dialog.showModal();
    if (!result && dialog.open) dialog.close();
  }, [result, portalTarget]);

  function capture(list: readonly ReferenceBlock[]): string {
    const runtime = runtimeRef.current;
    if (!runtime) return "";
    const { camera, renderer, scene } = runtime;
    drawBlocks(runtime, list.map((block, index) => ({ ...block, id: index })));
    runtime.cursor.visible = false;
    // Square frame with room for tall builds; the live view is restored by the caller's render.
    renderer.setSize(720, 720, false);
    camera.aspect = 1;
    camera.position.set(0, 12.5, 18);
    camera.lookAt(0, 3, 0);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    const url = renderer.domElement.toDataURL("image/png");
    camera.position.set(...LIVE_CAMERA_POSITION);
    camera.lookAt(0, LIVE_CAMERA_TARGET_Y, 0);
    return url;
  }

  function endRound(seconds: number) {
    setPhase("done");
    if (!target) return;
    const yours = capture(blocksRef.current);
    const reference = capture(target.blocks);
    const runtime = runtimeRef.current;
    if (runtime) drawBlocks(runtime, blocksRef.current);
    renderRef.current?.();
    setPortalTarget(document.body);
    setResult({ landmark: target, yours, reference, seconds });
  }

  async function savePicture() {
    if (!result) return;
    setSaving(true);
    try {
      const load = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
      });
      const [yours, reference] = await Promise.all([load(result.yours), load(result.reference)]);
      const canvas = document.createElement("canvas");
      canvas.width = 1400;
      canvas.height = 820;
      const context = canvas.getContext("2d");
      if (!context) return;
      const dark = theme === "dark";
      context.fillStyle = dark ? "#161616" : "#f4f7fb";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = dark ? "#f4f4f4" : "#111319";
      context.font = "800 44px system-ui, sans-serif";
      context.fillText(copy.revealTitle, 60, 96);
      context.fillStyle = dark ? "#b8b8b8" : "#62718f";
      context.font = "600 24px system-ui, sans-serif";
      context.fillText(`${result.landmark.name[language]} · ${copy.builtIn} ${formatSeconds(result.seconds)}`, 60, 140);
      const panels: [HTMLImageElement, string][] = [[yours, copy.yours], [reference, result.landmark.name[language]]];
      panels.forEach(([image, label], index) => {
        const x = 60 + index * 650;
        const y = 180;
        const width = 630;
        const height = 560;
        context.save();
        context.beginPath();
        context.roundRect(x, y, width, height, 28);
        context.clip();
        const scale = Math.max(width / image.width, height / image.height);
        context.drawImage(image, x + (width - image.width * scale) / 2, y + (height - image.height * scale) / 2, image.width * scale, image.height * scale);
        context.restore();
        context.fillStyle = dark ? "rgb(26 26 26 / 85%)" : "rgb(255 255 255 / 88%)";
        context.beginPath();
        context.roundRect(x + 20, y + 20, context.measureText(label).width + 40, 48, 14);
        context.fill();
        context.fillStyle = dark ? "#f4f4f4" : "#111319";
        context.font = "800 24px system-ui, sans-serif";
        context.fillText(label, x + 40, y + 52);
      });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `think-you-can-build-${result.landmark.id}.png`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } finally {
      setSaving(false);
    }
  }

  function tryAgain() {
    setResult(null);
    resetBuild();
  }

  function placeAt(cell: Cell) {
    if (phase === "done" || phase === "spin") return;
    const spot = placement(blocks, shape, cell);
    if (!spot) return;
    const block: PlacedBlock = { id: nextIdRef.current, shape, color, ...spot };
    nextIdRef.current += 1;
    setBlocks((current) => [...current, block]);
    playSnap();
    if (phase === "idle") setPhase("building");
  }

  function undo() {
    if (phase === "done") return;
    setBlocks((current) => current.slice(0, -1));
  }

  function resetBuild() {
    setBlocks([]);
    setPhase("spin");
    setTarget(null);
    setSecondsLeft(BUILD_SECONDS);
  }

  function spin() {
    if (spinning) return;
    const pick = Math.floor(Math.random() * LANDMARKS.length);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : SPIN_MS;
    // Jump back to the first loop without animating, then roll forward to the pick.
    setReelDuration(0);
    setReelIndex(reelIndex % LANDMARKS.length);
    setTarget(null);
    setSpinning(true);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      setReelDuration(duration);
      setReelIndex(REEL_LOOPS * LANDMARKS.length + pick);
    }));
    window.setTimeout(() => {
      setSpinning(false);
      setTarget(LANDMARKS[pick]);
    }, duration + 60);
  }

  function cellFromPointer(event: PointerEvent<HTMLDivElement>): Cell | null {
    const runtime = runtimeRef.current;
    if (!runtime) return null;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointer = new runtime.THREE.Vector2(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    runtime.raycaster.setFromCamera(pointer, runtime.camera);
    const [hit] = runtime.raycaster.intersectObjects([runtime.plate, ...runtime.blocks.children.filter((child) => !child.userData.stud)], false);
    if (!hit?.face) return null;
    // Meshes inside the model are only translated, so face normals are already in model space.
    const point = runtime.model.worldToLocal(hit.point.clone());
    const normal = hit.face.normal;
    const x = Math.floor(point.x + normal.x * 0.5 + PLATE_SIZE / 2);
    const z = Math.floor(point.z + normal.z * 0.5 + PLATE_SIZE / 2);
    if (!inPlate(x) || !inPlate(z)) return null;
    const onSide = hit.object !== runtime.plate && Math.abs(normal.y) < 0.5;
    return onSide ? { x, z, level: hit.object.userData.level as number } : { x, z };
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.target instanceof HTMLElement && event.target.closest("button")) return;
    pointerRef.current = { x: event.clientX, y: event.clientY, lastX: event.clientX, pointerId: event.pointerId, dragged: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current;
    if (!pointer || pointer.pointerId !== event.pointerId) {
      if (event.pointerType === "mouse") {
        const cell = cellFromPointer(event);
        if ((cell !== null) !== overPlane) setOverPlane(cell !== null);
        if (cell && (cell.x !== cursor.x || cell.z !== cursor.z || cell.level !== cursor.level)) setCursor(cell);
      }
      return;
    }
    if (Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > TAP_TOLERANCE) pointer.dragged = true;
    if (!pointer.dragged) return;
    const delta = event.clientX - pointer.lastX;
    pointer.lastX = event.clientX;
    setRotation((current) => current + delta * 0.008);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current;
    if (!pointer || pointer.pointerId !== event.pointerId) return;
    pointerRef.current = null;
    if (pointer.dragged || event.type === "pointercancel") return;
    const cell = cellFromPointer(event);
    if (!cell) return;
    setCursor(cell);
    placeAt(cell);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const moves: Record<string, Cell> = { ArrowLeft: { x: -1, z: 0 }, ArrowRight: { x: 1, z: 0 }, ArrowUp: { x: 0, z: -1 }, ArrowDown: { x: 0, z: 1 } };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      // Keep arrow keys from also switching screens.
      event.stopPropagation();
      setCursor((current) => ({
        x: Math.min(Math.max(current.x + move.x, 0), PLATE_SIZE - 1),
        z: Math.min(Math.max(current.z + move.z, 0), PLATE_SIZE - 1),
      }));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      placeAt(cursor);
    }
  }

  const status = phase === "spin" ? "" : phase === "idle" ? copy.idle : phase === "building" ? copy.building : secondsLeft > 0 ? copy.endedEarly : copy.finished;

  return (
    <div className="builder-layout">
      {phase === "spin" && (
        <div className="spin-overlay" role="dialog" aria-modal="true" aria-label={copy.spinTitle}>
          <div className="spin-card">
            <h3>{copy.spinTitle}</h3>
            <div className="reel" aria-hidden="true">
              <div
                className="reel-strip"
                style={{
                  transform: `translateY(${-(reelIndex - 1) * REEL_ITEM_HEIGHT}px)`,
                  transitionDuration: `${reelDuration}ms`,
                }}
              >
                {REEL_ITEMS.map((landmark, index) => (
                  <span key={`${landmark.id}-${index}`} className="reel-item" data-active={!spinning && index === reelIndex && target !== null}>
                    {landmark.name[language]}
                  </span>
                ))}
              </div>
            </div>
            <p className="sr-only" role="status">{target ? `${copy.landed} ${target.name[language]}` : spinning ? copy.spinning : ""}</p>
            <div className="spin-actions">
              {target ? (
                <>
                  <Button variant="outline" className="spin-secondary" onClick={spin}>{copy.spinAgain}</Button>
                  <Button className="spin-primary" onClick={() => setPhase("idle")}>{copy.letsBuild}</Button>
                </>
              ) : (
                <Button className="spin-primary" onClick={spin} disabled={spinning}>{spinning ? copy.spinning : copy.spin}</Button>
              )}
            </div>
          </div>
        </div>
      )}
      <PortfolioCard className="builder-main">
        <div
          className="builder-canvas"
          data-over-plane={overPlane}
          onPointerLeave={() => setOverPlane(false)}
          role="application"
          tabIndex={0}
          aria-label={copy.canvasLabel}
          aria-roledescription="3D block builder"
          data-phase={phase}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
        >
          <div className="builder-renderer" ref={mountRef} aria-hidden="true" />
          {!sceneReady && !sceneFailed && <span className="canvas-loading">{copy.loading}</span>}
          {sceneFailed && <span className="canvas-loading">{copy.failed}</span>}
          {target && phase !== "spin" && <Badge variant="outline" className="canvas-label">{target.name[language]}</Badge>}
          <Badge variant="outline" className="canvas-timer" data-urgent={phase === "building" && secondsLeft <= 5}>
            <span className="sr-only">{copy.timer} </span>{formatSeconds(secondsLeft)}
          </Badge>
          {status && <p className="canvas-status" role="status">{status}</p>}
          <span className="canvas-hint">{copy.drag}</span>
          <div className="canvas-rotate-controls">
            <Button variant="outline" size="icon-sm" aria-label={copy.rotateLeft} onClick={() => setRotation((current) => current - 0.32)}><ArrowLeft size={16} /></Button>
            <Button variant="outline" size="icon-sm" aria-label={copy.rotateRight} onClick={() => setRotation((current) => current + 0.32)}><ArrowRight size={16} /></Button>
          </div>
        </div>

        <div className="builder-tray" data-color={color}>
          <ToggleGroup
            className="tray-group tray-colors"
            type="single"
            value={color}
            onValueChange={(value) => { if (COLOR_ORDER.includes(value as BlockColor)) setColor(value as BlockColor); }}
            aria-label={copy.colorGroup}
          >
            {COLOR_ORDER.map((option) => (
              <ToggleGroupItem key={option} value={option} className={`tray-swatch swatch-${option}`} aria-label={copy.colors[option]}>
                <Check size={18} strokeWidth={3} aria-hidden="true" />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ToggleGroup
            className="tray-group tray-shapes"
            type="single"
            value={shape}
            onValueChange={(value) => { if (SHAPE_ORDER.includes(value as BlockShape)) setShape(value as BlockShape); }}
            aria-label={copy.shapeGroup}
          >
            {SHAPE_ORDER.map((option) => (
              <ToggleGroupItem key={option} value={option} className="tray-shape" aria-label={copy.shapes[option]}>
                <BlockIcon shape={option} color={color} />
                <span className="tray-shape-label">{copy.shapes[option]}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="tray-actions">
            <Button variant="outline" className="tray-icon-button" onClick={undo} disabled={blocks.length === 0 || phase === "done"} >
              <Undo2 size={18} /><span>{copy.undo}</span>
            </Button>
            {phase === "done" ? (
              <Button className="tray-done" onClick={tryAgain}>{copy.playAgain}</Button>
            ) : (
              <Button className="tray-done" onClick={() => endRound(BUILD_SECONDS - secondsLeft)} disabled={phase !== "building"}>{copy.done}</Button>
            )}
          </div>
        </div>
      </PortfolioCard>
      {portalTarget && createPortal(
        <dialog
          ref={revealRef}
          className="reveal-dialog"
          aria-labelledby="reveal-title"
          onCancel={(event) => { event.preventDefault(); setResult(null); }}
          onClick={(event) => { if (event.target === event.currentTarget) setResult(null); }}
        >
          {result && (
            <div className="reveal-surface">
              <header className="reveal-header">
                <div>
                  <h2 id="reveal-title">{copy.revealTitle}</h2>
                  <p>{result.landmark.name[language]} · {copy.builtIn} {formatSeconds(result.seconds)}</p>
                </div>
                <Button variant="ghost" size="icon" className="reveal-close" onClick={() => setResult(null)} aria-label={copy.close}><X size={20} /></Button>
              </header>
              <div className="reveal-compare">
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element -- data URL snapshot from the canvas */}
                  <img src={result.yours} alt={copy.yours} />
                  <figcaption>{copy.yours}</figcaption>
                </figure>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element -- data URL snapshot from the canvas */}
                  <img src={result.reference} alt={result.landmark.name[language]} />
                  <figcaption>{result.landmark.name[language]}</figcaption>
                </figure>
              </div>
              <div className="reveal-actions">
                <Button variant="outline" className="spin-secondary" onClick={savePicture} disabled={saving}><Download size={17} />{copy.save}</Button>
                <Button className="spin-primary" onClick={tryAgain}>{copy.tryAgain}</Button>
              </div>
            </div>
          )}
        </dialog>,
        portalTarget,
      )}
    </div>
  );
}
