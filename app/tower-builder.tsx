"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PortfolioCard } from "@/components/portfolio-card";

type TowerHeights = { west: number; east: number };
type BuilderLanguage = "en" | "bm";
type ThreeModule = typeof import("three");

interface ThreeRuntime {
  THREE: ThreeModule;
  scene: import("three").Scene;
  camera: import("three").PerspectiveCamera;
  renderer: import("three").WebGLRenderer;
  model: import("three").Group;
  floor: import("three").Mesh<import("three").CircleGeometry, import("three").MeshStandardMaterial>;
  grid: import("three").GridHelper;
}

const MAX_LEVELS = 8;
const SKYBRIDGE_LEVEL = 4;

function drawModel(currentRuntime: ThreeRuntime, currentHeights: TowerHeights) {
  const { THREE, model } = currentRuntime;
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => material.dispose());
  });
  model.clear();
  const blockMaterial = new THREE.MeshStandardMaterial({
    color: 0x8eacc7,
    metalness: 0.48,
    roughness: 0.28,
  });
  const brightMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0ebf7,
    metalness: 0.58,
    roughness: 0.22,
  });
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x4e6581,
    metalness: 0.44,
    roughness: 0.35,
  });
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });

  for (const x of [-2.15, 2.15]) {
    const foundation = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.22, 2.15), groundMaterial);
    foundation.position.set(x, 0, 0);
    foundation.castShadow = true;
    foundation.receiveShadow = true;
    model.add(foundation);
  }

  const towers = [
    { x: -2.15, levels: currentHeights.west },
    { x: 2.15, levels: currentHeights.east },
  ];
  const brickGeometry = new THREE.BoxGeometry(1.5, 0.72, 1.5);
  const studGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.09, 16);
  for (const tower of towers) {
    for (let level = 0; level < tower.levels; level += 1) {
      const brick = new THREE.Mesh(brickGeometry, level % 2 === 0 ? blockMaterial : brightMaterial);
      brick.position.set(tower.x, 0.47 + level * 0.72, 0);
      brick.castShadow = true;
      brick.receiveShadow = true;
      model.add(brick);

      for (const studOffset of [-0.42, 0.42]) {
        const stud = new THREE.Mesh(studGeometry, brightMaterial);
        stud.position.set(tower.x + studOffset, 0.875 + level * 0.72, 0);
        stud.castShadow = true;
        model.add(stud);
      }
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.61, 1.53), darkMaterial);
      mullion.position.set(tower.x, 0.48 + level * 0.72, 0);
      model.add(mullion);
    }

    if (tower.levels >= MAX_LEVELS) {
      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.3, 8), brightMaterial);
      spire.position.set(tower.x, 0.35 + tower.levels * 0.72 + 0.55, 0);
      spire.castShadow = true;
      model.add(spire);
    }
  }

  if (currentHeights.west >= SKYBRIDGE_LEVEL && currentHeights.east >= SKYBRIDGE_LEVEL) {
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(3.65, 0.28, 0.72), brightMaterial);
    bridge.position.set(0, 0.55 + (SKYBRIDGE_LEVEL - 1) * 0.72, 0);
    bridge.castShadow = true;
    bridge.receiveShadow = true;
    model.add(bridge);
    const bridgeWindow = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.09, 0.74), darkMaterial);
    bridgeWindow.position.set(0, bridge.position.y + 0.07, 0);
    model.add(bridgeWindow);
  }
}

