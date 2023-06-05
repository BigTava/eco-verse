// Core
import { useState } from "react";

// Components
import MuiTable from "components/Tables/MuiTable";

// Columns
const defaultColumns = [
  {
    label: "Public Address",
    name: "address",
    options: {
      setCellHeaderProps: () => ({ width: "40%" }),
    },
  },
  {
    label: "Role",
    name: "role",
    options: {
      setCellHeaderProps: () => ({ width: "30%" }),
    },
  },
  {
    label: "Status",
    name: "status",
    options: {
      setCellHeaderProps: () => ({ width: "30%" }),
    },
  },
];

type MembersTableProps = {
  data: String[];
};

export default function MembersTable({ data }: MembersTableProps) {
  // Rows
  const [rows] = useState([]);

  console.log(data);

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
