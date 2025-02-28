import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Toc, TableView } from "@mui/icons-material";

interface ViewToggleProps {
  view: "list" | "card";
  setView: (value: "list" | "card") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(e, newView) => newView && setView(newView)}
      sx={{
        "& .MuiToggleButton-root": {
          color: "black", // Default text color
          backgroundColor: "white",
          borderColor: "#ccc",
        },
        "& .MuiToggleButton-root.Mui-selected": {
          color: "white", // Active text color
          backgroundColor: "#1976d2", // Active background color (Material-UI primary color)
          borderColor: "#1976d2",
        },
      }}
    >
      <ToggleButton value="list">
        <TableView />
        Table
      </ToggleButton>
      <ToggleButton value="card">
        <Toc />
        Card
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggle;
