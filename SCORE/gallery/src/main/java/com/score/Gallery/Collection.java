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

public class Collection {
  String name;
  String description;
  Boolean visibility;
  ArrayList<NFT> nftList;

  Collection(String _name, String _description, boolean _visibility) {
    this.name = _name;
    this.description = _description;
    this.visibility = _visibility;
    this.nftList = new ArrayList<NFT>();
  }

  public static void writeObject(ObjectWriter w, Collection c) {
    w.beginList(4);
    w.write(c.name);
    w.write(c.description);
    w.write(c.visibility);
    w.beginList(c.nftList.size());
    for (int i = 0; i < c.nftList.size(); i++) {
      w.write(c.nftList.get(i));
    }
    w.end();
    w.end();
  }

  public static Collection readObject(ObjectReader r) {
    r.beginList();
    String name = r.readString();
    String description = r.readString();
    Boolean visibility = r.readBoolean();
    r.end();
    return new Collection(name, description, visibility);
  }
}
