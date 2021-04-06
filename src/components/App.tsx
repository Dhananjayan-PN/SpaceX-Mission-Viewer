import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Cookies from "js-cookie";
import Header from "./Header";
import Filter from "./Filter";
import Missions from "./Missions";

const App: React.FunctionComponent = () => {
  const [year, setYear] = useState<Date | null>(new Date());
  const [launchYear, setLaunchYear] = useState<boolean>(false);
  const [launched, setLaunched] = useState<boolean>(false);
  const [landed, setLanded] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("https://api.spaceXdata.com/v3/launches?limit=100");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setYear(new Date(Cookies.getJSON("filters").year, 0, 365) ?? new Date());
    setLaunchYear(Cookies.getJSON("filters").launchYear ?? false);
    setLaunched(Cookies.getJSON("filters").launched ?? false);
    setLanded(Cookies.getJSON("filters").landed ?? false);
    setSearch(Cookies.getJSON("filters").search ?? "");
  }, []);

  useEffect(() => {
    let newUrl: string = "https://api.spaceXdata.com/v3/launches?limit=100";
    if (launchYear) {
      newUrl += `&launch_year=${year?.getFullYear()}`;
    }
    if (launched) {
      newUrl += "&launch_success=true";
    }
    if (landed) {
      newUrl += "&land_success=true";
    }
    setUrl(newUrl);
  }, [year, launchYear, launched, landed]);

  useEffect(() => {
    Cookies.set("filters", { year: year?.getFullYear(), launchYear, launched, landed, search });
  }, [year, launchYear, launched, landed, search]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Header search={search} searchCallback={setSearch} />
        <Filter
          year={year}
          launchYear={launchYear}
          launched={launched}
          landed={landed}
          yearCallback={setYear}
          launchYearCallback={setLaunchYear}
          launchedCallback={setLaunched}
          landedCallback={setLanded}
        />
        <Missions url={url} search={search} />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default App;
