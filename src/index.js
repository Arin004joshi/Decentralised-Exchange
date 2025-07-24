import express from 'express'
const app = express();
app.use(express.json());

let ETH_QUANTITY = 200;
let USDC_BALANCE = 700000;

// app.post("/add-liquidity", (res, req) => {})

app.post("/buy-assets", (req, res) => {
    const pool = ETH_QUANTITY * USDC_BALANCE;
    const { quantityToBuy } = req.body;
    const updatedEthQuantity = ETH_QUANTITY - quantityToBuy;
    const updatedUsdcBalance = pool / updatedEthQuantity;
    const toPay = USDC_BALANCE - updatedUsdcBalance;
    res.json({ message: `you have paid ${toPay} USDCs to get ${quantityToBuy} ETHs` })
})

app.post("/sell-assets", (req, res) => {
    const pool = ETH_QUANTITY * USDC_BALANCE;
    const { quantityToSell } = req.body;
    const updatedEthQuantity = ETH_QUANTITY + quantityToSell;
    const updatedUsdcBalance = pool / updatedEthQuantity;
    const recievedUsdc = USDC_BALANCE - updatedUsdcBalance;
    res.json({ message: `you got ${recievedUsdc} USDCs on selling ${quantityToSell} ETHs` })
})

app.listen(5001, () => {
    console.log("server is running on port: " + 5001);
})