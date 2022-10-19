import IconService from 'icon-sdk-js'

export const sign = (tx, address) => {
    let signature;
    const signEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_SIGNING',
            payload: {
                from: address,
                hash: tx,
            }
        }
    });
    window.dispatchEvent(signEvent);

    const eventHandler = (e) => {
        const { type, payload } = e.detail
        if (type === 'RESPONSE_SIGNING') {
            signature = payload
        }
        else if (type === 'CANCEL_SIGNING') {
            console.error('User cancelled signing request')
        }
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);

    return signature
}

export const createCollection = (params) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(params._user)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('createCollection')
        .params({
            _user: params._user,
            _name: params._name,
            _description: params._description,
            _visibility: IconService.IconConverter.toBigNumber(+params._visibility),
        })
        .build();

    var score_sdk = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "icx_sendTransaction",
        "params": IconService.IconConverter.toRawTransaction(callTransactionData),
        "id": 0,
    })

    var parsed = JSON.parse(score_sdk)
    window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: parsed,
        }
    }))
}


export const createNFT = (params) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(params._user)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('createNFT')
        .params({
            _user: params._user,
            _price: IconService.IconConverter.toBigNumber(params._price * 1e9),
            _visibility: IconService.IconConverter.toBigNumber(+params._visibility),
            _onSale: IconService.IconConverter.toBigNumber(+params._onSale),
            _ipfs: params._ipfs,
        })
        .build();

    var score_sdk = JSON.stringify({
        jsonrpc: "2.0",
        method: "icx_sendTransaction",
        params: IconService.IconConverter.toRawTransaction(callTransactionData),
        id: 0,
    })

    var parsed = JSON.parse(score_sdk)
    window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: parsed,
        }
    }))
}



export const addNFT = (address, params) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(address)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('addNFT')
        .params({
            _collection: params._collection,
            _ipfs: params._ipfs,
        })
        .build();

    var score_sdk = JSON.stringify({
        jsonrpc: "2.0",
        method: "icx_sendTransaction",
        params: IconService.IconConverter.toRawTransaction(callTransactionData),
        id: 0,
    })

    var parsed = JSON.parse(score_sdk)
    window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: parsed,
        }
    }))
}