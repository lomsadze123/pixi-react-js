import { Sprite } from "@pixi/react";
import { Assets, Sprite as SpriteType, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

const BunnySprite = () => {
  const [texture, setTexture] = useState(Texture.EMPTY);
  const [isClicked, setIsClicked] = useState(false);
  const spriteRef = useRef<SpriteType | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const bunnyTexture = await Assets.load(
        "https://pixijs.com/assets/bunny.png"
      );
      if (isMounted) setTexture(bunnyTexture);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isClicked) return;

    const timer = setTimeout(() => {
      if (spriteRef.current) {
        setIsClicked(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isClicked]);

  return (
    <Sprite
      ref={spriteRef}
      anchor={0.5}
      eventMode="static"
      cursor="pointer"
      // onClick={() => setIsClicked(true)}
      click={() => setIsClicked(true)}
      scale={1.5}
      texture={texture}
      x={window.innerWidth / 2}
      y={isClicked ? window.innerHeight / 2 - 40 : window.innerHeight / 2}
    />
  );
};

export default BunnySprite;
