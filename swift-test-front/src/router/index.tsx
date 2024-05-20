import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import HomePage from "../pages/homePage";
import GeometryPage from "../pages/geometryPage";
import FromManagementPage from "../pages/fromManagementPage";

// Define the type for the route objects
const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/geometry",
    element: <GeometryPage />,
  },
  {
    path: "/form",
    element: <FromManagementPage />,
  },
];

const router = createBrowserRouter(routes);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
