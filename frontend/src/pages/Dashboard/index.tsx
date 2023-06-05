// Core
import { useUser } from "contexts/User.context";

// Utils
/*eslint-disable*/
const Dashboard = () => {
  const { communityAddress } = useUser();

  console.log(communityAddress);
  return <></>;
};

export default Dashboard;
