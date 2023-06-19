import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import { Layout } from './Layout';
import Login from './Login';
import InfoPage from './InfoPage';
import ProtectedRoute from './ProtectedRoute';
import { API_URL } from './consts';

interface IUser {
  _id: string;
  username: string;
}

export const AuthContext = createContext<IUser | undefined>(undefined);

const Main = () => {
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    const getUser = async () => {
      console.log('fetching...');
      const loginResponse = await fetch(`${API_URL}/auth/login/success`, {
        method: 'GET',
        credentials: 'include',
      });
      const loginData = await loginResponse.json();
      setUser(loginData.user);
      console.log('loginData: ', loginData);
    };

    try {
      getUser();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <React.StrictMode>
      <AuthContext.Provider value={user}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={routes.login.getRoute()} element={<Login />} />
              <Route path={routes.home.getRoute()} element={<App />} />
              <Route
                path={routes.info.getRoute()}
                element={
                  <ProtectedRoute>
                    <InfoPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthContext.Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
