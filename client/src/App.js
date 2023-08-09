import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { User } from './requests';

import WelcomePage from './pages/WelcomePage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TransactionPage from './pages/TransactionPage';
import ReceiptPage from './pages/ReceiptPage';
import CurrencyRate from './pages/CurrencyRate';
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

  if (!isFetchComplete) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isUserSignedIn() && activeMenu && (
        <div className="w-72 fixed sidebar bg-white">
          <Sidebar currentUser={user} onSignOut={signOut} />
        </div>
      )}

      <div
        className={`bg-primary min-h-screen ${
          activeMenu && isUserSignedIn() ? 'md:ml-72' : 'flex-2'
        }`}
      >
        {isUserSignedIn() && (
          <div className="fixed md:static bg-primary-bg w-full">
            <Navbar currentUser={user} />
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
          <Route
            exact
            path="/signup"
            element={<SignUp onSignUp={fetchCurrentUser} />}
          />
          {isUserSignedIn() && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="/receipts" element={<ReceiptPage />} />
              <Route path="/currency_rates" element={<CurrencyRate />} />
            </>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
