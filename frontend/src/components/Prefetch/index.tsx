// Core
import { Outlet, Navigate } from "react-router-dom";
import { useWeb3Contract } from "react-moralis";
import { useUser } from "contexts/User.context";
import { useQuery } from "@tanstack/react-query";

// Utils
import { communityFactoryAbi, contractAddresses } from "utils/constants";

// Components
import AppLayout from "components/Layouts/AppLayout";

const Prefecth = () => {
  const { setCommunityAddress } = useUser();

  const { runContractFunction: getCommunity } = useWeb3Contract({
    abi: communityFactoryAbi,
    contractAddress: contractAddresses["31337"][
      "communityFactory"
    ] as `0x${string}`,
    functionName: "getMyCommunity",
    params: {},
  });

  const communityAddress = useQuery({
    queryKey: ["Community"],
    queryFn: async function () {
      const result = await getCommunity();
      setCommunityAddress(result?.toString());
      return result?.toString();
    },
  });

  return communityAddress ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/create-community" replace />
  );
};

export default Prefecth;
