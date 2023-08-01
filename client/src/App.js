import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { User } from './requests';

import WelcomePage from './pages/WelcomePage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TransactionPage from './pages/TransactionPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AuthRoute from './components/AuthRoute';
import NotFoundPage from './pages/NotFoundPage';

import { useStateContext } from './contexts/ContextProvider';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isFetchComplete, setIsFetchComplete] = useState(false);
  const { activeMenu } = useStateContext();

  const fetchCurrentUser = async () => {
    try {
      const currentUser = await User.current();
      console.log(currentUser);
      if (currentUser?.id) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchComplete(true);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const isUserSignedIn = () => {
    return user !== null;
  };

  const signOut = () => {
    setUser(null);
  };

  console.log(isFetchComplete);

  if (!isFetchComplete) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isUserSignedIn() && activeMenu && (
        <div className="w-72 fixed sidebar bg-white">
          <Sidebar />
        </div>
      )}

      <div
        className={`bg-primary min-h-screen ${
          activeMenu && isUserSignedIn() ? 'md:ml-72' : 'flex-2'
        }`}
      >
        {isUserSignedIn() && (
          <div className="fixed md:static bg-primary-bg w-full">
            <Navbar currentUser={user} onSignOut={signOut} />
          </div>
        )}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/signin"
            element={
              <SignIn
                onSignIn={() => fetchCurrentUser()}
                isUserSignedIn={isUserSignedIn}
              />
            }
          />
          <Route exact path="/signup" element={<SignUp />} />
          {isUserSignedIn() && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionPage />} />
            </>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
