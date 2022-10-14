import IconService from 'icon-sdk-js';

const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3');

export const iconService = new IconService(httpProvider);

export const addressHandler = async function () {
    const requestAccount = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_HAS_ACCOUNT'
        }
    });

    window.dispatchEvent(requestAccount);

    const responseAccount = (e) => {
        const { type, payload } = e.detail
        if (type === 'RESPONSE_HAS_ADDRESS') {
            console.log(payload); // true or false
        }
    }

    window.addEventListener('ICONEX_RELAY_RESPONSE', responseAccount);

}



export const hasAddress = new CustomEvent('ICONEX_RELAY_REQUEST', {
    detail: {
        type: 'REQUEST_HAS_ADDRESS'
    }
});

export const has = new CustomEvent('ICONEX_RELAY_REQUEST', {
    detail: {
        type: 'REQUEST_HAS_ADDRESS'
    }
});