// Core
import { Outlet, Navigate } from "react-router-dom";
import { useWeb3Contract } from "react-moralis";
import { useUser } from "contexts/User.context";
import { useQuery } from "@tanstack/react-query";

// Utils
import { communityFactoryAbi, contractAddresses } from "utils/constants";
import { isZeroAddress } from "utils/ethers";

// Components
import AppLayout from "components/Layouts/AppLayout";

const Prefecth = () => {
  const { setCommunity, community } = useUser();

  const { runContractFunction: getCommunity } = useWeb3Contract({
    abi: communityFactoryAbi,
    contractAddress: contractAddresses["31337"][
      "communityFactory"
    ] as `0x${string}`,
    functionName: "getCommunity",
    params: {},
  });

  useQuery({
    queryKey: ["Community"],
    queryFn: async function () {
      const result = await getCommunity();
      const address = result?.toString();

      if (!isZeroAddress(address!)) {
        setCommunity(address);
      }
      return result?.toString();
    },
  });
  console.log(community);

  return community && !isZeroAddress(community) ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/create-community" replace />
  );
};

export default Prefecth;
