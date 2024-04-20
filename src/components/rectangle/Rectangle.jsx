import React, { useEffect } from "react";
import { Rect, Transformer } from "react-konva";

function Rectangle({ rectangle, onSelect, strokeColor, isSelected }) {
  const transformerref = React.useRef();
  const rectRef = React.useRef();
  useEffect(() => {
    if (isSelected) {
      transformerref.current.nodes([rectRef.current]);
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
        onClick={onSelect}
        onTap={onSelect}
        onMouseUp={onSelect}
        onTouchEnd={onSelect}
      />
      {isSelected && <Transformer ref={transformerref} />}
    </>
  );
}

export default Rectangle;
