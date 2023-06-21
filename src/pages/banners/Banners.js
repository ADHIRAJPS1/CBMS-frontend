import Box from "@mui/material/Box";
import { Delete, Edit, PhotoCamera } from "@mui/icons-material";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, InputLabel, Switch, Tooltip } from "@mui/material";
import Table from "../../components/table/Table";
import "../banners/banners.scss";
import BannerCard from "../../components/cards/BannerCard";
import { useState } from "react";

const Banners = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [editBanner, setEditBanner] = useState({});

	const handleEdit = (banner_data) => {
		setOpenDialog(true);
		setEditBanner(banner_data);
	}

	const handleClose = () => {
		setOpenDialog(false);
	};

	const handleSave = () => {
		console.log("Saving banner details")
	}

	const rows = [
		{
			id: "123123",
			title: "Bollywood",
			img_d: "/banners/desktop banner poll.png",
			img_m: "/banners/phone.png"
		}
	]

	const columns = [
		{ field: "id", headerName: "ID", width: 50 },
		{
			field: "title",
			headerName: "Title",
			width: 150,
			editable: true,
		},
		{
			field: "img_d",
			headerName: "Desktop",
			width: 300,
			// editable: true,
			renderCell: (params) => (
				<div className="table-img-container">
					<img src={`${params.row.img_d}`} className="table-img" />
					{/* <img href={`${process.env.REACT_APP_BASE_URL_CBM}${params.row.img_d}`} /> */}
				</div>
			),
		},
		{
			field: "img_m",
			headerName: "Mobile",
			width: 300,
			editable: false,
			renderCell: (params) => (
				<div className='table-img-container'>
					<img src={`${params.row.img_m}`} className="table-img" />
					{/* <img href={`${process.env.REACT_APP_BASE_URL_CBM}${params.row.img_m}`} /> */}
				</div>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 100,
			sortable: false,
			renderCell: (params) => (
				<Box>
					<Tooltip title='Edit brand'>
						<IconButton
							onClick={() => {
								setOpenDialog(true);
								handleEdit(params.row);
							}}>
							<Edit />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete brand'>
						<IconButton
							onClick={() => {
								// handleDelete(params.row.id);
							}}>
							<Delete />
						</IconButton>
					</Tooltip>
				</Box>
			),
		},
	];

	return (<>
		<Container >
			<Grid container direction='column' spacing={5}>
				<Grid item>
					<Table rows={rows} columns={columns} />
				</Grid>
			</Grid>
			<Dialog
				fullWidth={true}
				maxWidth={'xl'}
				open={openDialog}
				onClose={handleClose}
			>
				<DialogTitle>{editBanner.title}</DialogTitle>
				<Box
						noValidate
						component="form"
						sx={{
							justifyContent: 'center',
							position: 'absolute',
							top: '0',
							right: '20px'
						}}
					>
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
									// onChange={handleIconChange}
									>
									Upload Desktop Banner
									<input
										hidden
										accept='.png, .jpeg'
										multiple={false}
										type='file'
									/>
								</Button>
								{/* {iconData !== initialFileValues && (
									<img
										width='150'
										height='50'
										// src={iconData.preview}
										alt=''
									/>
								)} */}
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
									// onChange={handleIconChange}
									>
									Upload Mobile Banner
									<input
										hidden
										accept='.png, .jpeg'
										multiple={false}
										type='file'
									/>
								</Button>
								{/* {iconData !== initialFileValues && (
									<img
										width='150'
										height='50'
										// src={iconData.preview}
										alt=''
									/>
								)} */}
							</Grid>
						}
					/>
					</Box>
				<DialogContent sx={{ padding: 'auto 0px', margin: '0' }}>
					<DialogContentText>Desktop Banner</DialogContentText>
					<Box
						noValidate
						component="form"
						sx={{
							display: 'flex',
							justifyContent: 'center',
							backgroundColor: '#AEAEAE'
						}}
					>
						<img src={editBanner.img_d} style={{ width: '100%', height: '100%', minHeight:'163px', margin: '0px' }} />
					</Box>
					<DialogContentText>Mobile Banner</DialogContentText>
					<Box
						noValidate
						component="form"
						sx={{
							display: 'flex',
							justifyContent: 'center',
							backgroundColor: '#AEAEAE'
						}}
					>
						<img src={editBanner.img_m} style={{ width: '600px', height: '100%', minHeight:'160px', margin: '0px' }} />
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</Container>
	</>);
}

export default Banners;