import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventIcon from "@material-ui/icons/Event";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WhatshotIcon from "@material-ui/icons/Whatshot";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 10
  },
  media: {
    height: 180
  }
});

type MissionsProps = { url: string; search: string };

const Missions: React.FunctionComponent<MissionsProps> = (props: MissionsProps) => {
  const classes = useStyles();
  const [data, setData] = useState<Array<any>>([]);
  const [cards, setCards] = useState<Array<JSX.Element | null>>([]);
  const [dialog, setDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  useEffect(() => {
    let cards = data
      .map((mission: any, index: number) => {
        if (
          mission.mission_name.toLowerCase().includes(props.search.toLowerCase()) ||
          mission.launch_year.toLowerCase().includes(props.search.toLowerCase()) ||
          mission.rocket.rocket_name.toLowerCase().includes(props.search.toLowerCase()) ||
          mission.launch_site.site_name.toLowerCase().includes(props.search.toLowerCase())
        ) {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={classes.root}>
                <CardActionArea
                  onClick={() => {
                    setTitle(mission.mission_name);
                    setDetails(mission.details);
                    setDialog(true);
                  }}
                >
                  <CardMedia
                    className={classes.media}
                    image={mission.links.flickr_images[0] ?? `http://img.youtube.com/vi/${mission.links.youtube_id}/0.jpg`}
                    title={mission.mission_name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {mission.mission_name}
                    </Typography>
                    <Chip
                      label={mission.launch_year}
                      icon={<EventIcon fontSize="small" style={{ marginLeft: 8 }} />}
                      variant="outlined"
                      color="primary"
                      size="small"
                      style={{ marginTop: -2, marginRight: 5, marginBottom: 8 }}
                    />
                    <Chip
                      label={mission.launch_success ? "Success" : "Fail"}
                      icon={<FlightTakeoffIcon fontSize="small" style={{ marginLeft: 8 }} />}
                      variant="outlined"
                      color={mission.launch_success ? "primary" : "secondary"}
                      size="small"
                      style={{ marginTop: -2, marginRight: 5, marginBottom: 8 }}
                    />
                    {mission.rocket.first_stage.cores[0].land_success !== null ? (
                      <Chip
                        label={
                          mission.rocket.first_stage.cores[0].land_success || mission.rocket.first_stage.cores[1]?.land_success ? "Success" : "Fail"
                        }
                        icon={<FlightLandIcon fontSize="small" style={{ marginLeft: 8 }} />}
                        variant="outlined"
                        color={
                          mission.rocket.first_stage.cores[0].land_success || mission.rocket.first_stage.cores[1]?.land_success
                            ? "primary"
                            : "secondary"
                        }
                        size="small"
                        style={{ marginTop: -2, marginRight: 5, marginBottom: 8 }}
                      />
                    ) : null}
                    <div className="row">
                      <WhatshotIcon fontSize="small" style={{ marginBottom: -4, marginLeft: -2, marginRight: 3 }} />
                      <Typography variant="subtitle2" color="textSecondary" component="p" style={{ fontSize: 15, display: "inline" }}>
                        {mission.rocket.rocket_name + " Rocket"}
                      </Typography>
                    </div>
                    <div className="row">
                      <LocationOnIcon fontSize="small" style={{ marginBottom: -4, marginLeft: -2, marginRight: 3 }} />
                      <Typography variant="subtitle2" color="textSecondary" component="p" style={{ fontSize: 15, display: "inline" }}>
                        {mission.launch_site.site_name}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions style={{ alignItems: "center", marginTop: -8 }}>
                    <Button
                      onClick={() => {
                        setTitle(mission.mission_name);
                        setDetails(mission.details);
                        setDialog(true);
                      }}
                      size="small"
                      color="primary"
                      style={{ marginLeft: "auto", marginRight: "auto" }}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          );
        } else {
          return null;
        }
      })
      .filter((val) => val !== null);
    setCards(cards);
    // eslint-disable-next-line
  }, [data, props.search]);

  useEffect(() => {
    fetch(props.url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [props.url]);

  return (
    <div
      className="Missions"
      style={{
        maxWidth: "1000px",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: "100px"
      }}
    >
      <Typography variant="h5" style={{ marginBottom: 20, marginTop: 25, fontSize: 25 }}>
        Missions
      </Typography>
      <Grid container spacing={3}>
        {cards.length !== 0 ? (
          cards
        ) : (
          <Typography variant="h6" style={{ marginTop: 10, marginLeft: 13, fontSize: 15, fontWeight: 400 }}>
            No Missions Found. Please try another search.
          </Typography>
        )}
      </Grid>
      <Dialog open={dialog} onClose={() => setDialog(!dialog)}>
        <DialogTitle>{title + " Info"}</DialogTitle>
        <DialogContent style={{ marginTop: -15 }}>
          <DialogContentText>{details ?? "No Details."}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Missions;
