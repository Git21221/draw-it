import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../features/colorSlice";
import { setStrokeWidth } from "../../features/strokeWidthSlice";
import { setCornerRadius } from "../../features/cornerRadiusSlice";

function Controlbar() {
  const dispatch = useDispatch();
  const { borderColor, fillColor } = useSelector((state) => state.color);
  const { selectId } = useSelector((state) => state.selectShape);
  const { strokeWidth } = useSelector((state) => state.strokeWidth);
  const {cornerRadius} = useSelector((state) => state.cornerRadius);
  const handleColorChange = (e) => {
    dispatch(setColor({ borderColor: e.target.value, fillColor }));
  };
  const handleFillColorChange = (e) => {
    dispatch(setColor({ borderColor, fillColor: e.target.value }));
  };

  const handleStrokeWidthChange = (e) => {
    dispatch(setStrokeWidth({ strokeWidth: e.target.value }));
  };
  const handleRadiusChange = (e) => {
    dispatch(setCornerRadius({cornerRadius: e.target.value}));
  }
  return (
    selectId && (
      <div className="absolute top-1/2 text-white left-5 bg-neutral-800 p-2 rounded-md flex flex-col gap-4">
        <div className="borderColor">
          <p>Stroke</p>
          <input
            type="color"
            onChange={handleColorChange}
            defaultValue={borderColor}
          />
        </div>
        <div className="fillColor">
          <p>Background</p>
          <input
            type="color"
            onChange={handleFillColorChange}
            defaultValue={fillColor}
          />
        </div>
        <div className="strokeWidth">
          <p>Stroke width</p>
          <input
            type="range"
            onChange={handleStrokeWidthChange}
            max={10}
            min={1}
            value={strokeWidth}
          />
        </div>
        <div className="radius">
          <p>Corner radius</p>
          <input type="range" max={20} min={0} defaultValue={cornerRadius} onChange={handleRadiusChange}/>
        </div>
      </div>
    )
  );
}

export default Controlbar;
