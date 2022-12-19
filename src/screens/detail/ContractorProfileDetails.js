import { Box } from "@mui/system";
import React, { useState, useEffect }  from "react";
import Paper from "@mui/material/Paper";
import SideNav from "../../components/SideNav";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axiousConfig from '../../axiousConfig'
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete'


// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: '#fff',
//     border: '2px solid #fff',
//     boxShadow: 24,
//     p: 4,
// };


const ContractorProfileDetails = () => {
  //  const bg = "#74C3AD";
   // const [ setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [contractor, setContractor] = useState({})
    const [error,setError] = useState({})
    const { id } = useParams();
    const [AddProductQty, setAddProductQty] = useState({
        id: id,
        quantity: 0,
        note: ""
    })
    // const [RawMaterialList, setRawMaterialList] = useState([])
    // const [RawMaterialQty, setRawMaterialQty] = useState([])
    const [AllProductsRecieved, setAllProductsRecieved] = useState([])
    const [RawMaterialAssignedToContractors, setRawMaterialAssignedToContractors] = useState([])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        getContractorByID(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        // const tempRawMaterial = []
        // const tempRawMaterialQty = []
        if (contractor) {
            // eslint-disable-next-line array-callback-return
            // contractor?.contains?.map(rawMaterial=>{
            //     tempRawMaterial.push(rawMaterial['rm'])
            //     tempRawMaterialQty.push(rawMaterial['qty'])
            // });
            // setRawMaterialList(tempRawMaterial)
            // setRawMaterialQty(tempRawMaterialQty)
            getAllProductsRecieved(id)
            getRawMaterialAssignedToContractors(id)


        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contractor])

    const getRawMaterialAssignedToContractors = async (ContractorId) => {
        await axiousConfig.get(`/getRawMaterialAssignedToAllContracters/${ContractorId}`)
        // await axiousConfig.get(`/getAllrawMaterialUsedByContacter/${ContractorId}`)
            .then(res => {
                console.log(res.data.data)
                setRawMaterialAssignedToContractors(res.data.data)
            })
            .catch(err => setError(err.response.data.message))
    }
    const getAllProductsRecieved = async (ContractorId) => {
        await axiousConfig.get(`/getAllProductsRecievedFromContracter/${ContractorId}`)
            .then(res => {
                console.log(res.data.data)
                setAllProductsRecieved(res.data.data)
            })
            .catch(err => setError(err.response.data.message))
    }

    const getContractorByID = async (ProductId) => {
        await axiousConfig.get(`/getContractorById/?id=${ProductId}`)
            .then(res => {
                // console.log(res.data.data)
                setContractor(res.data.data)
            })
            .catch(err => setError(err.response.data.message))
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
                        Contractor Profile
                    </div>
                </Paper>
                <br />
                <Paper elevation={2}>
                    <div className="py-3">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Full Name of contractor</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 400 }}
                            >{contractor.name}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3 bg-light">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Phone Number</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 400 }}
                            >{contractor.phone}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3 ">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Email Address</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 400 }}
                            >{contractor.email}</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3 bg-light">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Extra Field</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 300 }}
                            >meter</Typography>
                        </div>
                    </div>
                    <hr className="m-0" />
                    <div className="py-3 bg-light">
                        <div className="px-3 d-flex align-items-center">
                            <Typography variant="h6"
                                style={{ minWidth: 400 }}
                            >Personal Note about contractor</Typography>
                            <Typography variant="body"
                                style={{ minWidth: 300 }}
                            >{contractor.note}</Typography>
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
                    <BasicTable3 assignRawMaterial={contractor.assignRawMaterial}/>
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
                    <BasicTable RawMaterialAssignedToContractors={RawMaterialAssignedToContractors} />
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
                    <BasicTable2
                    AllProductsRecieved={AllProductsRecieved}
                    />
                </Paper>
            </Box>
        </Box>
    );
};

export default ContractorProfileDetails;

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
    { id: 'rawMaterial', label: 'Raw material name', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 150 },
    { id: 'quantity', label: 'Quantity', minWidth: 150 },
    {
        id: 'pricePerUnit',
        label: 'Price Per Unit',
        minWidth: 200,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
];
const columns2 = [
    { id: 'productName', label: 'Product name', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'quentity', label: 'Quantity', minWidth: 150 },
    {
        id: 'sku',
        label: 'Sku',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    // {
    //     id: 'note',
    //     label: 'Note',
    //     minWidth: 200,
    //     align: 'left',
    //     format: (value) => value.toLocaleString('en-US'),
    // },
];
const columns3 = [
    { id: 'rm', label: 'Raw Material name', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'qty', label: 'Quantity', minWidth: 150 },
    {
        id: 'pricePerUnit',
        label: 'Price Per Unit',
        minWidth: 200,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
];


function BasicTable({RawMaterialAssignedToContractors}) {

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
                        {RawMaterialAssignedToContractors?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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








function BasicTable2({AllProductsRecieved}) {

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
                        {AllProductsRecieved?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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



function BasicTable3({assignRawMaterial}) {

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
                        {assignRawMaterial?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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

