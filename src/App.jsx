import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
 

// import { Home, Services} from "./pages"
import { Layout } from "./pages/layout";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import Information from "./pages/Information/Information";
import Mdk from "./pages/MDK/Mdk";
import Training from "./pages/Services/Training";
import SwapPage from "./pages/SwapPage/SwapPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/information" element={<Information />} />
            <Route path="/swap" element={<SwapPage />} />
            <Route path="/services/training" element={<Training />} />
            <Route path="/services/inference" element={<Information />} />
            <Route path="/services/mdk" element={<Mdk />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;