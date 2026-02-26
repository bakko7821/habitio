import { useEffect } from "react";
import { Outlet, useMatches } from "react-router-dom";

type Handle = { title?: string };

export function GuestLayout() {
  const matches = useMatches();

  useEffect(() => {
    const last = matches[matches.length - 1];
    const title = (last?.handle as Handle | undefined)?.title ?? "404";
    document.title = `${title} · Habitio`;
  }, [matches]);

  return <Outlet />;
}
