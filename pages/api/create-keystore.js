import lightwallet from "eth-lightwallet";

const handler = async (req, res) => {
  const { mnemonic, password } = req.body;
  let json;
  const filename = "keystore.json";
  const mimetype = "application/json";
  res.setHeader("Content-Type", mimetype);
  res.setHeader("Content-disposition", "attachment; filename=" + filename);

  try {
    lightwallet.keystore.createVault(
      { password, seedPhrase: mnemonic, hdPathString: "m/0'/0'/0'" },
      async (err, ks) => {
        ks.keyFromPassword(password, async (err, pwDerivedKey) => {
          ks.generateNewAddress(pwDerivedKey, 1);

          const address = ks.getAddresses().toString();
          const keystore = ks.serialize();

          json = JSON.stringify(keystore);
          res.send(json);
        });
      }
    );
  } catch (e) {
    console.log("catch");
    console.log(e);
  }
};

export default handler;
