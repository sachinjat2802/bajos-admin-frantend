/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Img1 from "../../assets/bubble.png";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Fab } from "@mui/material";
import Img2 from "../../assets/left-arrow.png";
import SideNav from "../../components/SideNav";
import axios from "axios";

const Report = () => {
  const bg = "#74C3AD";

  const [product, setProduct] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [endProduct, setEndProduct] = useState([]);
  const [expectedProduct, setExpectedProduct] = useState([]);
  const [contractorIdData, setContractorIdData] = useState([]);
  const [productIdData, setProductIdData] = useState({});
  const [productToManufacturing, setProductToManufacturing] = useState([]);
  const [productToManufacture, setProductToManufacture] = useState([]);
  const [getRaw, setGetRaw] = useState([]);
  const storeRaw = [];
  const [proId, setProId] = useState("");
  const [costPerPcs, setCostPerPcs] = useState(0);
  const report = {
    cost_of_pcs: "",
    raw_id: "",
  };
  const [rem, setRem] = useState(0);
  const [recieve, setRecieve] = useState(0);
  const getProductToManufacturing = () => {
    axios
      .get("/api/productToManufacturing")
      .then((res) => {
        setProductToManufacturing(res.data);
      });
  };
  const getProductToManufacture = () => {
    axios.get("/api/productToManufacture").then((res) => {
      setProductToManufacture(res.data);
    });
  };
  const getContractorData = () => {
    axios.get("/api/contractors").then((res) => {
      setContractors(res.data);
    });
  };

  useEffect(() => {
    getProducts();
    getContractorData();
  }, []);

  useEffect(() => {
    getReport();
  });
  useEffect(() => {
    calculateExpectedPro();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productIdData]);
  const calculateExpectedPro = () => {
    var arr = [];
    const remarr = [];
    // console.log(productIdData, productToManufacture, proId)
    for (var i = 0; i < productToManufacture.length; i++) {
      for (var j = 0; j < productIdData?.raw?.length; j++) {
        if (proId === productToManufacture[i]?.raw_id) {
          // console.log(
          //   productToManufacture[i]?.qty_in_meter,
          //   productIdData?.raw[j]?.qty
          // );

          var expect = Math.floor(
            Number(productToManufacture[i]?.qty_in_meter) /
              Number(productIdData?.raw[j]?.qty)
          );

          // console.log(
          //   productToManufacture[i]?.qty_in_meter,
          //   expectedProduct,
          //   productIdData?.raw[j]?.qty
          // );

          var remain = Math.abs(
            Math.floor(
              Number(productToManufacture[i]?.qty_in_meter) -
                (Number(productToManufacture[i]?.qty_in_meter) /
                  Number(productIdData?.raw[j]?.qty)) *
                  Number(productIdData?.raw[j]?.qty)
            )
          );

          remarr.push(remain);
        }
      }

      if (expect !== undefined && expect > 0) {
        arr.push(expect);
      }
      // console.log(rem)
    }

    arr.sort((a, b) => a - b);

   // console.log(remarr);
    remarr.sort((a, b) => b - a);
    if (remarr?.length > 1) {
      setRem(remarr[0]);
    } else {
      remarr.sort((a, b) => a - b);
      setRem(remarr[0]);
    }

    // console.log(remarr)
  };

  const getReport = () => {
  //  console.log(productIdData);
    var cost_per_pcs = 0;
    for ( var k =0 ; k< productIdData?.raw?.length ; k++){
      for (var i = 0; i < productToManufacture?.length; i++) {
       
  
        
            console.log(productToManufacture[i].price_per_meter, productIdData?.raw[k]?.qty);
            if ( k === i){
              cost_per_pcs = Number(productIdData?.raw[k]?.qty)/Number(productToManufacture[i].price_per_meter);
              cost_per_pcs += cost_per_pcs;
            }
          
          
        }
      }
      console.log(cost_per_pcs)
      for (var j = 0; j < productToManufacturing?.length; j++) {
          //  console.log(cost_per_pcs,productToManufacturing[j]?.labour_cost_per_pcs)
          if (
            productToManufacturing[j].raw_id === proId
          ) {
          cost_per_pcs =
            Number(cost_per_pcs) +
            Number(productToManufacturing[j]?.labour_cost_per_pcs);
         
        }
    }
   
    console.log(cost_per_pcs)
    setCostPerPcs(cost_per_pcs);
    report.cost_of_pcs = costPerPcs;
    report.raw_id = proId;
    // console.log(report)
    if (Number(report.cost_of_pcs) > 0 && report.raw_id !== "") {
      axios.post("/api/addReport", report).then((res) => {
        console.log(res.data);
      });
    }
  };
  const handleContractorId = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const con_id = el.getAttribute("id");
    axios.get(`/api/contractor/${con_id}`).then((res) => {
      setContractorIdData(res.data);
      //  console.log(res.data);
    });
  };

  const handleProductId = async (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const pro_id = el.getAttribute("id");
    const res = await axios.get(`/api/product/${pro_id}`);
    setProductIdData(res.data);
    //setTimeout(getRawArray(), 5000)
    getRawArray(res.data);
    setProId(pro_id);
    // console.log(productIdData.rm)

    getProductToManufacturing();
    getExpectedProducts();
    getEndProducts();
    getProductToManufacture();
    handlereport();
  };

  const handlereport = () => {
    console.log(proId, expectedProduct);
  };
  const getEndProducts = () => {
    axios.get("/api/endProducts").then((res) => {
      setEndProduct(res.data);
    });
  };

  const getProducts = () => {
    axios.get("/api/products").then((res) => {
      setProduct(res.data);
    });
  };

  const getExpectedProducts = () => {
    axios.get("/api/expectedProduct").then((res) => {
      setExpectedProduct(res.data);
    });
  };

  const getRawArray = (product) => {
    console.log(product);
    for (var i = 0; i < product?.raw?.length; i++) {
      console.log(product?.raw[i]?.rm);
      axios
        .get(`/api/rawMaterial/${product?.raw[i]?.rm}`)
        .then((res) => {
          storeRaw.push(res.data.name);
          console.log(storeRaw);
          setGetRaw(storeRaw);
        });
    }

    // productToManufacture.map((item) => {

    //     rem = Number(item.qty_in_meter) - Number(productIdData.qty);
    //   });
  };
  // eslint-disable-next-line no-lone-blocks
  {
   // console.log(expectedProduct);
  }
  return (
    <Box className="d-flex">
      <SideNav />
      <Box className="p-5 w-100">
        <Paper elevation={4}>
          <div
            className="px-3 py-3 pt-4"
            style={{ color: "#219653", fontSize: 22 }}
          >
            Final Report of all time, with filters like month, contractor,
            product
          </div>
        </Paper>
        <br />
        <br />
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          placeholder="Used Qty in Meter"
          onChange={handleContractorId}
        >
          <option selected>Select Contractor from list</option>
          {contractors?.map((item) => {
            return <option id={item.id}>{item.name}</option>;
          })}
        </select>
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          placeholder="Used Qty in Meter"
          onChange={handleProductId}
        >
          <option selected>Select Product from list</option>
          {product?.map((item) => {
            return <option id={item.id}>{item.name}</option>;
          })}
        </select>
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr</TableCell>
                <TableCell align="right">Contractor Name</TableCell>
                <TableCell align="right">Date Of Product Given</TableCell>
                <TableCell align="right">Date of Product Recieving</TableCell>
                <TableCell align="right">Product Name</TableCell>
                <TableCell align="right">Expected ProDuct Qty.</TableCell>
                <TableCell align="right">Recieved Product</TableCell>
                <TableCell align="right">
                  Expected remaining Raw Material
                </TableCell>
                <TableCell align="right">Recieved Raw Material</TableCell>
                <TableCell align="right">Cost Per Pcs.</TableCell>
                <TableCell align="right">List of Raw Material given</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log(getRaw)} */}
              {contractorIdData &&
                endProduct &&
                productIdData &&
                expectedProduct &&
                storeRaw &&
                productToManufacture && (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {1}
                    </TableCell>
                    {/* {console.log(productIdData)} */}
                    <TableCell align="right">{contractorIdData.name}</TableCell>
                    <TableCell align="right">
                      {endProduct[0]?.giving_date}
                    </TableCell>
                    <TableCell align="right">
                      {endProduct[0]?.recieved_product_date}
                    </TableCell>
                    <TableCell align="right">{productIdData?.name}</TableCell>
                    <TableCell align="right">
                      {endProduct?.map((item) => {
                        if (item.raw_id === proId) {
                          return item.expected_product;
                        }
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {expectedProduct?.map((item) => {
                        if (item.raw_id === proId) {
                          return item.recieved_product;
                        }
                      })}
                    </TableCell>
                    {endProduct && storeRaw && (
                      <TableCell align="right">
                        {`${rem} meter ${storeRaw?.map((item) => item)}`}
                      </TableCell>
                    )}
                    <TableCell align="right">
                      {expectedProduct?.map((item) => {
                        if (item.raw_id === proId) {
                          return item.recieved_product;
                        }
                      })}
                    </TableCell>
                    <TableCell align="right">{costPerPcs}</TableCell>
                    {/* {console.log(getRaw)} */}
                    {storeRaw && productToManufacture && (
                      <TableCell align="right">{`${
                        productToManufacture[0]?.qty_in_meter
                      } mtr. ${getRaw?.map((item) => item)}`}</TableCell>
                    )}
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
      </Box>
    </Box>
  );
};

export default Report;
