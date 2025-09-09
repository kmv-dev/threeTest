<template>
  <div class="w-full h-screen bg-gray-900 text-gray-100">
    <canvas ref="canvasRef" class="w-full h-full block"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useDoorStore } from '@/stores/main';
import { useDore } from '@/composables/useDoor';
import { useStand } from '@/composables/useStand';
import { useRoom } from '@/composables/useRoom';
import { useLights } from '@/composables/useLights';

const doorStore = useDoorStore();
const { width, height } = storeToRefs(doorStore);

type Disposable = { dispose?: () => void };
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Three core
let renderer: THREE.WebGLRenderer;
let scene = new THREE.Scene();
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let pmrem: THREE.PMREMGenerator;
let envTex: THREE.Texture;
let nightstandGroup: THREE.Group;

const { recreateDoor } = useDore();
const { buildNightstand } = useStand();
const { createGround, createWalls, createCeiling, createBackground } = useRoom(scene);
const { createLights, createCeilingLights } = useLights(scene);

function createRenderer(canvas: HTMLCanvasElement) {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  resize();
}

function createScene() {
  scene.background = new THREE.Color(0x101317);
  pmrem = new THREE.PMREMGenerator(renderer);
  envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
}

function createCamera(canvas: HTMLCanvasElement) {
  camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 200);
  camera.position.set(2.8, 1.9, 3.4);
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 1.2;
  controls.maxDistance = 10;
  controls.target.set(0, 1.0, 0);
  controls.minPolarAngle = 0; // горизонтальный взгляд
  controls.maxPolarAngle = Math.PI / 2.1; // ограничение вниз (не ниже горизонта)
  controls.update();
}

function animate() {
  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}

function resize() {
  const canvas = renderer?.domElement;
  if (!canvas) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height, false);
  if (camera) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

function onWindowResize() {
  resize();
}

onMounted(async () => {
  const canvas = canvasRef.value!;
  createRenderer(canvas);
  createScene();
  createCamera(canvas);
  createCeiling();
  createLights();
  createWalls();
  createCeilingLights();
  createBackground();
  createGround();
  nightstandGroup = buildNightstand();
  scene.add(nightstandGroup);
  recreateDoor(scene);
  animate();
  window.addEventListener('resize', onWindowResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  controls?.dispose();
  scene?.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    (mesh.geometry as unknown as Disposable)?.dispose?.();
    const mat = mesh.material as unknown as Disposable | Disposable[];
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose && m.dispose());
    else mat?.dispose?.();
  });
  envTex?.dispose?.();
  pmrem?.dispose?.();
  renderer?.dispose?.();
});

watch([width, height], () => {
  recreateDoor(scene);
});
</script>
