import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { configureChains, createClient } from "wagmi";
import {
  //mainnet,
  polygonMumbai,
  // polygon,
  // sepolia,
} from "wagmi/chains";
import Auth from "./Auth"

const projectId = "bff442f05c60a67faf40efa21f494f0d";

// 2. Configure wagmi client
const chains = [
  //mainnet,
  polygonMumbai
  // polygon,
];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
const WalletConnectLogin = () => {

  return (
    <>
      <Auth/>
      <Web3Button icon={"hide"} label={"Wallet Connect"} />

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-font-family": "Roboto, sans-serif",
          "--w3m-accent-color": "black",
          "--w3m-background-color": "black",
        }}
      />
    </>
  );
};

export default WalletConnectLogin;
