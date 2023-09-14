import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function AddModal({ open, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    population: "",
    size: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClick = () => {
    if (
      formData.name !== "" &&
      formData.code !== "" &&
      formData.population !== "" &&
      formData.size !== ""
    ) {
      onAdd(formData);
      onClose(); // Close the modal after adding
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        style={{
          display: "flex",
          color: "white",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        Add Item
      </DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          fullWidth
          value={formData.name}
          onChange={handleInputChange}
          style={{ marginBottom: "16px", marginTop: "10px", color: "black" }}
        />
        <TextField
          name="code"
          label="ISO Code"
          fullWidth
          value={formData.code}
          onChange={handleInputChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="population"
          label="Population"
          fullWidth
          type="number"
          value={formData.population}
          onChange={handleInputChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          name="size"
          label="Size (km²)"
          fullWidth
          type="number"
          value={formData.size}
          onChange={handleInputChange}
          style={{ marginBottom: "16px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddClick} color="secondary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
