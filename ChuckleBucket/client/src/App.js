import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { onLoginStatusChange } from './modules/authManager';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import ApplicationViews from './components/ApplicationViews';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState({}) //holds id and userRole(string)

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} userData={userData} />
        <ApplicationViews isLoggedIn={isLoggedIn} userData={userData} setUserData={setUserData} />
      </BrowserRouter>
    </div>
  );
}

export default App;
