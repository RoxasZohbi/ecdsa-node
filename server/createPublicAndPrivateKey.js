const { secp256k1: secp } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const COUNT = 3; // Change this to generate more or fewer key pairs

for (let i = 1; i <= COUNT; i++) {
  const privateKey = secp.utils.randomPrivateKey();
  const publicKey = secp.getPublicKey(privateKey);

  console.log(`--- Key Pair ${i} ---`);
  console.log("Private:", toHex(privateKey));
  console.log("Public: ", toHex(publicKey));
  console.log();
}