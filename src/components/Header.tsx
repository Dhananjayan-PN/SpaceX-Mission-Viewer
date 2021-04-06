import React, { Dispatch, SetStateAction } from "react";
import { Typography, InputBase, Link } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import spaceImage from "../assets/space.jpg";

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
      fontWeight: 400,
      [theme.breakpoints.up("sm")]: {
        fontSize: "40px"
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "55px",
        fontWeight: 300
      }
    },
    me: {
      position: "absolute",
      zIndex: 2,
      top: "280px",
      left: "50%",
      transform: "translate(-51%, 0)",
      color: "white",
      [theme.breakpoints.up("sm")]: {
        top: "300px"
      },
      [theme.breakpoints.up("md")]: {
        top: "350px"
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
    },
    link: {
      color: "white",
      "&:hover": {
        color: "#3bdcff"
      }
    }
  })
);

type HeaderProps = {
  search: string;
  searchCallback: Dispatch<SetStateAction<string>>;
};

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
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
          onChange={(e) => props.searchCallback(e.target.value)}
          value={props.search}
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
      <Typography className={classes.me} align="center" variant="button" noWrap>
        Made by{" "}
        <a href="https://dhananjayan.tech" className={classes.link}>
          Dhananjayan P N
        </a>
      </Typography>
      <div className={classes.curve}></div>
    </div>
  );
};

export default Header;
