import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import RegionList from './components/RegionList';
import AppRoutes from './routes';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
