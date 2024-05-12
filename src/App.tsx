import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ListView from "./pages/ListView";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home selectedColor={""} />} />
        <Route path="/home" element={<Home selectedColor={""} />} />
        <Route path="/list-view" element={<ListView />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
