"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Hero visual — renders the site's retro_computer.glb with Three.js, framed and
 * lit to match the production hero (warm key light, ember rim, gentle idle
 * float + mouse parallax). Honors prefers-reduced-motion.
 */
export default function RetroComputer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Calibration overrides (used by the comparison harness; safe defaults).
    const o: {
      fov?: number;
      camZ?: number;
      scale?: number;
      yaw?: number;
      pitch?: number;
      baseY?: number;
      upX?: number;
      upZ?: number;
      modelY?: number;
      freeze?: boolean;
      noKey?: boolean;
      noAmbient?: boolean;
      noRim?: boolean;
    } = (window as unknown as { __rc?: typeof o }).__rc || {};
    const FOV = o.fov ?? 28;
    const CAM_Z = o.camZ ?? 5.5;
    const SCALE = o.scale ?? 1.8;
    const BASE_YAW = o.yaw ?? 0;
    const BASE_PITCH = o.pitch ?? 0.08;
    const BASE_Y = o.baseY ?? 0.3;
    const UP_X = o.upX ?? 0;
    const UP_Z = o.upZ ?? 0;
    const MODEL_Y = o.modelY ?? Math.PI / 3; // 60° — front: screen + keyboard + trackball face viewer

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    camera.position.set(0, 0.15, CAM_Z);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    // Lighting — warm key, ember rim, soft fill, and a screen-side glow.
    if (!o.noAmbient) scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    if (!o.noKey) {
      const key = new THREE.DirectionalLight(0xfff2e6, 2.4);
      key.position.set(3, 4, 5);
      scene.add(key);
    }
    if (!o.noRim) {
      const rim = new THREE.DirectionalLight(0xd9663d, 1.4);
      rim.position.set(-4, 2, -3);
      scene.add(rim);
    }
    const fill = new THREE.DirectionalLight(0x8a929b, 0.5);
    fill.position.set(0, -3, 2);
    scene.add(fill);
    const screenGlow = new THREE.PointLight(0xe8794e, 6, 14, 2);
    screenGlow.position.set(0, 0.3, 2.2);
    scene.add(screenGlow);

    const group = new THREE.Group();
    scene.add(group);

    let disposed = false;
    const loader = new GLTFLoader();
    loader.load(
      "/models/retro_computer.glb",
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;

        // Use nested groups to avoid Euler gimbal issues when combining X and Y rotations.
        // zUpGroup applies the Z-up → Y-up correction cleanly.
        // zFlipGroup corrects the model's inverted vertical axis (180° Z = swap +Y/-Y).
        // orientGroup rotates around Y to select the correct face without interference.
        const zUpGroup = new THREE.Group();
        zUpGroup.rotation.x = UP_X;

        const zFlipGroup = new THREE.Group();
        zFlipGroup.rotation.z = UP_Z;

        const orientGroup = new THREE.Group();
        orientGroup.rotation.y = MODEL_Y;
        zFlipGroup.add(orientGroup);
        orientGroup.add(model);
        zUpGroup.add(zFlipGroup);

        const pivot = new THREE.Group();
        pivot.add(zUpGroup);

        // Compute bbox after all rotations for correct centering and scale.
        const box = new THREE.Box3().setFromObject(pivot);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        zUpGroup.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        pivot.scale.setScalar(SCALE / maxDim);

        // Boost emissive so the screen reads as "powered on" even under direct lighting.
        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (!mesh.isMesh) return;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (!mat || !("emissive" in mat) || mat.emissiveIntensity === undefined) {
            return;
          }
          if (mat.emissiveMap) {
            mat.emissive.set(1, 1, 1);
            mat.emissiveIntensity = 8.0;
            mat.emissiveMap.needsUpdate = true;
          } else if (mat.emissive?.getHex() !== 0) {
            mat.emissiveIntensity = Math.max(mat.emissiveIntensity, 8.0);
          }
        });
        group.add(pivot);
      },
      undefined,
      () => {
        /* swallow load errors — hero just stays empty */
      }
    );

    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;
    const still = reduce || o.freeze;
    const render = () => {
      t += 0.016;
      const targetYaw = still
        ? BASE_YAW
        : BASE_YAW + Math.sin(t * 0.4) * 0.14 + pointer.x * 0.4;
      const targetPitch = still ? BASE_PITCH : BASE_PITCH + pointer.y * 0.2;
      group.rotation.y += (targetYaw - group.rotation.y) * 0.05;
      group.rotation.x += (targetPitch - group.rotation.x) * 0.05;
      group.position.y = BASE_Y + (still ? 0 : Math.sin(t * 0.8) * 0.06);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={mountRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
  );
}
