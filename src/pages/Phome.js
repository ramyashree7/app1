import React, { useState, useEffect } from "react";
import "./phome.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import config from "../config.json";
import { toast,ToastContainer} from "react-toastify";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {phoneNumber,  isValidPhoneNumber } from "libphonenumber-js";
import { makeStyles } from "@mui/styles";
import ModalImage from "react-modal-image";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import autoTable from "jspdf-autotable";
import SearchIcon from "@mui/icons-material/Search";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Toolbar,
  IconButton,
  TablePagination,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  useMediaQuery,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
const useStyles = makeStyles({});
const styles = {
  table: {
    border: "1px solid #ddd",
    borderRadius: "100px",
  },
  tableCell: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "8px",
  },
};
const TableComponent = () => {
  const classes = useStyles();
  const [editedImagePreviewUrl, setEditedImagePreviewUrl] = useState("");
  const [variant, setVariant] = React.useState("soft");
  const [color, setColor] = React.useState("neutral");
  const url = config.url;
  const url1=config.url
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [previousImagePreviewUrl, setPreviousImagePreviewUrl] = useState("");
  const [reducedValue, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [isRowLength, setIsRowLength] = React.useState(0);
  const [newRecord, setNewRecord] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    image: null,
  });
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedRecord, setEditedRecord] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    image: null,
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [recordToDeleteIndex, setRecordToDeleteIndex] = useState(null);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    image: "",
  });
  useEffect(() => {
    fetchPosts();
  }, [reducedValue]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${url}/user/list_profile`, access);
      setData(response.data.responseData);
      setIsRowLength(response.data.responseData.length);
      // setFilteredData(response.data.responseData);
      console.log(response);
    } catch (error) {
      console.error("Error fetching method:", error);
    }
  };


  const access_token = localStorage.getItem("access_token");
  const access = {
    headers: {
      autherization: access_token,
    },
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
    validateField(name, value);
  };
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        image: file,
      }));
      validateImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        image: null,
      }));
      setImagePreviewUrl("");
    }
  };
  const handlephoneChange = (value) => {
    setPhoneNumber(value);
    validateField("phone", value);
  };

  const handlephoneChange2 = (value) => {
    setEditedPhoneNumber(value);
    validateField("phone", value);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(email);
  };
  const isFname = (first_name) => {
    const fnamePattern = /^[A-Za-z0-9]{2,20}$/;
    return fnamePattern.test(first_name);
  };
  const isLname = (last_name) => {
    const lnamePattern = /^[A-Za-z0-9]{2,20}$/;
    return lnamePattern.test(last_name);
  };
  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
      case "first_name":
        error = !value.trim()
          ? "First name is required"
          : !isFname(value)
          ? "Please Enter valid name"
          : "";
        break;
      case "last_name":
        error = !value.trim() ? "Last name is required" : "";
        break;
      case "email":
        error = !value.trim()
          ? "Email is required"
          : !isValidEmail(value)
          ? "Please enter a valid email address"
          : "";
        break;
      case "phone":
        error = !phoneNumber.trim()
          ? "Phone number is required"
          : !isValidPhoneNumber("+" + phoneNumber)
          ? "Please enter a valid phonenumber"
          : "";
        break;
      case "image":
        error = !value ? "Image is required" : !validateImage(value) ? "" : "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const validateImage = (image) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxFileSize = 2000000;
    let error = "";
    if (!image) {
      error = "Image is required";
    } else if (!allowedTypes.includes(image.type)) {
      error = "Invalid image type. Allowed types are JPEG, PNG, and GIF.";
    } else if (image.size > maxFileSize) {
      error = "Image size exceeds the maximum allowed (2MB).";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: error,
    }));
  };

  const validateAllFields = () => {
    for (const fieldName in newRecord) {
      validateField(fieldName, newRecord[fieldName]);
    }
  };

  var bodyFormData = new FormData();
  bodyFormData.append("first_name", newRecord.first_name);
  bodyFormData.append("last_name", newRecord.last_name);
  bodyFormData.append("email", newRecord.email);
  bodyFormData.append("phone", phoneNumber);
  bodyFormData.append("image", newRecord.image);
  const handleAddClick = () => {
    setShowAddDialog(true);
  };
  const handleAddRecord = async (event) => {
    event.preventDefault();
    validateAllFields();
    try {
      const response1 = await axios.post(
        `${url}/user/add_profile`,
        bodyFormData,
        access
      );
      console.log(response1);
      if (response1.data.responseCode === 200) {
        setData((prevData) => [...prevData, newRecord]);
        setPhoneNumber("");
        setImagePreviewUrl("");
        setNewRecord({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          image: "",
        });
        toast.success("Data added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setShowAddDialog(false);
      } else {
        toast.error(response1.data.responseMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Error fetching method:", error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchSuccess, setSearchSuccess] = useState(false);
  useEffect(() => {
    if (searchSuccess) {
      toast.success("Data searched successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setSearchSuccess(false); 
    }
  }, [searchSuccess]);
  const handleSearch = async (event) => {
    event.preventDefault();
    if (event.target.value === "") {
      forceUpdate(data);
    }

    try {
      const response = await axios.get(`${url}/user/search/${event.target.value}`, access,{
        params: {
          query: searchText,
        },
      });
      if (response.data.responseCode === 200) {
        setData(response.data.responseData); 
        setIsRowLength(response.data.responseData.length);
      
      } 
      else if (response.data.responseCode === 212) {
        setData("");
        setIsRowLength((response.data.responseData.length = 0));
      }else {
        toast.error(response.data.responseMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prevEditedRecord) => ({
      ...prevEditedRecord,
      [name]: value,
    }));
    validateField(name, value);
  };






  const handlePhotoChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditedRecord((prevRecord) => ({
        ...prevRecord,
        image: file,
      }));
      validateImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setEditedRecord((prevRecord) => ({
        ...prevRecord,
        image: null,
      }));
      setEditedImagePreviewUrl("");
    }
  };

  const validateAllFields2 = () => {
    for (const fieldName in editedRecord) {
      validateField(fieldName, editedRecord[fieldName]);
    }
  };

  var bodyFormData1 = new FormData();
  bodyFormData1.append("first_name", editedRecord.first_name);
  bodyFormData1.append("last_name", editedRecord.last_name);
  bodyFormData1.append("email", editedRecord.email);
  bodyFormData1.append("phone", editedPhoneNumber);
  bodyFormData1.append("image", editedRecord.image);

  const handleEditClick = (index) => {
    const recordToEdit = data[index - 1];

    setEditedRecord({ ...recordToEdit });
    setEditedPhoneNumber(recordToEdit.phone);
    setPreviousImagePreviewUrl(recordToEdit.image);
    setEditedImagePreviewUrl(recordToEdit.image);
    setShowEditDialog(true);
  };

  const handleUpdateRecord = async (event, id) => {
    event.preventDefault();
    validateAllFields2();
    try {
      const response2 = await axios.put(
        `${url}/user/update_profile/${editedRecord.id}`,
        bodyFormData1,
        access
      );
      if (response2.data.responseCode === 200) {
        setShowEditDialog(false);
        fetchPosts();
        toast.success("Data edited successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(response2.data.responseMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Error fetching method:", error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDeleteClick = (index) => {
    setRecordToDeleteIndex(index);
    setShowDeleteDialog(true);
  };
  const handleConfirmDelete = async (id) => {
    try {
      const response3 = await axios
        .delete(`${url}/user/delete_profile/${recordToDeleteIndex}`, access)
        .then((response3) => {
          toast.success("Data is deleted successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          forceUpdate();
        });
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error("Error fetching method:", error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const generatePDF = (data) => {
    const pdfHeaders = [
      {
        id: "first_name",
        label: "First Name",
      },
      {
        id: "last_name",
        label: "Last Name",
      },
      {
        id: "phone",
        label: "Phone Number",
      },
      {
        id: "email",
        label: "Email",
      },
      {
        id: "image",
        label: "Image",
      },
    ];
    const doc = new jsPDF();

    autoTable(doc, {
      margin: { top: 20 },
      theme: "grid",
      body: data,
      bodyStyles: { minCellHeight: 15 },
      columnStyles: {
        0: { cellWidth: 23 },
        1: { cellWidth: 23 },
        2: { cellWidth: 30 },
        3: { cellWidth: 45 },
        4: { cellWidth: 35 },
      },
      styles: { minCellHeight: 1 },
      columns: pdfHeaders.map((c) => ({ header: c.label, dataKey: c.id })),

      didDrawCell: (data) => {
        if (data.section === "body" && data.column.index === 4) {
          doc.addImage(
            data.cell.raw,
            "JPEG, png, jpg, heic",
            data.cell.x + 2,
            data.cell.y + 2,
            31.5,
            25
          );
        }
      },
    });
    doc.save("table_data.pdf");
  };

  const headers = [
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
  ];

  return (
    <div style={{ overflowX: isMobileView ? "auto" : "hidden" }}>
      <Card style={{ borderRadius: "20px", borderBottom: "white" }}>
        <CardContent>
          <Toolbar className="head-layout">
            <Typography variant="h6"></Typography>
            {/* <form onSubmit={handleSearch}> */}
              <FormControl>
                <InputLabel htmlFor="outlined-adornment-password">
                  Search by Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-multiline-flexible"
                  label="Search by Name"
                  // value={search  Text}
                  // onChange={handleChangeSearch}
                  onChange={handleSearch}
                  size="small"
                  variant="outlined"
                  style={{ width: "270px" }}
                  startAdornment={
                    <InputAdornment position="start">
                      {" "}
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick={true}
        pauseOnHover={true}
      />
            {/* </form> */}
            <div className="icons">
              <IconButton
                color="primary"
                onClick={handleAddClick}
                style={{
                  backgroundColor: "#eeeeee",
                  marginLeft: "20px",
                }}
              >
                <Add />
              </IconButton>
              <IconButton
                color="primary"
                style={{
                  backgroundColor: "#eeeeee",
                  marginLeft: "20px",
                }}
                onClick={() => generatePDF(filteredData)}
              >
                <PictureAsPdfIcon />
              </IconButton>
              <IconButton
                style={{
                  backgroundColor: "#eeeeee",
                  marginLeft: "20px",
                }}
              >
                <CSVLink
                  data={data}
                  headers={headers}
                  filename={"table_data.csv"}
                  style={{ textDecorationLine: "none", fontSize: "16px" }}
                >
                  csv
                </CSVLink>
              </IconButton>
            </div>
          </Toolbar>
          <Paper
            sx={{
              width: "100%",
              borderBottomColor: "white",
              boxShadow: "none",
            }}
          >
            {data.length > 0 ? (
              <TableContainer>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  className={classes.table}
                >
                  <TableHead sx={{}}>
                    <TableRow>
                      <TableCell style={{ textAlign: "start" }}>
                        <b>Name</b>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <b> Email</b>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <b>Phone</b>
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          height: "50px",
                          width: "50px",
                        }}
                      >
                        <b>Image</b>
                      </TableCell>

                      <TableCell
                        style={{
                          textAlign: "end",
                        }}
                      >
                        <b> Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>{`${record.first_name} ${record.last_name}`}</TableCell>

                          <TableCell style={{ textAlign: "center" }}>
                            {record.email}
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center" }}
                          >{`+${record.phone}`}</TableCell>
                          <TableCell
                            style={{
                              width: "50px",
                              height: "50px",
                              textAlign: "center",
                            }}
                          >
                           <img src={`${url1}${record.image}`} alt='' />
                                <ModalImage
                              small={record.image}
                              large={record.image}
                              
                              style={{ height: "50px", width: "80px",
                            ".img":{height:"50px",width:"50px"} }}
                            >
                            </ModalImage>
                            {/* <img
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}/> */}
                          </TableCell>

                        

                          <TableCell
                            style={{
                              textAlign: "end",
                            }}
                          >
                            <IconButton
                              // sx={{ p: "1" }}
                              color="primary"
                              style={{
                                gap: "5",
                                backgroundColor: "#eeeeee",
                                margin: "10px",
                              }}
                              onClick={() => handleEditClick(record.index)}
                            >
                              <Edit />
                            </IconButton>

                            <IconButton
                              style={{
                                gap: "5",
                                backgroundColor: "#eeeeee",
                                marginRight: "10px",
                              }}
                              sx={{ m: "1" }}
                              color="secondary"
                              onClick={() => handleDeleteClick(record.id)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography
                variant="body2"
                component="div"
                sx={{ textAlign: "center", my: 3 }}
              >
                No records found.
              </Typography>
            )}
            <Box
              display="flex"
              justifyContent="flex-end"
              style={{ marginTop: "0px", marginBottom: "0px" }}
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                sx={{
                  marginBottom: "0px",
                  ".css-pdct74-MuiTablePagination-selectLabel": {
                    marginBottom: "0px",
                  },
                  ".css-levciy-MuiTablePagination-displayedRows": {
                    marginBottom: "0px",
                  },
                }}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Paper>
        </CardContent>
      </Card>

      <Card>
        <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}  forceUpdate={forceUpdate}>
          {/* <Card style={{ overflowX: isMobileView ? "auto" : "hidden" }}> */}
          <DialogTitle sx={{ textAlign: "center" }}>Add New Record</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              className="box-layout"
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="First Name"
                name="first_name"
                type="text"
                value={newRecord.first_name}
                onChange={handleChange}
                size="small"
                style={{
                  borderColor: errors.first_name ? "red" : "green",
                }}
              />
              {errors.first_name && (
                <p style={{ color: "red", marginBottom: "auto" }}>
                  {errors.first_name}
                </p>
              )}
              <TextField
                label="Last Name"
                type="text"
                name="last_name"
                size="small"
                fullWidth
                value={newRecord.last_name}
                onChange={handleChange}
                style={{
                  borderColor: errors.last_name ? "red" : "green",
                }}
              />
              {errors.last_name && (
                <p style={{ color: "red", marginBottom: "auto" }}>
                  {errors.last_name}
                </p>
              )}
              <TextField
                label="Email"
                type="email"
                name="email"
                size="small"
                fullWidth
                value={newRecord.email}
                onChange={handleChange}
                style={{
                  borderColor: errors.email ? "red" : "green",
                  // borderWidth: "2px",
                }}
              />
              {errors.email && (
                <p style={{ color: "red", marginBottom: "auto" }}>
                  {errors.email}
                </p>
              )}
              <PhoneInput
                value={phoneNumber}
                onChange={handlephoneChange}
                country={"in"}
                inputStyle={{
                  paddingTop: "1.2rem",
                  paddingBottom: "1.2rem",
                  height: "calc(1.5em+1.25rem+2px)",
                  width: "100%",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#000",

                  fontSize: "17px",
                }}
                dropdownStyle={{}}
                buttonStyle={{
                  background: "#c5d3e380",
                  display: "block",
                }}
                enableSearch
                isValid={(value, country) => {
                  if (value === country.dialCode) {
                    return true;
                  }
                  return isValidPhoneNumber("+" + value);
                }}
                defaultErrorMessage="Please enter valid number"
              />{" "}
              {errors.phone && (
                <p style={{ color: "red", marginBottom: "auto" }}>
                  {errors.phone}
                </p>
              )}
              <TextField
                // label="Image"
                type="file"
                size="small"
                name="image"
                fullWidth
                onChange={handlePhotoChange}
              />
              {imagePreviewUrl && (
                <div>
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              {errors.image && (
                <p style={{ color: "red", marginBottom: "auto" }}>
                  {errors.image}
                </p>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddRecord} color="primary">
              Add
            </Button>
          </DialogActions>
          {/* </Card> */}
        </Dialog>
      </Card>
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}  forceUpdate={forceUpdate}>
        <DialogTitle sx={{ textAlign: "center" }}>Edit Record</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            className="box-layout"
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="First Name"
              name="first_name"
              type="text"
              size="small"
              value={editedRecord.first_name}
              onChange={handleChange2}
              fullWidth
              style={{
                borderColor: errors.first_name ? "red" : "green",
                margin: "5px,5px",
              }}
            />
            {errors.first_name && (
              <p style={{ color: "red", marginBottom: "auto" }}>
                {errors.first_name}
              </p>
            )}
            <TextField
              label="Last Name"
              type="text"
              name="last_name"
              size="small"
              value={editedRecord.last_name}
              onChange={handleChange2}
              style={{
                borderColor: errors.last_name ? "red" : "green",
              }}
              fullWidth
            />
            {errors.last_name && (
              <p style={{ color: "red", marginBottom: "auto" }}>
                {errors.last_name}
              </p>
            )}
            <TextField
              label="Email"
              type="email"
              name="email"
              size="small"
              value={editedRecord.email}
              onChange={handleChange2}
              style={{
                borderColor: errors.email ? "red" : "green",
              }}
              fullWidth
            />
            {errors.email && (
              <p style={{ color: "red", marginBottom: "auto" }}>
                {errors.email}
              </p>
            )}
            <PhoneInput
              value={editedPhoneNumber}
              onChange={handlephoneChange2}
              country={"in"}
              inputStyle={{
                paddingTop: "1.2rem",
                paddingBottom: "1.2rem",
                height: "calc(1.0em+0.25rem+1px)",
                width: "100%",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "#000",
                fontFamily: "Poppins",
                fontSize: "17px",
              }}
              buttonStyle={{
                background: "#c5d3e380",
              }}
              enableSearch
              isValid={(value, country) => {
                if (value === country.dialCode) {
                  return true;
                }
                return isValidPhoneNumber("+" + value);
              }}
              defaultErrorMessage="Please enter valid number"
            />{" "}
            {errors.phone && (
              <p style={{ color: "red", marginBottom: "auto" }}>
                {errors.phone}
              </p>
            )}
            <TextField
              size="small"
              type="file"
              name="image"
              onChange={handlePhotoChange2}
              fullWidth
              accept="image/*"
            />
            {editedImagePreviewUrl && (
              <div>
                <img
                  src={editedImagePreviewUrl}
                  alt="Preview"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            {errors.image && (
              <p style={{ color: "red", marginBottom: "auto" }}>
                {errors.image}
              </p>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button onClick={(id) => handleUpdateRecord(id)} color="primary">
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
          <Button
            onClick={(record) => handleConfirmDelete(record.id)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default TableComponent;
