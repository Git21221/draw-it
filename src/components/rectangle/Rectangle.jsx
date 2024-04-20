import React, { useEffect } from "react";
import { Rect, Transformer } from "react-konva";

function Rectangle({ rectangle, handleSelect, strokeColor, isSelected }) {
  const transformerref = React.useRef();
  const rectRef = React.useRef();
  console.log(isSelected);
  useEffect(() => {
    if (isSelected) {
      transformerref.current.nodes([rectRef.current]);
      transformerref.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        ref={rectRef}
        x={rectangle.x}
        y={rectangle.y}
        stroke={strokeColor}
        strokeWidth={10}
        fill={rectangle.fillColor}
        height={rectangle.height}
        width={rectangle.width}
        draggable="true"
        onClick={handleSelect}
        onTap={handleSelect}
      />
      {isSelected && <Transformer ref={transformerref} />}
    </>
  );
}

export default Rectangle;
