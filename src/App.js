import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./screens/home/Home";
import Login from "./screens/login/Login";
import Manage from "./screens/manage/Manage";
import ManageList from "./screens/manage/ManageList";
import Contractor from "./screens/contractor/Contractor";
import ContractorList from "./screens/contractor/ContractorList";
import ContractorProfile from "./screens/contractor/ContractorProfile";
import ProductList from "./screens/product/ProductList";
import AddProduct from "./screens/product/AddProduct";
import EndProduct from "./screens/product/EndProduct";
import Report from "./screens/product/Report";
import UnavProduct from "./screens/product/UnavProduct";
import ExportExcel from "./screens/product/ExcelExport";
import InFactory from "./screens/product/InFactory";
import { useState, useEffect } from "react";
import Protected from "./components/Protected";
import ContractorEfficiency from "./screens/contractor/ContractorEfficiency";
import axios from "axios";
import AddRaw from "./screens/manage/AddProductTwo";
import AddProductTwo from "./screens/manage/AddProductTwo";
import AddRawTwo from "./screens/manage/AddRawTwo";
import RawMaterial from "./screens/detail/RawMaterial";
import ContractorProfileDetails from "./screens/detail/ContractorProfileDetails";
import ProductDetails from "./screens/detail/ProductDetails";

function App() {
  // const [isLoggedIn, setisLoggedIn] = useState(true);
  // const history = useHistory();
  const navigate = useNavigate();

  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated") || false
  );
  const token = localStorage.getItem('accessToken');
  // console.log(localStorage.getItem("authenticated"))
  if(!token) {
   
    return (<Login setauthenticated={setauthenticated} />)
  }


  return (
      <Routes>
        {console.log(authenticated)}
        <Route path="/login" element={<Login setauthenticated={setauthenticated} />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/manage/raw" element={<Manage />} />
        <Route path="/manage/product" element={<ManageList />} />
        <Route path="/manage/raw/add" element={<AddRawTwo />} />
        <Route path="/manage/product/add" element={<AddProductTwo />} />
        <Route path="/contractor/add" element={<Contractor />} />
        <Route path="/contractor/List" element={<ContractorList />} />
        <Route path="/contractor/profile" element={<ContractorProfile />} />
        <Route path="/contractor/efficiency" element={<ContractorEfficiency />} />
        <Route path="/product/list" element={<ProductList />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/processing" element={<InFactory />} />
        <Route path="/product/end" element={<EndProduct />} />
        <Route path="/product/report" element={<Report />} />
        <Route path="/product/unavailable" element={<UnavProduct />} />
        <Route path="/product/export" element={<ExportExcel />} />
        <Route path="/manage/raw/:id" element={<RawMaterial />} />
        <Route path="/contractor/profile/:id" element={<ContractorProfileDetails />} />
        <Route path="/manage/product/:id" element={<ProductDetails />} />
      </Routes>
  );
}

export default App;