export function TowerBuilder({ language, theme }: { language: BuilderLanguage; theme: "light" | "dark" }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<ThreeRuntime | null>(null);
  const heightsRef = useRef<TowerHeights>({ west: 0, east: 0 });
  const renderRef = useRef<(() => void) | null>(null);
  const dragRef = useRef<{ x: number; pointerId: number } | null>(null);
  const [heights, setHeights] = useState<TowerHeights>({ west: 0, east: 0 });
  const [selectedTower, setSelectedTower] = useState<keyof TowerHeights>("west");
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const copy = language === "en"
    ? {
        towerA: "Tower A", towerB: "Tower B", addBrick: "Add a brick", reset: "Start over",
        progress: "Build progress", skybridge: "Skybridge unlocked", skybridgeHint: "Both towers are tall enough for the bridge.",
        bridgeHint: "Build both towers to level 4 to unlock the skybridge.", ready: "Your towers are taking shape.",
        drag: "Drag the model to turn it", reference: "A real-world reference", source: "Tower facts",
        referenceText: "The PETRONAS Twin Towers in Kuala Lumpur are 88 storeys each. Their double-decker skybridge connects levels 41 and 42.",
        loading: "Preparing the build space…", rotateLeft: "Rotate left", rotateRight: "Rotate right",
        max: "This tower has reached the top. Try the other one.",
      }
    : {
        towerA: "Menara A", towerB: "Menara B", addBrick: "Tambah bata", reset: "Mula semula",
        progress: "Kemajuan binaan", skybridge: "Jambatan langit dibuka", skybridgeHint: "Kedua-dua menara sudah cukup tinggi untuk jambatan.",
        bridgeHint: "Bina kedua-dua menara sehingga aras 4 untuk membuka jambatan langit.", ready: "Menara anda mula terbentuk.",
        drag: "Seret model untuk memutarkannya", reference: "Rujukan sebenar", source: "Fakta menara",
        referenceText: "Menara Berkembar PETRONAS di Kuala Lumpur masing-masing mempunyai 88 tingkat. Jambatan langit dua tingkatnya menghubungkan aras 41 dan 42.",
        loading: "Menyediakan ruang binaan…", rotateLeft: "Pusing ke kiri", rotateRight: "Pusing ke kanan",
        max: "Menara ini sudah sampai ke puncak. Cuba bina menara sebelah.",
      };
  const bridgeUnlocked = heights.west >= SKYBRIDGE_LEVEL && heights.east >= SKYBRIDGE_LEVEL;
  const progress = Math.round(((heights.west + heights.east) / (MAX_LEVELS * 2)) * 100);

  useEffect(() => {
    heightsRef.current = heights;
    const runtime = runtimeRef.current;
    if (!runtime) return;
    drawModel(runtime, heights);
    renderRef.current?.();
  }, [heights]);

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
      scene.fog = new THREE.Fog(0xeaf0f8, 24, 42);
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(11, 9, 16);
      camera.lookAt(0, 3, 0);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.setAttribute("aria-hidden", "true");

      const ambient = new THREE.HemisphereLight(0xffffff, 0x8999b3, 2.2);
      scene.add(ambient);
      const key = new THREE.DirectionalLight(0xffffff, 3.5);
      key.position.set(-7, 14, 8);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xb7d4ff, 1.2);
      fill.position.set(9, 6, -7);
      scene.add(fill);

      const floor = new THREE.Mesh(
        new THREE.CircleGeometry(11, 64),
        new THREE.MeshStandardMaterial({ color: 0xf8fbff, roughness: 0.82 }),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.12;
      floor.receiveShadow = true;
      scene.add(floor);
      const grid = new THREE.GridHelper(16, 16, 0xc8d3e4, 0xdce4ef);
      grid.position.y = -0.105;
      scene.add(grid);

      const model = new THREE.Group();
      model.rotation.y = rotation;
      scene.add(model);
      runtime = { THREE, scene, camera, renderer, model, floor, grid };
      runtimeRef.current = runtime;
      host.replaceChildren(renderer.domElement);

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
      drawModel(runtime, heightsRef.current);
      render();
      setSceneReady(true);
    }).catch(() => {
      if (!cancelled) {
        setSceneReady(false);
        setSceneFailed(true);
      }
    });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      renderRef.current = null;
      runtimeRef.current = null;
      runtime?.renderer.dispose();
      host.replaceChildren();
    };
    // The scene is created once; current state is read from heightsRef.
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
    const dark = theme === "dark";
    const background = dark ? 0x1e2a3d : 0xeaf0f8;
    runtime.scene.background = new runtime.THREE.Color(background);
    if (runtime.scene.fog) runtime.scene.fog.color.setHex(background);
    runtime.floor.material.color.setHex(dark ? 0x26364e : 0xf8fbff);
    runtime.grid.material.color.setHex(dark ? 0x7c8ba3 : 0xffffff);
    renderRef.current?.();
  }, [theme]);

  function addBrick() {
    if (heights[selectedTower] >= MAX_LEVELS) return;
    setHeights((current) => ({ ...current, [selectedTower]: current[selectedTower] + 1 }));
  }

  function resetBuild() {
    setHeights({ west: 0, east: 0 });
    setSelectedTower("west");
  }

  function rotateModel(amount: number) {
    setRotation((current) => current + amount);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.target instanceof HTMLButtonElement) return;
    dragRef.current = { x: event.clientX, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    const delta = event.clientX - dragRef.current.x;
    dragRef.current.x = event.clientX;
    setRotation((current) => current + delta * 0.008);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  }

  const full = heights.west >= MAX_LEVELS && heights.east >= MAX_LEVELS;
  const selectedHeight = heights[selectedTower];

  return (
    <div className="builder-layout">
      <PortfolioCard className="builder-main">
        <div
          className="builder-canvas"
          ref={mountRef}
          role="group"
          aria-label="Interactive 3D model of two buildable towers. Drag left or right to rotate the view."
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {!sceneReady && !sceneFailed && <span className="canvas-loading">{copy.loading}</span>}
          {sceneFailed && (
            <div className="tower-fallback" role="img" aria-label={`Twin tower preview. Tower A: ${heights.west} levels. Tower B: ${heights.east} levels.`}>
              {[heights.west, heights.east].map((levelCount, index) => (
                <div className={`fallback-tower tower-${index === 0 ? "a" : "b"}`} key={index}>
                  {Array.from({ length: levelCount }, (_, level) => <i key={level} />)}
                  {levelCount >= MAX_LEVELS && <b />}
                </div>
              ))}
              {bridgeUnlocked && <span className="fallback-bridge" />}
              <span className="fallback-ground" />
            </div>
          )}
          <Badge variant="outline" className="canvas-label">KL / 01 — TWIN TOWERS</Badge>
          <Badge variant="outline" className="canvas-level-tag">A {heights.west} <i /> B {heights.east}</Badge>
          <span className="canvas-hint">{copy.drag}</span>
          <div className="canvas-rotate-controls">
            <Button variant="outline" size="icon-sm" aria-label={copy.rotateLeft} onClick={() => rotateModel(-0.32)}><ArrowLeft size={16} /></Button>
            <Button variant="outline" size="icon-sm" aria-label={copy.rotateRight} onClick={() => rotateModel(0.32)}><ArrowRight size={16} /></Button>
          </div>
        </div>

        <div className="builder-controls">
          <div className="builder-toolbar">
            <ToggleGroup
              className="tower-selector"
              type="single"
              value={selectedTower}
              onValueChange={(value) => { if (value === "west" || value === "east") setSelectedTower(value); }}
              aria-label={language === "en" ? "Choose which tower to build" : "Pilih menara untuk dibina"}
            >
              <ToggleGroupItem value="west" aria-label={copy.towerA}>
                <span className="tower-selector-dot tower-a-dot" />{copy.towerA}<span className="tower-level">{heights.west}/8</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="east" aria-label={copy.towerB}>
                <span className="tower-selector-dot tower-b-dot" />{copy.towerB}<span className="tower-level">{heights.east}/8</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <Button className="builder-add-button" onClick={addBrick} disabled={selectedHeight >= MAX_LEVELS}>
              <span className="plus-brick">+</span>{copy.addBrick}<span className="keycap">↵</span>
            </Button>
          </div>
          <div className="build-progress-row">
            <span>{copy.progress}</span>
            <Progress className="build-progress-track" value={progress} aria-label={copy.progress} />
            <span className="build-progress-number">{progress}%</span>
            <Button variant="ghost" size="sm" className="reset-build-button" onClick={resetBuild} aria-label={copy.reset}><RotateCcw size={14} /><span>{copy.reset}</span></Button>
          </div>
          <p className={`bridge-status ${bridgeUnlocked ? "unlocked" : ""}`} role="status">
            <span className="bridge-status-dot" />
            <strong>{bridgeUnlocked ? copy.skybridge : copy.ready}</strong>
            <span>{bridgeUnlocked ? copy.skybridgeHint : copy.bridgeHint}</span>
          </p>
          {selectedHeight >= MAX_LEVELS && !full && <p className="builder-feedback" role="status">{copy.max}</p>}
          {full && <p className="builder-feedback complete" role="status">✦ Both towers complete. Nice work.</p>}
        </div>
      </PortfolioCard>

      <PortfolioCard className="tower-reference" role="complementary">
        <div className="reference-visual" aria-hidden="true">
          <div className="reference-tower tower-left"><span /><span /><span /><i /></div>
          <div className="reference-tower tower-right"><span /><span /><span /><i /></div>
          <div className="reference-bridge" />
          <div className="reference-ground" />
          <span className="reference-coordinate">3°09′N 101°42′E</span>
        </div>
        <CardContent className="reference-copy">
          <span className="reference-eyebrow">{copy.reference}</span>
          <h3>Petronas Twin Towers</h3>
          <p>{copy.referenceText}</p>
          <Button asChild variant="link" className="reference-source">
            <a href="https://www.petronastwintowers.com.my/the-towers/design-structure/" target="_blank" rel="noreferrer">
              {copy.source}<ArrowRight size={14} />
            </a>
          </Button>
        </CardContent>
      </PortfolioCard>
    </div>
  );
}
