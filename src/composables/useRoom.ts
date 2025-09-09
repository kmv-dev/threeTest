import * as THREE from 'three';
let ground: THREE.Mesh;

export function useRoom(scene: THREE.Scene) {
  const createGround = () => {
    const tex = new THREE.TextureLoader().load('/textures/floor_tile.jpg');
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(10, 10);
    tex.colorSpace = THREE.SRGBColorSpace;

    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.4,
      metalness: 0.2,
    });

    const geo = new THREE.PlaneGeometry(30, 30);
    ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);
  };

  const createBackground = () => {
    const wallTex = new THREE.TextureLoader().load('/textures/wall.jpg');
    wallTex.colorSpace = THREE.SRGBColorSpace;
    wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
    wallTex.repeat.set(4, 2);

    const mat = new THREE.MeshStandardMaterial({
      map: wallTex,
      roughness: 0.8,
      metalness: 0.1,
    });

    const wallGeo = new THREE.PlaneGeometry(30, 10);
    const wall = new THREE.Mesh(wallGeo, mat);
    wall.position.set(0, 5, -15);
    wall.receiveShadow = true;
    scene.add(wall);
  };
  const createWalls = () => {
    const wallTex = new THREE.TextureLoader().load('/textures/wall.jpg');
    wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
    wallTex.repeat.set(4, 2);
    wallTex.colorSpace = THREE.SRGBColorSpace;

    const mat = new THREE.MeshStandardMaterial({
      map: wallTex,
      roughness: 0.8,
      metalness: 0.1,
    });

    const wallGeo = new THREE.PlaneGeometry(30, 10);

    const backWall = new THREE.Mesh(wallGeo, mat);
    backWall.position.set(0, 5, -15);
    scene.add(backWall);

    const frontWall = new THREE.Mesh(wallGeo, mat);
    frontWall.position.set(0, 5, 15);
    frontWall.rotation.y = Math.PI;
    scene.add(frontWall);

    const leftWall = new THREE.Mesh(wallGeo, mat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-15, 5, 0);
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeo, mat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(15, 5, 0);
    scene.add(rightWall);
  };

  const createCeiling = () => {
    const ceilingTex = new THREE.TextureLoader().load('/textures/ceiling.jpg');
    ceilingTex.wrapS = ceilingTex.wrapT = THREE.RepeatWrapping;
    ceilingTex.repeat.set(6, 6);
    ceilingTex.colorSpace = THREE.SRGBColorSpace;

    const mat = new THREE.MeshStandardMaterial({
      map: ceilingTex,
      roughness: 0.9,
      metalness: 0.0,
    });

    const geo = new THREE.PlaneGeometry(30, 30);
    const ceiling = new THREE.Mesh(geo, mat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 10;
    scene.add(ceiling);
  };

  return { createGround, createWalls, createCeiling, createBackground };
}
