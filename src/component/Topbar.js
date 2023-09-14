import React, { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import { useTheme, Box, IconButton, InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "./Topbar.css";
const Topbar = ({ handleToggleSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleNotificationClick = () => {
    setNotificationCount(notificationCount + 1);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <div className="topbar-container">
      <Box display="flex">
        <Box
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
          className="search-container"
        >
          <InputBase className="inputbase" placeholder="Search" />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <div className="mobile-icons-container">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "light" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleNotificationClick}>
          <NotificationsOutlinedIcon />
          {notificationCount > 0 && (
            <div className="notification-badge">{notificationCount}</div>
          )}
        </IconButton>

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => handleToggleSidebar(true)}>
          <i className="fas fa-bars"></i>
        </IconButton>
      </div>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <p>You have a new notification message here.</p>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Topbar;
