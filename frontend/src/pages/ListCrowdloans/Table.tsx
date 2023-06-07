// Core
import { useState, useEffect } from "react";

// Components
import MuiTable from "components/Tables/MuiTable";

// Columns
const defaultColumns = [
  {
    label: "Contract Address",
    name: "address",
    options: {
      setCellHeaderProps: () => ({ width: "10%" }),
    },
  },
  {
    label: "Activation Date",
    name: "activationDate",
    options: {
      setCellHeaderProps: () => ({ width: "10%" }),
    },
  },
  {
    label: "Expiration Date",
    name: "expirationDate",
    options: {
      setCellHeaderProps: () => ({ width: "10%" }),
    },
  },
  {
    label: "Asset",
    name: "asset",
    options: {
      setCellHeaderProps: () => ({ width: "10%" }),
    },
  },
  {
    label: "APY (%)",
    name: "apy",
    options: {
      setCellHeaderProps: () => ({ width: "10%" }),
    },
  },
  {
    label: "Goal",
    name: "goal",
    options: {
      setCellHeaderProps: () => ({ width: "10%" }),
    },
  },
  {
    label: "Loaned",
    name: "loaned",
    options: {
      setCellHeaderProps: () => ({ width: "10%" }),
    },
  },
  {
    label: "Status",
    name: "status",
    options: {
      setCellHeaderProps: () => ({ width: "10%" }),
    },
  },
  {
    label: "Message",
    name: "message",
    options: {
      setCellHeaderProps: () => ({ width: "10%" }),
    },
  },
];

type CrowdloansTableProps = {
  data: string[];
};

type Rows = {
  address: string;
  startAt: string;
  endAt: string;
  asset: string;
  apy: number;
  goal: number;
  loaned: number;
  claimed: number;
  status: string;
  message: string;
};

export default function CrowdloansTable({ data }: CrowdloansTableProps) {
  // Rows
  const [rows, setRows] = useState<Rows[]>([]);

  useEffect(() => {
    setRows(
      data?.map((address: any) => ({
        address: address,
        startAt: "2022-01-01",
        endAt: "ACTIVE",
        asset: "ECO Mock",
        apy: 10,
        goal: 10000,
        loaned: 100,
        claimed: 0,
        status: "ACTIVE",
        message: "2 days to claim",
      }))
    );
  }, [data]);

  return (
    <MuiTable
      table={{
        columns: defaultColumns,
        rows,
      }}
      canSearch
    />
  );
}
