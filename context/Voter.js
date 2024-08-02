import React, {useState,useEffect} from 'react';
import Web3Modal from 'web3modal';
import {ethers} from "ethers";
import {create as ipfsHttpClient } from"ipfs-http-client";
import axios from "axios";
import { useRouter} from "next/router";

//INTERNAL IMPORT
import {VotingAddress, VotingAddressABI} from './constants'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
new ethers.Contract(votingAddress, VotingAdressABI, signerOrProvider);

export const VotingContext = React.createContext();


export const VotingProvider = ({children}) => {
    const votingTitle = 'My first contract app'

    return(
        <VotingContext.Provider value={{votingTitle}}>
            {childern}

        </VotingContext.Provider>
    )

}



 



const Voter = () => {
  return (
    <div>
      
    </div>
  )
}

export default Voter
