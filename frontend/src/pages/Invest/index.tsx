// Core
import { useWeb3Contract } from "react-moralis";
import { crowdloanFactoryAbi } from "utils/abis";
import { contractAddresses } from "utils/addresses";
import { useQuery } from "@tanstack/react-query";

// Components
import Container from "components/Container";
import Nav from "./Nav";
import ListCampaigns from "pages/ListCampaigns";

export default function Invest() {
  const { runContractFunction: getCrowdloansByOwner } = useWeb3Contract({
    abi: crowdloanFactoryAbi,
    contractAddress: contractAddresses["31337"]["crowdloanFactory"],
    functionName: "getAllCrowdloans",
    params: {},
  });

  const { data }: any = useQuery({
    queryKey: ["Crowdloans"],
    queryFn: async function () {
      const crowdloans = await getCrowdloansByOwner();
      return crowdloans;
    },
    refetchInterval: 6000,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="overflow-hidden py-10 sm:py-10 lg:pb-32 xl:pb-36">
      <Container>
        <Nav />
        <ListCampaigns data={data} />
      </Container>
    </div>
  );
}
