import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [newVersion, setNewVersion] = useState("");
  const [currentVersion, setCurrentVersion] = useState("");
  const base_URL = 'http://144.126.134.103:5000/api/';
  const onInput = (e) => {
    setNewVersion(e.target.value);
  }
  const onSubmit = () => {
    axios.post(base_URL + "version//new", {name: newVersion})
    .then((res) => {
      if(res.data.isSuccess === true) {
        setCurrentVersion(newVersion);
      }
    })
    .catch((err) => {
      console.log("ERROR occured", err);
    })
  }

  useEffect(() => {
    axios.get(base_URL + "version/current")
      .then((res) => {
        if(res.data.isSuccess === true) {
          setCurrentVersion(res.data.data.name);
        }
      })
      .catch((err) => {
        console.log("ERROR occured", err);
      });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Current Version is: {currentVersion}
        </p>
        <div class="input-group">
          <label class="input-group__label" for="myInput">New Version</label>
          <input type="text" id="myInput" class="input-group__input" placeholder="example: v1.0" onChange={(e) => onInput(e)} />
        </div>
        <button class="button-85" onClick={onSubmit}>Submit</button>
      </header>
    </div>
  );
}

export default App;
