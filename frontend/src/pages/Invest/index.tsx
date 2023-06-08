// Core
import { useWeb3Contract } from "react-moralis";
import { crowdloanFactoryAbi } from "utils/abis";
import { contractAddresses } from "utils/addresses";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Components
import Container from "components/Container";
import Nav from "./Nav";
import Card from "./Card";

export default function Invest() {
  const { runContractFunction: getCrowdloansByOwner } = useWeb3Contract({
    abi: crowdloanFactoryAbi,
    contractAddress: contractAddresses["31337"]["crowdloanFactory"],
    functionName: "getAllCrowdloans",
    params: {},
  });

  const { data, isSuccess }: any = useQuery({
    queryKey: ["Crowdloans"],
    queryFn: async function () {
      const crowdloans = await getCrowdloansByOwner();
      return crowdloans ?? {};
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {}, [isSuccess]);

  return (
    <div className="overflow-hidden py-10 sm:py-10 lg:pb-32 xl:pb-36">
      <Container>
        <Nav />
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {isSuccess &&
            data?._crowdloans?.map((crowdloan, index) => (
              <Card
                key={index}
                address={crowdloan}
                activationDate={data._campaigns[index].startAt}
                expirationDate={data._campaigns[index].endAt}
                title={"EcoDAO"}
              />
            ))}
        </div>
      </Container>
    </div>
  );
}
