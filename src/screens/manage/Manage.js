import axiousConfig from '../../axiousConfig'
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
import SideNav from "../../components/SideNav";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';



const Manage = () => {
  const bg = "#74C3AD";
  
  const [rawMaterialData, setRawMaterialData] = useState({
    name: "",
    sr: "",
    sku: "",
    messure_unit: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    sr: "",
    sku: "",
    category: "",
    raw: "",
  });

  const [rawMaterial, setRawMaterial] = useState([]);
  const [rawOpen, setRawOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getRawMaterial();
    getProducts();
  }, []);
  const getRawMaterial = () => {
    axios.get("/getAllRawMaterial")
    .then((res) => {
      setRawMaterial(res.data.data.list);
    });
  };

  const getProducts = () => {
    axios.get("/api/products").then((res) => {
      setProduct(res.data);
    });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // const [rawMat, setRawMat] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [personName, setPersonName] = useState([]);
  const [qty, setQty] = useState("");
  const [form, setForm] = useState([
    {
      rm: "",
      qty: "",
    },
  ]);

  const handleChange = (e, index) => {
    let data = [...form];
    data[index][e.target.name] = e.target.value;

    setForm(data);
  };
  let name, value;

  const handleRawMaterial = (e) => {
    name = e.target.name;
    value = e.target.value;
    setRawMaterialData({ ...rawMaterialData, [name]: value });
  };

  const handleNewProduct = (e) => {
    // console.log(form)
    name = e.target.name;
    value = e.target.value;

    newProduct.raw = form;
    setNewProduct({ ...newProduct, [name]: value });
    //  console.log(newProduct)
  };

  const postRawMaterial = () => {
    const { name, sr, sku, messure_unit } = rawMaterialData;
    axios
      .post("/api/addRawMaterial", {
        name: name,
        sr: rawMaterial.length + 1,
        sku: sku,
        messure_unit: messure_unit,
      })
      .then((res) => {
        setRawOpen(true);
        window.location.reload(true);
      });
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setRawOpen(false);
      setProductOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [rawOpen, productOpen]);

  const [addDiv, setAddDiv] = useState([]);
  const [rawMaterialInput, setRawMaterialInput] = useState([]);
  const [rawQuantity, setRawQuantity] = useState([]);

  // console.log(rawMaterialInput);
  const postNewProduct = () => {
    const { name, sr, sku, category, raw } = newProduct;
    axios
      .post("/api/addNewProduct", {
        name: name,
        sr: product.length + 1,
        sku: sku,
        category: category,
        raw: form,
      })
      .then((res) => {
        setProductOpen(true);
        window.location.reload(true);
      });
  };

  const handleAddDiv = () => {
    let obj = {
      rm: "",
      qty: "",
    };
    setForm([...form, obj]);
  };
  const handleDeleteDiv = (index) => {
    let data = [...form];
    data.splice(index, 1);
    setForm(data);
  };
  return (
    <>
      <Box className="d-flex">
        <SideNav />
        <Box className="p-5 w-100">
          <Paper elevation={4}>
            <div
              className="px-3 py-3 pt-4"
              style={{ color: "#219653", fontSize: 22 }}
            >
              Manage Raw Materials
            </div>
            <TableData />
          </Paper>
          <br />
          {/* <Paper elevation={4}>
            <div
              className="px-3 py-3 pt-4"
              style={{ color: "#219653", fontSize: 22 }}
            >
              All Products
            </div>
            <TableDataProduct />
          </Paper> */}
        </Box>
      </Box>
    </>
  );
};

export default Manage;

