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

package com.score.Gallery;

import java.math.BigInteger;
import score.Address;
import score.ObjectReader;
import score.ObjectWriter;
import scorex.util.ArrayList;

public class NFT {
  Address owner;
  String ipfs;
  BigInteger price;
  boolean onSale;
  boolean visibility;
  ArrayList<Address> requested;

  public NFT(
    Address _owner,
    String _ipfs,
    BigInteger _price,
    boolean _onSale,
    boolean _visibility,
    BigInteger _firstRequest,
    BigInteger _bid,
    Address _bidder
  ) {
    this.owner = _owner;
    this.ipfs = _ipfs;
    this.price = _price;
    this.onSale = _onSale;
    this.visibility = _visibility;
    this.requested = new ArrayList<Address>();
  }

  public static void writeObject(ObjectWriter w, NFT _nft) {
    w.beginList(5);
    w.write(_nft.owner);
    w.write(_nft.ipfs);
    w.write(_nft.price);
    w.write(_nft.onSale);
    w.write(_nft.visibility);
    w.end();
  }

  public static NFT readObject(ObjectReader r) {
    r.beginList();
    Address owner = r.readAddress();
    String ipfs = r.readString();
    BigInteger price = r.readBigInteger();
    boolean onSale = r.readBoolean();
    boolean visibility = r.readBoolean();
    r.end();
    return new NFT(owner, ipfs, price, onSale, visibility);
  }
}
