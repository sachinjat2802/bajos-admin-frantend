/* eslint-disable no-unused-vars */
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
    quantity:"", 
    note:"",
    pricePerUnit:""
  });
  const [productOpen, setProductOpen] = useState(false);
  const [RawMaterialAssignedToContractors,setRawMaterialAssignedToContractors]=useState([])
  const [error, setError] = useState({
    code : null,
    message : ""
  })
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
    getRawMaterialAssignedToContractors()

  }, []);

  const getRawMaterialAssignedToContractors = async (ProductId) =>{
    await axiousConfig.get(`/getRawMaterialAssignedToAllContracters`)
    .then(res=>{
      console.log(res.data.data)
        setRawMaterialAssignedToContractors(res.data.data)
    })
    .catch(err=>setError(err.response.data.message))
}
  const getProducts = () => {
    axiousConfig.get(`/getAllRawMaterial`)
    .then((res) => {
      setProducts(res.data.data.list);
    });
  };

  const handleProductId = async (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const pro_id = el.getAttribute("id");
    console.log(pro_id);
    addProductToManufacturing.product=pro_id
    setAddProductToManufacturing({
      ...addProductToManufacturing,
      [name]: value,
    });

  };

  const getRawArray = async (productIdData) => {
    const storeraw = [];

    for (let i = 0; i < productIdData?.raw?.length; i++) {
      // console.log(productIdData?.raw[i].rm);
      const res = await axiousConfig.get(
        `/rawMaterial/${productIdData?.raw[i].rm}`
      );
      //  console.log(res.data)
      if (res.data["rawid"] === undefined) {
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
    
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const  id= el.getAttribute("id");

    name = e.target.name;
    value = e.target.value;
   addProductToManufacturing.contractor=id
    setAddProductToManufacturing({
      ...addProductToManufacturing,
      [name]: value,
    });

    if (name === "product") {
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
    console.log(addProductToManufacturing)
    const { contractor, product, quantity, note, pricePerUnit } =
      addProductToManufacturing;
    setError({})
    axiousConfig
      .put( `/assignRawMaterialToContractor/${contractor}`, {
        contractor: contractor,
        "rawMaterial":product,
        "quantity": quantity,
        "note":note,
        "pricePerUnit":pricePerUnit
      })
      .then((res) => {
        setError({
          code : res.data.statusCode,
          message : res.data.message
        })
        getRawMaterialAssignedToContractors()
        getContractorData()
        setAddProductToManufacturing({
          contractor: "",
          product: "",
          quantity:"", 
          note:"",
          pricePerUnit:""
        })
      }).catch((err)=>{
        setError({
          code : err.response.data.status?err.response.data.status:err.response.data.statusCode,
          message : err.response.data.message
        }) 
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
  const handleNewProduct = (e) => {
        name = e.target.name;
        value = e.target.value;

        setAddProductToManufacturing({ ...addProductToManufacturing, [name]: value });
  }

  const handleQuantitiyInMetere = (e, id) => {
    value = e.target.value;
    console.log(id);
    setNumId(id);
    // console.log(value);
    setQtyInMeter({ ...qtyInMeter, [id]: value });

    // setQim(Num.qty_in_meter);
  };

  useEffect(() => {
    getRawMaterialAssignedToContractors()

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
  function createData(date, qty, name, note, sku) {
    return { date, qty, name, note, sku };
}
  const rows = [
    createData('12-10-15', 159, "Something something", 'John doe', 123),
    createData('12-15-15', 237, "Lorem ispum", "Someone", 123),
    createData('10-8-22', 262, "Virat Kohli", "XD XD XD", 123),
    createData('8-12-12', 305, "sachin endulat", "Sheetal", 123),
    createData('12-2-24', 356, "Donald Trump", "Siddharth", 123),

];

  const columns3 = [
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'contractor', label: 'Contractor', minWidth: 170 },
    { id: 'rawMaterial', label: 'RawMaterial', minWidth: 150 },
    { id: 'quantity', label: 'quantity', minWidth: 170 },
    { id: 'pricePerUnit', label: 'Price per unit', minWidth: 150 },


    
];

  function BasicTable3({RawMaterialAssignedToContractors}) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns3.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {RawMaterialAssignedToContractors
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns3.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

  return (
    <Box className="d-flex">
      <SideNav />
      <Box className="p-5 w-100">
        {error.code&&
        <Alert className="m-2" severity={error.code==200?"success":"error"} onClose={()=>{setError({})}}>
            {error.message}
        </Alert>
        }
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
          id="contractor"
          onChange={handleAddProductToManufacturing}
          value={addProductToManufacturing.id}
        >
          <option selected>Select Contractor from list</option>
          {contractors.map((item) => {
            return <option id={item.id}>{item.name}</option>;
          })}
        </select>
        <select
          type={"text"}
          style={{ width: "100%" }}
          className="global-input-2"
          id="product"
          onChange={handleProductId}
        >
          <option selected>Select raw Material from list</option>
          {products?.map((item) => {
            return <option id={item.id}>{item.name}</option>;
          })}
        </select>

        <input
            type={"number"}
            style={{ width: "15%" }}
            className="global-input-2"
            placeholder="Qty"
            name="quantity"
            onChange={(e)=>{
              if(e.target.value<0){
                e.target.value = 0
              } 
              handleNewProduct(e)
            }}
            value={addProductToManufacturing.quantity} />
        <input
            type={"number"}
            style={{ width: "15%" }}
            className="global-input-2"
            placeholder="PricePerUnit"
            name="pricePerUnit"
            onChange={(e)=>{
              if(e.target.value<0){
                e.target.value = 0
              } 
              handleNewProduct(e)
            }}
            value={addProductToManufacturing.pricePerUnit} />
      <input
            type={"text"}
            style={{ width: "70%" }}
            className="global-input-2"
            placeholder="note"
            name="note"
            onChange={handleNewProduct}
            value={addProductToManufacturing.note} />

        <br />
        <br />
        <div align="right">
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

      
        <br />
        <br />
        <Paper elevation={2}>
                <BasicTable3 RawMaterialAssignedToContractors={RawMaterialAssignedToContractors} />
                </Paper>
      </Box>
    </Box>
  );
};

export default AddProduct;