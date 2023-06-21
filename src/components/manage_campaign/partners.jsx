import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Tooltip } from "@mui/material"
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
    getBrandPartnersOfCampaign, createBrandPartners
} from "../../redux/actions/campaignmanager.actions"

export default function Partners(props) {
    const { status, brandpartners , error , loading } = useSelector((state) => state.campaignBannerReducer);
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [href, setHref] = React.useState("");
    const details = props.data.data;
    // console.log("d2= ",data);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();

    const reset = () => {
        setTitle("");
        setHref("");

    }
    const handleClose = () => {
        reset();
        setOpen(false);
    };

    useEffect(() => {
        console.log("cid = ", details.campaign_id);
        dispatch(getBrandPartnersOfCampaign(details.campaign_id));
    },[]);
    const handleSubmit = async () => {
        console.log("submit");

        
        if (title !== "" && href !== "") {
            let data = {
                title: title,
                href: href,
                campaign_id: details.campaign_id,
                client_id: details.client_id
            };
            console.log(" data = ", data);
            dispatch(createBrandPartners(data));
            console.log("  status = ", status);
            if (status) {
                alert("CREATED SUCCESSFULLY");
            }
            await dispatch(getBrandPartnersOfCampaign(details.campaign_id));
            console.log("brandpartners = ", brandpartners);
            setOpen(false);
        }
        else {
            alert(" SOME ERROR OCCURRED");
            dispatch(getBrandPartnersOfCampaign(details.campaign_id));
            // console.log("brandpartners = ", brandpartners);
            setOpen(false);
        }
       
    }

    const column = [
        { field: 'title', headerName: 'TITLE NAME', width: 200 },
        { field: 'href', headerName: 'LINKS TO', width: 200 },
        { field: 'modified_at', headerName: 'LAST MODIFIED AT', width: 250 }
    ];

    const row = brandpartners.map((item) => ({
        ...item,
        title: item.title,
        href: item.href,
        modified_at: item.modified_at
    }));

    return (
        <div>
            <Typography variant="h5" align="center">
                BRAND PARTNERS
                <Tooltip title="add new QUICKLINK">
                    <Button autoFocus onClick={handleClickOpen} position="relative">
                        <AddCircleIcon color="primary" />
                    </Button>
                </Tooltip>
            </Typography>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={row}
                    columns={column}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>



            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ADD NEW BRAND PARTNER</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Assign a new brand partner to showcase them on your website footer
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="TITLE NAME"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="link"
                        label="LINKING TO"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setHref(event.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>CREATE</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}