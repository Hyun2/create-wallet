const lightwallet = require("eth-lightwallet");

export default function handler(req, res) {
  let mnemonic;

  try {
    mnemonic = lightwallet.keystore.generateRandomSeed();

    res.json({ mnemonic: mnemonic.split(" ") });
  } catch (e) {
    console.log(e);
  }
}
