import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./stores/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import {
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  //mainnet,
  polygonMumbai,
  // polygon,
  // sepolia,
} from "wagmi/chains";

const projectId = "bff442f05c60a67faf40efa21f494f0d";

// 2. Configure wagmi client
const chains = [
  //mainnet,
  polygonMumbai
  // polygon,
];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

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
