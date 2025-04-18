import { AnimatedSprite } from "@pixi/react";
import {
  Assets,
  Spritesheet,
  Texture,
  AnimatedSprite as AnimatedSpriteType,
} from "pixi.js";
import { useEffect, useRef, useState } from "react";

const Dinosaur = () => {
  const [textures, setTextures] = useState<Texture[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const spriteRef = useRef<AnimatedSpriteType | null>(null);

  useEffect(() => {
    const loadSpriteSheet = async () => {
      if (textures.length > 0) return;
      try {
        const sheet = await Assets.load<Spritesheet>("/dino.json");
        await sheet.parse();
        setTextures(sheet.animations["run"]);
      } catch (error) {
        console.error("Error loading sprite sheet:", error);
      }
    };
    loadSpriteSheet();
  }, [textures.length]);

  useEffect(() => {
    if (!isClicked) return;

    const timer = setTimeout(() => {
      setIsClicked(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isClicked]);

  if (!textures.length) return null;

  return (
    <AnimatedSprite
      ref={(sprite) => {
        spriteRef.current = sprite;
      }}
      textures={textures}
      isPlaying={true}
      animationSpeed={0.1}
      eventMode="static"
      pointerdown={() => setIsClicked(true)}
      anchor={0.5}
      x={window.innerWidth / 2}
      y={isClicked ? window.innerHeight / 2 - 40 : window.innerHeight / 2}
    />
  );
};

export default Dinosaur;
