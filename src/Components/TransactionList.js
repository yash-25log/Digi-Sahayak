import React from "react";

const TransactionList = ({ transactions, walletAddress }) => {
  console.log("transactions=>", transactions, walletAddress);
  const incomingTransactions = transactions.filter(
    (tx) => tx.to_address.toLowerCase() === walletAddress.toLowerCase()
  );

  const outgoingTransactions = transactions.filter(
    (tx) => tx.from_address.toLowerCase() === walletAddress.toLowerCase()
  );

  console.log("incoming =>", incomingTransactions);
  console.log("outcoming =>", outgoingTransactions);

  return <div></div>;
};

export default TransactionList;
