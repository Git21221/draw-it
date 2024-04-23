import React, { useEffect } from "react";
import { Layer, Line, Stage, Text, Transformer } from "react-konva";
import { ACTIONS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectTool } from "../../features/toolbarSlice";
import Rectangle from "../rectangle/Rectangle.jsx";
import { setSelectId } from "../../features/selectShapeSlice.js";
import { Html } from "react-konva-utils";
import Textfield from "../text/Textfield.jsx";
import CircleShape from "../circle/CircleShape.jsx";
import ArrowShape from "../arrow/ArrowShape.jsx";

function Board() {
  const { toolType } = useSelector((state) => state.toolbar);
  const { selectId } = useSelector((state) => state.selectShape);
  const { borderColor, fillColor } = useSelector((state) => state.color);
  const dispatch = useDispatch();
  const [rectangles, setRectangles] = React.useState([]);
  const [circles, setCircles] = React.useState([]);
  const [arrows, setArrows] = React.useState([]);
  const [texts, setTexts] = React.useState([]);
  const [freeDraw, setFreeDraw] = React.useState([]);
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
      if (e.key === "Shift") {
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
    switch (toolType) {
      case ACTIONS.RECTANGLE:
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
        break;
      case ACTIONS.TEXT:
        setTexts((texts) => [
          ...texts,
          {
            id: texts.length + 1,
            x,
            y,
            text: "Double click to edit",
            fontSize: 20,
            fill: "white",
            fontFamily: "Poppins",
          },
        ]);
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) => [
          ...circles,
          {
            id: circles.length + 1,
            x,
            y,
            radiusX: 0,
            radiusY: 0,
            strokeWidth: 2,
          },
        ]);
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) => [
          ...arrows,
          {
            id: arrows.length + 1,
            x,
            y,
            points: [0, 0, 0, 0],
            pointerLength: 10,
            pointerWidth: 10,
            fill: "black",
            stroke: "white",
            strokeWidth: 2,
          },
        ]);
    }
  };

  const onMouseMove = (e) => {
    if (!painting.current) return;
    const { x, y } = stageRef.current.getPointerPosition();
    switch (toolType) {
      case ACTIONS.RECTANGLE: {
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
        break;
      }
      case ACTIONS.CIRCLE: {
        const index = circles.length - 1;
        setCircles((circles) =>
          circles.map((circle, i) => {
            if (i === index) {
              if (holdShift || e.touches) {
                circle.radiusX = x - circle.x;
                circle.radiusY = x - circle.x;
              } else {
                circle.radiusX = x - circle.x;
                circle.radiusY = y - circle.y;
              }
            }
            return circle;
          })
        );
        break;
      }
      case ACTIONS.ARROW: {
        const index = arrows.length - 1;
        setArrows((arrows) =>
          arrows.map((arrow, i) => {
            if (i === index) {
              const updatedPoints = [...arrow.points];
              updatedPoints[2] = x - arrow.x;
              updatedPoints[3] = y - arrow.y;
              return { ...arrow, points: updatedPoints };
            }
            return arrow;
          })
        );
        break;
      }
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
        {/* for rectangles */}
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
        {/* for text */}
        {texts.map((textfield, i) => (
          <Textfield
            key={i}
            textfield={textfield}
            onSelect={() => {
              dispatch(setSelectId({ selectId: textfield.id }));
              dispatch(selectTool(ACTIONS.SELECT));
            }}
            isSelected={selectId === textfield.id}
            onDragMove={(e) => {
              console.log(e.target.x(), e.target.y());
            }}
          />
        ))}
        {/* for circles */}
        {circles.map(
          (circle, i) => (
            console.log(circle),
            (
              <CircleShape
                key={i}
                circle={circle}
                isSelected={selectId === circle.id}
                onSelect={() => {
                  dispatch(setSelectId({ selectId: circle.id }));
                  dispatch(selectTool(ACTIONS.SELECT));
                }}
                strokeColor={strokeColor}
                fillColor={fillColor}
                onDragMove={(e) => {
                  console.log(e.target.x(), e.target.y());
                }}
              />
            )
          )
        )}
        {/* for arrows */}
        {arrows.map((arrow, i) => (
          <ArrowShape
            key={i}
            arrow={arrow}
            onSelect={() => {
              dispatch(setSelectId({ selectId: arrow.id }));
              dispatch(selectTool(ACTIONS.SELECT));
            }}
            isSelected={selectId === arrow.id}
            strokeColor={strokeColor}
            fillColor={fillColor}
            onDragMove={(e) => {
              console.log(e.target.x(), e.target.y());
            }}
          />
        ))}
        {/* for free drawing */}
        {freeDraw.map((line, i) => (
          <Line
            key={i}
            points={line}
            stroke={strokeColor}
            strokeWidth={2}
            tension={0.5}
            lineCap="round"
            globalCompositeOperation={
              selectId === "freeDraw" ? "source-over" : "destination-over"
            }
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default Board;
