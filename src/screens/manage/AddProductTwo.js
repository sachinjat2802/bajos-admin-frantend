/* eslint-disable no-unused-vars */
import axiousConfig from '../../axiousConfig'
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
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
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const AddProductTwo = () => {
    const bg = "#74C3AD";

    const [rawMaterialData, setRawMaterialData] = useState({
        name: "",
        sr: "",
        rmku: "",
        messure_unit: "",
    });

    const [newProduct, setNewProduct] = useState({
        name: "",
        sr: "",
        sku: "",
        category: "",
        colour: "",
        size: "",
        availableQty: "",
        // contains:""
    });

    // dynamic sizes corresponding to different catgoriyes
    const Category = {
        'Doormat': ["13×21 inches", "16×24 inches", "22×55 inches", "2×4 ft", "3×5 ft", "4×6 ft", "5×7 ft", "6×9 ft"],
        'Cushion covers': ['16*16 inches', '12*12 inches', '24*24 inches', '18*18 inches', '20*20 inches', '12*18 inches'],
        'Sofa covers': ["10 sitter", "16sitter", "40 sitter", "50 sitter"],
        'Curtains': ["meters", "Pcs"],
        'Bedsheets': ["90*90 cms", "60*90 cms", "90*100 cms", "90*120 cms", "110*110 cms", "100*108 cms", "108*108 cms", "109*120 cms", "100*120 cms", "120 *120 cms"],
        'Bed covers': ["1 plus 2 plus 2", "1 plus 2 plus 3"],
        'Diwan sets': ["1 plus 2 plus 3", "1 plus 2 plus 5"],
        'Fridge tops': ["Pcs"],
        'Table covers': ["40×60 cm", "60×90 cm", "54*78 cm"],
        'Dining table mat': ["Pcs"],
    };

    const [rawMaterial, setRawMaterial] = useState([]);
    const [rawOpen, setRawOpen] = useState(false);
    const [productOpen, setProductOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getRawMaterial();
        getProducts();
    }, []);
    const getRawMaterial = () => {
        axiousConfig.get("/getAllRawMaterial")
            .then((res) => {
                setRawMaterial(res.data.data.list);
            });
    };

    const getProducts = () => {
        axiousConfig.get("/getAllProduct")
            .then((res) => {
                console.log(res.data.data.list);
                setProduct(res.data.data.list);
            });
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    // eslint-disable-next-line no-unused-vars
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
    const [error, setError] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [personName, setPersonName] = useState([]);
    // eslint-disable-next-line no-unused-vars
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

    // eslint-disable-next-line no-unused-vars
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
        // if(newProduct.category)
        // {
        //     Object.keys(Category)
        //         .filter(key=>key===newProduct.category)
        //         .reduce((obj ,key)=>{
        //             obj[key] = Category[key];
        //             return obj;
        //         },{})
        // }
        //  console.log(newProduct)
    };

    // eslint-disable-next-line no-unused-vars
    const postRawMaterial = () => {
        // eslint-disable-next-line no-unused-vars
        const { name, sr, rmku, messure_unit } = rawMaterialData;
        axiousConfig.post("/addRawMaterial", {
            name: name,
            sr: rawMaterial.length + 1,
            rmku: rmku,
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
            setError("");
        }, 5000);

        return () => {
            clearTimeout(timeId);
        };
    }, [rawOpen, productOpen, error]);

    // const [addDiv, setAddDiv] = useState([]);
    // const [rawMaterialInput, setRawMaterialInput] = useState([]);
    // const [rawQuantity, setRawQuantity] = useState([]);

    // console.log(rawMaterialInput);
    const postNewProduct = () => {
        const { name, sr, sku, category, raw, color, size, availableQty } = newProduct;
        // console.log(form,newProduct)
        axiousConfig.post("/addProduct", {
            name: name,
            // sr: product.length + 1,
            sku: sku,
            category: category,
            raw: form,
            // contains:""
            colour: color,
            size: size,
            availableQty: availableQty,
        })
            .then((res) => {
                setProductOpen(true);
                setNewProduct({
                    name: "",
                    sr: "",
                    sku: "",
                    category: "",
                    colour: "",
                    size: "",
                    availableQty: "",
                });
            })
            .catch(err => setError(err.response.data.message));
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
                    <Box style={{ padding: "0 10%" }}>
                        <br />
                        <br />
                        <Box className="text-center">
                            {productOpen && (
                                <Stack sx={{ width: "100%" }} spacing={2}>
                                    <Alert severity="info">Product added!!</Alert>
                                </Stack>
                            )}
                            {error && (
                                <Stack sx={{ width: "100%" }} spacing={2}>
                                    <Alert severity="error">{error}</Alert>
                                </Stack>
                            )}
                            <Box className="text-center">
                                <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 20 }}>
                                    Add new Products
                                </div>
                                <Box>
                                    <input
                                        type={"text"}
                                        style={{ width: "100%" }}
                                        className="global-input-2"
                                        placeholder="Name"
                                        name="name"
                                        onChange={handleNewProduct}
                                        value={newProduct.name} />
                                </Box>
                                <Box className="d-flex justify-content-between">
                                    <input
                                        disabled
                                        type={"number"}
                                        style={{ maxWidth: 300, minWidth: 300 }}
                                        className="global-input-2"
                                        placeholder="Sr"
                                        name="sr"
                                        onChange={handleNewProduct}
                                        value={newProduct.sr} />
                                    <input
                                        type={"text"}
                                        style={{ maxWidth: 228, minWidth: 228 }}
                                        className="global-input-2"
                                        placeholder="Sku"
                                        name="sku"
                                        onChange={handleNewProduct}
                                        value={newProduct.sku} />
                                    <select
                                        type={"text"}
                                        style={{ maxwidth: 400, minWidth: 400 }}
                                        className="global-input-2"
                                        placeholder="category"
                                        name="category"
                                        onChange={handleNewProduct}
                                        value={newProduct.category}
                                    >
                                        <option value='' selected>Select Category</option>
                                        {Object.keys(Category).map(category => {
                                            return <option>{category}</option>;
                                        })}
                                    </select>
                                </Box>
                                <Box className="d-flex justify-content-between">
                                    <input
                                        type={"number"}
                                        style={{ maxwidth: 300, minWidth: 300 }}
                                        className="global-input-2"
                                        name="availableQty"
                                        placeholder="Quantity avaialable"
                                        onChange={handleNewProduct}
                                        value={newProduct.availableQty} />
                                    <select
                                        type={"text"}
                                        style={{ maxwidth: 270, minWidth: 300 }}
                                        className="global-input-2"
                                        name="size"
                                        onChange={handleNewProduct}
                                        value={newProduct.size}
                                        required
                                        // {!newProduct.category&&'Disabled'}
                                        disabled={!newProduct.category}
                                    >
                                        <option selected>Select Size</option>
                                        {Category[newProduct.category]?.map(size => {
                                            return <option>{size}</option>;
                                        })}
                                    </select>
                                    <input
                                        type={"text"}
                                        style={{ maxwidth: 400, minWidth: 400 }}
                                        className="global-input-2"
                                        name="colour"
                                        placeholder="colour"
                                        onChange={handleNewProduct}
                                        value={newProduct.colour} />
                                </Box>
                                {form.map((item, index) => {
                                    return (
                                        <Box key={index} className="d-flex justify-content-between align-items-center">
                                            <select
                                                type={"text"}
                                                style={{ minWidth: 450, height: 60 }}
                                                className="global-input-2"
                                                name="rm"
                                                onChange={(e) => {
                                                    handleChange(e, index);
                                                } }
                                                value={item.rm}
                                            >
                                                <option selected>Select Raw Material</option>
                                                {rawMaterial?.map((r) => {
                                                    return <option value={r.id}>{r.name}</option>;
                                                })}
                                            </select>
                                            {/* </FormControl> */}
                                            <input
                                                type={"number"}
                                                style={{ minWidth: 450, height: 60 }}
                                                className="global-input-2"
                                                placeholder="Used Qty in Meter"
                                                name="qty"
                                                onChange={(e) => handleChange(e, index)}
                                                value={item.qty} />

                                            <button
                                                className="btn"
                                                style={{
                                                    width: 100,
                                                    height: 55,
                                                    color: "#fff",
                                                    background: bg,
                                                    border: `1px solid ${bg}`,
                                                    fontWeight: 600,
                                                    fontSize: 21,
                                                }}
                                                onClick={() => handleDeleteDiv(index)}
                                            >
                                                Delete
                                            </button>
                                        </Box>
                                    );
                                })}
                                {/* {addDiv} */}
                                <Box>
                                    <button
                                        className="btn my-4"
                                        style={{
                                            width: 50,
                                            height: 55,
                                            color: "#fff",
                                            background: bg,
                                            border: `1px solid ${bg}`,
                                            fontWeight: 600,
                                            fontSize: 21,
                                        }}
                                        onClick={handleAddDiv}
                                    >
                                        +
                                    </button>
                                </Box>
                                <Box>
                                    <Box>
                                        {/* {console.log(newProduct)} */}
                                        {newProduct.sku &&
                                            newProduct.name &&
                                            newProduct.availableQty &&
                                            newProduct.size &&
                                            newProduct.colour &&
                                            newProduct.category &&
                                            newProduct.raw ? (
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
                                                onClick={() => postNewProduct()}
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
                                        {/* {console.log(productOpen)} */}

                                    </Box>
                                </Box>
                            </Box>
                        </Box>
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
        axiousConfig.get("rawMaterial").then((res) => {
            setRawMaterial(res.data);
        });
    };
    // console.log(rawMaterial);
    const show_item_after_delete = () => {
        setTimeout(() => {
            axiousConfig.get(`rawMaterial`).then((res) => {
                setRawMaterial(res.data);
            });
        }, 500);
    };

    const handleRawProductDelete = (id) => {
        rawMaterial.forEach((item) => {
            if (item.id === id) {
                axios.delete(`/api/rawMaterial/${id}`).then((res) => {
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
