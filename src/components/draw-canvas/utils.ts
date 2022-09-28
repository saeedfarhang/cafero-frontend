export const checkeredBoardLines = (
  width: number,
  height: number,
  pixel: number
) => {
  let lines = [];

  for (let i = pixel; i < width; i += pixel) {
    lines.push([i, 0, i, height]);
  }
  for (let i = pixel; i < height; i += pixel) {
    lines.push([0, i, width, i]);
  }

  return lines;
};

export const roundBasePoint = (point: number, pixel: number) => {
  return Math.round(point / pixel) * pixel;
};
