import React, { Dispatch, SetStateAction } from "react";
import { Typography, Chip } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import EventIcon from "@material-ui/icons/Event";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";

type FilterProps = {
  year: Date | null;
  yearCallback: Dispatch<SetStateAction<Date | null>>;
  launchYear: boolean;
  launchYearCallback: Dispatch<SetStateAction<boolean>>;
  launched: boolean;
  launchedCallback: Dispatch<SetStateAction<boolean>>;
  landed: boolean;
  landedCallback: Dispatch<SetStateAction<boolean>>;
};

const Filter: React.FunctionComponent<FilterProps> = (props: FilterProps) => {
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
        variant={props.launched ? "default" : "outlined"}
        color={props.launched ? "primary" : "default"}
        onClick={() => props.launchedCallback(!props.launched)}
        style={{ marginRight: 5 }}
      />
      <Chip
        label="Successful Landing"
        icon={<FlightLandIcon fontSize="small" style={{ marginLeft: 8 }} />}
        variant={props.landed ? "default" : "outlined"}
        color={props.landed ? "primary" : "default"}
        onClick={() => props.landedCallback(!props.landed)}
        style={{ marginRight: 5 }}
      />
      <Chip
        label="Launch Year"
        icon={<EventIcon fontSize="small" style={{ marginLeft: 8 }} />}
        variant={props.launchYear ? "default" : "outlined"}
        color={props.launchYear ? "primary" : "default"}
        onClick={() => props.launchYearCallback(!props.launchYear)}
        style={{ marginRight: 3 }}
      />
      :
      <DatePicker style={{ marginLeft: 3 }} views={["year"]} value={props.year} onChange={props.yearCallback} />
    </div>
  );
};

export default Filter;
