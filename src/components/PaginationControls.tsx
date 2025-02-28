import React from "react";
import { Pagination } from "@mui/material";

interface PaginationControlsProps {
  page: number;
  setPage: (value: number) => void;
  totalPageCount: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  setPage,
  totalPageCount,
}) => {
  return (
    <Pagination
      count={totalPageCount}
      page={page}
      onChange={(e, value) => setPage(value)}
      sx={{ mt: 2 }}
    />
  );
};

export default PaginationControls;
