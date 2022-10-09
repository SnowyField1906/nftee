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

enum Type {
    Selling,
    Purchased,
    WishList,
    Collection
}

public class MyGallery {
    public BranchDB <Type, ArrayList<NFT>> myGallery = Context.newBranchDB("myGallery", NFT.class);

    public int quantities(Type type) {
        Enum.valueOf(Type.class, "Flower");
        return myGallery.at(type).size();
    }

    public NFT getNFT(Type type, int index) {
        Context.require(0 <= index && index < quantities(type), "Index out of bound");
        return myGallery.at(type).get(index);
    }

    public NFT getNFT(Type type, String ipfs) {
        ArrayList<NFT> nfts = myGallery.at(type);
        for (NFT nft : nfts) {
            if (nft.ipfs.equals(ipfs)) {
                return nft;
            }
        }
        Context.revert("NFT not found or deleted");
        return null;
    }

    public int getIndex(Type type, NFT nft) {
        return myGallery.at(type).indexOf(nft);
    }

    public void addNFT(Type type, NFT nft) {
        myGallery.at(type).add(nft);
    }

    public void removeNFT(Type type, NFT nft) {
        myGallery.at(type).remove(nft);
    }
}