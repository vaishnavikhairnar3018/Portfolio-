import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ContactGlobe.css';

export function ContactGlobe() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 280;
    const height = mount.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── Globe Core Group ──
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Inner Sphere (Dark Slate)
    const innerGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0a101d,
      transparent: true,
      opacity: 0.9,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 2. Wireframe / Latitude Longitude Lines
    const wireGeo = new THREE.SphereGeometry(1.42, 24, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireSphere);

    // 3. Dot Grid Points on Sphere Surface
    const pointCount = 350;
    const pointPositions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;

      const r = 1.43;
      pointPositions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pointPositions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pointPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    const pointMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });
    const dotPoints = new THREE.Points(pointGeo, pointMat);
    globeGroup.add(dotPoints);

    // 4. Key City Beacons (SF, NYC, London, Tokyo, Singapore)
    const cities = [
      { lat: 37.7749, lon: -122.4194, name: 'SF', isHome: true },
      { lat: 40.7128, lon: -74.006, name: 'NYC' },
      { lat: 51.5074, lon: -0.1278, name: 'LDN' },
      { lat: 35.6762, lon: 139.6503, name: 'TYO' },
      { lat: 1.3521, lon: 103.8198, name: 'SGP' },
    ];

    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    const beaconGroup = new THREE.Group();
    globeGroup.add(beaconGroup);

    cities.forEach((city) => {
      const pos = latLonToVector3(city.lat, city.lon, 1.45);
      const beaconGeo = new THREE.SphereGeometry(city.isHome ? 0.06 : 0.035, 12, 12);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: city.isHome ? 0x22c55e : 0x38bdf8,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      beaconGroup.add(beacon);

      // Home beacon pulse ring
      if (city.isHome) {
        const pulseGeo = new THREE.RingGeometry(0.07, 0.12, 16);
        const pulseMat = new THREE.MeshBasicMaterial({
          color: 0x22c55e,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        });
        const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
        pulseRing.position.copy(pos);
        pulseRing.lookAt(new THREE.Vector3(0, 0, 0));
        beaconGroup.add(pulseRing);
      }
    });

    // 5. Outer Orbital Ring
    const orbitGeo = new THREE.RingGeometry(1.75, 1.77, 64);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI / 2.4;
    scene.add(orbitRing);

    // ── Mouse Drag Interaction ──
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      globeGroup.rotation.y += deltaX * 0.008;
      globeGroup.rotation.x += deltaY * 0.008;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // ── Resize ──
    const resizeObserver = new ResizeObserver(() => {
      if (!mount) return;
      const w = mount.clientWidth || 280;
      const h = mount.clientHeight || 240;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(mount);

    // ── Animation Loop ──
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += 0.004;
      }
      orbitRing.rotation.z += 0.002;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      resizeObserver.disconnect();

      innerGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      pointGeo.dispose();
      pointMat.dispose();
      orbitGeo.dispose();
      orbitMat.dispose();

      renderer.dispose();
      if (domElement.parentNode) {
        domElement.parentNode.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div className="contact-globe-container" aria-label="Interactive 3D Global Network">
      <div ref={mountRef} className="contact-globe-canvas" />
      <span className="contact-globe-hint">drag to rotate 3D network</span>
    </div>
  );
}
