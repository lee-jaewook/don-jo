import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./stores/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "./api/wagmi/walletConnectSetting";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <WagmiConfig client={wagmiClient}>
        <App />
      </WagmiConfig>
    </PersistGate>
  </Provider>
);
