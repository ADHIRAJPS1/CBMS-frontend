import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { pink, green, blue, purple, yellow } from "@mui/material/colors";
import { Grid } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/actions/user.actions";

export default function UserCard(props) {
	const { user, handleUpdate } = props;
	const dispatch = useDispatch();

	const getAvatarBgColor = (user_roles) => {
		switch (user_roles) {
			case 1:
				return purple[500];
			case 2:
				return pink[500];
			case 3:
				return yellow[700];
			case 4:
				return green[500];
			case 5:
				return blue[500];
			default:
				return red[500];
		}
	};

	const handleDelete = (userid) => {
		dispatch(deleteUser(userid));
	};

	return (
		<Grid item xs={2} sm={4} md={4} key={user.id}>
			<Card sx={{ maxWidth: 345 }}>
				<CardHeader
					avatar={
						<Avatar
							//sx={{ bgcolor: getAvatarBgColor(user.user_roleid) }}
							sx={{ bgcolor: "#a8c76a" }}
							aria-label='recipe'>
							{user.name[0]}
						</Avatar>
					}
					// action={
					// 	<IconButton aria-label='settings'>
					// 		<MoreVertIcon />
					// 	</IconButton>
					// }
					title={user.name}
					subheader={user.email}
				/>
				<IconButton aria-label='edit' onClick={() => handleUpdate(user.id)}>
					<Edit />
				</IconButton>
				<IconButton aria-label='delete' onClick={() => handleDelete(user.id)}>
					<Delete />
				</IconButton>
			</Card>
		</Grid>
	);
}
