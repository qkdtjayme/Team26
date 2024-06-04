import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

import { getRecordsFromDb, deleteRecordFromDb } from "../db/records.js";
import NavBar from "../components/new/NavBar.js";
import "./css/Records.css";

const columns = [
  { field: "_id", headerName: "Record ID", flex: 1 },
  { field: "date", headerName: "Date", flex: 2 },
  { field: "exercise", headerName: "Exercise", flex: 3 },
  { field: "sets", headerName: "Sets", flex: 1 },
  { field: "reps", headerName: "Repetitions", flex: 1 },
];

const Records = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rows, setRows] = React.useState({
    _id: "",
    date: "",
    exercise: "",
    sets: 0,
    reps: 0,
  });

  // Responsible for tracking selected rows
  const handleRowSelection = (selectedRowIds) => {
    setSelectedRows(Object.keys(selectedRowIds).map((id) => parseInt(id)));
  };

  // Handles deletion of rows
  const handleDeleteRows = async () => {
    const idsToDelete = selectedRows.map((index) => rows[index]._id);

    try {
      await Promise.all(
        idsToDelete.map(async (id) => await deleteRecordFromDb(id))
      );

      // Update rows
      fetchData();
    } catch (err) {
      console.error("Error deleting rows:", err);
    }
  };

  /**
   * Responsible for getting all records from the database
   */
  const fetchData = async () => {
    try {
      const response = await getRecordsFromDb();
      if (response.data) {
        const records = response.data;
        setRows(records);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // Fetches data upon load of page
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="container records-container">
      <NavBar />

      <Box className="records-table-container">
        <Box className="records-button-container">
          <Button
            className="records-button records-delete"
            variant="contained"
            onClick={handleDeleteRows}
          >
            Delete
          </Button>
        </Box>

        <DataGrid
          className="records-table"
          rows={rows || []}
          columns={columns}
          density="standard"
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          headerStyle={{
            backgroundColor: "var(--clr-neutral-400)",
          }}
          getRowId={(row) => row._id}
          onRowSelectionModelChange={handleRowSelection}
        />
      </Box>
    </Box>
  );
};

export default Records;
