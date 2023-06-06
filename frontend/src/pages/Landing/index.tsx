// Core
import { useEffect } from "react";
import { useUser } from "contexts/User.context";

// Components
import { Hero } from "./Hero";

// Images
const Landing = () => {
  const { setCommunity } = useUser();

  useEffect(() => {
    setCommunity(null);
  }, []);

  return <Hero />;
};

export default Landing;
