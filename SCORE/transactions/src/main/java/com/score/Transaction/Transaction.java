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

package com.score.Transaction;

import score.Context;
import score.annotation.External;
import score.annotation.Payable;
import score.Address;
import java.math.BigInteger;

import com.iconloop.score.util.EnumerableIntMap;


public class Gallery {
    private final Address roomNftContract;
    private final EnumerableIntMap<String> galleryURIs = new EnumerableIntMap<>("galleryURIs", String.class);
    private final EnumerableIntMap<BigInteger> roomForRentPrices = new EnumerableIntMap<>("roomForRentPrices", BigInteger.class);
 
    public Gallery(Address _roomNftContract) {
        this.roomNftContract = _roomNftContract;
    }

    @External(readonly=true)
    public String getGalleryByIndex(int _index) {
        BigInteger galleryId = galleryURIs.getKey(_index);
        return galleryURIs.getOrThrow(galleryId, "Non-existent");
    }

    @External(readonly=true)
    public int totalGalleries() {
        return galleryURIs.length();
    }

    @Payable
    @External
    public void createGallery(Address _roomContract, BigInteger _roomTokenId, String _metadataURI) {
        // validate
        Context.require(roomNftContract.equals(_roomContract));

        // pay for room owner
        Address owner = Address.fromString(Context.call(roomNftContract, "ownerOf", _roomTokenId).toString());
        BigInteger fee = roomForRentPrices.getOrThrow(_roomTokenId, "Non-existent");
        Context.transfer(owner, fee);

        // create gallery
        BigInteger newGalleryId = BigInteger.valueOf(this.totalGalleries());
        galleryURIs.set(newGalleryId, _metadataURI);
    }

    // register room for rent
    @External
    public void roomForRent(Address _roomContract, BigInteger _roomTokenId, BigInteger _price) {
        // validate 
        Context.require(roomNftContract.equals(_roomContract), "Invalid-room-contract");
        Context.require(_price.compareTo(BigInteger.ZERO) > 0, "Invalid-price");
        Context.require(!roomForRentPrices.contains(_roomTokenId), "Already-price");

        // only owner room have permission
        Address owner = Address.fromString(Context.call(roomNftContract, "ownerOf", _roomTokenId).toString());
        Context.require(Context.getCaller().equals(owner), "Invalid-room-owner");

        roomForRentPrices.set(_roomTokenId, _price);
    }


    @External(readonly=true)
    public int totalRooms() {
        return roomForRentPrices.length();
    }

    @External(readonly=true)
    public String getRoomByIndex(int _index) {
        // validate 
        Context.require(_index < roomForRentPrices.length(), "Invalid-index");
        
        BigInteger roomTokenId = roomForRentPrices.getKey(_index);
        BigInteger price = roomForRentPrices.getOrThrow(roomTokenId, "Non-existent");
        if (price == null)
            return roomTokenId.toString();

        return roomTokenId + ";" + price;
    }
}
