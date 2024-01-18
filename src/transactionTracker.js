import React from 'react'

const {Web3} = require('web3');

// Connect to an Ethereum node (replace 'http://localhost:8545' with your node's URL)
const web3 = new Web3('https://mainnet.infura.io/v3/068081b203ca4e468ff3291b6a0b1333');

// Replace 'startBlock' and 'endBlock' with the block numbers you want to track
const startBlock = 1000000;
const endBlock = 1000100;

// Function to get transactions in a given block


export default function transactionTracker() {
    async function getTransactions(blockNumber) {
        try {
            const block = await web3.eth.getBlock(blockNumber, true);
            if (block && block.transactions) {
                console.log(`Transactions in block ${blockNumber}:`, block.transactions);
            } else {
                console.log(`No transactions in block ${blockNumber}`);
            }
        } catch (error) {
            console.error(`Error retrieving block ${blockNumber} transactions:`, error);
        }
    }
    
    // Loop through blocks and get transactions
    for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
        getTransactions(blockNumber);
    }
    return (
      <div>transactionTracker</div>
    )
  }
  





