import React, { useEffect } from "react";
import { Arrow, Transformer } from "react-konva";

function ArrowShape({
  arrow,
  onSelect,
  strokeColor,
  isSelected,
  fillColor,
  onDragMove,
}) {
  const transformerref = React.useRef();
  const arrowRef = React.useRef();
  useEffect(() => {
    if (isSelected) {
      transformerref.current.nodes([arrowRef.current]);
    }
  }, [isSelected]);
  return (
    <>
      <Arrow
      ref={arrowRef}
        x={arrow.x}
        y={arrow.y}
        points={arrow.points}
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth={arrow.strokeWidth}
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

export default ArrowShape;
