// TableComponent.js
import React, { useState, useEffect } from "react";
import "./phome.css";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import config from "../config.json";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  IconButton,
  TablePagination,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Container,
  useMediaQuery,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
const TableComponent = () => {
  const [data, setData] = useState([]);
  const url = config.url;
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedRecord, setEditedRecord] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    image: "",
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [recordToDeleteIndex, setRecordToDeleteIndex] = useState(null);

  const [newRecord, setNewRecord] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    image: "",
  });

  const handleAddClick = () => {
    setShowAddDialog(true);
  };
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");

  const access = {
    headers: {
      autherization: access_token,
    },
  };

  useEffect(() => {
    // Fetch posts from the server
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${url}/user/list_profile`, access);
      console.log(response);
      setData(response.data.responseData);
    } catch (error) {
      console.error("Error fetching method:", error);
    }
  };
  const [image, setImage] = useState("");
  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  var bodyFormData = new FormData();
  bodyFormData.append("first_name", newRecord.first_name);
  bodyFormData.append("last_name", newRecord.last_name);
  bodyFormData.append("email", newRecord.email);
  bodyFormData.append("phone", newRecord.phone);
  bodyFormData.append("image", newRecord.image);

  const handleAddRecord = async (event) => {
    event.preventDefault();
    try {
      const response1 = await axios.post(
        `${url}/user/add_profile`,
        bodyFormData,
        access
      );
      console.log(response1);
      if (response1.data.responseCode === 200) {
        setNewRecord({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          image: "",
        });
        fetchPosts();
      }
    } catch (error) {
      console.error("Error fetching method:", error);
    }
  };

  //   setData((prevData) => [...prevData, { ...newRecord, id: uuidv4() }]);
  //   setNewRecord({ fname: "", lname: "", email: "", phone: "", image: "" });
  //   setShowAddDialog(false);
  //   try {
  //     const response = await axios.post(
  //       "https://3d81-103-141-112-27.ngrok-free.app/api/user/add_profile",
  //       newRecord,
  //       {
  //         headers: { autherization: ` ${access_token}` },
  //       }
  //     );
  //     if (response.status === 201) {
  //       setNewRecord({ fname: "", lname: "", email: "", phone: "", image: "" });
  //       fetchPosts();
  //     }
  //   } catch (error) {
  //     console.error("Error :", error);
  //   }

  const [page, setPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleEditClick = (index) => {
    const recordToEdit = data[index];
    setEditedRecord({ ...recordToEdit });
    setShowEditDialog(true);
  };

  const handleUpdateRecord = async (event,id) => {
    event.preventDefault();
    // setData((prevData) => {
    //   const updatedData = [...prevData];
    //   const index = prevData.findIndex(
    //     (record) => record.first_name === editedRecord.first_name
    //   );
    //   updatedData[index] = editedRecord;
    //   return updatedData;
    // });
    // setEditedRecord({ fname: "", lname: "", email: "", phone: "", image: "" });
    // setShowEditDialog(false);
    try {
      const response3 = await axios.put(
        `${url}/user/update_profile/63ecabf109101356a91f96e2${id}`,
       
        access
      );
      console.log(response3);
      if (response3.data.responseCode === 200) {
        setEditedRecord({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          image: "",
        });
        fetchPosts();
      }
    } catch (error) {
      console.error("Error fetching method:", error);
    }
  };

  const handleDeleteClick = (index) => {
    setRecordToDeleteIndex(index);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async (id) => {
    // setData((prevData) => {
    //   const updatedData = prevData.filter(
    //     (_, index) => index !== recordToDeleteIndex
    //   );
    //   return updatedData;
    // });
    setShowDeleteDialog(false);
    try {
      const response2 = await axios.delete(
        `${url}/user/delete_profile/637372d3fe64f3e17202f272/${id}`,
        access
      );
      console.log(response2);
      if (response2.data.responseCode === 200) {
        setData((prevData) =>
          prevData.filter((_, index) => index !== recordToDeleteIndex)
        );
        fetchPosts();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  const [validationErrors, setValidationErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    image: "",
  });

  const isEmailValid = (email) => {
    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const isFname = (first_name) => {
    const fnamePattern = /^[A-Za-z]{2,20}$/;
    return fnamePattern.test(first_name);
  };
  const isLname = (last_name) => {
    const lnamePattern = /^[A-Za-z]{2,20}$/;
    return lnamePattern.test(last_name);
  };
  const isphone = (phone) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  return (
    <div style={{ overflowX: isMobileView ? "auto" : "hidden" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <IconButton color="primary" onClick={handleAddClick}>
          <Add />
        </IconButton>
      </Toolbar>
      <Table>
        <TableHead sx={{}}>
          <TableRow>
            <TableCell style={{ borderBottom: "1px solid black" }}>
              First Name
            </TableCell>
            <TableCell style={{ borderBottom: "1px solid black" }}>
              Last Name
            </TableCell>
            <TableCell style={{ borderBottom: "1px solid black" }}>
              Email
            </TableCell>
            <TableCell style={{ borderBottom: "1px solid black" }}>
              Phone
            </TableCell>
            <TableCell style={{ borderBottom: "1px solid black" }}>
              Image
            </TableCell>
            <TableCell
              style={{
                borderBottom: "1px solid black",
                padding: "20px",
                marginLeft: "10px",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((record, index) => (
              <TableRow key={index}>
                <TableCell style={{ borderBottom: "1px solid black" }}>
                  {record.first_name}
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid black" }}>
                  {record.last_name}
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid black" }}>
                  {record.email}
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid black" }}>
                  {record.phone}
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid black" }}>
                  <img src={record.image} style={{ maxWidth: "50px" }} />
                </TableCell>
                <TableCell
                  style={{ borderBottom: "1px solid black", padding: "10px" }}
                >
                  {/* Edit Icon */}
                  <IconButton
                    sx={{ p: "1" }}
                    color="primary"
                    onClick={() => handleEditClick(index)}
                  >
                    <Edit />
                  </IconButton>

                  {/* Delete Icon */}
                  <IconButton
                    sx={{ m: "1" }}
                    color="secondary"
                    onClick={() => handleDeleteClick(index)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
   
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}

        // rowsPerPageOptions={[5, 10, 25]}
        // component="div"
        // count={rows.length}
        // rowsPerPage={rowsPerPage}
        // page={page}
        // onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <DialogTitle>Add New Record</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "Grid",
              flexDirection: "column",
              m: 1,
              width: "40ch",
              gap: 4,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="First Name"
              type="text"
              value={newRecord.first_name}
              onChange={(e) =>
                setNewRecord((prevRecord) => ({
                  ...prevRecord,
                  first_name: e.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="Last Name"
              type="text"
              value={newRecord.last_name}
              onChange={(e) =>
                setNewRecord((prevRecord) => ({
                  ...prevRecord,
                  last_name: e.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={newRecord.email}
              onChange={(e) =>
                setNewRecord((prevRecord) => ({
                  ...prevRecord,
                  email: e.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="phone"
              type="number"
              value={newRecord.phone}
              onChange={(e) =>
                setNewRecord((prevRecord) => ({
                  ...prevRecord,
                  phone: e.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="Image"
              type="file"
              value={newRecord.image}
              // onChange={(e) =>
              //   setNewRecord((prevRecord) => ({
              //     ...prevRecord,
              //     image: e.target.value,
              //   }))
              // }
              onChange={handleImage}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddRecord} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "Grid",
              flexDirection: "column",
              m: 1,
              width: "40ch",
              gap: 4,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="First Name"
              type="text"
              value={editedRecord.fname}
              onChange={(e) =>
                setEditedRecord((prevRecord) => ({
                  ...prevRecord,
                  fname: e.target.value,
                }))
              }
              fullWidth
            />

            <TextField
              label="Last Name"
              type="text"
              value={editedRecord.lname}
              onChange={(e) =>
                setEditedRecord((prevRecord) => ({
                  ...prevRecord,
                  lname: e.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={editedRecord.email}
              onChange={(e) =>
                setEditedRecord((prevRecord) => ({
                  ...prevRecord,
                  email: e.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="Phone"
              type="number"
              value={editedRecord.phone}
              onChange={(e) =>
                setEditedRecord((prevRecord) => ({
                  ...prevRecord,
                  phone: e.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="Image"
              // type="file"
              value={editedRecord.image}
              onChange={(e) =>
                setEditedRecord((prevRecord) => ({
                  ...prevRecord,
                  image: e.target.value,
                }))
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateRecord} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default TableComponent;
