// Core
import { useEffect } from "react";
import { useUser } from "contexts/User.context";

// Components
import { Hero } from "./Hero";
import { Features } from "./Features";

// Images
const Landing = () => {
  const { setCommunity } = useUser();

  useEffect(() => {
    setCommunity(null);
  }, []);

  return (
    <>
      <Hero />
      <div className="divider" />
      <Features />
      <div className="divider" />
    </>
  );
};

export default Landing;
