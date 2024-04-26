import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarCheck,
  faMobileScreen,
  faPalette,
  faPuzzlePiece,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCalendarCheck,
  faMobileScreen,
  faPalette,
  faPuzzlePiece,
  faPenToSquare
);
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./components/pages/LandingPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import PageTasks from "./components/app/PageTasks.jsx";
import PageCards from "./components/app/PageCards.jsx";
import Markdown from "./components/app/markdown/Markdown.jsx";

// Contextos
import { UserContextProvider } from "./context/UserContext.jsx";
import { ListaContextProvider } from "./context/ListaContext.jsx";
import { TaskContextProvider } from "./context/TaskContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "app",
    element: (
      <ListaContextProvider>
        <TaskContextProvider>
          <App />
        </TaskContextProvider>
      </ListaContextProvider>
    ),
    children: [
      {
        index: true,
        element: <PageTasks />,
      },
      {
        path: "tasks",
        element: <PageTasks />,
      },
      {
        path: "cards",
        element: <PageCards />,
      },
      {
        path: "notes",
        element: <Markdown />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage acao={"login"} />,
  },
  {
    path: "cadastro",
    element: <LoginPage acao={"cadastro"} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
