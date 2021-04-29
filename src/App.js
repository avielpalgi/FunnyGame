import './App.css';
import { Route, Switch,useHistory  } from "react-router-dom";
import WelcomePage from './WelcomePage';
import BoardGame from './BoardGame';
import { useState } from 'react';
import React from 'react';
import Footer from './Footer';
function App() {
  const history = useHistory();
  const [Name, setName] = useState("")
  const [IfNull, setIfNull] = useState(false)
  function StartGame(value){
    setName(value);
    if (value == "") {
       setIfNull(true);
    }
    else{
      setIfNull(false);
      history.push("/game");
    }
  }

  function ChangeIfNull(value) {
    setIfNull(value);
  }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <WelcomePage Name={Name} StartGame={StartGame} IfNull={IfNull} ChangeIfNull={ChangeIfNull} />
        </Route>
        <Route path="/game">
          <BoardGame Name={Name} />
        </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
