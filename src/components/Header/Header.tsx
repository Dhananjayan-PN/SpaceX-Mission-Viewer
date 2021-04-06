import React from "react";
import { Typography, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import spaceImage from "../../assets/space.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      objectFit: "cover",
      width: "100%",
      minHeight: "300px",
      maxHeight: "450px",
      position: "relative",
      zIndex: 1
    },
    title: {
      position: "absolute",
      zIndex: 2,
      top: "100px",
      left: "50%",
      transform: "translate(-51%, 0)",
      color: "white",
      fontSize: "30px",
      fontWeight: 300,
      [theme.breakpoints.up("sm")]: {
        fontSize: "40px"
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "55px"
      }
    },
    search: {
      position: "absolute",
      zIndex: 2,
      top: "180px",
      left: "50%",
      transform: "translate(-50%, 0)",
      color: "white",
      width: "80%",
      minWidth: "220px",
      maxWidth: "450px",
      borderRadius: 10,
      boxShadow: "0px 0px 4px #ccc",
      backgroundColor: fade(theme.palette.common.black, 0.35),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.55)
      },
      [theme.breakpoints.up("sm")]: {
        top: "200px"
      },
      [theme.breakpoints.up("md")]: {
        top: "250px"
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1.5, 1.5, 1.5, 0),
      paddingLeft: `calc(1em +  ${theme.spacing(4)}px)`
    },
    curve: {
      width: "100%",
      height: "30px",
      position: "relative",
      zIndex: 2,
      bottom: "30px",
      left: "0px",
      backgroundColor: "white",
      borderRadius: "35px 35px 0px 0px"
    }
  })
);

const Header: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className="Header">
      <img className={classes.background} src={spaceImage} alt="header" />
      <Typography className={classes.title} align="center" noWrap>
        SpaceX Mission Viewer
      </Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ style: { fontSize: 22 }, "aria-label": "search" }}
          autoFocus
          fullWidth
        />
      </div>
      <div className={classes.curve}></div>
    </div>
  );
};

export default Header;
