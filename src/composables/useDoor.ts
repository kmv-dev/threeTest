import * as THREE from 'three';
import { useDoorStore } from '@/stores/main';
import { ref } from 'vue';
type Disposable = { dispose?: () => void };
let doorGroup: THREE.Group;
const doorWidth = ref(0.9);
const doorHeight = ref(2.0);
const doorThickness = 0.04;
const frameThickness = 0.08;
const panelGap = 0.012;

export function useDore() {
  const buildDoor = (): THREE.Group => {
    const store = useDoorStore();
    const width = store.width;
    const height = store.height;
    const group = new THREE.Group();
    group.castShadow = true;

    const wood = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#7a5a42'),
      roughness: 0.6,
      metalness: 0.05,
    });
    const metal = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d9d9d9'),
      metalness: 0.9,
      roughness: 0.25,
    });

    const innerWidth = Math.max(0.1, width - 2 * frameThickness);
    const innerHeight = Math.max(0.1, height - (frameThickness + frameThickness));

    const left = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, height, doorThickness), wood);
    left.castShadow = true;
    left.position.set(-width / 2 + frameThickness / 2, height / 2, 0);
    group.add(left);

    const right = new THREE.Mesh(
      new THREE.BoxGeometry(frameThickness, height, doorThickness),
      wood,
    );
    right.castShadow = true;
    right.position.set(width / 2 - frameThickness / 2, height / 2, 0);
    group.add(right);

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(width - 2 * frameThickness, frameThickness, doorThickness),
      wood,
    );
    top.castShadow = true;
    top.position.set(0, height - frameThickness / 2, 0);
    group.add(top);

    const bottom = new THREE.Mesh(
      new THREE.BoxGeometry(width, frameThickness, doorThickness),
      wood,
    );
    bottom.castShadow = true;
    bottom.position.set(0, frameThickness / 2, 0);
    group.add(bottom);

    const gap = panelGap;
    const panelAreaHeight = innerHeight - gap;
    const panelHeight = Math.max(0.05, panelAreaHeight / 2 - gap / 2);
    const panelWidth = Math.max(0.05, innerWidth - 2 * gap);
    const panelDepth = doorThickness * 0.6;

    const makePanelMat = () => {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#8c6a51'),
        roughness: 0.5,
        metalness: 0.05,
      });
    };

    const panelMat1 = makePanelMat();
    const panel1 = new THREE.Mesh(
      new THREE.BoxGeometry(panelWidth, panelHeight, panelDepth),
      panelMat1,
    );
    panel1.castShadow = true;
    panel1.position.set(0, frameThickness + gap + panelHeight / 2, 0.002);
    group.add(panel1);

    const panelMat2 = makePanelMat();
    const panel2 = new THREE.Mesh(
      new THREE.BoxGeometry(panelWidth, panelHeight, panelDepth),
      panelMat2,
    );
    panel2.castShadow = true;
    panel2.position.set(0, frameThickness + gap + panelHeight + gap + panelHeight / 2, 0.002);
    group.add(panel2);

    // Handle
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.16, 20), metal);
    handle.castShadow = true;
    handle.rotation.z = Math.PI / 2;
    handle.position.set(width / 2 - frameThickness - 0.07, height * 0.55, doorThickness * 0.35);
    group.add(handle);

    group.position.set(0, 0, 0);
    return group;
  };

  const recreateDoor = (scene: THREE.Scene) => {
    if (!scene) return;
    if (doorGroup) {
      doorGroup.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        (mesh.geometry as unknown as Disposable)?.dispose?.();
        const m = mesh.material as unknown as Disposable | Disposable[];
        if (Array.isArray(m)) m.forEach((x) => x.dispose && x.dispose());
        else m?.dispose?.();
      });
      scene.remove(doorGroup);
    }
    doorGroup = buildDoor(doorWidth.value, doorHeight.value);
    scene.add(doorGroup);
  };
  return { recreateDoor };
}
