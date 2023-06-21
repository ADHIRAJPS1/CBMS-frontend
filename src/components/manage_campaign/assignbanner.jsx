import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBannersOfCampaign, getListOfBanners, saveCampaignBanner } from '../../redux/actions/campaignmanager.actions';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color: 'blue',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function KeepMountedModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const [age, setAge] = React.useState('');

    const { banners, campaignbanner, status } = useSelector((state) => state.campaignBannerReducer);
    // console.log(" banners list = ", banners, " campaignbanner = ", campaignbanner);
    const handleChange = (event) => {
        console.log("target = ", event.target.value);
        setBannerId(event.target.value.id);
        setBanner(event.target.value);
    };

    const dispatch = useDispatch();


    const [bannerid, setBannerId] = useState(null);
    const [alt, setAlt] = useState("");
    const [href, setHref] = useState(null);
    const [sequence_no, setSequenceNo] = useState(1);
    const [banner, setBanner] = useState("");


    const resetValues = () => {
        setAlt('');
        setHref(null);
        setSequenceNo(1);
        setBanner("");
    };

    const saveCamBanner = async () => {
        console.log("saving campaign banner");


        const data = {
            campaign_id: (props.data),
            banner_id: bannerid,
            alt: alt,
            href: href,
            sequence_no: sequence_no
        };
        console.log(" data received from props = ", props);
        console.log("  banner added = ", data);
        dispatch(saveCampaignBanner(data));
        if (status.success === true) {
            alert("CREATED SUCCESSFULLY");
        }
        else {
            alert(status.message);
        }
        handleClose();
        resetValues();
        dispatch(getAllBannersOfCampaign(props.data));

    };



    useEffect(() => {
        dispatch(getListOfBanners());
    }, [])



    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Add new Banner</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/client-campaign">
                            Assign Campaign
                        </Link>
                        <Link
                            color="inherit"
                        >
                            New Banner
                        </Link>
                        <Typography color="text.primary">Create Banner</Typography>
                    </Breadcrumbs>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>SELECT A BANNER</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Banner</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={banner}
                                    label="Banner selection"
                                    onChange={(event) => { handleChange(event) }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {banners.map((item) => {
                                        return (
                                            <MenuItem value={item}>{item.title}</MenuItem>
                                        )
                                    })}
                                </Select>
                                <FormHelperText>Choose from existing banners</FormHelperText>
                                <FormHelperText>Go to Banner Section to create a new Banner</FormHelperText>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>UPDATE RECORDS</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                FILL THE RECORDS
                                <TextField id="standard-basic" label="ALT TAG" variant="standard" value={alt} onChange={(event) => setAlt(event.target.value)} required />
                                <TextField id="standard-basic" label="LINK TO" variant="standard" value={href} onChange={(event) => setHref(event.target.value)} required />
                                <TextField id="standard-basic" label="SEQUENCE NUMBER i.e. 1" variant="standard" />
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails align="center">
                            <Button variant="contained" onClick={() => { saveCamBanner() }}>Add the Banner </Button>
                        </AccordionDetails>
                    </Accordion>

                </Box>
            </Modal>

        </div>
    );
}