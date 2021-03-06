const Bitcoin = require('bitcointoken');

const BitcoinWallet = Bitcoin.Wallet;
const BitcoinDb = Bitcoin.Db;

export class SimpleWallet {
  constructor(hdPrivateKeyOrMnemonic) {
    this.createWithBitcoinToken(hdPrivateKeyOrMnemonic);

    console.log(this.address);
    console.log(this.publicKey);
    console.log(this.privateKey);
  }

  distributeFunds(outs) {
    const db = BitcoinDb.fromHdPrivateKey(this.privateKey)

    /**
     * [
    { addr: "bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h", amountSat: 1000 }
    ]
     */
    db.put([
      { data: {}, owners: [ "bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h" ], amount: 0.01 }
    ]);
  }

  createWithBitcoinToken(privateKey) {
    this.privateKey = privateKey || BitcoinWallet.getHdPrivateKey();
    
    const wallet = BitcoinWallet.fromHdPrivateKey(this.privateKey)

    // this.path = path; // path missing
    // this.mnemonic = mnemonic;  // mnemonic missing
    this.address = wallet.getAddress('cashaddr');
    this.publicKey = wallet.getPublicKey();
    this.privateKey = wallet.getPrivateKey();
  }
}
