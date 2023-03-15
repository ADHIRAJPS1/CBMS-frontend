import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Grid, Stack } from "@mui/material";
import "./layout.scss";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import SideNav from "../components/sideNavbar/SideNav";
import Alert from "../components/alerts/Alert";
import { Box } from "@mui/system";

const Layout = () => {
	const gridStyle = {
		marginTop: "7%",
		marginLeft: "20%",
	};
	return (
		<Container>
			<Header />
			<SideNav />
			<Stack style={gridStyle} spacing={8}>
				<Alert />
				<Outlet />
				<Footer />
			</Stack>
		</Container>
	);
};

export default Layout;
