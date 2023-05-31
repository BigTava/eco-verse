// Core
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

// Components
import GithubIcon from "components/Icons/Github";
import BackgroundIllustration from "./BackgroundIllustration";
import { DefaultButton as Button } from "components/Buttons/DefaultButton";
import Container from "components/Container";

// Assets
import logoBbc from "assets/logos/bbc.svg";
import logoCbs from "assets/logos/cbs.svg";
import logoCnn from "assets/logos/cnn.svg";
import logoFastCompany from "assets/logos/fast-company.svg";
import logoForbes from "assets/logos/forbes.svg";
import logoHuffpost from "assets/logos/huffpost.svg";
import logoTechcrunch from "assets/logos/techcrunch.svg";
import logoWired from "assets/logos/wired.svg";

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              One Stop Shop for Energy Communities.
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              By leveraging insights from our network of industry insiders,
              you’ll know exactly when to buy to maximize profit, and exactly
              when to sell to avoid painful losses.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button
                onClick={() => navigate("/create-community")}
                variant="solid"
              >
                Create Community
              </Button>
              <Button
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                variant="outline"
              >
                <GithubIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Learn More</span>
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32"></div>
          </div>
          <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
            <p className="text-center text-sm font-semibold text-gray-900 lg:text-left">
              As featured in
            </p>
            <ul
              role="list"
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
            >
              {[
                ["Forbes", logoForbes],
                ["TechCrunch", logoTechcrunch],
                ["Wired", logoWired],
                ["CNN", logoCnn, "hidden xl:block"],
                ["BBC", logoBbc],
                ["CBS", logoCbs],
                ["Fast Company", logoFastCompany],
                ["HuffPost", logoHuffpost, "hidden xl:block"],
              ].map(([name, logo, className]) => (
                <li key={name} className={clsx("flex", className)}>
                  <img src={logo} alt={name} className="h-8" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
