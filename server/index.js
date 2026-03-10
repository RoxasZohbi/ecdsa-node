const express = require("express");
const app = express();
const cors = require("cors");
const { secp256k1: secp } = require("ethereum-cryptography/secp256k1");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0268d58702460229d0484c3ae885b423d5d0bde1bf295da5f517792b4d2d85c246": 100,
  "03da0fb382ee4585d8f56bbe8182e1fa11d66a773bc8183f343409d1bdf3aa7fc8": 50,
  "024187743c639acf670bfdc8005c6ec2b10419073f5e47e9c75cd9429a5c15e5f6": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
