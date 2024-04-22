import React, { useEffect } from "react";
import { Rect, Transformer } from "react-konva";
import { useSelector } from "react-redux";

function Rectangle({
  rectangle,
  onSelect,
  strokeColor,
  isSelected,
  fillColor,
  onDragMove,
}) {
  const {strokeWidth} = useSelector((state) => state.strokeWidth);
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
        // cornerRadius={20}
        x={rectangle.x}
        y={rectangle.y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fillColor}
        height={rectangle.height}
        width={rectangle.width}
        draggable="true"
        onClick={onSelect}
        onTap={onSelect}
        onMouseUp={onSelect}
        onTouchEnd={onSelect}
        onDragMove={onDragMove}
      />
      {isSelected && <Transformer ref={transformerref} />}
    </>
  );
}

export default Rectangle;
