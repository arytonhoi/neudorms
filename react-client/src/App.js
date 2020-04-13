import React from 'react';
import './App.css';
import AppRoutingContainer from "./containers/AppRoutingContainer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"/>
      <AppRoutingContainer></AppRoutingContainer>
    </div>
  );
}

export default App;
