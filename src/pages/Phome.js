// TableComponent.js
import React, { useState, useEffect } from "react";
import "./phome.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import config from "../config.json";
import { toast } from "react-toastify";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Card from "@mui/material/Card";
import Fancybox from "./Fancybox";
import CardContent from "@mui/material/CardContent";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Menu } from "react-pro-sidebar";
import { makeStyles } from "@mui/styles";
import ModalImage from "react-modal-image";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable"; 
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
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
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
const useStyles = makeStyles({
});

const styles = {
  table: {
    border: "1px solid #ddd",
    borderRadius: "100px", 
  },
  tableCell: {
    border: "1px solid #ddd",
    borderRadius: "10px", // Set border radius for individual cells
    padding: "8px",
    // Adjust other cell styles here (e.g., textAlign, fontWeight, etc.)
  },
};
const TableComponent = () => {
  const classes = useStyles();
  const [editedImagePreviewUrl, setEditedImagePreviewUrl] = useState("");
  const [variant, setVariant] = React.useState("soft");
  const [color, setColor] = React.useState("neutral");
  const url = config.url;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);



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
  }, [data]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${url}/user/list_profile`, access);
      // console.log(response);
      setData(response.data.responseData);
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
    }
  };



  const handlephoneChange = (value) => {
    setPhoneNumber(value);
    // setValid(validatePhoneNumber(value));
    console.log(value);
  };

  const isValidEmail = (email) => {
    // Regular expression to validate email format
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
          error=!value.trim()
          ?"Phone number is required"
          :""
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
      const id = setData.id;
      const response1 = await axios.post(
        `${url}/user/add_profile`,
        bodyFormData,
        access
      );
      console.log(response1);
      if (response1.data.responseCode === 200) {
        setData((prevData) => [...prevData, newRecord]);
        setNewRecord({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          image: "",
        });
        // fetchPosts();
        toast.success("data added successfully", {
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

      // Set the preview URL of the selected image
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
  bodyFormData1.append("phone", editedRecord.phone);
  bodyFormData1.append("image", editedRecord.image);

  const handleEditClick = (index) => {
    const recordToEdit = data[index - 1];
    console.log(recordToEdit);
    setEditedRecord({ ...recordToEdit });
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
      console.log(editedRecord.id);
      console.log(response2);
      if (response2.data.responseCode === 200) {
        setShowEditDialog(false);
        fetchPosts();
        toast.success("data edited successfully", {
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
          console.log(response3);
          console.log("deleted", recordToDeleteIndex);
          toast.success("Data is deleted successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    const filteredResults = data.filter((record) => {
      const fullName = `${record.first_name} ${record.last_name}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredResults);
  }, [data, searchQuery]);

  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    const tableColumn = ["First Name", "Last Name", "Email", "Phone", "Image"];
    const tableRows = [];

    data.forEach((record) => {
      const rowData = [
        record.first_name,
        record.last_name,
        record.email,
        record.phone,
        record.image, // Update this to show the image, as needed
      ];
      tableRows.push(rowData);
    });

    const imageColumnIndex = 4;

    // Add the image to each row using a loop
    data.forEach((record, index) => {
      // Assuming that the 'record.image' contains a valid image URL or Data URI
      doc.addImage(
        record.image, // URL or Data URI of the image
        // "PNG", // Image format (JPEG, PNG, etc.)
        10, // X-coordinate position
        20 + index * 10, // Y-coordinate position (you can adjust the value as needed)
        10, // Image width
        10 // Image height
      );

      // Update the 'rowData' with the image element
      tableRows[index][imageColumnIndex] = {
        // Add the image element to the table cell
        image: doc.previousImage,
        alignment: "left", // Adjust the alignment as needed
      };
    });
    // didDrawCell:(data)=>{
    //   if(data.section==="body"&& data.column.index===5){
    //     doc.addImage(data.cell.row,
    //       "jPEG,png,jpg,heic",
    //       data.cell.x +2,
    //       data.cell.y+2,
    //       31.5,25);
    //   }
    // })
    // }

    const columnWidths = [30, 30, 30, 30, 50, 20]; // Example widths, adjust as needed
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      columnStyles: {
        0: { columnWidth: columnWidths[0] },
        1: { columnWidth: columnWidths[1] },
        2: { columnWidth: columnWidths[2] },
        3: { columnWidth: columnWidths[3] },
        4: { columnWidth: columnWidths[4] },
        5: { columnWidth: columnWidths[5] },
      },
    });

    doc.save("table_data.pdf");
  };

  const headers = [
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },

    // Add more headers for your table data
  ];

  return (
    <div style={{ overflowX: isMobileView ? "auto" : "hidden" }}>
      <Card style={{ borderRadius: "20px", borderBottom: "white" }}>
        <CardContent>
          <Toolbar className="head-layout">
            <Typography
              variant="h6"
              // component="div"
            ></Typography>

            <TextField
              label="Search by Name"
              value={searchQuery}
              onChange={handleChangeSearch}
              size="small"
              variant="outlined"
              style={{ width: "250px" }}
            />
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
                  {/* <i class="fas fa-file-csv"></i> */}
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
            {filteredData.length > 0 ? (
              <TableContainer sx={{ maxHeight: 450 }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  className={classes.table}
                >
                  <TableHead sx={{}}>
                    <TableRow>
                      <TableCell>
                        <b> First Name</b>
                      </TableCell>
                      <TableCell>
                        <b>Last Name</b>
                      </TableCell>
                      <TableCell>
                        <b> Email</b>
                      </TableCell>
                      <TableCell>
                        <b>Phone</b>
                      </TableCell>
                      <TableCell>
                        <b>Image</b>
                      </TableCell>
                      <TableCell></TableCell>

                      <TableCell
                        style={{
                          padding: "30px",
                          marginLeft: "30px",
                        }}
                      >
                        <b> Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>{record.first_name}</TableCell>
                          <TableCell>{record.last_name}</TableCell>
                          <TableCell>{record.email}</TableCell>
                          <TableCell>{record.phone}</TableCell>
                          <TableCell
                            style={{
                              maxWidth: "50px",
                              maxHeight: "20px",
                            }}
                          >
                            {/* <ModalImage
                          small={record.image}
                          large={record.image}
                          alt="Hello World!"
                          style={{ height: "50px", width: "80px" }}
                        /> */}

                            <Fancybox
                              options={{
                                Carousel: {
                                  infinite: false,
                                },
                              }}
                            >
                              <a data-fancybox="gallery">
                                <img
                                  alt=""
                                  src={record.image}
                                  width="80"
                                  height="80"
                                />
                              </a>
                            </Fancybox>
                          </TableCell>
                          <TableCell
                            style={{
                              padding: "10px",
                            }}
                          ></TableCell>
                          <TableCell
                            style={{
                              padding: "10px",
                            }}
                          >
                            <IconButton
                              sx={{ p: "1" }}
                              color="primary"
                              style={{
                                gap: "5",
                                backgroundColor: "#eeeeee",
                                margin: "20px",
                              }}
                              onClick={() => handleEditClick(record.index)}
                            >
                              <Edit />
                            </IconButton>

                            <IconButton
                              style={{
                                gap: "5",
                                backgroundColor: "#eeeeee",
                                marginLeft: "17px",
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
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                SelectProps={{
                  renderValue: (value) => `${value} rows`, // Custom label for the dropdown button
                }}
                MenuItemProps={{
                  style: { fontSize: 14, margin: "1px" }, // Custom style for the dropdown options
                }}
              />
            </Box>
          </Paper>
        </CardContent>
      </Card>
      <Card>
        <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
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
                <p style={{ color: "red" }}>{errors.first_name}</p>
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
                <p style={{ color: "red" }}>{errors.last_name}</p>
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
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              <PhoneInput
                value={phoneNumber}
                onChange={handlephoneChange}
                country={"in"}
                inputStyle={{
                  paddingTop: "1.2rem",
                  // margin:"5px",
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
              />  {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
              <TextField
                // label="Image"
                type="file"
                size="small"
                name="image"
                fullWidth
                onChange={handlePhotoChange}
              />
              {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
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
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
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
              <p style={{ color: "red" }}>{errors.first_name}</p>
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
              <p style={{ color: "red" }}>{errors.last_name}</p>
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
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <PhoneInput
              value={phoneNumber}
              onChange={handlephoneChange}
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
              dropdownStyle={{ fontFamily: "Poppins" }}
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
            /> {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
            <TextField
              size="small"
              type="file"
              // value={editedImagePreviewUrl}
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

            {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
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
