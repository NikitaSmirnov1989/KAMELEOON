import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from "./Components/routes/Error-page";
import Results from "./Components/routes/Results";
import Finalize from "./Components/routes/Finalize"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "results/:testId",
    element: <Results/>,
  },
  {
    path: "finalize/:testId",
    element: <Finalize/>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />,
);

