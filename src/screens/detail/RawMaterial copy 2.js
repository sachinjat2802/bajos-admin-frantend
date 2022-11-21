import { Box } from "@mui/system";
import React, { useState } from "react";
import Img1 from "../../assets/bubble.png";
import Paper from "@mui/material/Paper";
import SideNav from "../../components/SideNav";

const RawMaterial = () => {
    const bg = "#74C3AD";
    const [carpenter, setCarpenter] = useState("");
    const [product, setProduct] = useState("");

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
