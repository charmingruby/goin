// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GoinModule = buildModule("GoinModule", (m) => {
  const goin = m.contract("Goin");

  return { goin };
});

export default GoinModule;
