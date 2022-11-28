import axiousConfig from '../../axiousConfig'
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Img1 from "../../assets/bubble.png";
import Paper from "@mui/material/Paper";
import SideNav from "../../components/SideNav";
import { Button, TextareaAutosize, TextField, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useParams } from "react-router-dom";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
};


const ProductDetails = () => {
    const bg = "#74C3AD";
   
    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = useState({})
    const [error, setError] = useState("")
    const {id} = useParams();
    const [AddProductQty, setAddProductQty] = useState({    
        id:id,
        quantity:0,
        note:""
    })
    const [RawMaterialList, setRawMaterialList] = useState([])
    const [RawMaterialQty, setRawMaterialQty] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        getProductsByID(id)
    }, [id])

    useEffect(() => {
        const tempRawMaterial = []
        const tempRawMaterialQty = []
        if(product){
            product?.contains?.map(rawMaterial=>{
                tempRawMaterial.push(rawMaterial['rm'])
                tempRawMaterialQty.push(rawMaterial['qty'])
            });
            setRawMaterialList(tempRawMaterial)
            setRawMaterialQty(tempRawMaterialQty)
        }
    }, [product])
    
    const getProductsByID = async (ProductId) =>{
        await axiousConfig.get(`/getProductById/?id=${ProductId}`)
        .then(res=>{
            console.log(res.data.data)
            setProduct(res.data.data)
        })
        .catch(err=>setError(err.response.data.message))
    }

    const handleChange = e =>{
        const name = e.target.name;
        const value = e.target.value;
        setAddProductQty({...AddProductQty,[name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiousConfig.put("/addProductQuantity",AddProductQty)
        .then(res=>res.data)
        .catch(err=>err.response.data)
        handleClose()
        console.log(response)
        if(response.statusCode===200)
        {
            getProductsByID(id)
            // getProductLog()
        }
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
                        Product
                    </div>
                </Paper>
                <br />
                <Paper elevation={2}>
                    <div className="py-3">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Sr</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 400 }}
                            >{product.srNo}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3 bg-light">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Sku</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 400 }}
                            >{product.sku}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3 ">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Name</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 400 }}
                            >{product.name}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3 bg-light">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Cost per pcs</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 300 }}
                            >{product.price}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Availabe Qty</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 300 }}
                            >{product.availableQty}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3 bg-light">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Category</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 300 }}
                            >{product.category}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Raw material list</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 300 }}
                            >{RawMaterialList.join(" , ")}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3 bg-light">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Raw material quantity</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 300 }}
                            >{RawMaterialQty.join(" , ")}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Action</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 300 }}
                            >
                                <Button variant="contained" style={{ background: bg }} onClick={handleOpen}>
                                    Add Quantity
                                </Button>
                                <Modal
                                    open={open}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <form onSubmit={handleSubmit}>
                                    <Box sx={style}>
                                        <Typography variant="h5" className="text-center">Add quantity</Typography>
                                        <TextField 
                                            id="outlined-basic" 
                                            label="Quantity" 
                                            variant="outlined"
                                            className="w-100 my-4" 
                                            name="quantity"
                                            onChange={handleChange}
                                            required
                                        />
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={3}
                                            placeholder="Additional note"
                                            style={{ width: 200, width: '100%', padding: 12 }}
                                            name="note"
                                            onChange={handleChange}
                                        />

                                        <br />
                                        <br />
                                        <div>
                                            <Button 
                                                className="w-50 fs-6" 
                                                variant="text"
                                                style={{ color: bg }}
                                                onClick={handleClose}
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                className="w-50 fs-6" 
                                                variant="contained"
                                                style={{ background: bg }}
                                                type="submit"
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </Box>
                                    </form>
                                </Modal>
                            </Typography>
                        </div>
                    </div>
                </Paper>
                <br />
                <br />
                <Paper elevation={4}>
                    <div
                        className="px-3 py-3 pt-4"
                        style={{ color: "#219653", fontSize: 22 }}
                    >
                        Raw material to be received by contractor 
                    </div>
                </Paper>
                <br />
                <br />
                <Paper elevation={2}>
                    <BasicTable3 />
                </Paper>
                <br />
                <br />
                <Paper elevation={4}>
                    <div
                        className="px-3 py-3 pt-4"
                        style={{ color: "#219653", fontSize: 22 }}
                    >
                        Raw material received by contractor 
                    </div>
                </Paper>
                <br />
                <br />
                <Paper elevation={2}>
                    <BasicTable />
                </Paper>
                <br />
                <br />
                <Paper elevation={4}>
                    <div
                        className="px-3 py-3 pt-4"
                        style={{ color: "#219653", fontSize: 22 }}
                    >
                        Products received by owner
                    </div>
                </Paper>
                <br />
                <br />
                <Paper elevation={2}>
                    <BasicTable2 />
                </Paper>
            </Box>
        </Box>
    );
};

export default ProductDetails;

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


const columns = [
    { id: 'name', label: 'Raw material name', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 150 },
    { id: 'qty', label: 'Quantity', minWidth: 150 },
    {
        id: 'note',
        label: 'Note',
        minWidth: 200,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
];
const columns2 = [
    { id: 'name', label: 'Product name', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'qty', label: 'Quantity', minWidth: 150 },
    {
        id: 'sku',
        label: 'Sku',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'note',
        label: 'Note',
        minWidth: 200,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
];
const columns3 = [
    { id: 'name', label: 'Raw Material name', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'qty', label: 'Quantity', minWidth: 150 },
    {
        id: 'note',
        label: 'Note',
        minWidth: 200,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
];


function BasicTable() {

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
                            {columns.map((column) => (
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
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
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








function BasicTable2() {

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
                            {columns2.map((column) => (
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
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns2.map((column) => {
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



function BasicTable3() {

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
                        {rows
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


// rawv material remaining

