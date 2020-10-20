import React, { useState } from 'react';
import './App.css';
import Header from './template/header';
import Footer from './template/footer';
import Accueil from './template/accueil';
import Login from './template/Login';
import Signup from './template/Signup';
import './scss/style.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* <Accueil /> */}
        <Footer />
        <Route path="/" exact component={Accueil}></Route>
        <Route path="/Login" exact component={Login}></Route>
        <Route path="/Signup" exact component={Signup}></Route>

      </Router>
    </div>
  );
}

export default App;
