import { Box } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
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
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axiousConfig from "../../axiousConfig";

const AddProduct = () => {
  const bg = "#74C3AD";
  const [contractor, setContractor] = useState("");
  const [product, setProduct] = useState("");
  const [productIdData, setProductIdData] = useState([]);
  const [storeRaw, setStoreRaw] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [products, setProducts] = useState([]);
  const [addProductToManufacturing, setAddProductToManufacturing] = useState({
    contractor: "",
    product: "",
    labour_cost_per_pcs: "",
    cur_date: "",
    raw_id: "",
  });
  const [productOpen, setProductOpen] = useState(false);
  const [prodId, setProId] = useState("");
  const [rawMaterial, setRawMaterial] = useState([]);
  const [productNumId, setNumId] = useState("");
  const [Num, setNum] = useState({
    qty_in_meter: "",
    price_per_meter: "",
    raw_id: "",
  });
  const [qim, setQim] = useState("");
  const [ppm, setPpm] = useState("");
  const [qtyInMeter, setQtyInMeter] = useState({});
  const [pricePerMeter, setPricePerMeter] = useState({});

  useEffect(() => {
    getProducts();
    getContractorData();
  }, []);

  const getProducts = () => {
    axiousConfig.get(`/getAllProduct`)
    .then((res) => {
      setProducts(res.data.data.list);
    });
  };

  const handleProductId = async (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const pro_id = el.getAttribute("id");
    console.log(pro_id);
    const res = await axiousConfig.get(`/product/${pro_id}`);
    console.log(res.data);
    setProductIdData(res.data);
    setProId(pro_id);
    //setTimeout(getRawArray(), 5000)
    getRawArray(res.data);
    // console.log(productIdData.rm)
  };

  const getRawArray = async (productIdData) => {
    const storeraw = [];

    for (let i = 0; i < productIdData?.raw?.length; i++) {
      // console.log(productIdData?.raw[i].rm);
      const res = await axiousConfig.get(
        `/rawMaterial/${productIdData?.raw[i].rm}`
      );
      //  console.log(res.data)
      if (res.data["rawid"] == undefined) {
        res.data["rawid"] = productIdData?.raw[i].rm;
      }
      storeraw.push(res.data);
    }

    setStoreRaw(storeraw);
  };
  const getContractorData = () => {
    axiousConfig.get(`/getAllContractor`).then((res) => {
      console.log(res.data.data.list)
      setContractors(res.data.data.list);
    });
  };

  let name, value;
  const handleAddProductToManufacturing = (e) => {
    name = e.target.name;
    value = e.target.value;
    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let d = newDate.getDate();
    let todayDate = d + "." + month + "." + year;

    addProductToManufacturing.cur_date = todayDate;
    setAddProductToManufacturing({
      ...addProductToManufacturing,
      [name]: value,
    });

    if (name == "product") {
      getRawMaterial();
    }

    // console.log(addProductToManufacturing);
  };

 // console.log(Num);
  const handleraw = () => {
   // console.log(Num.qty_in_meter, Num.price_per_meter);

    // axios
    //   .post(`/addProductToManufacture`, {
    //     qty_in_meter: Num.qty_in_meter,
    //     price_per_meter: Num.price_per_meter,
    //     raw_id: prodId,
    //   })
    //   .then((res) => {
    //     setProductOpen(true);
    //   });
  };
  const handleAddToManufacture = () => {
    const { contractor, product, labour_cost_per_pcs, cur_date, raw_id } =
      addProductToManufacturing;
    axiousConfig
      .post("/addProductToManufacturing", {
        contractor: contractor,
        product: productIdData.name,
        labour_cost_per_pcs: labour_cost_per_pcs,
        cur_date: cur_date,
        raw_id: prodId,
      })
      .then((res) => {
        // console.log(res.data);
      }); 
     axiousConfig.post(`/addProductToManufacture/${prodId}`, {
      "rawMaterial": raw_id,
      "quantity": 0.01,
      "note":"xyz"
      })
      .then((res) => {
        setProductOpen(true);
      });

    // const selectedProduct = products.find((item) => item.id == prodId);
    // console.log(selectedProduct); 
    for (let i = 0; i < productIdData?.raw?.length; i++) {
      const selectedRaw = productIdData.raw[i];
      console.log(selectedRaw);
      console.log(productIdData)
      axios
      .post("/addProductToManufacture", {
        qty_in_meter: qtyInMeter[selectedRaw.rm],
        price_per_meter: pricePerMeter[selectedRaw.rm],
        raw_id: prodId,
      })
      .then((res) => {
        setProductOpen(true);
      });
    }
   

  
  };

  const getRawMaterial = () => {
    axiousConfig.get("/rawMaterial").then((res) => {
      setRawMaterial(res.data);
    });
  };

  const handleQuantitiyInMetere = (e, id) => {
    value = e.target.value;
    console.log(id);
    setNumId(id);
    // console.log(value);
    setQtyInMeter({ ...qtyInMeter, [id]: value });

    // setQim(Num.qty_in_meter);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setProductOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [productOpen]);
  const handlePricePerMeter = (e, id) => {
    value = e.target.value;
    console.log(id);

    setPricePerMeter({ ...pricePerMeter, [id]: value });

   
    handleraw();
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
            Assign Raw Material to Contractor
          </div>
        </Paper>
        <br />
        <br />
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          name="contractor"
          onChange={handleAddProductToManufacturing}
          value={addProductToManufacturing.name}
        >
          <option selected>Select Contractor from list</option>
          {contractors.map((item) => {
            return <option>{item.name}</option>;
          })}
        </select>
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          name="product"
          onChange={handleProductId}
        >
          <option selected>Select raw Material from list</option>
          {products?.map((item) => {
            return <option id={item.id}>{item.name}</option>;
          })}
        </select>
        <br />
        <br />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rmku</TableCell>
                <TableCell align="center">Raw Material Name</TableCell>
                <TableCell align="center">Availabe Quantity</TableCell>
                <TableCell align="center">Quantity to Assign</TableCell>
                <TableCell align="center">Price per meter</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log(storeRaw)} */}
              {storeRaw?.map((row) => (
                <TableRow
                  key={row.rawid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.rmku}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <input
                      type={"number"}
                      style={{ maxWidth: 300, minWidth: 300, maxHeight: 50 }}
                      className="global-input-2"
                      name="qty_in_meter"
                      onChange={(e) => handleQuantitiyInMetere(e, row.rawid)}
                      value={setQtyInMeter[row.rawid]}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <input
                      type={"number"}
                      style={{ maxWidth: 300, minWidth: 300, maxHeight: 50 }}
                      className="global-input-2"
                      name="price_per_pcs"
                      onChange={(e) => handlePricePerMeter(e, row.rawid)}
                      value={setPricePerMeter[row.rawid]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <Box className="d-flex justify-content-between align-items-center">
          <div
            style={{
              border: `1px solid ${bg}`,
              padding: 12,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#219653",
                borderRight: "1px solid #000",
                paddingRight: 14,
                fontSize: 19,
              }}
            >
              Labour Cost per pcs
            </div>
            <div style={{ paddingLeft: 14 }}>
              <input
                type={"number"}
                className="input-cost"
                placeholder="00.00"
                style={{ width: 100 }}
                name="labour_cost_per_pcs"
                onChange={handleAddProductToManufacturing}
                value={addProductToManufacturing.name}
              />
            </div>
            <div style={{ color: "#219653", paddingRight: 14, fontSize: 19 }}>
              INR
            </div>
          </div>
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
              onClick={handleAddToManufacture}
            >
              Assign
            </button>
          </div>
          {productOpen && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="info">Added product to manufacturing!!</Alert>
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;
