import { useEffect } from "react";

function App() {
  const tg = window.Telegram?.WebApp;
  const isTelegram = Boolean(tg);

  useEffect(() => {
    if (!tg) return;

    tg.ready();
    tg.expand();

    console.log("Telegram WebApp:", tg);
    console.log("initData:", tg.initData);
    console.log("initDataUnsafe:", tg.initDataUnsafe);
  }, [tg]);

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h3>Telegram Mini App</h3>

      <p>
        <strong>Environment:</strong>{" "}
        {isTelegram ? "Telegram" : "Browser"}
      </p>

      {isTelegram ? (
        <>
          <p>
            <strong>User:</strong>{" "}
            {tg?.initDataUnsafe?.user
              ? `${tg.initDataUnsafe.user.first_name} (id: ${tg.initDataUnsafe.user.id})`
              : "No user data"}
          </p>
        </>
      ) : (
        <p style={{ color: "orange" }}>
          Open this app via Telegram bot to access Mini App features.
        </p>
      )}
    </div>
  );
}

export default App;
