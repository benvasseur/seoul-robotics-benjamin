import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    /**
     * Set up the scene, camera, and renderer
     */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 0.5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    /**
     * Grid management
     */
    // const gridHelper = new THREE.GridHelper(10, 10);
    // scene.add(gridHelper);

    const radius = 10;
    const sectors = 16;
    const rings = 8;
    const divisions = 64;

    const helper = new THREE.PolarGridHelper(radius, sectors, rings, divisions);
    scene.add(helper);

    /**
     * Model management
     */
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 0.5;
    scene.add(cube);

    /**
     * Light management
     */
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(ambientLight);

    // const pointLight = new THREE.PointLight(0xffffff, 0.5);
    // pointLight.position.set(5, 5, 5);
    // scene.add(pointLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    /**
     * Animate (rendering)
     */
    const animate = () => {
      renderer.render(scene, camera);
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    // Clean up on unmount
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Scene;
