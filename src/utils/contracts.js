import IconService from 'icon-sdk-js'

export async function readOnly(method, params) {
    const txObj = {
        jsonrpc: "2.0",
        method: "icx_call",
        id: 1234,
        params: {
            to: process.env.REACT_APP_CONTRACT_ADDRESS,
            dataType: "call",
            data: {
                "method": method,
                "params": params
            }
        }
    }
    try {
        const responsePromise = await fetch(process.env.REACT_APP_SEJONG_RPC_URI,
            {
                method: 'POST',
                body: JSON.stringify(txObj),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        const responseJSON = await responsePromise.json();
        return responseJSON.result;


    } catch (err) {
        console.error("FETCH:", err);
        throw err;
    }
}


function timeout(instance) {
    const seconds = instance === 1 ? 5000 : 1000;
    return new Promise(resolve => setTimeout(resolve, seconds));
}

export async function sendTx(address, method, params) {

    const { IconBuilder, SignedTransaction, HttpProvider, IconConverter } = IconService
    const iconService = new IconService(new HttpProvider(process.env.REACT_APP_SEJONG_RPC_URI));
    const callTxnBuilder = new IconBuilder.CallTransactionBuilder()

    const txObj = callTxnBuilder
        .nid(process.env.REACT_APP_NID)
        .from(address)
        .to(process.env.REACT_APP_CONTRACT_ADDRESS)
        .stepLimit(IconConverter.toBigNumber('2000000'))
        .version(IconConverter.toBigNumber(3))
        .timestamp(Date.now() * 1000)
        .value(0x0)
        .nonce(IconConverter.toBigNumber(1))
        .method(method)
        .params(params)
        .build();

    /* Create SignedTransaction instance */
    const signedTransaction = new SignedTransaction(txObj, address)

    const txHash = await iconService.sendTransaction(signedTransaction).execute()
    let instance = 1
    /* Send transaction. It returns transaction hash. */

    try {
        await timeout(instance)
        console.log(txHash)
        const txnResult = await iconService.getTransactionResult(txHash).execute()
        console.log(txnResult)
        return txnResult

    } catch (error) {
        console.log(error)
        throw error
    }
}