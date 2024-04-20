import React, { useEffect } from "react";
import { Layer, Rect, Stage, Transformer } from "react-konva";
import { ACTIONS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectTool } from "../../features/toolbarSlice";
import Rectangle from "../rectangle/Rectangle.jsx";

function Board() {
  const { toolType } = useSelector((state) => state.toolbar);
  const dispatch = useDispatch();
  const [rectangles, setRectangles] = React.useState([]);
  const [selectId, setSelectId] = React.useState("");
  const stageRef = React.useRef(null);
  const painting = React.useRef(false);

  let strokeColor = "yellow";

  const checkDeselect = (e) => {
    const clickOnEmpty = e.target === e.target.getStage();
    if(clickOnEmpty) {
      setSelectId("");
    }
  }

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
          fillColor: "seagreen",
        },
      ]);
    }
  };
  const onMouseMove = () => {
    if (!painting.current) return;
    const { x, y } = stageRef.current.getPointerPosition();
    if (toolType === ACTIONS.RECTANGLE) {
      const index = rectangles.length - 1;
      setRectangles((rectangles) =>
        rectangles.map((rectangle, i) => {
          if (i === index) {
            rectangle.width = x - rectangle.x;
            rectangle.height = y - rectangle.y;
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
        {rectangles.map(
          (rectangle, i) => (
            console.log(rectangle.id),
            (
              <Rectangle
                key={i}
                rectangle={rectangle}
                onSelect={() => {
                  setSelectId(rectangle.id);
                  dispatch(selectTool(ACTIONS.SELECT));
                }}
                strokeColor={strokeColor}
                isSelected={selectId === rectangle.id}
              />
            )
          )
        )}
      </Layer>
    </Stage>
  );
}

export default Board;
