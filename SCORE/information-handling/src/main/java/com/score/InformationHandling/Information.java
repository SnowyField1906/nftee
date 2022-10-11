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

import java.math.BigInteger;
import score.Address;
import score.ObjectReader;
i5

public class Information {
  Tokenee wallet;
  Voucher ipfs;
  BigInteger price;
  boolean onSale;

  public Information(Address address, String ipfs, BigInteger price) {
    this.owner = address;
    this.ipfs = ipfs;
    this.price = price;
    this.onSale = true;
  }

  public static void writeObject(ObjectWriter w, NFT nft) {
    w.beginList(4);
    w.write(nft.owner);
    w.write(nft.ipfs);
    w.write(nft.price);
    w.write(nft.onSale);
    w.end();
  }

  public static NFT readObject(ObjectReader r) {
    r.beginList();
    Address owner = r.readAddress();
    String ipfs = r.readString();
    BigInteger price = r.readBigInteger();
    boolean onSale = r.readBoolean();
    r.end();
    return new NFT(owner, ipfs, price);
  }
}
