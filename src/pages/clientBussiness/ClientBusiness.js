import React from "react";

import {
	Button,
	Container,
	Grid,
	Toolbar,
	Alert,
	Tooltip,
	Switch,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "../../components/table/Table";
import { Widget } from "../../components/widget/Widget";
import { Visibility, Edit, Add, Delete } from "@mui/icons-material";
import CreateModel from "./CreateModel";
import {
	deleteClient,
	getAllClients,
	updateClient,
} from "../../redux/actions/client.actions";
import { useDispatch, useSelector } from "react-redux";

const ClientBusiness = () => {
	const { clients } = useSelector((state) => state.clientReducer);
	const dispatch = useDispatch();

	const active = clients
		.map((item) => item.status)
		.filter((item) => item === 1);

	const rows = clients.map((item) => ({
		...item,
		id: item.client_id,
	}));

	const columns = [
		{ field: "id", headerName: "ID", width: 50 },
		{
			field: "name",
			headerName: "Client Name",
			width: 260,
			editable: true,
		},
		{
			field: "logo",
			headerName: "Logo",
			width: 180,
			editable: true,
			renderCell: (params) => (
				<Tooltip title='View image'>
					<Button
						href={`${process.env.REACT_APP_BASE_URL_CBM}${params.row.logo}`}
						target='_blank'
						startIcon={<Visibility />}></Button>
				</Tooltip>
			),
		},
		{
			field: "icon",
			headerName: "Icon",
			width: 180,
			editable: false,
			renderCell: (params) => (
				<Tooltip title='View more'>
					<Button
						href={`${process.env.REACT_APP_BASE_URL_CBM}${params.row.logo}`}
						target='_blank'
						startIcon={<Visibility />}></Button>
				</Tooltip>
			),
		},
		{
			field: "status",
			headerName: "Status",
			sortable: true,
			width: 110,
			editable: false,
			renderCell: (params) => (
				<Tooltip title='Change Status'>
					<Switch
						checked={params.row.status}
						onChange={() => handleStatusChange(params.id, params.row.status)}
						name='status'
					/>
				</Tooltip>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 120,
			sortable: false,
			renderCell: (params) => (
				<Box>
					{/* <Tooltip title='View more'>
						<IconButton onClick={() => handleView(params.client_id)}>
							<Visibility />
						</IconButton>
					</Tooltip> */}
					{/* <Tooltip title='Edit brand'>
						<IconButton
							onClick={() => {
								handleEdit(params.client_id);
							}}>
							<Edit />
						</IconButton>
					</Tooltip> */}
					<Tooltip title='Delete brand'>
						<IconButton
							onClick={() => {
								handleDelete(params.row.client_id);
							}}>
							<Delete />
						</IconButton>
					</Tooltip>
				</Box>
			),
		},
	];

	const [openModal, setOpenModal] = useState(false);

	const handleModal = (value) => {
		setOpenModal(value);
	};

	const handleStatusChange = (id, statusVal) => {
		const status = statusVal == 1 ? 0 : 1;
		const formData = {
			status,
		};
		dispatch(updateClient(id, formData));
	};

	const handleDelete = (id) => {
		dispatch(deleteClient(id));
	};

	useEffect(() => {
		dispatch(getAllClients());
	}, []);

	return (
		<Container>
			<Grid container direction='column' spacing={5}>
				<Grid
					container
					Item
					direction='row'
					justifyContent='space-evenly'
					alignItems='center'>
					<Widget
						heading='TOTAL CLIENT'
						icon={<WorkIcon fontSize='large' color='primary' />}
						content={clients.length}
					/>
					<Widget
						heading='ACTIVE CLIENT'
						icon={<WorkIcon fontSize='large' color='secondary' />}
						content={active.length}
					/>
				</Grid>
				<Grid item>
					<Toolbar>
						<Button
							className='button'
							variant='contained'
							onClick={() => handleModal(true)}
							startIcon={<AddIcon />}>
							Create Client Business
						</Button>
					</Toolbar>
					<Table rows={rows} columns={columns} />
				</Grid>
			</Grid>
			{openModal && (
				<CreateModel handleModal={handleModal} openModal={openModal} />
			)}
		</Container>
	);
};

export default ClientBusiness;
