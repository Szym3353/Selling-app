import {
  Box,
  AppBar,
  Typography,
  Button,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import ShoppingCart from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../context/AuthContext";
import Person from "@mui/icons-material/Person";

let drawerWidth = "350px";

const Navbar = () => {
  let navigate = useNavigate();
  let { logout, currentUser, cart } = useAuth();
  let [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

  let options = [
    { value: "Register", action: () => navigate("/register"), auth: false },
    { value: "Login", action: () => navigate("/login"), auth: false },
    { value: "Create offert", action: () => navigate("/create"), auth: true },
    {
      value: `Your Cart (${cart.length})`,
      action: () => navigate("/cart"),
      auth: true,
      icon: <ShoppingCart />,
    },
    {
      value: "Account",
      action: () => navigate(`/profile/${currentUser?.id}`),
      auth: true,
      icon: <Person />,
    },
    { value: "Logout", action: () => logout(), auth: true },
  ];

  const drawer = (
    <Box sx={{ textAlign: "center", p: 1 }}>
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <Typography sx={{ p: 1 }} variant="h5">
          LOGO
        </Typography>
      </Link>
      <Divider />
      <List>
        {options
          .filter((item) => {
            if (currentUser) {
              return item.auth;
            } else {
              return !item.auth;
            }
          })
          .map((item, index) => (
            <ListItem key={`${item.value}-${index}`}>
              <ListItemButton onClick={item.action}>
                <Typography>{item.value}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar component="nav" sx={{ position: "relative", px: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Typography variant="h6">LOGO</Typography>
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {options
              .filter((item) => {
                if (currentUser) {
                  return item.auth;
                } else {
                  return !item.auth;
                }
              })
              .map((option) => (
                <Button
                  key={option.value}
                  sx={{ color: "white", mx: 1 }}
                  onClick={option.action}
                >
                  {option.icon || ""}
                  <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                    {option.value}
                  </span>
                </Button>
              ))}
          </Box>
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: "block", sm: "none" }, color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
