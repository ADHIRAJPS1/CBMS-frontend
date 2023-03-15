import { Alert as AlertMUI } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Alert = (props) => {
	const alerts = useSelector((state) => {
		return state.alertReducer;
	});

	return (
		<div className='alert-wrapper'>
			{alerts.map((alert) => (
				<AlertMUI key={alert.id} severity={alert.alertType}>
					{alert.msg}
				</AlertMUI>
			))}
		</div>
	);
};

export default Alert;
