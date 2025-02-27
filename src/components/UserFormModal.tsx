import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { User } from "../util/types";

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (userData: Partial<User>) => void;
  initalData?: User | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  onClose,
  onSave,
  initalData,
}) => {
  const [formData, setFormData] = useState<Partial<User>>({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (initalData) {
      setFormData(initalData);
    } else {
      setFormData({ first_name: "", last_name: "", email: "" });
    }
  }, [initalData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {initalData ? "Edit User" : "Add User"}
        </Typography>
        <TextField
          fullWidth
          label={"First Name"}
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label={"Last Name"}
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label={"Email"}
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          fullWidth
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default UserFormModal;
