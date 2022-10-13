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
import score.BranchDB;
import score.Context;
import score.annotation.EventLog;
import score.annotation.External;
import score.annotation.Payable;
import scorex.util.ArrayList;
import scorex.util.HashMap;

public class Galleries {
  public HashMap<Address, ArrayList<BigInteger>> addressMapGallery = new HashMap<Address, ArrayList<BigInteger>>();
  public HashMap<BigInteger, ArrayList<BigInteger>> galleryMapCollection = new HashMap<BigInteger, ArrayList<BigInteger>>();
  public HashMap<BigInteger, ArrayList<String>> collectionMapNFT = new HashMap<BigInteger, ArrayList<Address>>();
  public HashMap<String, ArrayList<Address>> nftMapRequests = new HashMap<BigInteger, ArrayList<Addrress>>();

  public HashMap<BigInteger, Collection> collectionInfo = new HashMap<BigInteger, Collection>();

  @External(readonly = true)
  public ArrayList<BigInteger> gallery(Address _address) {
    return this.galleries.get(_address);
  }

  @External(readonly = true)
  public ArrayList<BigInteger> collection(BigInteger _timestamp) {
    return this.collections.get(_timestamp);
  }

  @External(readonly = true)
  public ArrayList<String> nft(BigInteger _timestamp) {
    return this.nfts.get(_timestamp);
  }

  @External(readonly = true)
  public ArrayList<Address> request(String _ipfs) {
    return this.requests.get(_ipfs);
  }

  @External
  public void createCollection(
    Address _caller,
    BigInteger _timestamp,
    String _name,
    String _description,
    boolean _visibility
  ) {
    if (this.addressMapGallery.get(_caller) == null) {
      this.addressMapGallery.put(
          Context.getCaller(),
          new ArrayList<BigInteger>()
        );
    }
    this.addressMapGallery.get(Context.getCaller()).add(_timestamp);
    this.galleryMapCollection.put(_timestamp, new ArrayList<BigInteger>());
    this.collectionInfo.put(
        _timestamp,
        new Collection(_name, _description, _visibility)
      );
  }

  @External(readonly = true)
  public CP collectionInfo(BigInteger _timestamp) {
    return this.collectionInfo.get(_timestamp);
  }
}
