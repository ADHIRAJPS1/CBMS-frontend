import { Add, Person } from "@mui/icons-material";
import { Box, Button, Container, Grid, Toolbar } from "@mui/material";
import { blue, green, pink, purple, yellow } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Widget } from "../../components/widget/Widget";
import { getAllUsers } from "../../redux/actions/user.actions";
import CreateModal from "./CreateModal";
import UserCard from "./UserCard";

const Users = () => {
	const dispatch = useDispatch();

	const { users } = useSelector((state) => state.userReducer);

	const [openModal, setOpenModal] = useState(false);
	const [isEdit, setisEdit] = useState(false);
	const [userData, setUserData] = useState();

	const handleModal = (value) => {
		setOpenModal(value);
		setUserData({});
		setisEdit(false);
	};

	const updateUser = (id) => {
		const user = users.filter((user) => user.id === id)[0];
		setUserData(user);
		setOpenModal(true);
		setisEdit(true);
	};

	useEffect(() => {
		dispatch(getAllUsers());
	}, []);

	return (
		<Container className='user-management '>
			<Grid container direction='column' spacing={5}>
				<Grid
					container
					item
					spacing={6}
					direction='row'
					justifyContent='space-around'>
					{/* <Widget
						heading='Super Admin'
						icon={<Person fontSize='large' sx={{ color: purple[500] }} />}
						//content={totalSuperAdmin.length}
					/> */}
					<Widget
						heading='ADMINS'
						icon={
							<Person
								fontSize='large'
								color='primary'
								// sx={{ color: pink[500] }}
							/>
						}
						content={users.length}
					/>
					{/* <Widget
						heading='Alliance Agent'
						icon={<Person fontSize='large' sx={{ color: yellow[700] }} />}
						//content={totalAlliance.length}
					/>
					<Widget
						heading='Campaign Manager'
						icon={<Person fontSize='large' sx={{ color: green[500] }} />}
						//content={totalCampaign.length}
					/>
					<Widget
						heading='Audit Manager'
						icon={<Person fontSize='large' sx={{ color: blue[500] }} />}
						//content={totalAudit.length}
					/> */}
					<Widget
						heading='TOTAL USERS'
						icon={<Person fontSize='large' color='secondary' />}
						content={users.length}
					/>
				</Grid>

				<Grid item>
					<Toolbar>
						<Button
							className='button'
							variant='contained'
							disableElevation
							startIcon={<Add />}
							onClick={() => handleModal(true)}>
							Add User
						</Button>
					</Toolbar>
					<Box sx={{ flexGrow: 1 }}>
						<Grid
							item
							container
							direction='row'
							spacing={{ xs: 2, md: 3 }}
							columns={{ xs: 4, sm: 8, md: 12 }}>
							{users.map((user) => {
								return (
									<UserCard
										key={user.id}
										handleUpdate={(id) => updateUser(id)}
										user={user}
									/>
								);
							})}
						</Grid>
					</Box>
				</Grid>
			</Grid>
			{openModal && (
				<CreateModal
					handleModal={handleModal}
					openModal={openModal}
					isEdit={isEdit}
					userInfo={userData}
				/>
			)}
		</Container>
	);
};

export default Users;
