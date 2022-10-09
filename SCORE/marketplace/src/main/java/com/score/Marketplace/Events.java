/*
 * Copyright 2022 Convexus Protocol
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.score.Marketplace;

import score.*;
import score.annotation.EventLog;
import score.annotation.External;
import score.annotation.Payable;

import scorex.util.ArrayList;

import java.math.BigInteger;

public class Events extends MyGallery {
    private final BigInteger purchaseFee = BigInteger.ONE;

    @External
    public void handleSelling(String ipfs, BigInteger price) {
        // Call caller's balance
        BigInteger balance = Context.getBalance(Context.getCaller());

        // Require NFT's price to be positive
        Context.require(price.compareTo(BigInteger.ZERO) > 0, "Price must be positive");

        // Create NFT object and add into Type
        NFT nft = new NFT(Context.getCaller(), ipfs, price);
        addNFT(Type.Selling, nft);

        // Emit event
        this.HandleSelling(Context.getCaller(), ipfs, price);
    }

    @External
    public void handleAdding(Type type, String t, String ipfs) {
        // Get NFT from index
        NFT nft = getNFT(Type.valueOf(t), ipfs);
        
        // Add NFT into Type
        addNFT(Type.valueOf(t), nft);

        // Emit event
        this.HandleAdding(Context.getCaller(), nft.ipfs, nft.price);
    }
    
    @External
    public void handleRemoving(Type type, String t, int index, String ipfs) {
        // Get NFT from index
        NFT nft = getNFT(Type.valueOf(t), index);
        
        // Remove NFT from Type
        removeNFT(Type.valueOf(t), nft);

        // Emit event
        this.HandleRemoving(Context.getCaller(), ipfs, nft.price);
    }
    

    // @External
    // @Payable
    // public void handlePurchase(String ipfs) {
    //     // Get NFT from ipfs
    //     NFT nft = getNFT(Type.Selling, ipfs);

    //     // Require caller's balance to be greater than the NFT's price
    //     BigInteger value = Context.getValue();
    //     Context.require(value.compareTo(nft.price) >= 0, "Not enough money");

    //     // Transfer money to seller
    //     Context.call(nft, "transferFrom", nft.seller, Context.getCaller(), nft.ipfs, BigInteger.ONE, null);

        
    //     BigInteger addingFee = nft.price.divide(BigInteger.valueOf(100)).multiply(purchaseFee);
    //     BigInteger sellerReceiveAmount = nft.price.subtract(addingFee);

    //     // emit event
    //     this.HandlePurchasing(Context.getCaller(), nft.ipfs, nft.price);


    //     Context.transfer(Context.getOwner(), sellerReceiveAmount);
    //     Context.transfer(nft.seller, value.subtract(sellerReceiveAmount));
    // }


    @EventLog(indexed = 1)
    protected void HandlePurchasing(Address caller, String ipfs, BigInteger price) { }

    // @EventLog(indexed = 1)
    // protected void TokenOwnerRequired(Address address) {}

    @EventLog(indexed = 1)
    protected void HandleSelling(Address caller, String ipfs, BigInteger price) {}

    @EventLog(indexed = 2)
    protected void HandleAdding(Address caller, String ipfs, BigInteger price) {}

    @EventLog(indexed = 2)
    protected void HandleRemoving(Address caller, String ipfs, BigInteger price) {}
}