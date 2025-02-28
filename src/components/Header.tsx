import React from "react";
import { Button } from "@mui/material";
import { PowerSettingsNew } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const userName = useSelector((state: RootState) => state.userAuth.userName);
  return (
    <header className="flex items-center justify-end h-16 text-[15px] fixed inset-0 flex-center bg-[#041527] z-[999]">
      <nav className="flex items-center justify-evenly mr-4">
        <h1 className="text-lg font-semibold text-white mr-4">
          Welcome, {userName || "Guest"}!
        </h1>
        <Button
          variant="contained"
          onClick={onLogout}
          sx={{ backgroundColor: "#ec5b56" }}
        >
          <PowerSettingsNew />
        </Button>
      </nav>
    </header>
  );
};

export default Header;
