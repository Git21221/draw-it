import React, { useDebugValue, useEffect } from "react";
import { Ellipse, Transformer } from "react-konva";

function CircleShape({
  circle,
  onSelect,
  strokeColor,
  isSelected,
  fillColor,
  onDragMove,
}) {
  const transformerref = React.useRef();
  const ellipseRef = React.useRef();
  useEffect(() => {
    if(isSelected){
      transformerref.current.nodes([ellipseRef.current]);
    }
  }, [isSelected]);
  return (
    <>
    <Ellipse
    ref={ellipseRef}
      x={circle.x}
      y={circle.y}
      radiusX={circle.radiusX}
      radiusY={circle.radiusY}
      stroke={strokeColor}
      fill={fillColor}
      strokeWidth={circle.strokeWidth}
      draggable="true"
      onClick={onSelect}
      onTap={onSelect}
      onMouseUp={onSelect}
      onTouchEnd={onSelect}
      onDragMove={onDragMove}
    />
    {isSelected && <Transformer ref={transformerref}/>}
    </>
  );
}

export default CircleShape;
