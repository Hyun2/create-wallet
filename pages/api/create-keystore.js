import lightwallet from "eth-lightwallet";

const handler = async (req, res) => {
  const { mnemonic, password } = req.body;
  let json;
  const filename = "keystore.json";
  const mimetype = "application/json";
  res.setHeader("Content-Type", mimetype);
  res.setHeader("Content-disposition", "attachment; filename=" + filename);

  try {
    await lightwallet.keystore.createVault(
      { password, seedPhrase: mnemonic, hdPathString: "m/0'/0'/0'" },
      async (err, ks) => {
        // console.log(typeof password);
        await ks.keyFromPassword(password, async (err, pwDerivedKey) => {
          await ks.generateNewAddress(pwDerivedKey, 1);

          const address = ks.getAddresses().toString();
          // console.log(address);
          const keystore = ks.serialize();
          // console.log(keystore);

          // res.send({ address, keystore });

          json = JSON.stringify(keystore);
          res.send(json);
        });
      }
    );
    // res.send(json);
  } catch (e) {
    console.log("catch");
    console.log(e);
  }

  // var user = { name: "azraq", country: "egypt" };
  // var json = JSON.stringify(user);
  // var filename = "user.json";
  // var mimetype = "application/json";
  // res.setHeader("Content-Type", mimetype);
  // res.setHeader("Content-disposition", "attachment; filename=" + filename);
  // res.send(json);
};

export default handler;
