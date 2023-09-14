import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function EditModal({
  open,
  onClose,
  onEdit,
  selectedRowData,

}) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    population: "",
    size: "",
  });

  useEffect(() => {
    if (selectedRowData) {
      setFormData({ ...selectedRowData });
    }
  }, [selectedRowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    if (
      formData.name !== "" &&
      formData.code !== "" &&
      formData.population !== "" &&
      formData.size !== ""
    ) {
      onEdit(formData);
      onClose(); 
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
       <DialogTitle style={{display:"flex",  color: "white",
      justifyContent:"center",  marginBottom: "16px" }}>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          fullWidth
          value={formData.name}
          onChange={handleInputChange}
          style={{ marginBottom: "16px",marginTop:"10px" ,color:"black"}}
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
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleEditClick} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
