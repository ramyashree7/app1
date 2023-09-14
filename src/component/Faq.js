import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddModal from "../modals/AddModal";
import EditModal from "../modals/EditModal";



function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);


  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
    {
      id: "population",
      label: "Population",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Size\u00a0(km\u00b2)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: "Density",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "edit",
      label: "Edit",
      minWidth: 50,
      align: "center",
      format: (value, row) => (
        <IconButton onClick={() => handleEditClick(row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      id: "delete",
      label: "Delete",
      minWidth: 50,
      align: "center",
      format: (value, row) => (
        <IconButton onClick={() => handleDeleteClick(row)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  const [rows, setRows] = useState([
    createData("India", "IN", 1324171354, 3287263),
    createData("China", "CN", 1403500365, 9596961),
    // Add more rows here...
  ]);

  const handleAddClick = () => {
    setShowAddDialog(true);
  };

  const handleAddItem = (newItemData) => {
    setRows([...rows, newItemData]);
    setShowAddDialog(false);
  };

  const handleEditClick = (row) => {
    setSelectedRowData(row);
    setShowEditDialog(true);
  };

  const handleEditItem = (editedData) => {
    const updatedRows = rows.map((rowData) =>
      rowData.code === editedData.code ? editedData : rowData
    );
    setRows(updatedRows);
    setShowEditDialog(false);
  };

  const handleDeleteClick = (row) => {
  };

  const handleModalClose = () => {
    setShowAddDialog(false);
    setShowEditDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div
      className="tabledesign"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#141b2d",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              position: "absolute",
              top: "45px",
              right: "16px",
            }}
            onClick={handleAddClick}
          >
            Add
          </Button>
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
            <TableBody
              sx={{ backgroundColor: "#141b2d;", textEmphasisColor: "black" }}
            >
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "edit" || column.id === "delete" ? (
                              column.format(value, row)
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
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
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <AddModal
          open={showAddDialog}
          onClose={handleModalClose}
          onAdd={handleAddItem}
        />
        <EditModal
          open={showEditDialog}
          onClose={handleModalClose}
          onEdit={handleEditItem}
          selectedRowData={selectedRowData}
        />
      </Paper>
    </div>
  );
}
