import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from './auth/Login/Register';
import { Provider } from 'react-redux';
import store from './app/store';
import Dashboard from './dashboard/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/auth/login' element={<App/>}/>
        <Route exact path='/' element={<Navigate to='/auth/login'/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
      </Routes>
    </Router>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
