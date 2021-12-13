import formidable from "formidable";
import fs from "fs";
import lightwallet from "eth-lightwallet";
import Web3 from "web3";
import HookedWeb3Provider from "hooked-web3-provider";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    // console.log(files.file.filepath);
    const data = fs.readFileSync(files.file.filepath, {
      encoding: "utf8",
      flag: "r",
    });
    // console.log(data);

    let keystore = await lightwallet.keystore.deserialize(data);
    let address = await keystore.getAddresses();
    let balance;

    let web3 = new Web3(
      new HookedWeb3Provider({
        host: process.env.ROPSTEN_ENDPOINT,
        transaction_signer: keystore,
      })
    );
    console.log(address.toString());

    await web3.eth.getBalance(address.toString(), async (err, data) => {
      if (err) console.log(err);
      balance = data.toString();
    });

    return res.json({ address: address.toString(), balance });
  });
};

export default handler;
