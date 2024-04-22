import React, { useEffect } from "react";
import { Layer, Stage, Text, Transformer } from "react-konva";
import { ACTIONS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectTool } from "../../features/toolbarSlice";
import Rectangle from "../rectangle/Rectangle.jsx";
import { setSelectId } from "../../features/selectShapeSlice.js";
import { Html } from "react-konva-utils";
// import Textfield from "../text/Textfield.jsx";

function Board() {
  const { toolType } = useSelector((state) => state.toolbar);
  const { selectId } = useSelector((state) => state.selectShape);
  const { borderColor, fillColor } = useSelector((state) => state.color);
  const [isSelected, setIsSelected] = React.useState(false);
  const dispatch = useDispatch();
  const [rectangles, setRectangles] = React.useState([]);
  const [texts, setTexts] = React.useState([]);
  const [holdShift, setHoldShift] = React.useState(false);
  const stageRef = React.useRef(null);
  const painting = React.useRef(false);
  const transformerref = React.useRef();
  const textRef = React.useRef();
  const inputRef = React.useRef();
  const [text, setText] = React.useState("Hii");
  const [isEditing, setIsEditing] = React.useState(false);

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
      setIsSelected(false);
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
        setIsEditing(true);
        console.log(isEditing);
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
    }
  };

  const onMouseMove = (e) => {
    if (!painting.current) return;
    const { x, y } = stageRef.current.getPointerPosition();
    switch (toolType) {
      case ACTIONS.RECTANGLE:
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
  };
  const onMouseUp = (e) => {
    if (toolType === ACTIONS.TEXT && isEditing) return;
    painting.current = false;
    dispatch(selectTool(ACTIONS.SELECT));
  };

  useEffect(() => {
    if (isSelected) {
      transformerref.current.nodes([textRef.current]);
    }
  }, [isSelected]);

  const handleDoubleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
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
          // <Textfield
          //   key={i}
          //   textfield={textfield}
          //   onSelect={() => {
          //     dispatch(setSelectId({ selectId: textfield.id }));
          //     dispatch(selectTool(ACTIONS.SELECT));
          //   }}
          //   isSelected={selectId === textfield.id}
          //   onDragMove={(e) => {
          //     console.log(e.target.x(), e.target.y());
          //   }}
          // />

          <React.Fragment key={i}>
            {console.log(isEditing)}
            {!isEditing && (
              <Text
                ref={textRef}
                x={textfield.x}
                y={textfield.y}
                text={text}
                fontSize={textfield.fontSize}
                fontFamily={textfield.fontFamily}
                fill={textfield.fill}
                draggable="true"
                onClick={() => {
                  dispatch(setSelectId({ selectId: textfield.id }));
                  dispatch(selectTool(ACTIONS.SELECT));
                  setIsSelected(true);
                }}
                onDblClick={handleDoubleClick}
                onDblTap={handleDoubleClick}
                onDragMove={(e) => {
                  console.log(e.target.x(), e.target.y());
                }}
              />
            )}
            {isSelected && !isEditing && <Transformer ref={transformerref} />}
            {isEditing && (
              <Html
                divProps={{
                  style: {
                    position: "absolute",
                    top: textfield.y + "px",
                    left: textfield.x + "px",
                    width: "0px",
                    zIndex: "9999",
                  },
                }}
              >
                <input
                  ref={inputRef}
                  className="bg-transparent border-none outline-none text-white text-[21px] font-Poppins"
                  onChange={(e) => setText(e.target.value)}
                  onBlur={() => {
                    setIsEditing(false);
                  }}
                  placeholder="Enter text here..."
                  value={text}
                  autoFocus
                />
              </Html>
            )}
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
}

export default Board;
