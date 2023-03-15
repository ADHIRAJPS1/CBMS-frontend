import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	Button,
	Container,
	Grid,
	Alert,
	Tooltip,
	Toolbar,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "../../components/table/Table";
import { Widget } from "../../components/widget/Widget";
import {
	CleaningServices,
	Visibility,
	Edit,
	Add,
	Delete,
	ConfirmationNumber,
} from "@mui/icons-material";
import AddModal from "./AddModal";
import {
	deletePromoBatch,
	getAllCampaignPromo,
	getAllPromoBatch,
	getAllPromos,
} from "../../redux/actions/promocode.actions";
import { useDispatch, useSelector } from "react-redux";
import Promos from "./Promos";
import { getAllClients } from "../../redux/actions/client.actions";

const Promocode = () => {
	const { campaigns, promoBatches, promos } = useSelector(
		(state) => state.promoReducer
	);

	const { clients } = useSelector((state) => state.clientReducer);
	const dispatch = useDispatch();

	const rows = promoBatches.map((item) => ({
		...item,
		id: item.campaign_batch_id,
	}));

	const columns = [
		{ field: "id", headerName: "Batch ID", width: 50 },
		{
			field: "client_name",
			headerName: "Client",
			width: 160,
			editable: true,
		},
		{
			field: "campaign_name",
			headerName: "Campaign",
			width: 160,
			editable: true,
		},
		{
			field: "expires_at",
			headerName: "Validity",
			width: 160,
			editable: true,
		},
		{
			field: "created_at",
			headerName: "Created At",
			width: 160,
			editable: true,
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
					<Tooltip title='View voucher codes'>
						<IconButton
							onClick={() => {
								handlePromos(params.row.campaign_batch_id);
							}}>
							<ConfirmationNumber />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete brand'>
						<IconButton
							onClick={() => {
								handleDelete(params.row.campaign_batch_id);
							}}>
							<Delete />
						</IconButton>
					</Tooltip>
				</Box>
			),
		},
	];

	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState("Success");
	const [openModal, setOpenModal] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

	const handleDialog = (value) => {
		value ? setOpenDialog(value) : setOpenDialog(!openDialog);
	};

	const handleModal = (value) => {
		value ? setOpenModal(value) : setOpenModal(!openModal);
	};
	const handleAlert = (value) => {};

	const handleDelete = (id) => {
		dispatch(deletePromoBatch(id));
	};

	const handlePromos = (id) => {
		dispatch(getAllPromos(id));
		setOpenDialog(true);
	};

	const active = promoBatches
		.map((item) => item.status)
		.filter((item) => item === 1);

	useEffect(() => {
		dispatch(getAllPromoBatch());
		dispatch(getAllCampaignPromo());
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
						content={promoBatches.length}
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
							Add Promocode
						</Button>
					</Toolbar>
					<Table rows={rows} columns={columns} />
				</Grid>
			</Grid>
			{openModal && (
				<AddModal
					clients={clients}
					campaigns={campaigns}
					handleModal={handleModal}
					openModal={openModal}
					handleAlert={handleAlert}
				/>
			)}
			<Promos
				promocodes={promos}
				handleDialog={handleDialog}
				openDialog={openDialog}
			/>
		</Container>
	);
};

export default Promocode;
