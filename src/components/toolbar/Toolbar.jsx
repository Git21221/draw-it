import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTool } from "../../features/toolbarSlice";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import "./toolbar.css";

function Toolbar() {
  const dispatch = useDispatch();
  const { toolType } = useSelector((state) => state.toolbar);
  
  return (
    <div className="absolute left-1/2 bottom-5 bg-neutral-700 flex gap-4 p-2 text-white z-50 rounded-lg -translate-x-1/2 toolbar">
      <div
        className={`selectAll  p-2 rounded-lg ${
          toolType === "SELECT" ? "bg-sky-600" : ""
        }`}
        onClick={() => {
          dispatch(selectTool("SELECT"));
        }}
      >
        <HighlightAltIcon />
      </div>
      <div
        className={`rectangle p-2 rounded-lg ${
          toolType === "RECTANGLE" ? "bg-sky-600" : ""
        }`}
        onClick={() => dispatch(selectTool("RECTANGLE"))}
      >
        <CheckBoxOutlineBlankIcon />
      </div>
      <div
        className={`circle p-2 rounded-lg ${
          toolType === "CIRCLE" ? "bg-sky-600" : ""
        }`}
        onClick={() => dispatch(selectTool("CIRCLE"))}
      >
        <CircleOutlinedIcon />
      </div>
      <div
        className={`arrow p-2 rounded-lg  ${
          toolType === "ARROW" ? "bg-sky-600" : ""
        }`}
        onClick={() => dispatch(selectTool("ARROW"))}
      >
        <ArrowRightAltOutlinedIcon />
      </div>
      <div
        className={`pencil p-2 rounded-lg  ${
          toolType === "PENCIL" ? "bg-sky-600" : ""
        }`}
        onClick={() => dispatch(selectTool("PENCIL"))}
      >
        <CreateOutlinedIcon />
      </div>
    </div>
  );
}

export default Toolbar;
