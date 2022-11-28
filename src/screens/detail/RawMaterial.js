import axiousConfig from '../../axiousConfig'
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Img1 from "../../assets/bubble.png";
import Paper from "@mui/material/Paper";
import SideNav from "../../components/SideNav";
import { Alert, Button, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useParams } from 'react-router-dom';



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


const RawMaterial = () => {
    const bg = "#74C3AD";
    const { id } = useParams();
    const [error, setError] = useState("")
    const [rawMaterial, setRawMaterial] = useState({})
    const [RawMaterialLog, setRawMaterialLog] = useState([])
    const [addRawMaterialQuantity, setAddRawMaterialQuantity] = useState({
        id:id,
        quantity:0,
        note:""
    })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
      getRawMaterial(id)
      getRawMaterialLog(id)
    }, [])
    const getRawMaterial = async (materialId) =>{
        await axiousConfig.get(`/getRawMaterialById/?id=${materialId}`)
        .then(res=>
            {
                console.log(res.data.data)
                setRawMaterial(res.data.data)
            })
        .catch(err=>setError(err.response.data.message))
    }

    const getRawMaterialLog = async (materialId) => {
        await axiousConfig.get(`/rowMaterialLogByID?id=${materialId}`)
        .then(res=>{
            console.log(res.data.data)
            setRawMaterialLog(res.data.data)
        })
        .catch(err=>console.log(err.response.data.message))
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddRawMaterialQuantity({ ...addRawMaterialQuantity, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(addRawMaterialQuantity)
        const response = axiousConfig.put("/addQuantity",addRawMaterialQuantity)
        .then(res=>res.data)
        .catch(err=>err.response.data)
        handleClose()
        if(response.statusCode===200)
        {
            console.log(response.data)
            getRawMaterial(id)
            getRawMaterialLog(id)
        }
    }



    return (
        <Box className="d-flex">
            <SideNav />
            {error ? (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity="error">{error}</Alert>
                    </Stack>
                    )
            :(        
            <Box className="p-5 w-100">
                <Paper elevation={4}>
                    <div
                        className="px-3 py-3 pt-4"
                        style={{ color: "#219653", fontSize: 22 }}
                    >
                        {rawMaterial.name}
                    </div>
                </Paper>
                <br />
                <Paper elevation={2}>
                    <div className="py-3">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Sr ID</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 400 }}
                            >{rawMaterial.serialNo}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    {/* this is not specified in api , (data-list) */}
                    {/* <div className="py-3 bg-light">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Raw material Keeping Unit (RMKU)</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 400 }}
                            >48723809</Typography>
                        </div>
                    </div>
                    <hr className="m-0" /> */}
                    <div className="py-3 ">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Available Quantity</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 400 }}
                            >{rawMaterial.quantityAvailable}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3 bg-light">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Messure Unit</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 300 }}
                            >{rawMaterial.measurementUnit}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3">
                        <div className="px-3">
                            <Button variant="contained"
                                onClick={handleOpen}
                                style={{ background: bg }}
                            >Add Quantity</Button>
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
                                        name="note"
                                        onChange={handleChange}
                                        style={{ width: 200, width: '100%', padding: 12 }}
                                    />

                                    <br />
                                    <br />
                                    <div>
                                        <Button className="w-50 fs-6" variant="text"
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
                        Previously added quantities
                    </div>
                </Paper>
                <br />
                <br />
                <Paper elevation={2}>
                    <BasicTable RawMaterialLog={RawMaterialLog} />
                </Paper>
                <br />
                <br />
                <Paper elevation={4}>
                    <div
                        className="px-3 py-3 pt-4"
                        style={{ color: "#219653", fontSize: 22 }}
                    >
                        Quantity assigned to contractor
                    </div>
                </Paper>
                <br />
                <br />
                <Paper elevation={2}>
                    <BasicTable2 />
                </Paper>
            </Box>
            )
            }
        </Box>
    );
};

export default RawMaterial;

function createData(date, qty, note, contractor) {
    return { date, qty, note, contractor };
}

const rows =  [
    createData('12-10-15', 159, "Something something", 'John doe'),
    createData('12-15-15', 237, "Lorem ispum", "Someone"),
    createData('10-8-22', 262, "Virat Kohli", "XD XD XD"),
    createData('8-12-12', 305, "sachin endulat", "Sheetal"),
    createData('12-2-24', 356, "Donald Trump", "Siddharth"),

];


const columns = [
    { id: 'time', label: 'Date', minWidth: 170  },
    { id: 'quantity', label: 'Quantity', minWidth: 150 },
    {
        id: 'note',
        label: 'Note',
        minWidth: 200,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
];
const columns2 = [
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'qty', label: 'Quantity', minWidth: 150 },
    {
        id: 'contractor',
        label: 'Contractor',
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


function BasicTable({RawMaterialLog}) {

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
                        {RawMaterialLog
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
