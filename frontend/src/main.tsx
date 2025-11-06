import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import PlayersListPage from "./pages/PlayerListPage";
import AutoMatchingPage from "./pages/AutoMatchingPage";

const qc = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <PlayersListPage />}, // PlayersListPage -> 선수목록
      {path: 'matching', element: <AutoMatchingPage />}, // MatchingPage -> 매칭페이지
    ],
  }
]);

ReactDom.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);