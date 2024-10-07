import React, { useMemo, useState } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { getFormatDate } from "../../utiils/dateFormatter";
import DataTable from "react-data-table-component";
import { ArrowDownward, EditOutlined, RemoveRedEye, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Detail from "./detail";

const Table = ({ rowData, isLoading }) => {
  const [detailsOpen,setDetailsOpen] = useState(false);
  const [details,setDetails] = useState({});

  const handleDetails = (feedbackDetail) => {
    setDetails(feedbackDetail);
    setDetailsOpen(true)
  }
  const columns = useMemo(() => [
    {
        name: "Name",
        selector: (row, ind) => row?.name || "NA",
        width:'250px'
      },
    {
      name: "Email",
      selector: (row) => row?.email || "NA",
      width:'250px'
    },
    {
      name: "Message",
      selector: (row) => row?.message,
      width:'500px'
    },
    {
        name: "Created At",
        selector: (row) => getFormatDate(row.createdAt),
        width:'150px',
        sortable:true,
      },
    {
      name: "Action",
      width:'100px',
      center:true,
      selector: (row,ind,ass) => (
        <>
          <IconButton size="small" onClick={() => handleDetails(row)}>
            <RemoveRedEyeOutlined fontSize="small" />
          </IconButton>
          {/* <IconButton LinkComponent={Link} to={`/competition/${row._id}`} size="small" onClick={() => console.log(row._id)}>
          <RemoveRedEyeOutlined fontSize="small" />
        </IconButton> */}
        </>
      ),
    },
  ]);

  return (
    <Box>
      <DataTable
        columns={columns}
        data={rowData}
        sortIcon={
          <IconButton>
            <ArrowDownward />
          </IconButton>
        }
        pagination
        persistTableHead
        striped
        // paginationPerPage={2}
        // paginationRowsPerPageOptions={[1,2,3,4]}
        progressPending={isLoading}
        progressComponent={<Box my={1}><CircularProgress size={30} /></Box>}
        dense
      />
      <Detail onClose={()=>setDetailsOpen(false)} onOpen={detailsOpen} details={details}/>
    </Box>
  );
};

export default Table;
