import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

let userName = "jane Doe";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  let logoimg =
    theme.palette.mode === "dark"
      ? "../../assets/Logo.svg"
      : "../../assets/Logo2.svg";

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                sx={{ width: "100%" }} // Ensure the box takes up 100% width
              >
                {/* Logo
                <img
                  src={logoimg}
                  alt="MyTailor Logo"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                /> */}
                {/* Text */}
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  style={{ margin: 0, padding: 0 }}
                >
                  myTailor
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  alt="Profile Image"
                  width="100px"
                  height="100px"
                  src={"../../assets/user.jpg"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userName}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="Profile"
              to="/Profile"
              icon={<AccountCircleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
             Records
            </Typography> */}
            <Item
              title="Create Order"
              to="/create-order"
              icon={<AddOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Order"
              to="/manage-order"
              icon={<CollectionsBookmarkOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Customers"
              to="/customers"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Order Schedule"
              to="/orderSchedule"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Productivity Chart"
              to="/chart"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          
            <Item
              title="Settings"
              to="/Settings"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Support"
              to="/support"
              icon={<HeadsetMicOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
export default Sidebar;
