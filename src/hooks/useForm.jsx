import { Box, Grid } from "@mui/material";
import React, { useState } from "react";

export function useForm(initialValues) {
	const [formData, setFormData] = useState(initialValues);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return {
		formData,
		setFormData,
		handleInputChange,
	};
}

export function Form({ children }) {
	return (
		<form action=''>
			<Box
				sx={{
					"& .MuiTextField-root": { mt: 4, ml: 7, width: "80%" },
				}}>
				<Grid container direction='row'>
					{children}
				</Grid>
			</Box>
		</form>
	);
}
