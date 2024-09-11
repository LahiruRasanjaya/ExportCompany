// import { createBrowserRouter, Navigate, redirect} from 'react-router-dom';
// import { Dashboard } from './view/dashboard/Dashboard'; 
// import { ManageCustomer } from './view/manage-customer/ManageEmployee';
// import { ManageItem } from './view/manage-item/ManageItem';
// import { Main } from './view/main/Main';
// import { Login } from './view/login/Login';
// import {  NotFound } from './view/not-found/NotFound';

// // Define routes for the app section
// const appRoutes = [
//   {
//     index: true,   // default route for the "app" path
//     element: <Navigate to="home" />
//   },
//   {
//     path: 'home',
//     element: <Dashboard />  // Use JSX for component rendering
//   },
//   {
//     path: 'customers',
//     element: <ManageCustomer />  // Use JSX for component rendering
//   },
//   {
//     path: 'items',
//     element: <ManageItem />  // Use JSX for component rendering
//   }
// ];

// // Define main routes for the application
// const routes = [
//   {
//     index: true,
//     element: <Navigate to="/app" />
//   },
//   {
//     path: 'login',
//     element: <Login />  // Use JSX for component rendering
//   },
//   {
//     path: 'app',
//     element: <Main />,  // Use JSX for component rendering
//     children: appRoutes,
//     loader: async () => {
//       const user = localStorage.getItem("user");
//       if (user && user === 'authenticated') {
//         return null;
//       } else {
//         return redirect('/login');
//       }
//     }
//   },
//   {
//     path: '*',
//     element: <NotFound />  // Use JSX for component rendering
//   }
// ];

// // Create the router instance
// export const router = createBrowserRouter(routes);

import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import { Dashboard } from './view/dashboard/Dashboard'; 
import { ManageEmployee } from './view/manage-employee/ManageEmployee';
import { ManageItem } from './view/manage-item/ManageItem';
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
