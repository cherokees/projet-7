import React, { useState } from 'react';
import './App.css';
import Header from './template/header';
import Footer from './template/footer';
import Accueil from './template/accueil';
import './scss/style.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <Accueil />
      <Footer />
    </div>
  );
}

export default App;
