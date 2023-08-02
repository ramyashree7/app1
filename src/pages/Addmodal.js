import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import Card from "@mui/material/Card";
function Addmodal() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRecord, setNewRecord] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    image: null,
  });



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


  return (
    <div>
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
              />{" "}
              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
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
    </div>
  );
}

export default Addmodal;
