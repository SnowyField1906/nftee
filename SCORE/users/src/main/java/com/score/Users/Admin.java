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

package com.score.Activities;

import java.math.BigInteger;
import score.Address;
import score.ObjectReader;
import score.ObjectWriter;
import scorex.util.ArrayList;

public class Galleries {
  private String name;
  private String description;
  private BigInteger timestamp;
  private ArrayList<NFT> list;

  Galleries(String _name, String _description, BigInteger _timestamp) {
    this.name = _name;
    this.description = _description;
    this.timestamp = _timestamp;
    this.list = new ArrayList<NFT>();
  }

  public static void writeObject(ObjectWriter w, Collection c) {
    w.beginList(4);
    w.write(c.name);
    w.write(c.description);
    w.write(c.timestamp);
    w.beginList(c.list.size());
    for (int i = 0; i < c.list.size(); i++) {
      w.write(c.list.get(i));
    }
    w.end();
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
