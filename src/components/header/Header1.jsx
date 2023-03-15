import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth.actions";
import { Button, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";

const Header = () => {
	const { isAuthenticated, loading, user } = useSelector(
		(state) => state.authReducer
	);

	const dispatch = useDispatch();

	const authLinks = (
		<ul>
			<li>
				<Typography
					sx={{ ml: 2, mt: 1, flex: 1, color: "#f9f7f7" }}
					variant='button'
					component='div'>
					Hello, {user && user.user_name}
				</Typography>
			</li>
			<li>
				<Button
					variant='outlined'
					href='/login'
					startIcon={<Logout />}
					onClick={() => dispatch(logout())}>
					Logout
				</Button>
			</li>
		</ul>
	);

	return (
		<div className='header'>
			<Link className='logo' to='/'>
				plutosONE
			</Link>

			{!loading && <Fragment>{isAuthenticated && authLinks}</Fragment>}
		</div>
		// <Box sx={{ flexGrow: 1 }}>
		// 	<AppBar position='static'>
		// 		<Toolbar>
		// 			<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
		// 				<Link className='logo' to='/'>
		// 					plutosONE
		// 				</Link>
		// 			</Typography>

		// 		</Toolbar>
		// 	</AppBar>
		// </Box>
	);
};

export default Header;
