import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navigation from './Components/Navigation'
import Createnote from './Components/Createnote'
import Createuser from './Components/Createuser'
import Noteslist from './Components/Noteslist'
function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={Noteslist} />
        <Route path="/edit/:id" component={Createnote} />
        <Route path="/create" component={Createnote} />
        <Route path="/user" component={Createuser} />
      </div>
    </Router>

  );
}

export default App;
