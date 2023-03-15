import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";

import {
	DataGrid,
	GridToolbar,
	GridToolbarContainer,
	useGridApiEventHandler,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
// import { deleteVoucherCode } from "../../redux/actions/voucher.actions";
import { Container } from "@mui/system";
import {
	AppBar,
	Dialog,
	Grid,
	Slide,
	Toolbar,
	Typography,
} from "@mui/material";
import { Widget } from "../../components/widget/Widget";
import { Close, ConfirmationNumber } from "@mui/icons-material";
import Table from "../../components/table/Table";
import { deletePromo } from "../../redux/actions/promocode.actions";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function Promos(props) {
	const { promocodes, handleShowAlert, openDialog, handleDialog } = props;
	const dispatch = useDispatch();

	const rows = promocodes.map((item) => ({
		...item,
		id: item.client_promo_id,
	}));

	const columns = [
		{ field: "id", headerName: "ID", width: 200 },
		{
			field: "promo_code",
			headerName: "Promo Codes",
			width: 150,
		},
		{
			field: "consumption_type",
			headerName: "Consumption Type",
			width: 150,
		},
		{
			field: "consumption_count",
			headerName: "Consumption Count",
			width: 150,
		},
		{
			field: "total_count",
			headerName: "Total Count",
			width: 100,
		},
		{
			field: "expires_at",
			headerName: "Validity",
			width: 100,
		},
		{
			field: "actions",
			headerName: "",
			width: 120,
			sortable: false,
			disableColumnMenu: false,
			renderCell: (params) => {
				return (
					<Box
						sx={{
							// backgroundColor: "whitesmoke",
							width: "100%",
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<IconButton
							onClick={() => deletePromocode(params.row.client_promo_id)}>
							<DeleteIcon />
						</IconButton>
					</Box>
				);
			},
		},
	];

	const deletePromocode = (id) => {
		const promoArr = {
			client_promo_id: [id],
		};
		dispatch(deletePromo(promoArr));
		handleShowAlert();
	};

	const handleCloseDialog = () => {
		handleDialog(false);
	};

	return (
		<Dialog
			fullScreen
			open={openDialog}
			onClose={handleCloseDialog}
			TransitionComponent={Transition}>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={handleCloseDialog}
						aria-label='close'>
						<Close />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
						Promo Codes
					</Typography>
				</Toolbar>
			</AppBar>
			<Container
				sx={{
					// backgroundColor: "whitesmoke",
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Grid
					container
					direction='column'
					justifyContent='space-evenly'
					alignItems='center'>
					<Widget
						heading='TOTAL'
						icon={<ConfirmationNumber fontSize='large' color='secondary' />}
						content={promocodes.length}
					/>
					<Box style={{ marginTop: "3%", height: "64vh", width: "100%" }}>
						<Table rows={rows} columns={columns} />
					</Box>
				</Grid>
			</Container>
		</Dialog>
	);
}
