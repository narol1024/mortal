import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "react-spring";

export function Cobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const pointerInteractionMovement = useRef({
    x: 0,
    y: 0,
  });
  const [{ rx, ry }, api] = useSpring(() => ({
    rx: 0,
    ry: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));
  useEffect(() => {
    let phi = 0;
    let theta = 0;
    let width = 0;
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1,
        mapSamples: 20000,
        mapBrightness: 1.2,
        baseColor: [1, 1, 1],
        markerColor: [251 / 255, 100 / 255, 21 / 255],
        glowColor: [1.2, 1.2, 1.2],
        markers: [
          // longitude latitude
          { location: [37.7595, -122.4367], size: 0.03 },
          { location: [40.7128, -74.006], size: 0.1 },
        ],
        onRender: (state) => {
          // This prevents rotation while dragging
          if (!pointerInteracting.current) {
            // Called on every animation frame.
            // `state` will be an empty object, return updated params.
            phi += 0.005;
          }
          state.phi = phi + rx.get();
          state.theta = theta + ry.get();
          state.width = width * 2;
          state.height = width * 2;
        },
      });
      return () => {
        globe.destroy();
      };
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = {
            x: e.clientX - pointerInteractionMovement.current.x,
            y: e.clientY - pointerInteractionMovement.current.y,
          };
          canvasRef.current!.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = {
              x: e.clientX - pointerInteracting.current.x,
              y: e.clientY - pointerInteracting.current.y,
            };
            pointerInteractionMovement.current = delta;
            api.start({
              rx: delta.x / 200,
              ry: delta.y / 200,
            });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = {
              x: e.touches[0].clientX - pointerInteracting.current.x,
              y: e.touches[0].clientY - pointerInteracting.current.y,
            };
            pointerInteractionMovement.current = delta;
            api.start({
              rx: delta.x / 100,
              ry: delta.y / 100,
            });
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
        }}
      />
    </div>
  );
}
