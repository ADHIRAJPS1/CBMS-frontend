import * as React from "react";
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

import {
    createQuickLinks, getQuickLinksOfBanner
} from "../../redux/actions/campaignmanager.actions"

export default function QuickLinks(props) {
    const { status, quicklinks } = useSelector((state) => state.campaignBannerReducer);
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

    const handleSubmit = () => {
        let data = {
            "title": title,
            "href": href,
            "campaign_id": details.campaign_id,
            "client_id": details.client_id
        };

        console.log(" data = ", data);
        console.log("  status = ", status);
        dispatch(createQuickLinks(data));
        if (status.statusText === "OK") {
            alert("QUICKLINK CREATED SUCCESSFULLY");
        }
        dispatch(getQuickLinksOfBanner(details.campaign_id));
        console.log("quicklinks = ", quicklinks);
        setOpen(false);



    }

    const column = [
        { field: 'title', headerName: 'TITLE NAME', width: 200 },
        { field: 'href', headerName: 'LINKS TO', width: 200 },
        { field: 'modified_at', headerName: 'LAST MODIFIED AT', width: 250 }
    ];

    const row = quicklinks.map((item) => ({
        ...item,
        title: item.title,
        href: item.href,
        modified_at: item.modified_at
    }));


    return (
        <div>
            <Typography variant="h5" align="center">
                QUICKLINKS
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
                <DialogTitle>ADD NEW QUICK LINK</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new quick link which will be displayed in your footer section directly from here
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