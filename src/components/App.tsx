import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Header from "./Header";
import Filter from "./Filter";

const App: React.FunctionComponent = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Header />
        <Filter />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default App;
