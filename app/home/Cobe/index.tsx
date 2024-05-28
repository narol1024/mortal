"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";
import { useStores } from "@/hooks/useStores";
import { observer } from "mobx-react-lite";

export const Cobe = observer(() => {
  const { news, location } = useStores();
  const newsList = news.newsList;
  const focusRef = useRef([-1, -1]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const pointerInteractionMovement = useRef({
    x: 0,
    y: 0,
  });
  const [{ rx, ry }, springApi] = useSpring(() => ({
    rx: 0,
    ry: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));
  const locationToAngles = (long: number, lat: number) => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };
  useEffect(() => {
    let phi = 0;
    let theta = 0;
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
      const onResize = () =>
        canvasRef.current && (width = canvasRef.current.offsetWidth);
      window.addEventListener("resize", onResize);
      onResize();
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
        markers: newsList.map((newsItem) => {
          return {
            location: [newsItem.latitude, newsItem.longitude],
            size: 0.1,
          };
        }),
        onRender: (state) => {
          const isAutoRotation =
            focusRef.current[0] === -1 && focusRef.current[1] === -1;
          if (isAutoRotation) {
            // It automatically rotates when there is no user interaction.
            if (!pointerInteracting.current) {
              phi += 0.005;
            }

            state.phi = phi + rx.get();
            state.theta = theta + ry.get();

            // 切换到focus模式，保存需要参与计算的变量
            currentPhi = state.phi;
            currentTheta = state.theta;
          } else {
            state.phi = currentPhi;
            state.theta = currentTheta;
            const doublePi = Math.PI * 2;
            const [focusPhi, focusTheta] = focusRef.current;
            const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
            const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;
            // Control the speed
            if (distPositive < distNegative) {
              currentPhi += distPositive * 0.08;
            } else {
              currentPhi -= distNegative * 0.08;
            }
            currentTheta = currentTheta * 0.92 + focusTheta * 0.08;

            // 切换到动画模式，保存需要参与计算的变量
            phi = currentPhi;
            theta = currentTheta;
            springApi.start({
              rx: 0,
              ry: 0,
            });
          }
          state.width = width * 2;
          state.height = width * 2;
        },
      });
      return () => {
        globe.destroy();
        window.removeEventListener("resize", onResize);
      };
    }
  }, [newsList]);

  useEffect(() => {
    if (news.isPosting) {
      const { longitude, latitude } = location;
      focusRef.current = locationToAngles(longitude, latitude);
    } else {
      focusRef.current = [-1, -1];
    }
  }, [news.isPosting]);

  return (
    <div
      style={{
        aspectRatio: 1,
      }}
      className="relative max-w-[60vh] m-auto"
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
            springApi.start({
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
            springApi.start({
              rx: delta.x / 100,
              ry: delta.y / 100,
            });
          }
        }}
        className="w-full h-full cursor-grab"
      />
    </div>
  );
});
