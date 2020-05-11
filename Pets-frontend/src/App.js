import React, { useState } from "react";
import './App.css';
import AppContext from "./AppContext";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import Body from "./components/Body";
import Right from "./components/Right";
import Login from "./components/Login";
import Logout from "./components/Logout";
import GetUserData from "./components/GetUserData";
import CreateAccount from "./components/CreateAccount";
import Settings from "./components/Settings";

const httpLink = new HttpLink ({
  uri: "http://127.0.0.1:4002/",
});

const client = new ApolloClient ({
  cache: new InMemoryCache(),
  link : httpLink,
});

function App() {
  const [mode, setMode] = useState(2);
  const [district, setDistrict] = useState(0);
  const [token, setToken] = useState(null);
  const [donateMode, setDonateMode] = useState(false);
  const [money, setMoney] = useState(false);
  //mode 0 => login
  //mode 1 => create account
  //mode 2 => normal
  //mode 3 => settings
  //mode 4 => logout
  //mode 5 => user data

  const contextData = {
    mode: { get: mode, set: setMode },
    district: { get: district, set: setDistrict },
    token: { get: token, set: setToken },
    donateMode: { get: donateMode, set: setDonateMode },
    money: { get: money, set: setMoney }
  }

  let content = null;

  if (mode === 0) {
    content = <Login />
  }
  else if (mode === 1) {
    content = <CreateAccount />
  }
  else if (mode === 2) {
    content =
      <div className="Mode3">
        <Body />
        <Right />
      </div>
  }
  else if (mode === 3) {
    content = <Settings />
  } else if (mode === 4) {
    content = <Logout />
  } else if (mode === 5) {
    content = <GetUserData />
  }

  return (
    <AppContext.Provider value={contextData}>
      <ApolloProvider client={client}>
        {content}
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default App;