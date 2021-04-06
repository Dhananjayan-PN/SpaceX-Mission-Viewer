import React, { useState, useEffect } from "react";
import { Typography, Card, CardActionArea, CardMedia, CardContent, Grid, Chip } from "@material-ui/core";
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
                <CardActionArea>
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
                    <Typography variant="body2" color="textSecondary" component="p">
                      {mission.details}
                    </Typography>
                  </CardContent>
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
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <Typography variant="h5" style={{ marginBottom: 20, marginTop: 25, fontSize: 25 }}>
        Missions
      </Typography>
      <Grid container spacing={3}>
        {cards}
      </Grid>
    </div>
  );
};

export default Missions;
