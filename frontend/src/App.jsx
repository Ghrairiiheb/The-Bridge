import { Box } from "@chakra-ui/react";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
 
function App() {
return(
  <Box minH={"100vh"}>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  </Box>
);
}

export default App;