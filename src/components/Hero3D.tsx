import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { DRONE_HOTSPOTS } from '../data/drones';
import { DroneHotspot } from '../types';
import { Play, Pause, RotateCcw, Crosshair, Eye, Sparkles, Wind, ShieldAlert, Cpu } from 'lucide-react';

interface Hero3DProps {
  onSelectHotspot?: (hotspot: DroneHotspot) => void;
  onRequestQuote?: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onSelectHotspot, onRequestQuote }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<DroneHotspot | null>(null);
  const [isSpraying, setIsSpraying] = useState(true);
  const [isFlying, setIsFlying] = useState(false);
  const [ndviMode, setNdviMode] = useState(true);
  const [cameraSpeed, setCameraSpeed] = useState(1);
  const [flightTelemetry, setFlightTelemetry] = useState({
    altitude: 3.2,
    speed: 0.0,
    battery: 98,
    flowRate: 14.2,
    sprayCoverage: 18.5,
    satellites: 28,
  });

  // Scene object references to update in animation loop
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    droneGroup: THREE.Group;
    propellers: THREE.Group[];
    sprayParticles: THREE.Points[];
    radarWave: THREE.Mesh;
    terrainMesh: THREE.Mesh;
    hotspotSprites: { sprite: THREE.Sprite; hotspot: DroneHotspot }[];
    targetCamPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    isUserInteracting: boolean;
    mousePos: { x: number; y: number };
    mouseDelta: { x: number; y: number };
    sphericalCoords: { radius: number; theta: number; phi: number };
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a110d, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, 1.8, 3.4);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xd9f2e6, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7e6, 2.2);
    sunLight.position.set(5, 12, 7);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.camera.left = -6;
    sunLight.shadow.camera.right = 6;
    sunLight.shadow.camera.top = 6;
    sunLight.shadow.camera.bottom = -6;
    scene.add(sunLight);

    const cyanRimLight = new THREE.DirectionalLight(0x10b981, 1.8);
    cyanRimLight.position.set(-6, -2, -5);
    scene.add(cyanRimLight);

    const groundBounceLight = new THREE.PointLight(0x059669, 1.2, 10);
    groundBounceLight.position.set(0, -0.5, 0);
    scene.add(groundBounceLight);

    // 5. Build Agricultural Drone Model (DJI Agras T50 architecture)
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);

    // Materials
    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2421,
      roughness: 0.35,
      metalness: 0.85,
    });

    const djiWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f7fa,
      roughness: 0.25,
      metalness: 0.2,
    });

    const djiOrangeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.3,
      metalness: 0.1,
    });

    const metalChromeMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.95,
    });

    const tankMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x22c55e,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.65,
      thickness: 0.8,
      transparent: true,
      opacity: 0.85,
    });

    const rotorBladeMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.4,
      metalness: 0.8,
      side: THREE.DoubleSide,
    });

    // Central Main Body (Avionics fuselage)
    const bodyGeometry = new THREE.BoxGeometry(0.75, 0.35, 1.1);
    const bodyMesh = new THREE.Mesh(bodyGeometry, djiWhiteMaterial);
    bodyMesh.position.y = 0.4;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    droneGroup.add(bodyMesh);

    // Top Cover Accent
    const topCapGeo = new THREE.BoxGeometry(0.65, 0.12, 0.8);
    const topCapMesh = new THREE.Mesh(topCapGeo, carbonMaterial);
    topCapMesh.position.set(0, 0.58, 0);
    droneGroup.add(topCapMesh);

    // Chemical Spray Tank
    const tankGeo = new THREE.CylinderGeometry(0.38, 0.34, 0.65, 24);
    tankGeo.rotateZ(Math.PI / 2);
    const tankMesh = new THREE.Mesh(tankGeo, tankMaterial);
    tankMesh.position.set(0, 0.25, 0.05);
    tankMesh.castShadow = true;
    droneGroup.add(tankMesh);

    // Tank filling lid
    const tankLidGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16);
    const tankLid = new THREE.Mesh(tankLidGeo, djiOrangeMaterial);
    tankLid.position.set(0, 0.64, 0.1);
    droneGroup.add(tankLid);

    // Spherical Phased Array Radar (Front & Rear)
    const radarGeo = new THREE.SphereGeometry(0.18, 20, 20);
    const radarFront = new THREE.Mesh(radarGeo, carbonMaterial);
    radarFront.position.set(0, 0.2, 0.7);
    droneGroup.add(radarFront);

    const radarRear = new THREE.Mesh(radarGeo, carbonMaterial);
    radarRear.position.set(0, 0.2, -0.7);
    droneGroup.add(radarRear);

    // Radar Scanning Ring effect
    const radarWaveGeo = new THREE.RingGeometry(0.2, 0.35, 32);
    radarWaveGeo.rotateX(Math.PI / 2);
    const radarWaveMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const radarWave = new THREE.Mesh(radarWaveGeo, radarWaveMat);
    radarWave.position.set(0, 0.2, 0.7);
    droneGroup.add(radarWave);

    // RTK Antennas (Twin high-precision masts)
    const rtkMastGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12);
    const rtkCapGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 16);

    const rtkMastLeft = new THREE.Mesh(rtkMastGeo, metalChromeMaterial);
    rtkMastLeft.position.set(-0.25, 0.7, -0.4);
    const rtkCapLeft = new THREE.Mesh(rtkCapGeo, djiOrangeMaterial);
    rtkCapLeft.position.set(-0.25, 0.94, -0.4);
    droneGroup.add(rtkMastLeft, rtkCapLeft);

    const rtkMastRight = new THREE.Mesh(rtkMastGeo, metalChromeMaterial);
    rtkMastRight.position.set(0.25, 0.7, -0.4);
    const rtkCapRight = new THREE.Mesh(rtkCapGeo, djiOrangeMaterial);
    rtkCapRight.position.set(0.25, 0.94, -0.4);
    droneGroup.add(rtkMastRight, rtkCapRight);

    // FPV Cameras + Night Work Spotlight
    const fpvPodGeo = new THREE.BoxGeometry(0.25, 0.12, 0.15);
    const fpvPod = new THREE.Mesh(fpvPodGeo, carbonMaterial);
    fpvPod.position.set(0, 0.36, 0.65);
    const lensGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.04, 16);
    lensGeo.rotateX(Math.PI / 2);
    const lensMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.1, metalness: 0.9 });
    const lens1 = new THREE.Mesh(lensGeo, lensMat);
    lens1.position.set(-0.06, 0.36, 0.74);
    const lens2 = new THREE.Mesh(lensGeo, lensMat);
    lens2.position.set(0.06, 0.36, 0.74);
    droneGroup.add(fpvPod, lens1, lens2);

    // Landing Skid Frame
    const skidGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4, 12);
    skidGeo.rotateX(Math.PI / 2);

    const skidLeft = new THREE.Mesh(skidGeo, carbonMaterial);
    skidLeft.position.set(-0.55, -0.15, 0);
    const skidRight = new THREE.Mesh(skidGeo, carbonMaterial);
    skidRight.position.set(0.55, -0.15, 0);

    const legGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.55, 12);
    const legFL = new THREE.Mesh(legGeo, carbonMaterial);
    legFL.position.set(-0.45, 0.1, 0.4);
    legFL.rotation.z = 0.35;
    legFL.rotation.x = -0.2;

    const legFR = new THREE.Mesh(legGeo, carbonMaterial);
    legFR.position.set(0.45, 0.1, 0.4);
    legFR.rotation.z = -0.35;
    legFR.rotation.x = -0.2;

    const legBL = new THREE.Mesh(legGeo, carbonMaterial);
    legBL.position.set(-0.45, 0.1, -0.4);
    legBL.rotation.z = 0.35;
    legBL.rotation.x = 0.2;

    const legBR = new THREE.Mesh(legGeo, carbonMaterial);
    legBR.position.set(0.45, 0.1, -0.4);
    legBR.rotation.z = -0.35;
    legBR.rotation.x = 0.2;

    droneGroup.add(skidLeft, skidRight, legFL, legFR, legBL, legBR);

    // 4 Quad/Octo Coaxial Arm Stems & Rotors
    const armAngles = [
      Math.PI / 4,       // Front-Right
      (3 * Math.PI) / 4, // Front-Left
      (5 * Math.PI) / 4, // Back-Left
      (7 * Math.PI) / 4  // Back-Right
    ];

    const armLength = 1.35;
    const propellers: THREE.Group[] = [];
    const nozzlePositions: THREE.Vector3[] = [];

    armAngles.forEach((angle, idx) => {
      const armGroup = new THREE.Group();
      droneGroup.add(armGroup);

      // Carbon Arm Tube
      const armGeo = new THREE.CylinderGeometry(0.038, 0.045, armLength, 16);
      armGeo.rotateZ(Math.PI / 2);
      const arm = new THREE.Mesh(armGeo, carbonMaterial);
      arm.position.x = armLength / 2;
      arm.castShadow = true;
      armGroup.add(arm);

      // Motor Pod
      const motorGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.2, 20);
      const motor = new THREE.Mesh(motorGeo, carbonMaterial);
      motor.position.set(armLength, 0.05, 0);
      armGroup.add(motor);

      // Motor Cap Accent (DJI orange/red ring)
      const ringGeo = new THREE.TorusGeometry(0.092, 0.012, 8, 24);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, djiOrangeMaterial);
      ring.position.set(armLength, 0.08, 0);
      armGroup.add(ring);

      // Navigation LED lights
      const ledGeo = new THREE.SphereGeometry(0.03, 8, 8);
      const isRightSide = Math.cos(angle) > 0;
      const ledColor = isRightSide ? 0x10b981 : 0xef4444; // Green Starboard, Red Port
      const ledMat = new THREE.MeshBasicMaterial({ color: ledColor });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(armLength + 0.04, -0.04, 0);
      armGroup.add(led);

      // Propeller Assembly (Coaxial Dual Blades)
      const propGroup = new THREE.Group();
      propGroup.position.set(armLength, 0.16, 0);

      const propBladeGeo = new THREE.BoxGeometry(0.85, 0.01, 0.09);
      const blade1 = new THREE.Mesh(propBladeGeo, rotorBladeMaterial);
      blade1.castShadow = true;

      const propHubGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 16);
      const hub = new THREE.Mesh(propHubGeo, metalChromeMaterial);

      propGroup.add(blade1, hub);
      armGroup.add(propGroup);
      propellers.push(propGroup);

      // Centrifugal Atomizing Spray Nozzle under the motor
      const nozzleGeo = new THREE.CylinderGeometry(0.03, 0.05, 0.14, 12);
      const nozzle = new THREE.Mesh(nozzleGeo, metalChromeMaterial);
      nozzle.position.set(armLength, -0.16, 0);
      armGroup.add(nozzle);

      // Spray tube connecting from central tank
      const tubeGeo = new THREE.CylinderGeometry(0.012, 0.012, armLength * 0.95, 8);
      tubeGeo.rotateZ(Math.PI / 2);
      const sprayTube = new THREE.Mesh(tubeGeo, djiOrangeMaterial);
      sprayTube.position.set(armLength / 2, -0.06, 0.03);
      armGroup.add(sprayTube);

      // Position arm in quadrant
      armGroup.rotation.y = angle;

      // Track world nozzle position for spray particle physics
      const worldNozzlePos = new THREE.Vector3(
        Math.cos(angle) * armLength,
        -0.16,
        -Math.sin(angle) * armLength
      );
      nozzlePositions.push(worldNozzlePos);
    });

    // 6. Dynamic Spray Particle System (Centrifugal droplet physics)
    const sprayCount = 450;
    const sprayParticles: THREE.Points[] = [];

    nozzlePositions.forEach((nPos) => {
      const pGeo = new THREE.BufferGeometry();
      const pPositions = new Float32Array(sprayCount * 3);
      const pVelocities = new Float32Array(sprayCount * 3);
      const pLifespans = new Float32Array(sprayCount);

      for (let i = 0; i < sprayCount; i++) {
        pPositions[i * 3] = nPos.x;
        pPositions[i * 3 + 1] = nPos.y + 0.3; // match drone initial height
        pPositions[i * 3 + 2] = nPos.z;

        // Downward swirl velocity driven by rotor downwash
        pVelocities[i * 3] = (Math.random() - 0.5) * 0.9;
        pVelocities[i * 3 + 1] = -1.8 - Math.random() * 2.2;
        pVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.9;

        pLifespans[i] = Math.random();
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      pGeo.userData = { velocities: pVelocities, lifespans: pLifespans, origin: nPos };

      // Droplet shader/material
      const pMat = new THREE.PointsMaterial({
        color: 0x67e8f9,
        size: 0.065,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const pSystem = new THREE.Points(pGeo, pMat);
      scene.add(pSystem);
      sprayParticles.push(pSystem);
    });

    // 7. Interactive Agricultural Terrain (With Crop Rows & NDVI Simulation)
    const terrainGeo = new THREE.PlaneGeometry(18, 18, 48, 48);
    terrainGeo.rotateX(-Math.PI / 2);

    // Custom Canvas Texture for Mato Grosso Field with NDVI option
    const terrainCanvas = document.createElement('canvas');
    terrainCanvas.width = 1024;
    terrainCanvas.height = 1024;
    const ctx = terrainCanvas.getContext('2d')!;

    const drawFieldTexture = (isNdvi: boolean) => {
      ctx.fillStyle = isNdvi ? '#052e16' : '#142818';
      ctx.fillRect(0, 0, 1024, 1024);

      // Draw agricultural rows (curvas de nível e linhas de plantio de soja de Sorriso-MT)
      for (let y = 0; y < 1024; y += 16) {
        if (isNdvi) {
          // NDVI Heatmap: Healthy lush green with realistic stress patches
          const noise = Math.sin(y * 0.02) + Math.cos(y * 0.04);
          if (noise > 0.8) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.45)'; // High stress / nematode spot
          } else if (noise > 0.2) {
            ctx.fillStyle = 'rgba(234, 179, 8, 0.4)';  // Moderate stress / water deficiency
          } else {
            ctx.fillStyle = 'rgba(34, 197, 94, 0.75)'; // Optimum vegetative vigor (NDVI > 0.85)
          }
        } else {
          ctx.fillStyle = y % 32 === 0 ? '#1b4324' : '#0f2916';
        }
        ctx.fillRect(0, y, 1024, 8);
      }

      // High-tech digital grid overlay
      ctx.strokeStyle = isNdvi ? 'rgba(52, 211, 153, 0.35)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < 1024; x += 128) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }
      for (let y = 0; y < 1024; y += 128) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }
    };

    drawFieldTexture(ndviMode);
    const terrainTexture = new THREE.CanvasTexture(terrainCanvas);
    terrainTexture.wrapS = THREE.RepeatWrapping;
    terrainTexture.wrapT = THREE.RepeatWrapping;
    terrainTexture.repeat.set(2, 2);

    const terrainMat = new THREE.MeshStandardMaterial({
      map: terrainTexture,
      roughness: 0.8,
      metalness: 0.1,
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.position.y = -1.2;
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // 8. 3D Hotspot Markers
    const hotspotSprites: { sprite: THREE.Sprite; hotspot: DroneHotspot }[] = [];

    DRONE_HOTSPOTS.forEach((hotspot) => {
      // Create canvas icon for hotspot
      const hCanvas = document.createElement('canvas');
      hCanvas.width = 128;
      hCanvas.height = 128;
      const hCtx = hCanvas.getContext('2d')!;

      // Glowing outer ring
      hCtx.beginPath();
      hCtx.arc(64, 64, 48, 0, Math.PI * 2);
      hCtx.fillStyle = 'rgba(16, 185, 129, 0.25)';
      hCtx.fill();

      // Solid emerald center with white dot
      hCtx.beginPath();
      hCtx.arc(64, 64, 28, 0, Math.PI * 2);
      hCtx.fillStyle = '#10b981';
      hCtx.fill();

      hCtx.beginPath();
      hCtx.arc(64, 64, 12, 0, Math.PI * 2);
      hCtx.fillStyle = '#ffffff';
      hCtx.fill();

      const spriteTexture = new THREE.CanvasTexture(hCanvas);
      const spriteMat = new THREE.SpriteMaterial({
        map: spriteTexture,
        transparent: true,
        depthTest: false,
      });

      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(...hotspot.position);
      sprite.scale.set(0.3, 0.3, 0.3);
      droneGroup.add(sprite);

      hotspotSprites.push({ sprite, hotspot });
    });

    // 9. Camera Orbit and Target State
    const sphericalCoords = {
      radius: 4.8,
      theta: 0.8,
      phi: 1.1,
    };

    const targetCamPos = new THREE.Vector3(2.8, 1.8, 3.4);
    const targetLookAt = new THREE.Vector3(0, 0.2, 0);
    const currentLookAt = new THREE.Vector3(0, 0.2, 0);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      droneGroup,
      propellers,
      sprayParticles,
      radarWave,
      terrainMesh,
      hotspotSprites,
      targetCamPos,
      targetLookAt,
      currentLookAt,
      isUserInteracting: false,
      mousePos: { x: 0, y: 0 },
      mouseDelta: { x: 0, y: 0 },
      sphericalCoords,
    };

    // 10. Pointer / Touch Interaction
    let isDragging = false;
    let previousPointer = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointer = { x: clientX, y: clientY };

      // Raycast to check if a hotspot sprite was clicked
      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const spritesToTest = hotspotSprites.map((h) => h.sprite);
      const intersects = raycaster.intersectObjects(spritesToTest);

      if (intersects.length > 0) {
        const hitSprite = intersects[0].object as THREE.Sprite;
        const found = hotspotSprites.find((h) => h.sprite === hitSprite);
        if (found) {
          handleSelectHotspot(found.hotspot);
        }
      }
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !sceneRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousPointer.x;
      const deltaY = clientY - previousPointer.y;
      previousPointer = { x: clientX, y: clientY };

      const coords = sceneRef.current.sphericalCoords;
      coords.theta -= deltaX * 0.007;
      coords.phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, coords.phi - deltaY * 0.007));

      // Calculate camera position from spherical
      targetCamPos.x = coords.radius * Math.sin(coords.phi) * Math.sin(coords.theta);
      targetCamPos.y = coords.radius * Math.cos(coords.phi) + 0.3;
      targetCamPos.z = coords.radius * Math.sin(coords.phi) * Math.cos(coords.theta);
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!sceneRef.current) return;
      e.preventDefault();
      const coords = sceneRef.current.sphericalCoords;
      coords.radius = Math.max(2.0, Math.min(8.5, coords.radius + e.deltaY * 0.003));
      targetCamPos.x = coords.radius * Math.sin(coords.phi) * Math.sin(coords.theta);
      targetCamPos.y = coords.radius * Math.cos(coords.phi) + 0.3;
      targetCamPos.z = coords.radius * Math.sin(coords.phi) * Math.cos(coords.theta);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // 11. Responsive Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 650;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 12. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // 1. Propeller rotation (high-speed aerodynamic spin)
      const propSpeed = 28;
      propellers.forEach((p, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        p.rotation.y += propSpeed * delta * direction;
      });

      // 2. Drone hover physics & autonomous flight motion
      if (droneGroup) {
        if (isFlying) {
          // Autonomous sweeping flight pattern over field
          droneGroup.position.x = Math.sin(elapsedTime * 0.8) * 2.2;
          droneGroup.position.z = Math.cos(elapsedTime * 0.5) * 1.6;
          droneGroup.position.y = 0.5 + Math.sin(elapsedTime * 1.5) * 0.15;
          droneGroup.rotation.z = -Math.cos(elapsedTime * 0.8) * 0.12; // Bank angle
          droneGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.08;
          droneGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.3;
        } else {
          // Subtle authentic GPS hover with gentle drift
          droneGroup.position.y = 0.3 + Math.sin(elapsedTime * 1.8) * 0.04;
          droneGroup.position.x = Math.sin(elapsedTime * 0.9) * 0.03;
          droneGroup.position.z = Math.cos(elapsedTime * 0.7) * 0.03;
          droneGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.015;
          droneGroup.rotation.x = Math.cos(elapsedTime * 1.1) * 0.015;
        }
      }

      // 3. Phased-Array Radar pulse ring expansion
      if (radarWave) {
        const radarScale = 1 + (elapsedTime % 1.5) * 2.5;
        radarWave.scale.set(radarScale, radarScale, radarScale);
        (radarWave.material as THREE.MeshBasicMaterial).opacity = Math.max(
          0,
          0.7 - (elapsedTime % 1.5) * 0.45
        );
      }

      // 4. Centrifugal spray mist physics
      if (isSpraying) {
        sprayParticles.forEach((pSystem) => {
          pSystem.visible = true;
          const posAttr = pSystem.geometry.attributes.position as THREE.BufferAttribute;
          const posArr = posAttr.array as Float32Array;
          const velocities = pSystem.geometry.userData.velocities as Float32Array;
          const lifespans = pSystem.geometry.userData.lifespans as Float32Array;
          const origin = pSystem.geometry.userData.origin as THREE.Vector3;

          // Drone current world matrix for origin tracking
          const dronePos = droneGroup.position;

          for (let i = 0; i < sprayCount; i++) {
            lifespans[i] += delta * 1.4;
            if (lifespans[i] >= 1.0) {
              // Reset droplet back to nozzle
              lifespans[i] = 0;
              posArr[i * 3] = dronePos.x + origin.x;
              posArr[i * 3 + 1] = dronePos.y + origin.y;
              posArr[i * 3 + 2] = dronePos.z + origin.z;
            } else {
              // Drift with downwash and gravity
              posArr[i * 3] += velocities[i * 3] * delta * 0.7;
              posArr[i * 3 + 1] += velocities[i * 3 + 1] * delta;
              posArr[i * 3 + 2] += velocities[i * 3 + 2] * delta * 0.7;

              // Don't fall through ground
              if (posArr[i * 3 + 1] < -1.1) {
                posArr[i * 3 + 1] = -1.1;
              }
            }
          }
          posAttr.needsUpdate = true;
        });
      } else {
        sprayParticles.forEach((p) => {
          p.visible = false;
        });
      }

      // 5. Hotspot pulses
      hotspotSprites.forEach(({ sprite }) => {
        const pulse = 0.28 + Math.sin(elapsedTime * 4.0) * 0.05;
        sprite.scale.set(pulse, pulse, pulse);
      });

      // 6. Smooth Camera Lerp
      camera.position.lerp(targetCamPos, 0.05);
      currentLookAt.lerp(targetLookAt, 0.05);
      camera.lookAt(currentLookAt);

      // Auto subtle rotation if no user interaction
      if (!isDragging && !activeHotspot) {
        sphericalCoords.theta += 0.0018 * cameraSpeed;
        targetCamPos.x = sphericalCoords.radius * Math.sin(sphericalCoords.phi) * Math.sin(sphericalCoords.theta);
        targetCamPos.z = sphericalCoords.radius * Math.sin(sphericalCoords.phi) * Math.cos(sphericalCoords.theta);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isSpraying, isFlying, ndviMode, activeHotspot, cameraSpeed]);

  const handleSelectHotspot = useCallback((hotspot: DroneHotspot) => {
    setActiveHotspot(hotspot);
    if (onSelectHotspot) onSelectHotspot(hotspot);

    if (sceneRef.current) {
      sceneRef.current.targetCamPos.set(...hotspot.cameraPos);
      sceneRef.current.targetLookAt.set(...hotspot.lookAt);
      sceneRef.current.sphericalCoords.radius = new THREE.Vector3(...hotspot.cameraPos).length();
    }
  }, [onSelectHotspot]);

  const resetCamera = useCallback(() => {
    setActiveHotspot(null);
    if (sceneRef.current) {
      sceneRef.current.sphericalCoords.radius = 4.8;
      sceneRef.current.sphericalCoords.theta = 0.8;
      sceneRef.current.sphericalCoords.phi = 1.1;
      sceneRef.current.targetLookAt.set(0, 0.2, 0);
      sceneRef.current.targetCamPos.set(2.8, 1.8, 3.4);
    }
  }, []);

  return (
    <div id="hero-3d-section" className="relative w-full min-h-[720px] lg:min-h-[820px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 pt-20">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner / Breadcrumb & Status */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-700/50 backdrop-blur-md px-3 py-1.5 rounded-full text-emerald-300 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Sorriso - Mato Grosso • Capital Nacional do Agronegócio</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-neutral-400 bg-neutral-900/70 border border-neutral-800 backdrop-blur-md px-3.5 py-1.5 rounded-full">
            <span className="flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
              RTK FIX: 1cm
            </span>
            <span className="h-3 w-px bg-neutral-700" />
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              Sats: {flightTelemetry.satellites}
            </span>
            <span className="h-3 w-px bg-neutral-700" />
            <span className="text-neutral-300">Modelo: DJI Agras T50</span>
          </div>
        </div>
      </div>

      {/* Main Hero Typography & Call-To-Action */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold tracking-wider uppercase text-xs mb-3">
            <Sparkles className="w-4 h-4" />
            Farming Solutions Mato Grosso
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            A REVOLUÇÃO AÉREA NO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">AGRONEGÓCIO</span> DE MT.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            Concessionária e assistência técnica especializada em drones agrícolas em Sorriso-MT. Pulverização de ultra-precisão, mapeamento com câmeras multiespectrais e economia comprovada de até 35% em defensivos.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              id="hero-cta-quote"
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-neutral-950" />
              Solicitar Proposta Safra
            </button>

            <a
              id="hero-cta-calc"
              href="#roi-calculator"
              className="px-5 py-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 font-medium text-sm transition-all flex items-center gap-2"
            >
              Simular Economia por Hectare
            </a>
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        title="Arraste para girar em 3D, role para zoom ou clique nos pontos luminosos"
      />

      {/* Interactive 3D HUD & Controls Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Left: Interactive 3D Toolbar */}
          <div className="md:col-span-8 flex flex-wrap items-center gap-2">
            {/* Quick 3D Component Inspection Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-950/80 backdrop-blur-xl border border-neutral-800/80 rounded-2xl shadow-2xl">
              <span className="text-[11px] font-semibold text-neutral-400 px-2 uppercase tracking-wider flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                Explorar 3D:
              </span>

              {DRONE_HOTSPOTS.map((hotspot) => {
                const isSelected = activeHotspot?.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    id={`hotspot-btn-${hotspot.id}`}
                    onClick={() => handleSelectHotspot(hotspot)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md shadow-emerald-500/30'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                    }`}
                  >
                    {hotspot.title.split(' ')[0]} {hotspot.title.split(' ')[1] || ''}
                  </button>
                );
              })}

              {activeHotspot && (
                <button
                  id="reset-cam-btn"
                  onClick={resetCamera}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Visão Geral"
                >
                  <RotateCcw className="w-3 h-3" />
                  Geral
                </button>
              )}
            </div>

            {/* Simulation Toggles (Spray, Autonomous Flight, NDVI) */}
            <div className="flex items-center gap-1.5 p-1.5 bg-neutral-950/80 backdrop-blur-xl border border-neutral-800/80 rounded-2xl">
              <button
                id="toggle-spray-btn"
                onClick={() => setIsSpraying(!isSpraying)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSpraying
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                <Wind className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pulverização: {isSpraying ? 'Ativa' : 'Pausada'}</span>
              </button>

              <button
                id="toggle-flight-btn"
                onClick={() => setIsFlying(!isFlying)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isFlying
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                {isFlying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-neutral-400" />}
                <span>{isFlying ? 'Em Voo' : 'Pairando'}</span>
              </button>
            </div>
          </div>

          {/* Right: Live Agronomic Telemetry Card */}
          <div className="md:col-span-4">
            <div className="bg-neutral-950/85 backdrop-blur-xl border border-neutral-800/80 p-3.5 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between text-xs pb-2 mb-2 border-b border-neutral-800/70">
                <span className="font-semibold text-neutral-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Telemetria em Campo (MT)
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">RTK CONNECTED</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-neutral-900/90 p-2 rounded-xl border border-neutral-800/60">
                  <div className="text-[10px] text-neutral-400 uppercase">Vazão</div>
                  <div className="text-sm font-bold text-cyan-300">{isSpraying ? '16.0' : '0.0'}</div>
                  <div className="text-[9px] text-neutral-500">L/min</div>
                </div>

                <div className="bg-neutral-900/90 p-2 rounded-xl border border-neutral-800/60">
                  <div className="text-[10px] text-neutral-400 uppercase">Capacidade</div>
                  <div className="text-sm font-bold text-emerald-300">40L / 50Kg</div>
                  <div className="text-[9px] text-neutral-500">Líquido/Sólido</div>
                </div>

                <div className="bg-neutral-900/90 p-2 rounded-xl border border-neutral-800/60">
                  <div className="text-[10px] text-neutral-400 uppercase">Rendimento</div>
                  <div className="text-sm font-bold text-amber-300">21.0</div>
                  <div className="text-[9px] text-neutral-500">ha/hora</div>
                </div>
              </div>

              <div className="mt-2.5 text-[11px] text-neutral-400 flex items-center justify-between">
                <span>Controle: 360° Interativo (clique e arraste)</span>
                <span className="text-emerald-400">DJI Agras T50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Hotspot Detail Card Overlay */}
        {activeHotspot && (
          <div className="mt-3 p-4 bg-neutral-950/90 backdrop-blur-2xl border border-emerald-500/40 rounded-2xl shadow-2xl max-w-xl animate-fade-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Inspeção Técnica de Componente
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{activeHotspot.title}</h3>
                <p className="text-xs text-emerald-300 font-medium">{activeHotspot.subtitle}</p>
                <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{activeHotspot.description}</p>
              </div>

              <button
                id="close-hotspot-btn"
                onClick={resetCamera}
                className="text-neutral-400 hover:text-white p-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 cursor-pointer"
                title="Fechar detalhes"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-neutral-800">
              {activeHotspot.techSpecs.map((spec, i) => (
                <div key={i} className="bg-neutral-900/80 p-2 rounded-lg text-[11px]">
                  <div className="text-neutral-400">{spec.label}</div>
                  <div className="font-semibold text-neutral-100">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
