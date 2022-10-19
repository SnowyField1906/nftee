import { useState } from "react";
import SmallCollection from "../../../containers/Collection/SmallCollection";

function Collections({ collections, setCollections }) {
    const getCollectionNFTs = (collection) => {
        const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
            detail: {
                type: 'REQUEST_JSON-RPC',
                payload: {
                    jsonrpc: "2.0",
                    method: "icx_call",
                    id: 0,
                    params: {
                        to: process.env.REACT_APP_SCORE_ADDRESS,
                        dataType: "call",
                        data: {
                            method: "getCollectionNFTs",
                            params: {
                                _collection: collection,
                            }
                        }
                    }
                }
            }
        });
        window.dispatchEvent(customEvent);
        window.addEventListener('ICONEX_RELAY_RESPONSE', async (e) => {
            e.detail.payload.result.forEach(nft => {
                setCollections(collections => ({
                    ...collections,
                    [collection]: nft
                }))
            })
        })
    }

    return (
        <div>

        </div>
    )
}

export default Collections
