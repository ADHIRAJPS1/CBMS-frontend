import { Container } from "@mui/system";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

const NotFound = () => {
	return (
		<Container>
			<h1 className='lead text-primary'>
				<ErrorIcon /> Page Not Found
			</h1>
			<p className='lead'>Sorry, this page does not exist.</p>
		</Container>
	);
};

export default NotFound;
