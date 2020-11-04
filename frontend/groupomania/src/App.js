import React from 'react';
import './App.css';
import Accueil from './template/accueil';
import Login from './template/Login';
import Signup from './template/Signup';
import Chat from './template/Chat';
import Profil from './template/profil';
import './scss/style.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

// const style_accueil = {
//   container: {
//     backgroundImage: 'url("./images/city-ravi-patel.jpg")',
//     opacity: '0.6',
//     height: '60rem',
//     width: '100%',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     backgroundAttachment: 'fixed',
//   }
// }


export const appHistory = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={appHistory}>
        {/* <Header /> */}
        {/* <div className="container_bg_img" style={style_accueil.container}></div> */}
        <Route path="/" exact component={Accueil}></Route>
        <Route path="/accueil" exact component={Accueil}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/chat" exact component={Chat}></Route>
        <Route path="/profil" exact component={Profil}></Route>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
