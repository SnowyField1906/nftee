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

import score.Address;
import score.ObjectReader;
import score.ObjectWriter;

import java.math.BigInteger;

public class NFT {
    Address seller;
    String ipfs;
    BigInteger price;
    boolean onSale;

    public NFT(Address address, String ipfs, BigInteger price) {
        this.seller = address;
        this.ipfs = ipfs;
        this.price = price;
        this.onSale = true;
    }

    public static void writeObject(ObjectWriter w, NFT l) {
        w.beginList(4);
        w.write(l.seller);
        w.write(l.ipfs);
        w.write(l.price);
        w.write(l.onSale);
        w.end();
    }

    public static NFT readObject(ObjectReader r) {
        r.beginList();
        Address seller = r.readAddress();
        String ipfs = r.readString();
        BigInteger price = r.readBigInteger();
        boolean onSale = r.readBoolean();
        r.end();
        return new NFT(seller, ipfs, price);
    }
}