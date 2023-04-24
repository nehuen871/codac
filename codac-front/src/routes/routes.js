import {
    createBrowserRouter,
  } from "react-router-dom";
import Tablero from "../tablero/tablero";
import PowerBiComponente from "../powerBi/powerBi"
import Login from '../login/login';
import ErrorPage from "../error-page";
import Contenedor,{loaderABM,loaderTablero} from '../contenedor/contenedor'
// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/tablero",
      element: <Contenedor />,
      errorElement: <ErrorPage />,
      loader: loaderTablero,
      children: [
        {
          path: "PowerBI/",
          element: <PowerBiComponente />,
        },
      ],
    },
    {
      path: "/ABM",
      element: <Contenedor />,
      errorElement: <ErrorPage />,
      loader: loaderABM,
      children: [
        {
          path: "tabla/",
          element: <Tablero />,
        },
      ],
    },
  ]);

export default router;