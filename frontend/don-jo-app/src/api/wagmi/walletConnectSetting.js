import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import {
  // polygon
  //mainnet,
  polygonMumbai,
  // sepolia,
} from "wagmi/chains";

const projectId = "bff442f05c60a67faf40efa21f494f0d";

// 2. Configure wagmi client
const chains = [
  polygonMumbai,
  // polygon,
];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export { projectId, ethereumClient, wagmiClient };
