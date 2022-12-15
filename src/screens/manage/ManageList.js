/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
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
import { Fab } from "@mui/material";
import Img2 from "../../assets/left-arrow.png";
import SideNav from "../../components/SideNav";
import axios from "axios";
import { Button } from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';

let token = JSON.parse(sessionStorage.getItem('accessToken'));

const ManageList = () => {
  const bg = "#74C3AD";

  return (
    <Box className="d-flex">
      <SideNav />
      <Box className="p-5 w-100">
        <Paper elevation={4}>
          <div
            className="px-3 py-3 pt-4"
            style={{ color: "#219653", fontSize: 22 }}
          >
            Detailed Page with products list
          </div>
          <BasicTable />
        </Paper>
        <div style={{ position: "fixed", right: 30, bottom: 30 }}>
          <Fab style={{ background: "#74C3AD" }} aria-label="edit">
            <img src={Img2} style={{ width: 38 }} />
          </Fab>
        </div>
      </Box>
    </Box>
  );
};

export default ManageList;


function BasicTable() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProductList();
  }, [page,rowsPerPage]);
  const getProductList =  () => {
     axiousConfig.get(`/getAllProduct/?page=${page}&limit=${rowsPerPage}`)
          .then((res) => {
              console.log(res.data.data.list);
              // console.log(res.data.data.list.contains)
              setProductList(res.data.data.list);
        });
  };



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr</TableCell>
            <TableCell>Sku</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Available Qty</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Raw Mat. List</TableCell>
            <TableCell>Raw Mat. Qty</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((row, index) => {
            const RawMaterialList = []
            const RawMaterialQty = []
             // eslint-disable-next-line array-callback-return
             row.contains.map(RawMaterial=>{
              RawMaterialList.push(RawMaterial["rm"])
              RawMaterialQty.push(RawMaterial["qty"])
            });
            // console.log(RawMaterialList,RawMaterialQty)
            return(
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.sku}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.availableQty}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{RawMaterialList.join(",")}</TableCell>
              <TableCell align="center">{RawMaterialQty.join(",")}</TableCell>
              <TableCell align="left"><Button className="p-0" style={{ minWidth: 45 }} onClick={()=>{navigate('/manage/product/'+row.id)}} >Edit</Button></TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer >
  );
}