import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";

export default function NewDateTimePicker(props) {
  const { newOffer, setnewOffer,value, setValue } = props;
  
  const handleChange = (newValue) => {
    const today =  newValue.$d;
    const date =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    setValue(newValue);
    setnewOffer({ ...newOffer, ["validity"]: `${dateTime}` });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2}>
        <DateTimePicker
          
          label="Validity"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
