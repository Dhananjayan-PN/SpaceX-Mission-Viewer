import React, { useState } from "react";
import { Typography, Chip } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import EventIcon from "@material-ui/icons/Event";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";

const Filter: React.FunctionComponent = () => {
  const [year, setYear] = useState<Date | null>(new Date());
  const [launchYear, setLaunchYear] = useState<boolean>(false);
  const [launched, setLaunched] = useState<boolean>(false);
  const [landed, setLanded] = useState<boolean>(false);

  return (
    <div
      className="Filter"
      style={{
        maxWidth: "1000px",
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <Typography variant="h6" style={{ marginBottom: 10, marginTop: -25, fontWeight: 400 }}>
        Filter Results
      </Typography>
      <Chip
        label="Successful Launch"
        icon={<FlightTakeoffIcon fontSize="small" style={{ marginLeft: 8 }} />}
        variant={launched ? "default" : "outlined"}
        color={launched ? "primary" : "default"}
        onClick={() => setLaunched(!launched)}
        style={{ marginRight: 5 }}
      />
      <Chip
        label="Successful Landing"
        icon={<FlightLandIcon fontSize="small" style={{ marginLeft: 8 }} />}
        variant={landed ? "default" : "outlined"}
        color={landed ? "primary" : "default"}
        onClick={() => setLanded(!landed)}
        style={{ marginRight: 5 }}
      />
      <Chip
        label="Launch Year"
        icon={<EventIcon fontSize="small" style={{ marginLeft: 8 }} />}
        variant={launchYear ? "default" : "outlined"}
        color={launchYear ? "primary" : "default"}
        onClick={() => setLaunchYear(!launchYear)}
        style={{ marginRight: 3 }}
      />
      :
      <DatePicker style={{ marginLeft: 3 }} views={["year"]} value={year} onChange={setYear} />
    </div>
  );
};

export default Filter;
