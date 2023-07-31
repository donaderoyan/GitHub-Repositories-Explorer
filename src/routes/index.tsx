import { HashRouter, Route, Routes } from 'react-router-dom';
import Users from '../pages/Users';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => (
  <HashRouter basename='/'>
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
    </Routes>
  </HashRouter>
);

export default Router;
