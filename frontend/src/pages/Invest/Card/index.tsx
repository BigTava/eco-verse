// Core
import { useWeb3Contract } from "react-moralis";
import { useState, ReactText } from "react";
import { toast } from "react-toastify";
import { ContractTransaction, BigNumber } from "ethers";

// Components
import DetailCard from "./DetailCard";
import Description from "./Description";
import { TextField } from "components/Fields";
import { DefaultButton } from "components/Buttons/DefaultButton";

// Utils
import { BigNumberToDate } from "utils/time";
import { crowdloanAbi, erc20Abi } from "utils/abis";
import { contractAddresses } from "utils/addresses";

type CrowdloanCardProps = {
  address: string;
  title: string;
  activationDate: BigNumber;
  expirationDate: BigNumber;
};

const CrowdloanCard = (props: CrowdloanCardProps) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [allowanceIncreased, setAllowanceIncreased] = useState<boolean>(false);

  const { runContractFunction: increaseAllowance } = useWeb3Contract({
    abi: erc20Abi,
    contractAddress: contractAddresses["31337"]["erc20Mock"],
    functionName: "increaseAllowance",
    params: {
      spender: props.address,
      addedValue: amount,
    },
  });

  const { runContractFunction: lend } = useWeb3Contract({
    abi: crowdloanAbi,
    contractAddress: props.address,
    functionName: "pledge",
    params: {
      _amount: amount,
    },
  });

  const canSave = () => amount !== null && amount > 0;

  const handleNext = async () => {
    const id = toast.loading("Please wait...", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
    !allowanceIncreased
      ? await increaseAllowance({
          onSuccess: async (tx: any) => handleSuccess(id, tx),
          onError: (error) => handleError(id, error),
        })
      : await lend({
          onSuccess: (tx: any) => handleSuccess(id, tx),
          onError: (error) => handleError(id, error),
        });
  };
  const handleSuccess = async (toastId: ReactText, tx: ContractTransaction) => {
    await tx.wait();
    toast.update(toastId, {
      render: allowanceIncreased ? "Loan successful!" : "Permission granted!",
      type: toast.TYPE.SUCCESS,
      position: "top-right",
      isLoading: false,
      autoClose: 1000,
    });
    !allowanceIncreased && setAllowanceIncreased(true);
  };

  const handleError = (toastId: ReactText, error: any) => {
    /* eslint-disable no-console */
    console.error(error);
    toast.update(toastId, {
      render: "Error lending!",
      type: toast.TYPE.ERROR,
      position: "top-right",
      isLoading: false,
      autoClose: 1000,
    });
  };

  return (
    <div
      key={props.title}
      className="divide-y divide-gray-200 rounded-lg bg-white p-4 text-center shadow"
    >
      <Description title={props.title} location="Porto, Porto" />
      <div className="flex flex-row space-x-2 py-4">
        <DetailCard
          label="Activation Date"
          value={BigNumberToDate(props.activationDate).toString()}
        />
        <DetailCard
          label="Expiration Date"
          value={BigNumberToDate(props.expirationDate).toString()}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 text-left">
        <TextField
          className="col-span-full mt-4"
          label="Lend Amount"
          id="amount"
          name="amount"
          type="number"
          placeholder="0.0"
          onChange={(e: any) => setAmount(e.target.value)}
          defaultValue={""}
          required
        />
        <DefaultButton
          onClick={() => {}}
          color="gray"
          className="w-3/4 "
          disabled={false}
          variant="outline"
        >
          Withdraw
        </DefaultButton>
        <DefaultButton
          onClick={handleNext}
          color="green"
          className="ml-auto w-3/4"
          disabled={!canSave}
          variant="solid"
        >
          {allowanceIncreased ? "Lend" : "Allow"}
        </DefaultButton>
      </div>
    </div>
  );
};

export default CrowdloanCard;
