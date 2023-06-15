import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'Links', headerName: 'Links', width: 200 },
    {
        field: "actions",
        headerName: "Actions",
        width: 300,
        sortable: false,
        renderCell: (params) => (
            <Box>
                <Button variant="contained" color="secondary">
                    <DeleteIcon />
                </Button>



                {/* <Tooltip title='Edit brand'>
                <IconButton
                    onClick={() => {
                        handleEdit(params.client_id);
                    }}>
                    <Edit />
                </IconButton>
            </Tooltip> */}
                {/* <Tooltip title='Delete brand'>
                <IconButton
                    onClick={() => {
                        handleDelete(params.client_id);
                    }}>
                    <Delete />
                </IconButton>
            </Tooltip> */}
            </Box>

        ),
    },
];

const rows = [
    { id: 1, Name: 'Jon', Links: 'google.com' },
    { id: 2, Name: 'Cersei', Links: 'plutos.one' },
    { id: 3, Name: 'Jaime', Links: 'abcd.com' },
    { id: 4, Name: 'Arya', Links: 'google.com' },
    { id: 5, Name: 'Daenerys', Links: 'google.com' },
    { id: 6, Name: null, Links: 'google.com' },
    { id: 7, Name: 'Ferrara', Links: 'google.com' },
    { id: 8, Name: 'Rossini', Links: 'google.com' },
    { id: 9, Name: 'Harvey', Links: 'google.com' },
];

export default function DataTable() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}