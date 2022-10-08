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

import java.math.BigInteger;

public class Marketplace {
    private final Address nft;
    private final DictDB<BigInteger, Listing> market = Context.newDictDB("market", Listing.class);
    private int orderIndex = 0;
    private final BigInteger purchaseFee = BigInteger.ONE; //1%

    public Marketplace(Address _nft) {
        this.nft = _nft;
    }

    @External(readonly=true)
    public String name() {
        return "ticketpal-market";
    }

    @External
    public void addToMarket(BigInteger _id, BigInteger _price) {
        BigInteger balance = (BigInteger) Context.call(nft, "balanceOf", Context.getCaller(), _id);
        Context.require(balance.compareTo(BigInteger.ONE) >= 0, "Token owner required");
        Context.require(_price.compareTo(BigInteger.ZERO) > 0, "Price must be positive");
        BigInteger orderId = BigInteger.valueOf(++orderIndex);
        Listing listing = new Listing(Context.getCaller(), _id, _price);
        market.set(orderId, listing);
        this.AddToMarket(Context.getCaller(), _id, orderId, _price);
    }

    @External
    public void addMultipleToMarket(BigInteger[] _ids, BigInteger _price) {
        Context.require(_price.compareTo(BigInteger.ZERO) > 0, "Price must be positive");
        for (BigInteger tokenId : _ids) {
            //todo: check token exist

            BigInteger balance = (BigInteger) Context.call(nft, "balanceOf", Context.getCaller(), tokenId);
            if (balance.compareTo(BigInteger.ONE) < 0) {
                this.TokenOwnerRequired(Context.getCaller(), tokenId);
                continue;
            }

            BigInteger orderId = BigInteger.valueOf(++orderIndex);
            Listing listing = new Listing(Context.getCaller(), tokenId, _price);
            market.set(orderId, listing);
            this.AddToMarket(Context.getCaller(), tokenId, orderId, _price);
        }

    }

    @External
    public void removeFromMarket(BigInteger _orderId, BigInteger _id) {
        Context.require(market.get(_orderId) != null, "Order not found");
        Listing listing = market.get(_orderId);
        listing.selling = false;
        market.set(_orderId, listing);
        this.RemoveFromMarket(Context.getCaller(), _orderId, listing._id);
    }

    @External(readonly = true)
    public boolean isOrderExit(BigInteger _orderId) {
        Listing listing = market.get(_orderId);
        return listing != null;
    }

    @External
    @Payable
    public void purchase(BigInteger _orderId) {
        Listing listing = market.get(_orderId);
        Context.require(listing != null, "Order not found");
        Context.require(listing.selling, "Order not available");

        BigInteger value = Context.getValue();
        Context.require(value.compareTo(listing.price) >= 0, "Not enough money");

        Context.call(nft, "transferFrom", listing.seller, Context.getCaller(), listing._id, BigInteger.ONE, null);
        BigInteger fee = listing.price.divide(BigInteger.valueOf(100)).multiply(purchaseFee);
        BigInteger sellerReceiveAmount = listing.price.subtract(fee);
        listing.selling = false;
        market.set(_orderId, listing);
        this.PurchaseSuccess(_orderId, listing._id, value);

        Context.transfer(Context.getOwner(), sellerReceiveAmount);
        Context.transfer(listing.seller, value.subtract(sellerReceiveAmount));
    }


    @EventLog(indexed = 1)
    protected void PurchaseSuccess(BigInteger _orderId, BigInteger tokenId, BigInteger price) { }

    @EventLog(indexed = 1)
    protected void TokenOwnerRequired(Address address, BigInteger tokenId) {}

    @EventLog(indexed = 2)
    protected void AddToMarket(Address owner, BigInteger token, BigInteger orderId, BigInteger price) {}

    @EventLog(indexed = 2)
    protected void RemoveFromMarket(Address owner, BigInteger orderId, BigInteger token) {}
}