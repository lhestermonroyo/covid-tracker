import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
