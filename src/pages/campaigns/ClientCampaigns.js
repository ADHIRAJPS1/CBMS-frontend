import React, { useEffect, useState } from "react";
// import axios from "axios";
import {
	Button,
	Container,
	Grid,
	Toolbar,
	// Typography,
	Alert,
	Tooltip,
	// Switch,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "../../components/table/Table";
import { Widget } from "../../components/widget/Widget";

import FullScreenDialog from "../../components/manage_campaign/modal";
//import CollectionDilogbox from "./CollectionDilogbox";
// import {
// 	CleaningServices,
// 	Visibility,
// 	Edit,
// 	Add,
// 	Delete,
// } from "@mui/icons-material";
//import CollectionDetails from "./CollectionDetails";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
// import AddModal from "./AssignCampaign";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllAssociations,
	getUnassignedCampaigns,
} from "../../redux/actions/campaign.actions";
import AssignCampaign from "./AssignCampaign";
import { setAlert } from "../../redux/actions/alert.actions";
import { Visibility } from "@mui/icons-material";

const ClientCampaigns = () => {
	const { campaigns, assignedCampaigns } = useSelector(
		(state) => state.campaignReducer
	);

	const dispatch = useDispatch();

	const rows = assignedCampaigns.map((item) => ({
		...item,
		id: item.client_org_campaigns_id,
		campaign_id: item.campaign_id,
		campaign_name: item.name,
		client_id: item.client_id,
		client_name: item.client_name,
	}));

	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState("Success");
	const [openModal, setOpenModal] = useState(false);
	const [view, setView] = useState(false);
	const [campaigndata, setCampaignData] = useState("");

	useEffect(() => {
		dispatch(getAllAssociations());
		dispatch(getUnassignedCampaigns());
	}, []);

	const handleModal = (value) => {
		value ? setOpenModal(value) : setOpenModal(!openModal);
	};
	const handleAlert = (value) => {
		setAlert(value);
	};
	const handleView = (value) => {
		// setView(true);
		// setCampaignData(value);
		// console.log(" data value = ", value , " view status = ",view);

	};

	// const data = {
	// 	"name": "Campaign1",
	// 	"created_on": "Sunday"
	// };
	// const handleEdit = (value) => {};
	// const handleDelete = (value) => {};

	const columns = [
		{ field: "id", headerName: "ID", width: 50 },
		{
			field: "client_name",
			headerName: "Client Name",
			width: 360,
			editable: false,
		},
		{
			field: "campaign_name",
			headerName: "Campaign Name",
			width: 360,
			editable: false,
		},
		{
			field: "campaign_id",
			headerName: "Campaign ID",
			width: 150,
			editable: false,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 300,
			sortable: false,
			renderCell: (params) => (
				<Box>
					<Tooltip title=''>
						<IconButton onClick={(e)=>{handleView(params.row)}}>							
							<FullScreenDialog key={params.row.id} data={params.row} />
						</IconButton>
					</Tooltip>
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

	const active = assignedCampaigns
		.map((item) => item.status)
		.filter((item) => item === 1);

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
						heading='TOTAL CAMPAIGNS'
						icon={<WorkIcon fontSize='large' color='primary' />}
						content={assignedCampaigns.length}
					/>
					<Widget
						heading='ACTIVE CAMPAIGNS'
						icon={<WorkIcon fontSize='large' color='secondary' />}
						content={active.length}
					/>
				</Grid>

				<Grid item>
					{alertMessage && (
						<Alert
							onClose={() => {
								setAlertMessage("");
							}}
							severity={`${alertType}`}>
							{alertMessage}
						</Alert>
					)}
					<Toolbar>
						<Button
							className='button'
							variant='contained'
							onClick={() => handleModal(true)}
							startIcon={<AddIcon />}>
							Assign Campaigns
						</Button>
					</Toolbar>
					<Table rows={rows} columns={columns} />
				</Grid>
			</Grid>
			{openModal && (
				<AssignCampaign
					handleModal={handleModal}
					openModal={openModal}
					handleAlert={handleAlert}
					campaigns={campaigns}
				/>
			)}
		</Container>
	);
};

export default ClientCampaigns;
