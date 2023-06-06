// Core
import { useUser } from "contexts/User.context";

// Utils

const Dashboard = () => {
  const { community } = useUser();

  console.log(community);
  return <></>;
};

export default Dashboard;
