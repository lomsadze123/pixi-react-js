import { Graphics } from "pixi.js";
import { useCallback, useEffect, useState } from "react";

const Background = () => {
  const [stars, setStars] = useState<Star[]>([]);

  // Initialize stars once
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
  }, []);

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
  }, []);

  // Draw background and stars
  const drawBackground = useCallback(
    (g: Graphics | null): void => {
      if (!g) return;

      g.clear();

      // Background fill
      g.fill({ color: 0x000000 });
      g.rect(0, 0, window.innerWidth, window.innerHeight);
      g.fill();

      // Stars
      stars.forEach((star) => {
        g.fill({ color: 0xffffff, alpha: star.alpha });
        g.circle(star.x, star.y, star.size);
        g.fill();
      });
    },
    [stars]
  );

  return <pixiGraphics draw={drawBackground} />;
};

export default Background;
