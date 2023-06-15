import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Table = (props) => {
	const { columns, rows } = props;

	return (
		
		// <Box sx={{ height: 500, width: "100%" }}>
		<Box style={{ height: "60vh", width: "98%" }}>
			<DataGrid
				columnVisibilityModel={{
					id: false,
					// source_business_id:false,
				}}
				components={{
					Toolbar: GridToolbar,
				}}
				rows={rows}
				columns={columns}
				initialState={{ pinnedColumns: { right: ["actions"] } }}
				sx={{
					"& .MuiDataGrid-iconSeparator": {
						display: "none",
					},
					"& .MuiDataGrid-pinnedColumnHeaders": {
						boxShadow: "none",
						backgroundColor: "transparent",
					},
					"& .MuiDataGrid-pinnedColumns": {
						boxShadow: "none",
						backgroundColor: "transparent",
						"& .MuiDataGrid-cell": {
							padding: 0,
						},
					},
					"& .MuiDataGrid-row": {
						cursor: "pointer",
						"&:hover": {
							backgroundColor: "whitesmoke",
						},
						"&:first-child": {
							borderTop: "1px solid rgba(224, 224, 224, 1)",
						},
					},
					"& .MuiDataGrid-cell:focus": {
						outline: "none",
					},
					"& .MuiDataGrid-cell:focus-within": {
						outline: "none",
					},
				}}
			/>
		</Box>
	);
};

export default Table;
