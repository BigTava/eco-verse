// Core
import { Outlet, Navigate } from "react-router-dom";
import { useWeb3Contract } from "react-moralis";
import { useUser } from "contexts/User.context";
import { useQuery } from "@tanstack/react-query";

// Utils
import { communityFactoryAbi } from "utils/abis";
import { contractAddresses } from "utils/addresses";
import { isZeroAddress } from "utils/ethers";

// Components
import AppLayout from "components/Layouts/AppLayout";

const Prefecth = () => {
  const { setCommunity } = useUser();

  const { runContractFunction: getCommunity } = useWeb3Contract({
    abi: communityFactoryAbi,
    contractAddress: contractAddresses["31337"][
      "communityFactory"
    ] as `0x${string}`,
    functionName: "getCommunity",
    params: {},
  });

  const community = useQuery({
    queryKey: ["Community"],
    queryFn: async function () {
      const result = await getCommunity();
      const address = result?.toString();

      if (!isZeroAddress(address!)) {
        setCommunity(address);
      }

      return address;
    },
  });

  return community && !isZeroAddress(community.data!) ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/create-community" replace />
  );
};

export default Prefecth;
