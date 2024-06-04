import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import "./css/NavBar.css";

const NavBar = () => {
  return (
    <Box className="nav-container">
      <Button
        className="nav-link"
        type="button"
        variant="text"
        onClick={() => (window.location.href = "/homepage")}
      >
        Home
      </Button>
      <Button
        className="nav-link"
        type="button"
        variant="text"
        onClick={() => (window.location.href = "/profile")}
      >
        Profile
      </Button>
      <Button
        className="nav-link"
        type="button"
        variant="text"
        onClick={() => (window.location.href = "/records")}
      >
        records
      </Button>
      <Button
        className="nav-link"
        type="button"
        variant="text"
        onClick={() => {
          // Clear all saved variables
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default NavBar;
