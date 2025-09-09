import * as THREE from 'three';

let hemi: THREE.HemisphereLight;
let dirLight: THREE.DirectionalLight;
let pointLight: THREE.PointLight;

export function useLights(scene: THREE.Scene) {
  const createLights = () => {
    hemi = new THREE.HemisphereLight(0xffffff, 0x222233, 0.55);
    scene.add(hemi);

    dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(2.8, 4.5, 2.5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    const d = 6;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 30;
    scene.add(dirLight);
    const ceilingLight = new THREE.PointLight(0xffffff, 0.8, 20);
    ceilingLight.position.set(0, 5.5, 0);
    ceilingLight.castShadow = true;
    scene.add(ceilingLight);

    pointLight = new THREE.PointLight(0xffddaa, 0.6, 15, 2);
    pointLight.position.set(-2.2, 2.2, -1.2);
    pointLight.castShadow = true;
    scene.add(pointLight);
  };

  const createCeilingLights = () => {
    const positions = [
      [-10, 9.8, -10],
      [10, 9.8, -10],
      [-10, 9.8, 10],
      [10, 9.8, 10],
    ];

    positions.forEach(([x, y, z]) => {
      const light = new THREE.PointLight(0xffffff, 0.6, 20);
      light.position.set(x, y, z);
      light.castShadow = true;
      scene.add(light);
    });
  };

  return { createLights, createCeilingLights };
}
