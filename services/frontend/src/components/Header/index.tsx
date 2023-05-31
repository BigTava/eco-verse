// Core
import { useState } from "react";
import { magic } from "plugins/magic";
import { getWeb3 } from "plugins/web3";
import { useWeb3 } from "contexts/Web3.context";
import { useUser } from "contexts/User.context";

// Components
import Container from "components/Container";
import Logo from "components/Logo";
import NavLinks from "components/Header/NavLinks";
import AccountModal from "components/Modals/AccountModal";
import MobileNavLink from "./MobileNavLink";
import { DefaultButton } from "components/Buttons/DefaultButton";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, ChevronUpIcon } from "components/Icons";
import { Popover } from "@headlessui/react";

export function Header() {
  const { setUser, user } = useUser();
  const { setWeb3 } = useWeb3();

  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(false);
  const isLoggedIn = user;

  const connect = async () => {
    try {
      setDisabled(true);
      const accounts = await magic.wallet.connectWithUI();
      setDisabled(false);
      localStorage.setItem("user", accounts[0]);

      const web3 = await getWeb3();
      setWeb3(web3);
      setUser(accounts[0]);
    } catch (error) {
      setDisabled(false);
    }
  };

  const onCloseWalletModal = () => setOpenWalletModal(false);
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <a href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </a>
            <NavLinks
              labels={[
                ["Discover", "#discover"],
                ["Invest", "open-campaigns", "API > 10%"],
              ]}
            />
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 [&:not(:focus-visible)]:focus:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            <MobileNavLink href="#features">
                              Features
                            </MobileNavLink>
                            <MobileNavLink href="#reviews">
                              Reviews
                            </MobileNavLink>
                            <MobileNavLink href="#pricing">
                              Pricing
                            </MobileNavLink>
                            <MobileNavLink href="#faqs">FAQs</MobileNavLink>
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            <DefaultButton href="/login" variant="outline">
                              Log in
                            </DefaultButton>
                            <DefaultButton href="#">
                              Download the app
                            </DefaultButton>
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>

            <div className="col-span-1 flex w-full items-center justify-end gap-[8px] font-semibold text-green-400  ">
              <DefaultButton
                variant="outline"
                color="gray"
                className="lg:block"
                onClick={() => {
                  {
                    !isLoggedIn ? connect() : setOpenWalletModal(true);
                  }
                }}
                disabled={disabled}
              >
                {!isLoggedIn ? "Login" : "My Account"}
              </DefaultButton>
            </div>
          </div>
          <AccountModal open={openWalletModal} onClose={onCloseWalletModal} />
        </Container>
      </nav>
    </header>
  );
}

export default Header;
