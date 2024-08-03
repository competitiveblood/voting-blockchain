import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from './constants';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const votingTitle = "My first smart contract app";
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState('');
  const [candidateLength, setCandidateLength] = useState('');
  const [candidateArray, setCandidateArray] = useState([]);
  const [error, setError] = useState('');
  const [voterArray, setVoterArray] = useState([]);
  const [voterLength, setVoterLength] = useState('');
  const [voterAddress, setVoterAddress] = useState([]);

  //----CONNECTING METAMASK
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      setError("Please Install MetaMask");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        setError("Please install MetaMask & connect, then reload the page.");
      }
    } catch (err) {
      setError("An error occurred while checking wallet connection.");
    }
  };

  //-----CONNECT WALLET
  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("Please Install MetaMask");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (err) {
      setError("An error occurred while connecting to the wallet.");
    }
  };

  //---UPLOAD TO IPFS VOTER IMAGE
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add(file);

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error uploading file to IPFS");
      return null;
    }
  };

  return (
    <VotingContext.Provider value={{
      votingTitle,
      checkIfWalletIsConnected,
      connectWallet,
      uploadToIPFS,
      currentAccount,
      error,
      candidateArray,
      voterArray,
      voterAddress
    }}>
      {children}
    </VotingContext.Provider>
  );
};

