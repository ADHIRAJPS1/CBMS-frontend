import React, { useState, useEffect } from "react";

import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	Grid,
	IconButton,
	TextField,
	MenuItem,
	DialogActions,
	// FormControlLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Close as CloseIcon } from "@mui/icons-material";
import { createAssociation } from "../../redux/actions/campaign.actions";
import { useDispatch, useSelector } from "react-redux";
import { getAllClients } from "../../redux/actions/client.actions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": { padding: theme.spacing(2) },
	"& .MuiDialogActions-root": { padding: theme.spacing(1) },
}));

function BootstrapDialogTitle(props) {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
}

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};
const AssignCampaign = (props) => {
	const { clients } = useSelector((state) => state.clientReducer);

	const dispatch = useDispatch();

	const { openModal, handleModal, campaigns, isEdit = false } = props;

	const [clientCamp, setClientCamp] = useState({
		client_id: "",
		campaign_id: "",
		name: "",
		campaign_url: ""
	});

	
	useEffect(() => {
		dispatch(getAllClients());
	}, []);

	const handleInputChange = async (e) => {
		const { name, value } = e.target;	
			if (name === "campaign_url"){
			setClientCamp({
				...clientCamp,
				[name]: value
			});
		}
	
		
		else {
			setClientCamp({ ...clientCamp, [name]: value });
		}
	};
	const handleInputChange1 = async (e,option) => {
		const { name, value } = e.target;
		console.log(name,value,option,option.props.children);
		
			setClientCamp({
				...clientCamp,
				["name"]: option.props.children,
				["campaign_id"]: value
			});
		
	};

	const handleClose = () => {
		handleModal(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createAssociation(clientCamp));
		handleClose();
	};

	return (
		<BootstrapDialog
			onClose={handleClose}
			aria-labelledby='customized-dialog-title'
			open={openModal}>
			<BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
				{isEdit ? `Update Campaign` : `Assign campaign`}
			</BootstrapDialogTitle>
			<form onSubmit={handleSubmit}>
				<Box
					sx={{
						"& .MuiTextField-root": { mx: 4, my: 2, width: "80%" },
					}}>
					<Grid container direction='row'>
						<Grid item xs={12}>
							{/* <FormControlLabel
								control={
									<Grid> */}
							<TextField
								required
								id='client_id'
								name='client_id'
								select
								label='Client'
								placeholder='Select Client'
								value={clientCamp.client_id}
								disabled={false}
								onChange={handleInputChange}>
								{clients.map((option) => (
									<MenuItem key={option.client_id} value={option.client_id}>
										{option.name}
									</MenuItem>
								))}
							</TextField>
							<TextField
								required
								id='campaign_id'
								name="campaign"
								select
								label='Campaign'
								placeholder='Select associated campaign'
								//placeholder={clientCamp.campaign_id}
								value={clientCamp.campaign_id}
								disabled={false}
								onChange={handleInputChange1}>
								{campaigns.map((option) => (
									<MenuItem
										// key={option.id}
										// value={{
										// 	"campaign_id": option.id,
										// 	"name": option.title}
										// }>
										// {option.title}
										key={option.id}
										value={ option.id
										}
										onClick={(e)=>handleInputChange1(e,option)}
										>
										{option.title}
									</MenuItem>
								))}
							</TextField>
							<TextField
								required
								id='campaign_url'
								name='campaign_url'
								
								label='Campaign Url'
								placeholder='Insert campaign url'
								value={clientCamp.campaign_url}
								disabled={false}
								onChange={handleInputChange}>
								
							</TextField>
							{/* </Grid>
								}
							/> */}
						</Grid>

						<DialogActions>
							<Button type='submit' onClick={handleSubmit}>
								{" "}
								save{" "}
							</Button>
							<Button onClick={handleClose}> close </Button>
						</DialogActions>
					</Grid>
				</Box>
			</form>
		</BootstrapDialog>
	);
};

export default AssignCampaign;
