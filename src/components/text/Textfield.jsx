import React, { useEffect } from "react";
import { Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

function Textfield({ textfield, onSelect, isSelected, onDragMove }) {
  const transformerref = React.useRef();
  const textRef = React.useRef();
  const inputRef = React.useRef();
  const [text, setText] = React.useState(textfield.text);
  const [isEditing, setIsEditing] = React.useState(false);
  useEffect(() => {
    if (isSelected) {
      transformerref.current.nodes([textRef.current]);
    }
  }, [isSelected]);

  const handleDoubleClick = () => {
    if (!isEditing) {
      setIsEditing({ isEditing: true });
    }
  };

  return (
    <>
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
          onClick={onSelect}
          onDblClick={handleDoubleClick}
          onDblTap={handleDoubleClick}
          onDragMove={onDragMove}
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
          {console.log("input text")}
          <input
            ref={inputRef}
            className="bg-transparent border-none outline-none text-white text-[21px] font-Poppins"
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
            }}
            placeholder="Enter text here..."
            // value={text}
            autoFocus
          />
        </Html>
      )}
    </>
  );
}

export default Textfield;
