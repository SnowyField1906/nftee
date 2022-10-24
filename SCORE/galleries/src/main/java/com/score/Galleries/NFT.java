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

package com.score.Galleries;

import java.math.BigInteger;
import score.Address;
import score.ObjectReader;
import score.ObjectWriter;

public class NFT {
  Address owner;
  BigInteger price;
  String description;
  boolean visibility;
  boolean onSale;
  int purchaseTimes;
  BigInteger createdDate;

  public NFT(
    Address _owner,
    BigInteger _price,
    String _description,
    boolean _visibility,
    boolean _onSale,
    BigInteger createdDate
  ) {
    this.owner = _owner;
    this.price = _price;
    this.description = _description;
    this.visibility = _visibility;
    this.onSale = _onSale;
    this.purchaseTimes = 0;
    this.createdDate = createdDate;
  }

  public static void writeObject(ObjectWriter w, NFT _nft) {
    w.beginList(7);
    w.write(_nft.owner);
    w.write(_nft.description);
    w.write(_nft.price);
    w.write(_nft.visibility);
    w.write(_nft.onSale);
    w.write(_nft.purchaseTimes);
    w.write(_nft.createdDate);
    w.end();
  }

  public static NFT readObject(ObjectReader r) {
    r.beginList();
    NFT n = new NFT(
      r.readAddress(),
      r.readBigInteger(),
      r.readString(),
      r.readBoolean(),
      r.readBoolean(),
      r.readBigInteger()
    );
    r.end();
    return n;
  }
}
