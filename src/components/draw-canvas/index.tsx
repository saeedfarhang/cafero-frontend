import { FC, useEffect, useRef, useState } from "react";
import { Circle, Layer, Line, Rect, Stage, Text } from "react-konva";
import styled from "styled-components";
import { checkeredBoardLines, roundBasePoint } from "./utils";
type Props = {
  tools?: "pen" | "eraser" | "undo";
  width?: number;
  height?: number;
  pixel?: number;
};

interface IContainer {
  $width: number;
  $height: number;
}

const Container = styled.div<IContainer>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  border: 1px solid black;
  margin: 20px;
`;

const DrawCanvas: FC<Props> = ({
  tools = "pen",
  width = 280,
  height = 280,
  pixel = 20,
}: Props) => {
  const [tool, setTool] = useState(tools ?? "pen");
  const [lines, setLines] = useState<any>([]);
  const [helperPoint, setHelperPoint] = useState({
    x: 0,
    y: 0,
  });

  const backgroundLines = checkeredBoardLines(width, height, pixel);

  const handleMouseClick = (e: any) => {
    const pos = e.target.getStage().getPointerPosition();
    const roundPos = {
      x: roundBasePoint(pos.x, pixel),
      y: roundBasePoint(pos.y, pixel),
    };
    if (roundPos.x in [0, 10, 20] && roundPos.y in [0, 10, 20]) {
      return;
    }

    let lastLine = lines[lines.length - 1];
    // // add point
    const stage = e.target.getStage();

    const point = stage.getPointerPosition();
    const roundPoint = {
      x: roundBasePoint(point.x, pixel),
      y: roundBasePoint(point.y, pixel),
    };
    if (lastLine) {
      lastLine.points = lastLine.points.concat([roundPoint.x, roundPoint.y]);
    }

    setLines([...lines, { tool, points: [roundPos.x, roundPos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const roundPoint = {
      x: roundBasePoint(point.x, pixel),
      y: roundBasePoint(point.y, pixel),
    };
    setHelperPoint(roundPoint);
  };

  const handleDeleteLineClick = () => {
    let r_lines = lines;
    r_lines.pop();
    r_lines.pop();
    setLines(r_lines);
  };
  useEffect(() => {
    console.log(lines);
  }, [lines]);

  return (
    <Container $width={width} $height={height}>
      <Stage
        x={0}
        y={0}
        width={width}
        height={height}
        onMouseDown={handleMouseClick}
        onMousemove={handleMouseMove}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            radius={50}
            fill="green"
            width={20}
            height={20}
            // onClick={() => {
            //   if (lines.length === 1) {
            //     setLines([]);
            //   }
            // }}
            onClick={handleDeleteLineClick}
          />
        </Layer>
        <Layer>
          {backgroundLines.map((line) => (
            <Line
              x={0}
              y={0}
              points={line}
              // tension={0.5}
              closed
              stroke="black"
              strokeWidth={0.1}
              // fillLinearGradientStartPoint={{ x: -50, y: -50 }}
              // fillLinearGradientEndPoint={{ x: 50, y: 50 }}
              // fillLinearGradientColorStopshttps://dl6.downloadha.com/hosein/animation/November2021/Arcane.S01/720p.x264/Arcane.S01E03.720p.WEBRip.x264-DLHA_www.Downloadha.com_.mkv={[0, "red", 1, "yellow"]}
            />
          ))}
          {lines.map((line: any, i: number) => (
            <>
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={2}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
              <Circle
                x={line.points[0]}
                y={line.points[1]}
                radius={50}
                fill="black"
                width={5}
                height={5}
              />
            </>
          ))}
          <Circle
            x={helperPoint.x}
            y={helperPoint.y}
            radius={50}
            fill="green"
            width={5}
            height={5}
          />
        </Layer>
      </Stage>
    </Container>
  );
};

export default DrawCanvas;
