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


export const createNFTEvent = (address, params) => {
    const createNFT = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                params: {
                    version: "0x3",
                    from: address,
                    to: process.env.REACT_APP_CONTRACT_ADDRESS,
                    value: "0x0",
                    dataType: "deploy",
                    data: {
                        method: "createNFT",
                        params: params,
                    },
                },
            }
        }
    });
    window.dispatchEvent(createNFT);

    const eventHandler = (e) => {
        const { type, payload } = e.detail;
        if (type === 'RESPONSE_JSON-RPC') {
            console.log(payload);
        }
        else if (type === 'CANCEL_JSON-RPC') {
            console.error('User cancelled JSON-RPC request')
        }
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}