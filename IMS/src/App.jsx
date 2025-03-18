import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import products from './pages/products'
import Addsale from './pages/addsale';
import Addstock from './pages/addstock';
import Reports from './pages/reports';
import addstock from './pages/addstock';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/products' Component={products}/>
          <Route path='/addstock' Component={Addstock}/>
          <Route path='/addsale' Component={Addsale}/>
          <Route path='/reports' Component={Reports}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
