import { Box } from "@mui/system";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import SideNav from "../../components/SideNav";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const ContractorProfile = () => {
  const bg = "#74C3AD";
  // const [editContractorData, setEditContractorData] = useState([]);


  return (
    <Box className="d-flex">
      <SideNav />
      <Box className="p-5 w-100">
        <Box className="text-center">
          <div style={{ fontSize: 24, fontWeight: 500 }}>
            Contractor Profile
          </div>
          <br />
          <Box>
            <div>
              {/* {console.log(contractorProfile)} */}
              <input
                className="w-50 global-input-2"
                placeholder="Name"
                // onChange={(e) => {
                //     e.preventDefault();
                name="name"

              />
            </div>
            <div>
              <input
                className="w-50 global-input-2"
                placeholder="Phone"
                // onChange={(e) => {
                //     e.preventDefault();
                name="phone"
              />
            </div>
            <div>
              <input
                className="w-50 global-input-2"
                placeholder="Email"
                // onChange={(e) => {
                //     e.preventDefault();
                name="email"
              />
            </div>
            <div>
              <input
                className="w-50 global-input-2"
                placeholder="Extra field"
                // onChange={(e) => {
                //     e.preventDefault();
                name="extra"
              />
            </div>
            <div>
              <textarea
                className="w-50 global-input-2"
                placeholder="Personal note about contractor"
                rows={5}
                // onChange={(e) => {
                //     e.preventDefault();
                name="note"
              />
            </div>
            <div>
              <Checkbox />
              If the contractor can login then tick the box.
            </div>
            <Box>
              <button
                className="btn my-4"
                style={{
                  width: 200,
                  height: 55,
                  color: "#219653",
                  border: `1px solid ${bg}`,
                  fontWeight: 600,
                  fontSize: 21,
                  marginRight: 30,
                }}
              >
                Edit
              </button>
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

              >
                Save
              </button>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="info">Contractor updated!!</Alert>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContractorProfile;
