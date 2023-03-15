import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { replace } from "lodash";
import {
	Dialog,
	DialogTitle,
	IconButton,
	DialogContent,
	FormControlLabel,
	TextField,
	Box,
	Button,
	Grid,
	DialogActions,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Close as CloseIcon, PhotoCamera } from "@mui/icons-material";
import { createClient } from "../../redux/actions/client.actions";

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

const initialFileValues = {
	preview: "",
	data: "",
};

const CreateModel = (props) => {
	const dispatch = useDispatch();

	const { openModal, handleModal, isEdit = false } = props;
	const { user } = useSelector((state) => state.authReducer);

	const [clientData, setclientData] = useState({});
	const [logoData, setLogoData] = useState(initialFileValues);
	const [iconData, setIconData] = useState(initialFileValues);

	const handleClose = () => {
		setIconData(null);
		setLogoData(null);
		handleModal();
	};

	const handleLogoChange = (e) => {
		const size = e.target.files[0].size;
		if (size < 50000) {
			const img = {
				preview: URL.createObjectURL(e.target.files[0]),
				data: e.target.files[0],
			};
			setLogoData(img);
		}
	};

	const handleIconChange = (e) => {
		const size = e.target.files[0].size;
		if (size < 50000) {
			const img = {
				preview: URL.createObjectURL(e.target.files[0]),
				data: e.target.files[0],
			};
			setIconData(img);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isEdit) {
			const formData = new FormData();

			formData.append("logo", logoData.data);
			formData.append("icon", iconData.data);
			formData.append("created_by", "pankul@plutos.one");
			formData.append("modified_by", "pankul@plutos.one");
			formData.append("verified_by", "pankul@plutos.one");
			for (let item in clientData) {
				formData.append(item, clientData[item]);
			}

			dispatch(createClient(formData));
		}
		handleClose();
		setclientData({});
		setIconData(initialFileValues);
		setLogoData(initialFileValues);
	};

	const handleChange = (e) => {
		setclientData({ ...clientData, [e.target.id]: e.target.value });
	};

	return (
		<form onSubmit={handleSubmit}>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={openModal}>
				<BootstrapDialogTitle
					id='customized-dialog-title'
					onClose={handleClose}>
					{isEdit ? `Update Client` : `Create Client`}
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Box
						sx={{
							"& .MuiTextField-root": { mt: 4, ml: 6 },
						}}>
						<Grid container direction='column' columnSpacing={8}>
							<Grid
								container
								item
								sx={{ ml: 5 }}
								direction='column'
								columnSpacing={8}>
								<FormControlLabel
									control={
										<TextField
											required
											key='Client Name'
											label='Client Name'
											onChange={handleChange}
											id='name'
											placeholder='Client Name'
											value={clientData.title}
										/>
									}
								/>
								<FormControlLabel
									control={
										<TextField
											required
											key='Slug'
											label='Slug'
											onChange={handleChange}
											id='slug'
											placeholder='Slug'
											value={clientData.slug}
										/>
									}
								/>
							</Grid>
							<Grid
								container
								item
								sx={{ ml: 5, mt: 3, mb: 4 }}
								direction='row'
								columnSpacing={8}>
								<FormControlLabel
									control={
										<Grid
											container
											item
											direction='column'
											sx={{ ml: 3, mt: 3 }}>
											<Button
												required
												variant='outlined'
												startIcon={<PhotoCamera />}
												component='label'
												onChange={handleLogoChange}>
												Upload Logo
												<input
													hidden
													accept='.png, .jpg, .jpeg'
													// multiple
													type='file'
												/>
											</Button>
											{logoData !== initialFileValues && (
												<img
													width='150'
													height='50'
													src={logoData.preview}
													alt=''
												/>
											)}
										</Grid>
									}
								/>
								<FormControlLabel
									control={
										<Grid
											container
											item
											direction='column'
											sx={{ ml: 3, mt: 3 }}>
											<Button
												required
												variant='outlined'
												startIcon={<PhotoCamera />}
												component='label'
												onChange={handleIconChange}>
												Upload Icon
												<input
													hidden
													accept='.png, .jpg, .jpeg'
													// multiple
													type='file'
												/>
											</Button>
											{iconData !== initialFileValues && (
												<img
													width='150'
													height='50'
													src={iconData.preview}
													alt=''
												/>
											)}
										</Grid>
									}
								/>
							</Grid>
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button type='submit' onClick={handleSubmit}>
						{" "}
						save{" "}
					</Button>
					<Button onClick={handleClose}> close </Button>
				</DialogActions>
			</BootstrapDialog>
		</form>
	);
};

export default CreateModel;
