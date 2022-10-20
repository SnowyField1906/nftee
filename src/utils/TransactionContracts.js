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

export const toggleCollectionVisibility = (_collection) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(_collection.split('/')[0])
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('toggleCollectionVisibility')
        .params({
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

export const deleteColection = (_user, _collection) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(_user)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('deleteColection')
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


export const createNFT = (_user, _price, _visibility, _onSale, _ipfs) => {
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
            _price: IconService.IconConverter.toBigNumber(_price * 1e9),
            _visibility: IconService.IconConverter.toBigNumber(+_visibility),
            _onSale: IconService.IconConverter.toBigNumber(+_onSale),
            _ipfs: _ipfs,
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

export const toggleNFTVisibility = (address, _nft, _visibility, _onSale) => {
    var callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder();
    var callTransactionData = callTransactionBuilder
        .from(address)
        .to(process.env.REACT_APP_SCORE_ADDRESS)
        .nid(process.env.REACT_APP_NID)
        .value(0x0)
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconService.IconConverter.toBigNumber(10000000))
        .version(0x3)
        .method('toggleNFTVisibility')
        .params({
            _nft: _nft,
            _visibility: _visibility,
            _onSale: _onSale,
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
