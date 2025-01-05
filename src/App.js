import './App.css';
import { FooterNav } from './customer/components/Navigation/Footer';
import Navigation from './customer/components/Navigation/Navigation';
import HomePage from './customer/pages/HomePage';

function App() {
  return (
    <div className="">
      <Navigation />
      <div>
        <HomePage />
      </div>
      <FooterNav />
    </div>
  );
}

export default App;
