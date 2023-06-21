import React from "react";
import { NavLink } from "react-router-dom";
import "./sideNav.scss";

import { Grid, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CampaignIcon from "@mui/icons-material/Campaign";

const SideNav = () => {
	const menuItems = [
		// {
		// 	path: "/",
		// 	icon: <DashboardIcon />,
		// 	linkText: "My Dashboard",
		// },
		{
			path: "/client-business",
			icon: <WorkIcon />,
			linkText: "Client Business",
		},
		{
			path: "/client-campaign",
			icon: <CampaignIcon />,
			linkText: "Assign Campaign",
		},
		{
			path: "/client-promocode",
			icon: <ConfirmationNumberIcon />,
			linkText: "Promocode",
		},
	];
	return (
		<Grid item sm={2} className='side-nav'>
			<div className='page-links'>
				{menuItems.map((item, index) => (
					<NavLink to={item.path} key={index}>
						<IconButton color='secondary' className='icon'>
							{" "}
							{item.icon}{" "}
						</IconButton>
						<label>{item.linkText}</label>
					</NavLink>
				))}
			</div>
		</Grid>
	);
};

export default SideNav;
