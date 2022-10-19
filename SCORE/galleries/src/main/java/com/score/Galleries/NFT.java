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
  boolean visibility;
  boolean onSale;

  public NFT(
    Address _owner,
    BigInteger _price,
    boolean _visibility,
    boolean _onSale
  ) {
    this.owner = _owner;
    this.price = _price;
    this.visibility = _visibility;
    this.onSale = _onSale;
  }

  public static void writeObject(ObjectWriter w, NFT _nft) {
    w.beginList(4);
    w.write(_nft.owner);
    w.write(_nft.price);
    w.write(_nft.visibility);
    w.write(_nft.onSale);
    w.end();
  }

  public static NFT readObject(ObjectReader r) {
    r.beginList();
    NFT n = new NFT(
      r.readAddress(),
      r.readBigInteger(),
      r.readBoolean(),
      r.readBoolean()
    );
    r.end();
    return n;
  }
}
