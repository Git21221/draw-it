import React, { useEffect } from "react";
import { Layer, Rect, Stage, Transformer } from "react-konva";
import { ACTIONS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectTool } from "../../features/toolbarSlice";
import Rectangle from "../rectangle/Rectangle.jsx";
import { setSelectId } from "../../features/selectShapeSlice.js";

function Board() {
  const { toolType } = useSelector((state) => state.toolbar);
  const { selectId } = useSelector((state) => state.selectShape);
  const { borderColor, fillColor } = useSelector((state) => state.color);
  const dispatch = useDispatch();
  const [rectangles, setRectangles] = React.useState([]);
  const [holdShift, setHoldShift] = React.useState(false);
  const stageRef = React.useRef(null);
  const painting = React.useRef(false);

  let strokeColor = borderColor;

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.shiftKey) {
        setHoldShift(true);
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.shiftKey) {
        setHoldShift(false);
      }
    });
  }, []);

  const checkDeselect = (e) => {
    const clickOnEmpty = e.target === e.target.getStage();
    if (clickOnEmpty) {
      dispatch(setSelectId({ selectId: "" }));
    }
  };

  const onMouseDown = () => {
    const { x, y } = stageRef.current.getPointerPosition();
    painting.current = true;
    if (toolType === ACTIONS.RECTANGLE) {
      setRectangles((rectangles) => [
        ...rectangles,
        {
          id: rectangles.length + 1,
          x,
          y,
          width: 0,
          height: 0,
        },
      ]);
    }
  };

  const onMouseMove = (e) => {
    if (!painting.current) return;
    const { x, y } = stageRef.current.getPointerPosition();
    if (toolType === ACTIONS.RECTANGLE) {
      const index = rectangles.length - 1;
      setRectangles((rectangles) =>
        rectangles.map((rectangle, i) => {
          if (i === index) {
            if (holdShift || e.touches) {
              rectangle.width = x - rectangle.x;
              rectangle.height = x - rectangle.x;
            } else {
              rectangle.width = x - rectangle.x;
              rectangle.height = y - rectangle.y;
            }
          }
          return rectangle;
        })
      );
    }
  };
  const onMouseUp = (e) => {
    painting.current = false;
    dispatch(selectTool(ACTIONS.SELECT));
  };
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      ref={stageRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchMove={onMouseMove}
      onTouchEnd={onMouseUp}
      onClick={checkDeselect}
      onTap={checkDeselect}
    >
      <Layer>
        {rectangles.map((rectangle, i) => (
          <Rectangle
            key={i}
            rectangle={rectangle}
            isSelected={selectId === rectangle.id}
            onSelect={() => {
              dispatch(setSelectId({ selectId: rectangle.id }));
              dispatch(selectTool(ACTIONS.SELECT));
            }}
            strokeColor={strokeColor}
            fillColor={fillColor}
            onDragMove={(e) => {
              console.log(e.target.x(), e.target.y());
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default Board;
