export const assets = [
  { value: "ECO", label: "ECO Mock" },
  { value: "DAI", label: "DAI Mock" },
  { value: "WETH", label: "WETH Mock" },
  { value: "USDC", label: "USDC Mock" },
];

export const assetToAddress = {
  ECO: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
};

export const getAddressFromAsset = (asset: string) => assetToAddress[asset];
