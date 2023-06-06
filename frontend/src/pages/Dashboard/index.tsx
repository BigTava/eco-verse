// Core
import { useUser } from "contexts/User.context";

// Utils
/*eslint-disable*/
const Dashboard = () => {
  const { community } = useUser();

  console.log(community);
  return <></>;
};

export default Dashboard;
