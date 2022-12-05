import { Box } from "@mui/system";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import Img1 from "../../assets/bubble.png";
import Paper from "@mui/material/Paper";
import SideNav from "../../components/SideNav";

const RawMaterial = () => {
   

    return (
        <Box className="d-flex">
            <SideNav />
            <Box className="p-5 w-100">
                <Paper elevation={4}>
                    <div
                        className="px-3 py-3 pt-4"
                        style={{ color: "#219653", fontSize: 22 }}
                    >
                        Product Item ID : 
                    </div>
                </Paper>
            </Box>
        </Box>
    );
};

export default RawMaterial;
