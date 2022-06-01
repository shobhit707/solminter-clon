import React, { useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import solminter from "./images/solminter.svg";
import circle from "./images/circle.svg";
import rocket from "./images/rocket.svg";
import nft from "./images/nft.svg";
import doc from "./images/doc.svg";
import twitter from "./images/twitter.svg";
import telegram from "./images/telegram.svg";
import logo from "./images/logo.svg";
import "./Home.css";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletModal,
  WalletModalButton,
  WalletIcon,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

require("@solana/wallet-adapter-react-ui/styles.css");

export default function Home() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  const handleHome = () => {
    navigate("/");
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-main">
          <h2 onClick={handleHome}>
            <img src={solminter} alt="solminter" />
          </h2>
          <button onClick={handleClick}>CONNECT WALLET</button>
          <div className="links">
            <NavLink
              to="/token-management"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={circle} alt="circle" />
              <span>Token Management</span>
            </NavLink>
            <NavLink
              to="/apply-for-ido"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={rocket} alt="circle" />
              <span>Apply for IDO</span>
            </NavLink>
            <NavLink
              to="/art"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={nft} alt="circle" />
              <span>NFT</span>
            </NavLink>
            <a
              href="https://docs.solminter.com/"
              target={"_blank"}
              rel="noopener noreferrer"
            >
              <img src={doc} alt="circle" />
              <span>Documentation</span>
            </a>
          </div>
        </div>
        <div className="below">
          <div className="connect">
            <p>Connect With Us</p>
            <div className="icons">
              <a
                href="https://t.me/solminter"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="twitter" />
              </a>
              <a
                href="https://t.me/solminter"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <img src={telegram} alt="telegram" />
              </a>
            </div>
          </div>
          <div className="footer">
            <div>
              <img src={logo} alt="logo" />
            </div>
            <div>© Solminter {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>

      <div className="main">Please Connect Your wallet</div>

      <Modal
        dialogClassName="modal-70w"
        show={isOpen}
        onHide={() => setIsOpen(false)}
      >
        <Modal.Header>
          <Modal.Title>Connect to a wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <WalletModal>
                  <WalletModalButton />
                  <WalletIcon />
                </WalletModal>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </Modal.Body>
      </Modal>
    </div>
  );
}
