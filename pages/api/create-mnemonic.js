const lightwallet = require("eth-lightwallet");

export default function handler(req, res) {
  let mnemonic;

  try {
    mnemonic = lightwallet.keystore.generateRandomSeed();
    res.json({ mnemonic });
  } catch (e) {
    console.log(e);
  }

  // var user = { name: "azraq", country: "egypt" };
  // var json = JSON.stringify(user);
  // var filename = "user.json";
  // var mimetype = "application/json";
  // res.setHeader("Content-Type", mimetype);
  // res.setHeader("Content-disposition", "attachment; filename=" + filename);
  // res.send(json);
}
