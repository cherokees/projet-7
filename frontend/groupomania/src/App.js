import React from 'react';
import './App.css';
import Header from './template/header';
import Footer from './template/footer';
import Accueil from './template/accueil';
import Login from './template/Login';
import Signup from './template/Signup';
import Chat from './template/Chat';
import './scss/style.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";

const style_accueil = {
  container: {
    backgroundImage: 'url("./images/city-ravi-patel.jpg")',
    opacity: '0.6',
    height: '60rem',
    width: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container_bg_img" style={style_accueil.container}></div>
        <Route path="/" exact component={Accueil}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/chat" exact component={Chat}></Route>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
