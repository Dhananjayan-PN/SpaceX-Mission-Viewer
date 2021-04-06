import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Header from "./Header";
import Filter from "./Filter";
import Missions from "./Missions";

const App: React.FunctionComponent = () => {
  const [year, setYear] = useState<Date | null>(new Date());
  const [launchYear, setLaunchYear] = useState<boolean>(false);
  const [launched, setLaunched] = useState<boolean>(false);
  const [landed, setLanded] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("https://api.spaceXdata.com/v3/launches?limit=100");

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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Header />
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
        <Missions url={url} />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default App;
