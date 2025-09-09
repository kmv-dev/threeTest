import * as THREE from 'three';
export function useStand() {
  const buildNightstand = (): THREE.Group => {
    const group = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#a9896f'),
      roughness: 0.55,
      metalness: 0.05,
    });
    const topMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8b6b54'),
      roughness: 0.5,
      metalness: 0.05,
    });
    const handleMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#cdd6e6'),
      metalness: 0.8,
      roughness: 0.25,
    });

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.4), bodyMat);
    body.castShadow = true;
    body.position.set(-1.2, 0.25 + 0.04, -0.4);
    group.add(body);

    // Top
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.04, 0.44), topMat);
    top.castShadow = true;
    top.position.set(-1.2, 0.5 + 0.04, -0.4);
    group.add(top);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.18, 16);
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x555555,
      metalness: 0.2,
      roughness: 0.5,
    });
    const legOffsets = [
      [-0.28, 0, -0.18],
      [0.28, 0, -0.18],
      [-0.28, 0, 0.18],
      [0.28, 0, 0.18],
    ];
    legOffsets.forEach(([dx, , dz]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.castShadow = true;
      leg.position.set(-1.2 + dx, 0.09, -0.4 + dz);
      group.add(leg);
    });

    // Handles
    const handle1 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.08, 16), handleMat);
    handle1.rotation.z = Math.PI / 2;
    handle1.position.set(-1.2, 0.38, -0.2);
    handle1.castShadow = true;
    group.add(handle1);

    const handle2 = handle1.clone();
    handle2.position.set(-1.2, 0.24, -0.2);
    group.add(handle2);

    return group;
  };
  return { buildNightstand };
}
