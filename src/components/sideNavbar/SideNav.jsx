import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WorkIcon from "@mui/icons-material/Work";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CampaignIcon from "@mui/icons-material/Campaign";
import "../../index.scss";
import { Person } from "@mui/icons-material";

const drawerWidth = 230;
const bgcolor = "#366925";
const color = "#a8c76a";

const SideDrawer = () => {
	const menuItems = [
		// {
		// 	path: "/",
		// 	icon: <DashboardIcon />,
		// 	linkText: "My Dashboard",
		// },
		{
			path: "/users",
			icon: <Person />,
			linkText: "User Management",
		},
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
		{
			path: "/banners",
			icon: <ConfirmationNumberIcon />,
			linkText: "Banners",
		},
	];
	return (
		<Drawer
			variant='permanent'
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					backgroundColor: bgcolor,
					color: color,
					width: drawerWidth,
					boxSizing: "border-box",
				},
			}}>
			<Toolbar />
			<Box sx={{ overflow: "auto" }}>
				<List>
					{menuItems.map((item, index) => (
						<ListItem key={index} disablePadding>
							<ListItemButton to={item.path}>
								<ListItemIcon sx={{ color: color }}>{item.icon}</ListItemIcon>
								<ListItemText primary={item.linkText} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export default SideDrawer;
