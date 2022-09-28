import { NextPage } from "next";
import dynamic from "next/dynamic";

const DrawCanvas = dynamic(() => import("@/components/draw-canvas"), {
  ssr: false,
});

const Canvas: NextPage = () => {
  return (
    <div>
      <DrawCanvas />
    </div>
  );
};

export default Canvas;
