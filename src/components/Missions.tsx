import React from "react";
import { Typography, Card, CardActionArea, CardActions, CardMedia, CardContent, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const Missions: React.FunctionComponent = () => {
  const classes = useStyles();
  const cards: Array<JSX.Element> = [];

  for (let i = 0; i < 10; i++) {
    cards.push(
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media} image="https://cdn.mos.cms.futurecdn.net/2AFSP26rydXuKTuP7qjwbE.jpg" title="Contemplative Reptile" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }

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
