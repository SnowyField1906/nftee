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

import score.Context;
import score.Address;
import score.BranchDB;

import scorex.util.ArrayList;

import java.math.BigInteger;
import java.lang.Object;



import score.*;
import score.annotation.EventLog;
import score.annotation.External;
import score.annotation.Payable;



enum Type {
    Selling,
    Purchased,
    WishList,
    Collection
}

public class MyGallery {


    //========/ CONTRACT'S STORAGES /========//

    // The transaction's purchase fee in ICX
    private final BigInteger purchaseFee = BigInteger.ONE;

    // A user's galleries (Type => ArrayList)
    public BranchDB <Type, ArrayList<NFT>> myGalleries = Context.newBranchDB("myGalleries", NFT.class);



    //========/ CONTRACT'S SUPPORT-METHODS /========//

    // Get the number of NFTs in a specific gallery's type
    protected int quantities(Type type) {
        return this.myGalleries.at(type).size();
    }

    // // Get the NFT at a specific index in a specific gallery's type
    // protected NFT getNFT(Type type, int index) {
    //     // Revert if the index is out of bounds
    //     Context.require(0 <= index && index < this.quantities(type), "Index out of bound");
    //     return this.myGalleries.at(type).get(index);
    // }

    // Get the index of a specific NFT in a specific gallery's type
    protected int getIndex(Type type, NFT nft) {
        if (this.myGalleries.at(type).indexOf(nft) >= 0) {
            return this.myGalleries.at(type).indexOf(nft);
        }

        // Revert if the NFT is not found
        Context.revert("The NFT is not in your " + type);
        return -1;
    }

    // Get the NFT having a specific IPFS in a specific gallery's type
    protected NFT getNFT(Type type, String ipfs) {
        // Find the NFT having the given IPFS
        ArrayList<NFT> nfts = this.myGalleries.at(type);
        for (NFT nft : nfts) {
            if (nft.ipfs.equals(ipfs)) {
                return nft;
            }
        }

        // Revert if the NFT is not found
        Context.revert("The NFT not found or deleted");
        return null;
    }

    // Add a NFT into a specific gallery's type
    protected void addNFT(Type type, NFT nft) {
        this.myGalleries.at(type).add(nft);
    }

    // Remove a NFT from a specific gallery's type
    protected void removeNFT(Type type, NFT nft) {
        this.myGalleries.at(type).remove(nft);
    }



    //========/ CONTRACT'S MAIN-METHODS /========//

    // Get a list of NFTs in a specific gallery's type
    @External(readonly = true)
    public ArrayList<NFT> showGallery(String type) {
        return this.myGalleries.at(Type.valueOf(type));
    }


    @External()
    public void toggleVisibility(String ipfs) {
        // Revert if the caller is not the owner
        NFT nft = this.getNFT(Type.Selling, ipfs);
        Context.require(Context.getCaller().equals(nft.owner));

        // Flip sale's status (visibility)
        myGalleries.at(Type.Selling).get(getIndex(Type.Selling, nft)).onSale ^= true;
    }


    //========/ CONTRACT'S SUB-METHODS /========//

    // Handle selling action
    @External()
    public void handleSelling(String ipfs, BigInteger price) {
        // Call the caller's balance
        BigInteger balance = Context.getBalance(Context.getCaller());

        // Require the NFT's price to be positive
        Context.require(
            price.compareTo(BigInteger.ZERO) > 0,
            "The price must be positive"
        );

        // Create the NFT and add into Selling gallery
        NFT nft = new NFT(Context.getCaller(), ipfs, price);
        this.addNFT(Type.Selling, nft);

        // Emit event
        this.HandleSelling(Context.getCaller(), ipfs, price);
    }

    // // Handle purchasing action
    // @External() @Payable()
    // public void handlePurchasing(String ipfs) {
    //     // Get NFT from ipfs
    //     NFT nft = getNFT(Type.Selling, ipfs);

    //     // Require caller's balance to be greater than the NFT's price
    //     BigInteger value = Context.getValue();
    //     Context.require(value.compareTo(nft.price) >= 0, "Not enough money");

    //     // Transfer money to seller
    //     Context.call(nft, "transferFrom", nft.owner, Context.getCaller(), nft.ipfs, BigInteger.ONE, null);

    //     BigInteger addingFee = nft.price.divide(BigInteger.valueOf(100)).multiply(purchaseFee);
    //     BigInteger sellerReceiveAmount = nft.price.subtract(addingFee);

    //     // emit event
    //     this.HandlePurchasing(Context.getCaller(), nft.ipfs, nft.price);

    //     Context.transfer(Context.getOwner(), sellerReceiveAmount);
    //     Context.transfer(nft.owner, value.subtract(sellerReceiveAmount));
    // }

    // Handle adding action
    @External()
    public void handleAdding(String type, String ipfs) {
        // Get the NFT from the given IPFS
        NFT nft = this.getNFT(Type.valueOf(type), ipfs);

        // Revert if the NFT is already in the given gallery
        Context.require(
            !this.myGalleries.at(Type.valueOf(type)).contains(nft),
            "This NFT is already in your " + type
        );
        
        // Add the NFT into the given gallery
        this.addNFT(Type.valueOf(type), nft);

        // Emit event
        this.HandleAdding(Context.getCaller(), nft.ipfs, nft.price);
    }
    
    // Handle removing action
    @External()
    public void handleRemoving(String type, String ipfs) {
        // Get the NFT from the given IPFS
        NFT nft = this.getNFT(Type.valueOf(type), ipfs);

        // Revert if the NFT is not in the given gallery
        Context.require(
            this.myGalleries.at(Type.valueOf(type)).contains(nft),
            "This NFT is not in your " + type
        );
        
        // Remove the NFT from the given gallery
        this.removeNFT(Type.valueOf(type), nft);

        // Emit event
        this.HandleRemoving(Context.getCaller(), ipfs, nft.price);
    }


    //========/ CONTRACT'S EVENTS /========//

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