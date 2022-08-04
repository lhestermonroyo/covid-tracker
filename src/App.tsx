import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes';

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <AppRoutes />
      </HashRouter>
    </div>
  );
};

export default App;
