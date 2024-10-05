
import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import { Dashboard } from './view/dashboard/Dashboard'; 
import { ManageEmployee } from './view/manage-employee/ManageEmployee';
import { ManageItem } from './view/manage-item/ManageItem';
import { CheckAttendance } from './view/check-attendance/CheckAttendance';
import { Main } from './view/main/Main';
import { Login } from './view/login/Login';
import { CreateProfile } from './view/create-profile/CreateProfile';
import { NotFound } from './view/not-found/NotFound';

// Define routes for the app section
const appRoutes = [
  {
    index: true,   // default route for the "app" path
    element: <Navigate to="home" />
  },
  {
    path: 'home',
    element: <Dashboard />
  },
  {
    path: 'employee',
    element: <ManageEmployee />
  },
  {
    path: 'items',
    element: <ManageItem />
  },
  {
    path: 'checkAttendance',
    element: <CheckAttendance />
  }
];

// Define main routes for the application
const routes = [
  {
    index: true,
    element: <Navigate to="/app" />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'create-profile',
    element: <CreateProfile />
  },
  {
    path: 'app',
    element: <Main />,
    children: appRoutes,
    loader: async () => {
      const user = localStorage.getItem("user");
      if (user && user === 'authenticated') {
        return null;
      } else {
        return redirect('/login');
      }
    }
  },
  {
    path: '*',
    element: <NotFound />
  }
];

// Create the router instance
export const router = createBrowserRouter(routes);
