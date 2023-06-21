import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Visibility } from '@mui/icons-material';
<<<<<<< HEAD
import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { DataGrid } from '@mui/x-data-grid';

// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import QuickLinks from './quicklinks';
import Partners from './partners';


import { Container, Grid, Tooltip } from '@mui/material';
=======

import { Container, Grid } from '@mui/material';
>>>>>>> parent of 0f8e2b4 (banners)
import Banner from './banner';


import { useEffect } from 'react';

// <DraggableCore>
// import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

import KeepMountedModal from './assignbanner';
import { useDispatch, useSelector } from 'react-redux';

// work from reducer - work pending - for testing purpose
import {
  getAllBannersOfCampaign, getQuickLinksOfBanner
} from "../../redux/actions/campaignmanager.actions"
import DataTable from './quicklinks';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {

  const { campaignbanners, loading, quicklinks } = useSelector((state) => state.campaignBannerReducer);
  const [campdata, setCampData] = React.useState(props.data);
  const [open, setOpen] = React.useState(false);
  const [openql, setOpenql] = React.useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = (props) => {
    setOpen(true);
    // console.log(" bid = ",campdata.campaign_id );
    dispatch(getAllBannersOfCampaign(campdata.campaign_id));
    dispatch(getQuickLinksOfBanner(campdata.campaign_id));
    // console.log(" dvl = ", campdata);
    // console.log(" camp banners : ",campaignbanners);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // console.log("data:",data)
    // dispatch(getAllBannersOfCampaign(2));
  }, []);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Visibility />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Container fixed>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                name of client - {campdata.client_name} <br />
                Name of campaign - {campdata.campaign_name}
              </Typography>
            </Container>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText
              primary="CAROUSEL SECTION"
              secondary="THIS SECTION MANAGES YOUR BANNERS IN THE CAROUSEL OF YOUR CAMPAIGN"
            />
            <Button variant="" href="">
              <KeepMountedModal data={campdata.campaign_id} />
            </Button>
          </ListItem>
          <Divider />
          <Grid container justifyContent="left">
            { campaignbanners.length <=0 && ( 
              <h1>NO CAMPAIGN FOUND</h1>
            )}
            {campaignbanners.length > 0 && (
              campaignbanners.map((item) => {
                return (
                  <Grid xs={12} md={6} lg={4}>
                    <Banner data={item} />
                  </Grid>

                )
              })
            )}
          </Grid>

          <Divider />

          
          {/* <h1>QUICK LINKS </h1> */}
          <Grid container>
            <Grid lg={6} md={6} xs={12}>
<<<<<<< HEAD
              <QuickLinks data={props}/>
            </Grid>

            <Grid lg={6} md={6} xs={12}>
              <Partners data={props}/>
=======
              <Typography>
                  <h1 align="center">QUICKLINKS CENTER</h1>

              </Typography>
                <DataTable />
            </Grid>

            <Grid lg={6} md={6} xs={12}>
              <Typography>
                <h1 align="center">BRAND PARTNERS</h1>

              </Typography>
                <DataTable />
>>>>>>> parent of 0f8e2b4 (banners)
            </Grid>

          </Grid>

          {/* <h1>BRAND PARTNERS AUTOMATION</h1> */}
              
        </List>
      </Dialog>
      
    </div>

  );
}

