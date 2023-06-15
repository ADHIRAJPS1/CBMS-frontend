import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import { useDispatch , useSelector } from 'react-redux';
import {
  updateCamBanner
} from "../../redux/actions/campaignmanager.actions"


const Banner = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [alt, setAlt] = useState("");
  const [sequence_no, setSequenceNo] = useState("");
  const [href, setHref] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);

  };
  const data = props.data;
  const dispatch = useDispatch();


  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const updatebanner = () => {
    console.log(" clicked", checked);
    const cbid = props.data.id;
    const data = {

      alt: alt,
      href: href,
      sequence_no: sequence_no
    };
    console.log("cbid = ", cbid , " data = ",data ); 
    dispatch(updateCamBanner(cbid , data));
    window.location.reload();

  };

 
  // console.log(" banner inside compoennt = " ,data);
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            CB
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={data.title || "NO TITLE FOUND"}
        subheader={`Updated on -  ${data.modified_at} `}
      />
      <CardMedia
        component="img"
        height="194"
        image={data.img_d}
        alt={data.alt}
      />
      <CardContent>
        <Typography align="center" variant="body2" color="text.secondary">
          View more about this banner by clicking over down arrow button
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit">
          {/* <FavoriteIcon /> */}
          {/* <DeleteIcon /> */}
          {/* <ModeEditIcon /> */}
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <Banner
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </Banner>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography align='center' paragraph>
            <b>Banner Info</b>

            {/* <Button control={<Switch defaultChecked />} label="Update Banner" onClick={updatebanner()} /> */}

          </Typography>
          {/* { checked === true && <h1>Hii</h1>} */}


          <Typography>Alt tag - {data.alt}</Typography>
          <Typography>Link to - {data.href}</Typography>
          <Typography>Sequence Number - {data.sequence_no}</Typography>
          <Typography>Created On - {data.created_at}</Typography>
          <Typography>Last Updated On - {data.modified_at}</Typography>

          {/* <form onSubmit={() => {updatebanner()}}>
            <TextField
              label="Alt"
              variant="outlined"
              value={alt}
              onChange={(event) => setAlt(event.target.value)}
            />
            <TextField
              label="Href"
              variant="outlined"
              value={href}
              onChange={(event) => setHref(event.target.value)}
            />
            <TextField
              label="Sequence No"
              variant="outlined"
              value={sequence_no}
              onChange={(event) => setSequenceNo(event.target.value)}
            />
            <Button variant="contained" color="primary" onClick={updatebanner()}>
              Submit
            </Button>
          </form> */}

          <TextField id="standard-basic" label="Update redirects link" variant="standard" value={href} onChange={(event) => setHref(event.target.value)} />
          <br />
          <TextField id="standard-basic" label="Update ALT tag here" variant="standard" value={alt} onChange={(event) => setAlt(event.target.value)} />
          <br />
          <TextField id="standard-basic" label="Update Sequence no. here" variant="standard" value={sequence_no} onChange={(event) => setSequenceNo(event.target.value)} />
          <br />
          <br />

          <Button variant="contained" onClick={() => {updatebanner()}}>Save</Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}