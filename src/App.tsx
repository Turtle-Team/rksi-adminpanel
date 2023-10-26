import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthComponent from './components/AuthComponent';
import Admin from './components/Admin';
import CreateUser from './components/CreateUser';
import {Route, Routes} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Settings from './components/Settings';
import CreateDivision from './components/CreateDivision';
import Changes from './components/Changes';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<AuthComponent/>}/>
            <Route path='admin' element={<Admin/>}/>
            <Route path='create' element={<CreateUser/>}/>
            <Route path='settings' element={<Settings/>}/>
            <Route path='division' element={<CreateDivision/>}/>
            <Route path='changes' element={<Changes/>}/>


        </Routes>
        </Router>
    </div>
  );
}

export default App;
