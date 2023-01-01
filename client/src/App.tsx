import React from "react";

//Components
import { Container } from "@mui/material";
import RoutesComponent from "./components/Router/RoutesComponent";
import Navbar from "./components/Navbar/Navbar";

//Main css file
import "./styles/main.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container sx={{ mb: 2 }}>
        <RoutesComponent />
      </Container>
    </div>
  );
}

export default App;
