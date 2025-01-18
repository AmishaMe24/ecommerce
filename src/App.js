import './App.css';
import { FooterNav } from './customer/components/Navigation/Footer';
import Navigation from './customer/components/Navigation/Navigation';
import HomePage from './customer/pages/HomePage';
import Product from './customer/components/Product/Product';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
      <FooterNav />
    </div>
  );
}

export default App;
