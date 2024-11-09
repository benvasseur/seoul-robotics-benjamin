import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAtomValue } from "jotai";
import { modelPositionAtom } from "../atoms/stateAtoms";

const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const initCamPos = { x: 4, y: 2, z: 0 };
  const modelPosition = useAtomValue(modelPositionAtom);
  const modelPositionRef = useRef(modelPosition);

  useEffect(() => {
    modelPositionRef.current = modelPosition;
  }, [modelPosition]);

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
    camera.position.set(initCamPos.x, initCamPos.y, initCamPos.z);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    /**
     * Camera controls
     */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.keyPanSpeed = 25;
    // Set WASD shortcut
    controls.keys = {
      LEFT: "KeyA",
      UP: "KeyW",
      RIGHT: "KeyD",
      BOTTOM: "KeyS",
    };
    controls.saveState();

    controls.listenToKeyEvents(window);

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        // Space bar to reset camera position
        case " ":
          controls.reset();
          break;
        default:
          break;
      }
      controls.update();
    };

    window.addEventListener("keydown", handleKeyDown);

    /**
     * Floor Creation
     */
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    /**
     * Grid management
     */
    const radius = 10;
    const sectors = 16;
    const rings = 8;
    const divisions = 64;

    const helper = new THREE.PolarGridHelper(radius, sectors, rings, divisions);
    scene.add(helper);

    /**
     * Model management
     */
    let model: THREE.Group | undefined;
    const loader = new GLTFLoader();
    loader.load(
      "/assets/models/Red_Car.glb",
      (gltf) => {
        model = gltf.scene;
        model.position.set(
          modelPositionRef.current.x,
          modelPositionRef.current.y,
          modelPositionRef.current.z,
        );

        model.castShadow = true;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
          }
        });

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the model:", error);
      },
    );

    /**
     * Light management
     */
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(3, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);

    /**
     * Animate (rendering)
     */
    const animate = () => {
      if (model) {
        model.position.set(
          modelPositionRef.current.x,
          modelPositionRef.current.y,
          modelPositionRef.current.z,
        );
      }
      controls.update();
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md">
        Use <strong>WASD</strong> keys to pan the camera and{" "}
        <strong>Space</strong> to reset to the default position.
      </div>
      <div ref={mountRef} />
    </div>
  );
};

export default Scene;
