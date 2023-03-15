// import "./widget.scss";
import { Card, CardHeader, IconButton } from "@mui/material";

export const Widget = ({ heading, content, icon }) => {
	return (
		<Card sx={{ minWidth: 300 }}>
			<CardHeader
				action={<IconButton aria-label='settings'>{icon}</IconButton>}
				title={content}
				subheader={heading}
			/>
		</Card>
	);
};
