import { useEffect } from "react";
import server from "./server";

import { secp256k1 as secp } from "ethereum-cryptography/secp256k1";
import { toHex, hexToBytes } from "ethereum-cryptography/utils";


function Wallet({ address, setAddress, balance, setBalance }) {
  
  async function onChange(e) {
    const address = e.target.value;
    setAddress(address);
    if (address) {
      try {
        const privateKeyBytes = hexToBytes(address);
        if (privateKeyBytes.length !== 32) throw new Error("Private key must be 32 bytes");
        const publicKey = secp.getPublicKey(privateKeyBytes);
        const {
          data: { balance },
        } = await server.get(`balance/${toHex(publicKey)}`);
        setBalance(balance);
      } catch (error) {
        setBalance(0);
      }
    } else {
      setBalance(0);
    }
  }
  
  return (
    <div className="container wallet">
      <h1>Your Private Key</h1>

      <label>
        Private Key:
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
