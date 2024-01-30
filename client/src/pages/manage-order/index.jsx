import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataMeasurements } from "../../data/mockData";
import Header from "../../components/Header";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { styled } from "@mui/system";



const Manageorder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ViewButton = styled(Button)(({ theme }) => ({
    color: colors.grey[200],
    borderColor: colors.grey[200],
  }));

  const handleViewClick = (row) => {
    // Add logic to handle the "View" button click
    console.log("View clicked for row:", row);
  };

  const handleDeleteClick = (row) => {
    // Add logic to handle the "Delete" button click
    console.log("Delete clicked for row:", row);
  };
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "gender", headerName: "Gender" },
    { field: "created", headerName: "Created", type: "Date" },
    { field: "dueDate", headerName: "Due" },
    {
      field: "completed",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "completed"
                ? colors.greenAccent[500]
                : colors.redAccent[500]
            }
            borderRadius="4px"
          >
            {status === "completed" && <AddTaskOutlinedIcon />}
            {status === "pending" && <HourglassBottomOutlinedIcon />}

            <Typography
              color={colors.grey[100]}
              sx={{ ml: "5px" }}
            >
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <Box
          display="flex"
          justifyContent="space-around"
        >
          <ViewButton
            variant="outlined"
            color="primary"
            onClick={() => handleViewClick(row)}
            startIcon={<VisibilityOutlinedIcon />}
          >
            View
          </ViewButton>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDeleteClick(row)}
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Measurement Records"
        subtitle="Effortlessly Track and Manage Your Measurement Records"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[400],
            borderBottom: "none",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[400],
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={mockDataMeasurements}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Manageorder;
