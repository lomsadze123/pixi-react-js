import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphicsType } from "pixi.js";
import { useCallback, useEffect, useState } from "react";

interface BackgroundProps {
  width: number;
  height: number;
}

const Background = ({ width, height }: BackgroundProps) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 1.2,
        speed: Math.random() * 0.05 + 0.01, // very slow movement
        angle: Math.random() * Math.PI * 2, // Random direction
      });
    }
    setStars(newStars);
  }, [width, height]);

  // Animate stars with requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setStars((prevStars) =>
        prevStars.map((star) => {
          const dx = Math.cos(star.angle) * star.speed;
          const dy = Math.sin(star.angle) * star.speed;

          let newX = star.x + dx;
          let newY = star.y + dy;

          // Wrap around edges
          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;

          return { ...star, x: newX, y: newY };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height]);

  const drawBackground = useCallback(
    (g: PixiGraphicsType | null): void => {
      if (!g) return;

      g.clear();

      // Stars
      stars.forEach((star) => {
        g.beginFill(0xffffff, star.alpha);
        g.drawCircle(star.x, star.y, star.size);
        g.endFill();
      });
    },
    [stars, width, height]
  );

  return <Graphics draw={drawBackground} />;
};

export default Background;
