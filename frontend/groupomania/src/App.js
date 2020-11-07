import React from 'react';
import './App.css';
import Accueil from './template/accueil';
import Login from './template/Login';
import Signup from './template/Signup';
import Chat from './template/Chat';
import Profil from './template/profil';
import Error from './template/error';
import './scss/style.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Notre objet récupère les méthodes de l'objet "history"
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

//On redéclare ensuite les méthodes
export const appHistory = createBrowserHistory();

//fonction app qui contient la logique d'affichage des composant suivant les url
function App() {
  return (
    <div className="App">

      <Router history={appHistory}>
        <Switch>
          <Route path="/" exact component={Accueil} />
          <Route path="/accueil" exact component={Accueil} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/profil" exact component={Profil} />

          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
