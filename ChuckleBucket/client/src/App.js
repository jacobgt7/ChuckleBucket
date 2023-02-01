import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { onLoginStatusChange } from './modules/authManager';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import ApplicationViews from './components/ApplicationViews';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} />
        <ApplicationViews isLoggedIn={isLoggedIn} />
      </BrowserRouter>
    </div>
  );
}

export default App;
