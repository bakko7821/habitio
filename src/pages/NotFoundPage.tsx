import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function NotFoundGate() {
  const { isAuthed } = useAuth();

  useEffect(() => {
    document.title = `404 · MyApp`;
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to={isAuthed ? "/" : "/login"}>
        {isAuthed ? "На главную" : "На страницу входа"}
      </Link>
    </div>
  );
}
