import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Starting...");

  useEffect(() => {
    alert("window.Telegram123: " + (window.Telegram ? "exists" : "undefined"));
  }, []);

  useEffect(() => {
    console.log("App mounted");

    // Проверяем window.Telegram
    if (!window.Telegram) {
      console.warn("window.Telegram is undefined");
      setTimeout(() => setStatus("window.Telegram is undefined — likely not in Mini App"), 0);
      alert("window.Telegram is undefined");
      return;
    }

    const tg = window.Telegram.WebApp;
    console.log("window.Telegram.WebApp found:", tg);

    if (!tg.initData) {
      console.warn("initData is empty or undefined");
      setTimeout(() => setStatus("initData missing"), 0);
      alert("initData missing");
      return;
    }

    console.log("initData:", tg.initData);
    setTimeout(() => setStatus("Telegram WebApp detected, fetching auth..."), 0);


    fetch("http://localhost:3000/api/auth/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: tg.initData }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Auth response:", data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setStatus(`User logged in: ${data.user.username || data.user.first_name}`);
          alert(`User logged in: ${data.user.username || data.user.first_name}`);
        } else {
          setStatus("Login failed");
          alert("Login failed");
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setStatus("Error contacting server");
        alert("Error contacting server: " + err);
      });
  }, []);

  return <p>{status}</p>;
}

export default App;
