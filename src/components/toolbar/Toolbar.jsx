import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTool } from "../../features/toolbarSlice";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import "./toolbar.css";
import { setSelectId } from "../../features/selectShapeSlice";

function Toolbar() {
  const dispatch = useDispatch();
  const { toolType } = useSelector((state) => state.toolbar);
  const { selectId } = useSelector((state) => state.selectShape);

  return (
    <div className="absolute left-1/2 bottom-5 bg-neutral-800 flex gap-4 p-2 text-white z-50 rounded-lg -translate-x-1/2 toolbar">
      <div
        className={`selectAll  p-2 rounded-lg ${
          toolType === "SELECT" ? "bg-sky-600" : ""
        }`}
        onClick={() => {
          dispatch(selectTool("SELECT"));
          dispatch(setSelectId({ selectId: "" }));
        }}
      >
        <HighlightAltIcon />
      </div>
      <div
        className={`rectangle p-2 rounded-lg ${
          toolType === "RECTANGLE" ? "bg-sky-600" : ""
        }`}
        onClick={() => {
          dispatch(selectTool("RECTANGLE"));
          dispatch(setSelectId({ selectId: "" }));
        }}
      >
        <CheckBoxOutlineBlankIcon />
      </div>
      <div
        className={`circle p-2 rounded-lg ${
          toolType === "CIRCLE" ? "bg-sky-600" : ""
        }`}
        onClick={() => {
          dispatch(selectTool("CIRCLE"));
          dispatch(setSelectId({ selectId: "" }));
        }}
      >
        <CircleOutlinedIcon />
      </div>
      <div
        className={`arrow p-2 rounded-lg  ${
          toolType === "ARROW" ? "bg-sky-600" : ""
        }`}
        onClick={() => {
          dispatch(selectTool("ARROW"));
          dispatch(setSelectId({ selectId: "" }));
        }}
      >
        <ArrowRightAltOutlinedIcon />
      </div>
      <div
        className={`pencil p-2 rounded-lg  ${
          toolType === "PENCIL" ? "bg-sky-600" : ""
        }`}
        onClick={() => {
          dispatch(selectTool("PENCIL"));
          dispatch(setSelectId({ selectId: "" }));
        }}
      >
        <CreateOutlinedIcon />
      </div>
      <div
        className={`text p-2 rounded-lg ${
          toolType === "TEXT" ? "bg-sky-600" : ""
        }`}
        onClick={() => {
          dispatch(selectTool("TEXT"));
          dispatch(setSelectId({ selectId: "" }));
        }}
      >
        <TextFieldsIcon />
      </div>
    </div>
  );
}

export default Toolbar;
