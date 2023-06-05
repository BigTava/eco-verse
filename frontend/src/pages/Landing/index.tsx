// Core
import { useEffect } from "react";
import { useUser } from "contexts/User.context";

// Components
import { Hero } from "./Hero";

// Images
const Landing = () => {
  const { setCommunityAddress } = useUser();

  useEffect(() => {
    setCommunityAddress(null);
  }, []);

  return <Hero />;
};

export default Landing;
