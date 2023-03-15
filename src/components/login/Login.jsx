import React, { useState } from "react";
import "./login.scss";
import {
	Grid,
	Paper,
	Avatar,
	TextField,
	Button,
	Typography,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/actions/auth.actions";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const dispatch = useDispatch();

	const isAuthenticated = useSelector(
		(state) => state.authReducer.isAuthenticated
	);

	if (isAuthenticated) {
		return <Navigate to='/users' />;
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<div className='login'>
			<Header />
			<Grid>
				<Paper elevation={10} className='paper'>
					<Grid align='center'>
						<Avatar className='avatar'>
							<LockPersonIcon />
						</Avatar>
						<h2>Sign In</h2>
					</Grid>
					<form onSubmit={onSubmit}>
						<TextField
							name='email'
							label='Email'
							placeholder='Enter email'
							type='email'
							value={email}
							className='textinput'
							onChange={onChange}
							fullWidth
							required
						/>
						<TextField
							name='password'
							label='Password'
							placeholder='Enter password'
							type='password'
							value={password}
							onChange={onChange}
							fullWidth
							required
						/>
						<Button
							type='submit'
							color='primary'
							variant='contained'
							className='btn'
							fullWidth>
							Sign in
						</Button>
						<Typography>Forgot password? Please contact your admin.</Typography>
					</form>
				</Paper>
			</Grid>
		</div>
	);
};

export default Login;
