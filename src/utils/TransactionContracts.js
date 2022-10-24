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


export const createCollection = (_user, _name, _description, _visibility) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(_user)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('createCollection')
        .params({
            _user: _user,
            _name: _name,
            _description: _description,
            _visibility: IconService.IconConverter.toBigNumber(+_visibility),
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

export const deleteCollection = (_user, _collection) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(_user)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('deleteCollection')
        .params({
            _user: _user,
            _collection: _collection,
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

export const editCollectionInfo = (address, _collection, _name, _description, _visibility) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(address)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('editCollectionInfo')
        .params({
            _collection: _collection,
            _name: _name,
            _description: _description,
            _visibility: IconService.IconConverter.toBigNumber(+_visibility),
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


export const createNFT = (_user, _ipfs, _price, _description, _visibility, _onSale) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(_user)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('createNFT')
        .params({
            _user: _user,
            _ipfs: _ipfs,
            _price: IconService.IconConverter.toBigNumber(_price * 1e18),
            _description: _description,
            _visibility: IconService.IconConverter.toBigNumber(+_visibility),
            _onSale: IconService.IconConverter.toBigNumber(+_onSale),
            _dateCreated: IconService.IconConverter.toBigNumber(Math.floor((new Date()).getTime() / 1000)),
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


export const addToCart = (_user, _nft) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(_user)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('addToCart')
        .params({
            _user: _user,
            _nft: _nft,
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

export const addNFT = (_nft, _collection) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(_collection.split('/')[0])
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('addNFT')
        .params({
            _nft: _nft,
            _collection: _collection
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

export const removeNFT = (_nft, _collection) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(_collection.split('/')[0])
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('removeNFT')
        .params({
            _nft: _nft,
            _collection: _collection
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

export const deleteNFT = (_user, _nft) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(_user)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('deleteNFT')
        .params({
            _user: _user,
            _nft: _nft,
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

export const editNFTInfo = (address, _nft, _price, _description, _visibility, _onSale) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(address)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('editNFTInfo')
        .params({
            _nft: _nft,
            _price: IconService.IconConverter.toBigNumber(_price * 1e18),
            _description: _description,
            _visibility: IconService.IconConverter.toBigNumber(+_visibility),
            _onSale: IconService.IconConverter.toBigNumber(+_onSale),
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

export const sendRequest = (_user, _nft) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(_user)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('sendRequest')
        .params({
            _user: _user,
            _timestamp: IconService.IconConverter.toBigNumber(Math.floor((new Date()).getTime() / 1000)),
            _nft: _nft,
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

export const startAuction = (address, _nft, _timestamp, _duration) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(address)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('startAuction')
        .params({
            _nft: _nft,
            _timestamp: IconService.IconConverter.toBigNumber(Math.floor((new Date()).getTime() / 1000)),
            _duration: IconService.IconConverter.toBigNumber(_duration),
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


// export const approveRequest = (address, _user, _nft) => {
//     var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
//     var callTransactionData = callTransactionBuilder
//         .from(address)
//         .to(process.env.REACT_APP_SCORE_ADDRESS)
//         .nid(process.env.REACT_APP_NID)
//         .value(0x0)
//         .timestamp((new Date()).getTime() * 1000)
//         .stepLimit(IconService.IconConverter.toBigNumber(10000000))
//         .version(0x3)
//         .method('approveRequest')
//         .params({
//             _user: _user,
//             _nft: _nft,
//         })
//         .build();

//     var score_sdk = JSON.stringify({
//         jsonrpc: "2.0",
//         method: "icx_sendTransaction",
//         params: IconService.IconConverter.toRawTransaction(callTransactionData),
//         id: 0,
//     })

//     var parsed = JSON.parse(score_sdk)
//     window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
//         detail: {
//             type: 'REQUEST_JSON-RPC',
//             payload: parsed,
//         }
//     }))
// }