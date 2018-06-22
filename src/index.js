import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login';
import Register from './Register';

const App = () => {
  return (
    <div>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  );
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
