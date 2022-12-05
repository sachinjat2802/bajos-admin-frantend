/* eslint-disable no-unused-vars */
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
// import Img1 from "../../assets/bubble.png";
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
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axiousConfig from '../../axiousConfig'

const AddProductTwo = () => {
    const bg = "#74C3AD";
    const [rawMaterialData, setRawMaterialData] = useState({
        name: "",
        sr: "",
        sku: "",
        quantityAvailable: "",
        measurementUnit: "",
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
    const [error, setError] = useState("");

    const [RawMaterialMeasureUnits, setRawMaterialMeasureUnits] = useState([])

    useEffect(() => {
        getRawMaterialMeasureUnits();
        getRawMaterial();
        getProducts();
    }, []);

    const getRawMaterialMeasureUnits = () => {
        axiousConfig.get(`/rawMaterialMeasureUnits`)
            .then(res=>setRawMaterialMeasureUnits(res.data.data))
            .catch(err=>console.log(err.response.data.message))
    }

    const getRawMaterial = () => {
        axiousConfig.get("/getAllRawMaterial").then((res) => {
            setRawMaterial(res.data);
        });
    };

    const getProducts = () => {
        axiousConfig.get("/getAllProduct").then((res) => {
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
        // const { name, sr, rmku, messure_unit } = rawMaterialData;
        const { name, sr, sku, measurementUnit, quantityAvailable } = rawMaterialData;
        axiousConfig.post("/addRawMaterial", {
                name: name,
                // sr: rawMaterial.length + 1,
                sku: sku,
                measurementUnit: measurementUnit,
                quantityAvailable:quantityAvailable
            })
            .then((res) => {
                setRawOpen(true);
                setRawMaterialData({
                    name: "",
                    sr: "",
                    sku: "",
                    quantityAvailable: "",
                    measurementUnit: "",
                })

            })
            .catch(err=>setError(err.response.data.message));
    };

    useEffect(() => {
        const timeId = setTimeout(() => {
            setRawOpen(false);
            setProductOpen(false);
            setError("")
        }, 5000);

        return () => {
            clearTimeout(timeId);
        };
    }, [rawOpen, productOpen,error]);

    const [addDiv, setAddDiv] = useState([]);
    const [rawMaterialInput, setRawMaterialInput] = useState([]);
    const [rawQuantity, setRawQuantity] = useState([]);

    // console.log(rawMaterialInput);
    // const postNewProduct = () => {
    //     const { name, sr, sku, category, raw } = newProduct;
    //     axios
    //         .post("/api/addNewProduct", {
    //             name: name,
    //             sr: product.length + 1,
    //             sku: sku,
    //             category: category,
    //             raw: form,
    //         })
    //         .then((res) => {
    //             setProductOpen(true);
    //             window.location.reload(true);
    //         });
    // };

    // useEffect(() => {
    //   if (rawMaterial.length > 0 && addDiv.length === 0) {
    //     setAddDiv(
    //       addDiv.concat(
    //         <Input
    //           setRawMateriaInput={setRawMaterialInput}
    //           rawMaterialInput={rawMaterialInput}
    //           rawQuantity={rawQuantity}
    //           setRawQuantity={setRawQuantity}
    //           rawMaterial={rawMaterial}
    //           key={addDiv.length}
    //         />
    //       )
    //     );
    //   }
    // }, [rawMaterial]);

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
  /* RAW MATERIALLLLLL */
    return (
        <>
            <Box className="d-flex">
                <SideNav />
                <Box className="p-5 w-100">
                    <br />
                    <Box style={{ padding: "0 10%" }}>
                        <Box className="text-center">
                            {rawOpen && (
                                <Stack sx={{ width: "100%" }} spacing={2}>
                                    <Alert severity="success">Raw Material added!!</Alert>
                                </Stack>
                            )}
                            {error && (
                                <Stack sx={{ width: "100%" }} spacing={2}>
                                    <Alert severity="error">{error}</Alert>
                                </Stack>
                            )}
                            <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 15 }}>
                                Add new Raw Material
                            </div>
                            <Box style={{ display: "flex", }}>
                                {/* <input
                                    type={"text"}
                                    style={{ minWidth: 250, maxWidth: 350 }}
                                    className="global-input-2"
                                    placeholder="S. No."
                                    name="Serial Number"
                                    onChange={handleRawMaterial}
                                    value={rawMaterialData.name}
                                />
                                <div style={{ width: 50 }}></div> */}
                                <input
                                    type={"text"}
                                    style={{ width: "100%" }}
                                    className="global-input-2"
                                    placeholder="Name"
                                    name="name"
                                    onChange={handleRawMaterial}
                                    value={rawMaterialData.name}
                                    required
                                />
                            </Box>
                            <Box className="d-flex justify-content-between">
                                <input
                                    disabled
                                    type={"number"}
                                    style={{ maxWidth: 270, color: "lightgray" }}
                                    className="global-input-2"
                                    placeholder="Sr"
                                    name="sr"
                                    onChange={handleRawMaterial}
                                    value={rawMaterialData.sr}
                                    required
                                />
                                <input
                                    type={"text"}
                                    style={{ maxWidth: 270 }}
                                    className="global-input-2"
                                    placeholder="Sku"
                                    name="sku"
                                    onChange={handleRawMaterial}
                                    value={rawMaterialData.sku}
                                    required
                                />
                                <select
                                    type={"text"}
                                    style={{ maxwidth: 270, minWidth: 300 }}
                                    className="global-input-2"
                                    name="measurementUnit"
                                    onChange={handleRawMaterial}
                                    value={rawMaterialData.measurementUnit}
                                    required
                                >
                                    <option selected>Select Messure Unit</option>
                                    {RawMaterialMeasureUnits.length>0&&
                                        RawMaterialMeasureUnits.map(MeasurementUnit=>{
                                            return <option>{MeasurementUnit}</option>
                                        })
                                    }
                                </select>
                            </Box>
                            <Box className="d-flex justify-content-center">
                                <input
                                    type={"number"}
                                    style={{ width: '100%' }}
                                    className="global-input-2"
                                    placeholder="Available Quantity"
                                    name="quantityAvailable"
                                    onChange={handleRawMaterial}
                                    value={rawMaterialData.quantityAvailable}
                                    required
                                />
                            </Box>

                            <Box>
                                {rawMaterialData.name &&
                                    rawMaterialData.sku &&
                                    rawMaterialData.quantityAvailable&&
                                    rawMaterialData.measurementUnit ? (
                                    <button
                                        className="btn my-4"
                                        style={{
                                            width: 200,
                                            height: 55,
                                            color: "#fff",
                                            background: bg,
                                            border: `1px solid ${bg}`,
                                            fontWeight: 600,
                                            fontSize: 21,
                                        }}
                                        onClick ={() => postRawMaterial()}
                                    >
                                        Add
                                    </button>
                                ) : (
                                    <button
                                        className="btn my-4"
                                        disabled
                                        style={{
                                            width: 200,
                                            height: 55,
                                            color: "#219653",
                                            border: `1px solid ${bg}`,
                                            fontWeight: 600,
                                            fontSize: 21,
                                        }}
                                    >
                                        Add
                                    </button>
                                )}
                                {/* {console.log(rawOpen,"raw")} */}
                               
                            </Box>
                        </Box>
                        <br />
                        <br />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AddProductTwo;

function TableData() {
    const columns = [
        { id: "sr", label: "Sr", minWidth: 170 },
        { id: "rmku", label: "Rmku", minWidth: 100 },
        {
            id: "name",
            label: "Name",
            minWidth: 170,
            align: "center",
            format: (value) => value.toLocaleString("en-US"),
        },
        {
            id: "messure_unit",
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
                <Button onClick={() => handleRawProductDelete(id)} key={rawMaterial.id}>
                    {/* {console.log(rawMaterial)} */}
                    Delete
                </Button>
            ),
        },
    ];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rawMaterial, setRawMaterial] = useState([]);

    useEffect(() => {
        getRawMaterial();
    }, []);
    const getRawMaterial = () => {
        axios.get("/api/rawMaterial").then((res) => {
            setRawMaterial(res.data);
        });
    };
    console.log(rawMaterial);
    const show_item_after_delete = () => {
        setTimeout(() => {
            axios.get(`/api/rawMaterial`).then((res) => {
                setRawMaterial(res.data);
            });
        }, 500);
    };

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
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
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
        axios.get("/api/products").then((res) => {
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
