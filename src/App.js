import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TrainList from './components/TrainList';
import TrainDetails from './components/TrainDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TrainList} />
        <Route path="/trains/:trainNumber" component={TrainDetails} />
      </Switch>
    </Router>
  );
}

export default App;
