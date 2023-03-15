import React, { useState, useEffect } from "react";
import axios from "axios";

import {
	AppBar,
	Box,
	Button,
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	Grid,
	IconButton,
	Slide,
	Switch,
	TextField,
	Toolbar,
	Tooltip,
	Typography,
	MenuItem,
	DialogActions,
} from "@mui/material";
import {
	Visibility,
	Delete,
	Edit,
	Close,
	ConfirmationNumber,
	Download,
	Add,
	FileUpload,
} from "@mui/icons-material";
import { Stack } from "@mui/system";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Widget } from "../../components/widget/Widget";
import Table from "../../components/table/Table";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Close as CloseIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { createPromoBatch } from "../../redux/actions/promocode.actions";

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
const AddModal = (props) => {
	const {
		campaigns,
		clients,
		openModal,
		handleModal,
		handleAlert,
		isEdit = false,
	} = props;

	const dispatch = useDispatch();

	const [file, setFile] = useState(null);
	const [batch, setBatch] = useState({
		client_id: "",
		campaign_id: "",
	});

	const clientsArr = clients.map((client) => ({
		id: client.client_id,
		name: client.client_name,
	}));

	const campaignArr = campaigns
		.filter((campaign) => campaign.client_id === batch.client_id)
		.map((campaign) => ({
			id: campaign.campaign_id,
			name: campaign.name,
		}));

	const handleDownload = () => {
		// using Java Script method to get PDF file
		fetch("SamplePromoBatch.xlsx").then((response) => {
			response.blob().then((blob) => {
				// Creating new object of PDF file
				const fileURL = window.URL.createObjectURL(blob);
				// Setting various property values
				let alink = document.createElement("a");
				alink.href = fileURL;
				alink.download = "SamplePromoBatch.xlsx";
				alink.click();
			});
		});
	};

	const handleFileUpload = (e) => {
		setFile(e.target.files[0]);
	};

	const handleInputChange = async (e) => {
		setBatch({
			...batch,
			[e.target.name]: e.target.value,
		});
	};

	const handleCloseForm = () => {
		handleModal(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();

			formData.append("batch_file", file);
			formData.append("campaign_id", batch.campaign_id);

			for (var pair of formData.entries()) {
				console.log(pair[0] + ", " + pair[1]);
			}

			dispatch(createPromoBatch(formData));
			handleCloseForm();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<BootstrapDialog
			onClose={handleCloseForm}
			aria-labelledby='customized-dialog-title'
			open={openModal}>
			<BootstrapDialogTitle
				id='customized-dialog-title'
				onClose={handleCloseForm}>
				{isEdit ? `Update Promocode` : `Add Promocode`}
			</BootstrapDialogTitle>
			<form onSubmit={handleSubmit}>
				<Box
					sx={{
						"& .MuiTextField-root": { mt: 4, ml: 7, width: "80%" },
					}}>
					<Grid container direction='row'>
						<Grid item xs={12}>
							<TextField
								required
								id='client'
								name='client_id'
								select
								label='Client'
								placeholder='Select client'
								value={clientsArr.client_id}
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
								id='campaign'
								name='campaign_id'
								select
								label='Campaign'
								placeholder='Select campaign'
								value={campaigns.campaign_id}
								disabled={false}
								onChange={handleInputChange}>
								{campaignArr.map((option, index) => (
									<MenuItem key={index} value={option.id}>
										{option.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						{!isEdit && (
							<Grid item xs={12}>
								<Stack
									sx={{ ml: 7, mt: 5 }}
									direction='row'
									alignItems='center'
									spacing={2}>
									<Button
										variant='contained'
										startIcon={<FileUpload />}
										type='upload'
										component='label'
										onChange={handleFileUpload}>
										<input hidden accept='.xlsx' type='file' />
										Upload new batch
									</Button>
									<Button
										variant='outlined'
										startIcon={<Download />}
										type='download'
										component='label'
										onClick={handleDownload}>
										Sample sheet format
									</Button>
								</Stack>
							</Grid>
						)}

						<DialogActions>
							<Button type='submit' onClick={handleSubmit}>
								{" "}
								save{" "}
							</Button>
						</DialogActions>
					</Grid>
				</Box>
			</form>
		</BootstrapDialog>
	);
};

export default AddModal;
