
import './App.css';
import { useEffect, useState } from 'react';
import { onLoginStatusChange } from './modules/authManager';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import ApplicationViews from './components/ApplicationViews';
import { Spinner } from 'reactstrap';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState({}) //holds id and userRole(string)

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn, setUserData);

  }, []);

  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} userData={userData} />
        <ApplicationViews
          isLoggedIn={isLoggedIn}
          userData={userData}
          setUserData={setUserData} />
      </BrowserRouter>
    </div>
  );
}

export default App;
