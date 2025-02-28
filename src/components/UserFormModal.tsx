import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { User } from "../util/types";
import { Person, Email, Image, Close } from "@mui/icons-material";

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (userData: Partial<User>) => void;
  initialData?: User | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<User>>({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ first_name: "", last_name: "", email: "", avatar: "" });
    }
    setErrors({ first_name: "", last_name: "", email: "", avatar: "" });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = { first_name: "", last_name: "", email: "", avatar: "" };
    let isValid = true;

    if (!formData.first_name?.trim()) {
      newErrors.first_name = "First Name is required";
      isValid = false;
    }
    if (!formData.last_name?.trim()) {
      newErrors.last_name = "Last Name is required";
      isValid = false;
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }
    if (!formData.avatar?.trim()) {
      newErrors.avatar = "Profile image link is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setSaving(true);
      await onSave(formData);
      setSaving(false);
      setFormData({ first_name: "", last_name: "", email: "", avatar: "" });
      onClose();
    }
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">
            {initialData ? "Edit User" : "Add User"}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          label={"First Name"}
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          margin="normal"
          error={!!errors.first_name}
          helperText={errors.first_name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label={"Last Name"}
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          margin="normal"
          error={!!errors.last_name}
          helperText={errors.last_name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label={"Email"}
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label={"Profile Image Link"}
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          margin="normal"
          error={!!errors.avatar}
          helperText={errors.avatar}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Image />
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            loading={saving}
            variant="outlined"
            loadingPosition="end"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserFormModal;
