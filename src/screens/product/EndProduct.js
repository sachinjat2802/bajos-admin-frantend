import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
//import Img1 from "../../assets/bubble.png";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
//import { Fab } from "@mui/material";
//import Img2 from "../../assets/left-arrow.png";
import SideNav from "../../components/SideNav";
//import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axiousConfig from "../../axiousConfig";

const EndProduct = () => {
  const bg = "#74C3AD";
 // const [contractor, setContractor] = useState("");
//  const [product, setProduct] = useState("");
//  const [productIdData, setProductIdData] = useState([]);
//  const [storeRaw, setStoreRaw] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [products, setProducts] = useState([]);
  const [addProductToManufacturing, setAddProductToManufacturing] = useState({
    contractor: "",
    product: "",
    labourCost:""
  });
  const [productOpen, setProductOpen] = useState(false);
  const [RawMaterialAssignedToContractors,setRawMaterialAssignedToContractors]=useState([])
  const [ setError] = useState("")
 // const [prodId, setProId] = useState("");
  const [ setRawMaterial] = useState([]);
 
  // const [Num, setNum] = useState({
  //   qty_in_meter: "",
  //   price_per_meter: "",
  //   raw_id: "",
  // });
 // const [qim, setQim] = useState("");
 // const [ppm, setPpm] = useState("");
  // const [qtyInMeter, setQtyInMeter] = useState({});

  useEffect(() => {
    getProducts();
    getContractorData();
    getRawMaterialAssignedToContractors()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRawMaterialAssignedToContractors = async (ProductId) =>{
    await axiousConfig.get(`/getAllProductsRecieved`)
    .then(res=>{
      console.log(res.data.data)
        setRawMaterialAssignedToContractors(res.data.data)
    })
    .catch(err=>setError(err.response.data.message))
}
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
    addProductToManufacturing.product=pro_id
    setAddProductToManufacturing({
      ...addProductToManufacturing,
      [name]: value,
    });

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
 // const handleraw = () => {
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
 // };
  const handleAddToManufacture = () => {
    console.log(addProductToManufacturing)
    const { contractor, product,labourCost} =
      addProductToManufacturing;
    axiousConfig
      .post( `/recieveProduct/${product}`, {
        contractorId: contractor,
        labourCost:labourCost    
      })
      .then((res) => {
        // console.log(res.data);
      }); 

    // const selectedProduct = products.find((item) => item.id == prodId);
    // console.log(selectedProduct); 
    // for (let i = 0; i < productIdData?.raw?.length; i++) {
    //   const selectedRaw = productIdData.raw[i];
    //   console.log(selectedRaw);
    //   console.log(productIdData)
    //   axios
    //   .post("/addProductToManufacture", {
    //     qty_in_meter: qtyInMeter[selectedRaw.rm],
    //     price_per_meter: pricePerMeter[selectedRaw.rm],
    //     raw_id: prodId,
    //   })
    //   .then((res) => {
    //     setProductOpen(true);
    //   });
    // }
   

  
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


  useEffect(() => {
    getRawMaterialAssignedToContractors()

    const timeId = setTimeout(() => {

      setProductOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productOpen]);
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
    { id: 'sku', label: 'sku', minWidth: 150 },
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'productName', label: 'productName', minWidth: 170 },
    { id: 'quentity', label: 'Quentity', minWidth: 170 },
    { id: 'price', label: 'PricePerPiece', minWidth: 170 },
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
                name="labourCost"
                onChange={handleNewProduct}
                value={addProductToManufacturing.labourCost}
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
              <Alert severity="info"> product recieved</Alert>
            </Stack>
          )}
        </Box>

        <br />
        <br />
        

      
        <br />
        <br />
        <Paper elevation={2}>
                <BasicTable3 RawMaterialAssignedToContractors={RawMaterialAssignedToContractors} />
                </Paper>
      </Box>
    </Box>
  );
};

export default EndProduct;