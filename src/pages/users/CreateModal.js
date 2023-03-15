import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { Close as CloseIcon } from "@mui/icons-material";
import { createUser, updateUser } from "../../redux/actions/user.actions";

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

const initialState = {
	name: "",
	email: "",
	mobile: "",
	password: "",
};

const CreateModal = (props) => {
	const dispatch = useDispatch();

	const { openModal, handleModal, isEdit, userInfo } = props;

	const [userData, setUserData] = useState(initialState);

	const handleClose = () => {
		handleModal();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isEdit) {
			dispatch(createUser(userData));
		} else {
			dispatch(updateUser(userData.id, userData));
		}
		handleClose();
		setUserData(initialState);
	};

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.id]: e.target.value });
	};

	useEffect(() => {
		if (isEdit) {
			setUserData(userInfo);
		}
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={openModal}>
				<BootstrapDialogTitle
					id='customized-dialog-title'
					onClose={handleClose}>
					{isEdit ? `Update user` : `Add new user`}
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Box
						sx={{
							"& .MuiTextField-root": { mt: 4, ml: 6 },
						}}>
						<Grid container item sx={{ ml: 1 }} direction='row'>
							<FormControlLabel
								control={
									<TextField
										required
										key='name'
										label='Name'
										onChange={handleChange}
										id='name'
										placeholder='User Name'
										value={userData.name}
									/>
								}
							/>
							<FormControlLabel
								control={
									<TextField
										required
										key='email'
										label='Email'
										type='email'
										onChange={handleChange}
										id='email'
										placeholder='Email'
										value={userData.email}
									/>
								}
							/>
							<FormControlLabel
								control={
									<TextField
										required
										key='mobile'
										label='Mobile'
										type='mobile'
										onChange={handleChange}
										id='mobile'
										placeholder='Mobile'
										value={userData.mobile}
									/>
								}
							/>
							<FormControlLabel
								control={
									<TextField
										required
										key='password'
										type='password'
										label='Password'
										onChange={handleChange}
										id='password'
										placeholder='Password'
										value={userData.password}
									/>
								}
							/>
							{/* <TextField
								required
								id='campaign_id'
								name='campaign'
								select
								label='Campaign'
								placeholder='Select associated campaign'
								value={userData.rple_id}
								disabled={false}
								onChange={handleChange}>
								{roles.map((option) => (
									<MenuItem
										key={option.id}
										value={{
											campaign_id: option.id,
											name: option.title,
										}}>
										{option.title}
									</MenuItem>
								))}
							</TextField> */}
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

export default CreateModal;
