import { useEffect } from "react";
import { Outlet, useMatches } from "react-router-dom";
import { Header } from "../components/Header";

type Handle = { title?: string };

export function AppLayout() {
  const matches = useMatches();

  useEffect(() => {
    const last = matches[matches.length - 1];
    const title = (last?.handle as Handle | undefined)?.title ?? "404";
    document.title = `${title} · Habitio`;
  }, [matches]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
