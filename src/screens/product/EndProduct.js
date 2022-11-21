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
import { Fab, getAccordionDetailsUtilityClass } from "@mui/material";
import Img2 from "../../assets/left-arrow.png";
import SideNav from "../../components/SideNav";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const EndProduct = () => {
  const bg = "#74C3AD";
  const [contractor, setContractor] = useState([]);
  const [product, setProduct] = useState([]);
  const [contractorIdData, setContractorIdData] = useState([]);
  const [productIdData, setProductIdData] = useState([]);
  const [getAddToManufacturing, setGetAddToManufacturing] = useState([]);
  const [expectedProduct, setExpected] = useState(0);
  const [rem, setRem] = useState(0);
  const [rawMaterial, setRawMaterial] = useState([]);
  const [endProduct, setEndProduct] = useState({
    expected_product: "",
    expected_raw_material: "",
    giving_date: "",
    recieved_product_date: "",
    raw_id: "",
  });

  const [recievedProduct, setRecievedProduct] = useState({});
  const [recievedRaw, setRecievedRaw] = useState({});
  const [productNumId, setNumId] = useState("");
  const [Num, setNum] = useState({
    recieved_product: "",
    recieved_raw: "",
    raw_id: "",
  });
  const [proId, setProId] = useState("");
  const [productOpen, setProductOpen] = useState(false);
  const [storeRaw, setStoreRaw] = useState([]);
 const [cloth , setCloth] = useState('')
  const handleRecievedProduct = (e, id) => {
    value = e.target.value;
    // console.log(productIdData.rm)
    setNumId(id);
    // console.log(recievedProduct)

    setRecievedProduct({ recieved_product: value });
  };

  const handleRecievedRaw = (e, id) => {
    value = e.target.value;
    // console.log(recievedRaw)
    setRecievedRaw({ recieved_raw: value });
  };

  useEffect(() => {
    getProducts();
    getContractorData();
    getAddToManu();
    getRawMaterial();
  }, []);

  useEffect(() => {
    calculateExpectedPro();
  }, [productIdData]);
  const getRawArray = (product, id) => {
    console.log(product);
    let arr =[]
    let arrqty= []
    for (var i = 0; i < product?.raw?.length; i++) {

     // console.log(product?.raw[i]?.rm);
     
      axios
        .get(`/api/rawMaterial/${product?.raw[i]?.rm}`)
        .then((res) => {
          console.log(res.data.name);
          arr.push(res.data.name)
          
        });
       
    }
    
    for ( var k= 0 ; k< getAddToManufacturing?.length ; k++){
    //  console.log(getAddToManufacturing?.raw_id, id)
      if ( getAddToManufacturing[k]?.raw_id === id){
        arrqty.push(getAddToManufacturing[k]?.qty_in_meter)
      }
    }
   // console.log(arrqty,arr)
    var max= Number(arrqty[0]);
    var cloth = "";
    for ( var j =1 ; j< arrqty?.length; j++){
      if ( Number(arrqty[j]) > Number(max)){
        max= arrqty[i];
cloth += arr[i];
//console.log(cloth)
      }
    }
   // console.log(cloth)
   

    setStoreRaw(arr);

  };
  const calculateExpectedPro = () => {
   var arr =[];
   var cloth = []
    // console.log(productIdData, getAddToManufacturing, proId)
    for (var i = 0; i < getAddToManufacturing.length; i++) {
      for (var j = 0; j < productIdData?.raw?.length; j++) {
        if (proId === getAddToManufacturing[i]?.raw_id) {
//console.log(
  //          getAddToManufacturing[i]?.qty_in_meter,
    //        productIdData?.raw[j]?.qty
      //    );

         
          
          var expect = Math.floor(
            Number(getAddToManufacturing[i]?.qty_in_meter) /
              Number(productIdData?.raw[j]?.qty)
          );
          cloth.push(productIdData?.raw[j]?.rm);
         
        // console.log(getAddToManufacturing[i]?.qty_in_meter, expectedProduct, productIdData?.raw[j]?.qty)
        // if (i === j){
        //   console.log();
        //   var remain =  Math.floor(Number(getAddToManufacturing[i]?.qty_in_meter) /Number(productIdData?.raw[j]?.qty));
        //     var remain = Math.abs(Math.floor((Number(getAddToManufacturing[i]?.qty_in_meter)-(( Number(getAddToManufacturing[i]?.qty_in_meter)) /
        //   Number(productIdData?.raw[j]?.qty))*Number(productIdData?.raw[j]?.qty))));
        //     console.log(remain)
        //  remarr.push(remain)
        // }
                
        }
       
      }
      
      if( expect !== undefined && expect > 0){
        arr.push(expect)
      }
         
    }

    
    var remarr =  arr.filter((v, i, a) => a.indexOf(v) === i);
    cloth  = cloth.filter((v,i,a) => a.indexOf(v) === i);
    console.log(cloth[1])
    axios.get(`/api/rawMaterial/${cloth[1]}`).then((res) => setCloth(res.data.name))
    arr.sort((a,b) => a-b); 
    
   // console.log(arr)
   
   // console.log(remarr)
    remarr = remarr[1]-remarr[0]
    setRem(remarr)
   // remarr.sort((a,b) => b-a);
    // if (remarr?.length > 1){
    //   setRem(remarr[0])
    // } else {
    //   remarr.sort((a,b) => a-b);
    //   setRem(remarr[0]);
    // }
   
   
    setExpected(arr[0])
   // console.log(remarr)
   
   
   
  };
  let name, value;
  const handleEndProduct = (e) => {
    name = e.target.name;
    value = e.target.value;
    // console.log(endProduct);
    setEndProduct({ ...endProduct, [name]: value });
  };

  //   for ( var i =0; i< productIdData.rm.length; i++){
  //       console.log(productIdData.rm[i])
  //   }
  // getAddToManufacturing.map((item) => {
  //  for ( var i =0 ; i< productIdData?.raw?.length ; i++){
  //   rem = Number(item.qty_in_meter) - Number(productIdData?.raw[i].qty);
  //   localStorage.setItem("rem",rem)
  //  }

  // });

  const handleEndProductData = () => {
    const {
      expected_product,
      expected_raw_material,
      giving_date,
      recieved_product_date,
      raw_id,
    } = endProduct;

    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let d = newDate.getDate();
    let todayDate = d + "." + month + "." + year;
    if (month <= 12 || month >= 1) {
      var recieveddate = month + 1;
      var newdate = d + "." + recieveddate + "." + year;
    }
    endProduct.giving_date = todayDate;
    endProduct.recieved_product_date = newdate;
    endProduct.expected_product = expectedProduct;
    endProduct.expected_raw_material = rem;
    //console.log(endProduct)
    for (var i = 0; i < productIdData?.rm?.length; i++) {
      // console.log(productIdData.rm[i])
    }
    axios
      .post("/api/addEndProduct", {
        expected_product: expectedProduct,
        expected_raw_material: endProduct.expected_raw_material,
        giving_date: endProduct.giving_date,
        recieved_product_date: endProduct.recieved_product_date,
        raw_id:proId
      })
      .then((res) => {
        // console.log(res.data);
      });

    Num.recieved_product = recievedProduct.recieved_product;
    Num.recieved_raw = recievedRaw.recieved_raw;
    // console.log(productIdData)
    axios
      .post("/api/addExpectedProduct", {
        recieved_product: Num.recieved_product,
        recieved_raw: Num.recieved_raw,
        raw_id: proId,
      })
      .then((res) => {
        setProductOpen(true);
      });
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setProductOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [productOpen]);
  const getProducts = () => {
    axios.get("/api/products").then((res) => {
      setProduct(res.data);
    });
  };

  const getContractorData = () => {
    axios.get("/api/contractors").then((res) => {
      setContractor(res.data);
    });
  };

  const handleContractorId = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const con_id = el.getAttribute("id");
    axios.get(`/api/contractor/${con_id}`).then((res) => {
      setContractorIdData(res.data);
      // console.log(res.data);
    });
  };

  const handleProductId = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const pro_id = el.getAttribute("id");
    axios.get(`/api/product/${pro_id}`).then((res) => {
      setProductIdData(res.data);
      setProId(pro_id);
      getRawArray(res.data, pro_id);
    });

    // console.log(productIdData.rm)
  };

  const getAddToManu = () => {
    axios.get("/api/productToManufacture").then((res) => {
      setGetAddToManufacturing(res.data);
      // console.log(res.data);
    });
  };

  const getRawMaterial = () => {
    axios.get("/api/rawMaterial").then((res) => {
      setRawMaterial(res.data);
    });
  };

  return (
    <Box className="d-flex">
      <SideNav />
      <Box className="p-5 w-100">
        <Paper elevation={4}>
          <div
            className="px-3 py-3 pt-4"
            style={{ color: "#219653", fontSize: 22 }}
          >
            End product recived
          </div>
        </Paper>
        <br />
        <br />
        {/* {console.log(contractor, product)} */}
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          placeholder="Used Qty in Meter"
          onChange={handleContractorId}
        >
          <option selected>Select Contractor from list</option>
          {contractor.map((item) => {
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

          {product.map((item) => {
            return <option id={item.id}>{item.name}</option>;
          })}
        </select>
        <br />
        <br />
        <TableContainer component={Paper}>
          {/* {console.log(contractorIdData, productIdData)} */}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr</TableCell>
                <TableCell align="right">Expected Products</TableCell>
                <TableCell align="right">
                  Expected Remaining Raw Materials
                </TableCell>
                <TableCell align="center">Enter Recieved Product</TableCell>
                <TableCell align="center">Enter Raw Material</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log(productIdData.rm)} */}

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {1}
                </TableCell>
                <TableCell align="center">{expectedProduct}</TableCell>
                {/* {console.log(getAddToManufacturing)} */}
                <TableCell align="center">{`${rem} meter ${cloth}`}</TableCell>

                <TableCell align="center">
                  {" "}
                  <input
                    type={"number"}
                    style={{ maxWidth: 300, minWidth: 300, maxHeight: 50 }}
                    className="global-input-2"
                    name="recieved_product"
                    onChange={(e) =>
                      handleRecievedProduct(e, productIdData?.raw?.rm)
                    }
                    value={recievedProduct[productIdData?.raw?.rm]}
                  />
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {console.log(productIdData?.raw?.rm)}
                  <input
                    type={"number"}
                    style={{ maxWidth: 300, minWidth: 300, maxHeight: 50 }}
                    className="global-input-2"
                    name="recieved_raw"
                    onChange={(e) =>
                      handleRecievedRaw(e, productIdData?.raw?.rm)
                    }
                    value={recievedRaw[productIdData?.raw?.rm]}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <br />
        <br />
        <Box className="d-flex justify-content-between align-items-center">
          <div></div>
          <div>
            <button
              className="btn my-4"
              style={{
                width: 300,
                height: 55,
                color: "#219653",
                border: `1px solid ${bg}`,
                fontWeight: 600,
                fontSize: 21,
              }}
              onClick={handleEndProductData}
            >
              Submit
            </button>
          </div>
          {productOpen && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="info">End Product Added!!</Alert>
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EndProduct;
