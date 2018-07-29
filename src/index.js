import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './js/registerServiceWorker';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/feed" component={Feed} />
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