function TableData() {
  
  const navigate = useNavigate();
  const columns = [
    { id: "serialNo", label: "Sr", minWidth: 170 },
    { id: "sku", label: "sku", minWidth: 100 },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    { id: "quantityAvailable", label: "Availabe Quantity", minWidth: 100 },
    {
      id: "measurementUnit",
      label: "Messure Unit",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
      render: (id) => (
        // <Button onClick={() => handleRawProductDelete(id)} key={rawMaterial.id}>
        //   {/* {console.log(rawMaterial)} */}
        //   Delete
        // </Button>
        <Button onClick={() => handleRawProductEdit(id)} key={rawMaterial.id}>
          {/* {console.log(rawMaterial)} */}
          Edit
        </Button>
      ),
    },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rawMaterial, setRawMaterial] = useState([]);

  useEffect(() => {
    getRawMaterial();
  }, [page,rowsPerPage]);
  const getRawMaterial = () => {
    axiousConfig.get(`getAllRawMaterial/?page=${page}&limit=${rowsPerPage}`)
    .then((res) => {
      // console.log(res.data.data.list)
      setRawMaterial(res.data.data.list);
    });
  };
  // console.log(rawMaterial);
  const show_item_after_delete = () => {
    setTimeout(() => {
      axios.get(`/api/rawMaterial`).then((res) => {
        setRawMaterial(res.data);
      });
    }, 500);
  };

  const handleRawProductEdit = (id) =>{
    navigate("/manage/raw/"+id);
  }

  const handleRawProductDelete = (id) => {
    rawMaterial.forEach((item) => {
      if (item.id === id) {
        axios.delete(`/api/rawMaterial/${id}`).then((res) => {
          // console.log('deleted')
          window.location.reload(true);
        });
      }
      show_item_after_delete();
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }} elevation={0}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rawMaterial
              // ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      // console.log(value)
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.render && column.render(row.id)}
                          {column.format && typeof value === "number"
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
        count={rawMaterial.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

function TableDataProduct() {
  const Productcolumns = [
    { id: "sr", label: "Sr", minWidth: 170 },
    { id: "sku", label: "Sku", minWidth: 100 },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "cost",
      label: "Cost",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      render: () => <>{report[0]?.cost_of_pcs}</>,
    },
    {
      id: "qty",
      label: "Ava Qty",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
      render: () => <>{ProToManufacture[0]?.qty_in_meter}</>,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
      render: (id) => (
        <Button onClick={() => handleProductDelete(id)} key={product.id}>
          {/* {console.log(product)} */}
          Delete
        </Button>
      ),
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [product, setProduct] = useState([]);
  const [ProToManufacture, setProToManufacture] = useState([]);
  const [report, setReport] = useState([]);
  const totalCost = [];
  const [expectedProduct, setExpectedProduct] = useState([]);

  const getProToManufacture = () => {
    axios.get("/api/productToManufacture").then((res) => {
      setProToManufacture(res.data);
    });
  };
  const getExpectedProducts = () => {
    axios.get("/api/expectedProduct").then((res) => {
      setExpectedProduct(res.data);
    });
  };
  useEffect(() => {
    getProducts();
    getProToManufacture();
    getExpectedProducts();
    handleTotalCost();
  }, []);

  const getProducts = () => {
    axiousConfig.get("/api/products")
    .then(res => {
      setProduct(res.data);
    });
  };
  //console.log(totalCost);
  for (var i = 0; i < product?.length; i++) {
    for (var j = 0; j < report?.length; j++) {
      if (product[i]?.id === report[j]?.raw_id) {
        localStorage.setItem("cost", [report[j].cost_of_pcs]);
      }
    }
  }

  const handleTotalCost = () => {
    axios.get("/api/report").then((res) => {
      setReport(res.data);
    });
  };
  const show_item_after_delete = () => {
    setTimeout(() => {
      axios.get(`/api/products`).then((res) => {
        setProduct(res.data);
      });
    }, 500);
  };

  const handleProductDelete = (id) => {
    product.forEach((item) => {
      if (item.id === id) {
        // console.log(item.id, id);
        axios.delete(`/api/product/${id}`).then((res) => {
          window.location.reload(true);
        });
      }
      show_item_after_delete();
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }} elevation={0}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Productcolumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log(product)} */}
            {product
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {Productcolumns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {/* {console.log(row)} */}
                          {column.render && column.render(row.id)}
                          {column.format && typeof value === "number"
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
        count={product.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
