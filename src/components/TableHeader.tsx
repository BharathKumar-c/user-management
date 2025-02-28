import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderProps {
  title: string;
  search: string;
  setSearch: (value: string) => void;
  onOpenModal: () => void;
}

const TableHeader: React.FC<HeaderProps> = ({
  title,
  search,
  setSearch,
  onOpenModal,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h5">{title}</Typography>
      <Box display="flex" alignItems="center">
        <TextField
          variant="outlined"
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ mr: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={onOpenModal}>
          Create User
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
