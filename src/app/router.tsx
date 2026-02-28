import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../layouts/AppLayout";
import { GuestLayout } from "../layouts/GuestLayout";

import { OnlyGuestRoute, ProtectedRoute } from "../auth/guards";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { NotFoundGate } from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";
import RecoveryPage from "../pages/RecoveryPage";
import RegisterPage from "../pages/RegisterPage";
import ChartPage from "../pages/ChartPage";
import HabitPage from "../pages/HabitPage";

export const router = createBrowserRouter([
  {
    element: <OnlyGuestRoute />,
    children: [
      {
        element: <GuestLayout />,
        children: [
          { path: "/login", element: <LoginPage />, handle: { title: "Вход" } },
          {
            path: "/register",
            element: <RegisterPage />,
            handle: { title: "Регистрация" },
          },
          {
            path: "/recovery",
            element: <RecoveryPage />,
            handle: { title: "Восстановление" },
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <HomePage />, handle: { title: "Главная" } },
          {
            path: "/profile",
            element: <ProfilePage />,
            handle: { title: "Профиль" },
          },
          {
            path: "/chart",
            element: <ChartPage />,
            handle: { title: "Статистика" },
          },
          {
            path: "/habits",
            element: <HabitPage />,
            handle: { title: "Привычки" },
          },
        ],
      },
    ],
  },

  { path: "*", element: <NotFoundGate /> },
]);
