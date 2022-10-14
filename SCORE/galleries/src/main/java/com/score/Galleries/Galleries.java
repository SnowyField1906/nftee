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
import java.nio.charset.StandardCharsets;
import java.util.Map;
import score.Address;
import score.Context;
import score.annotation.EventLog;
import score.annotation.External;
import score.annotation.Payable;
import scorex.util.ArrayList;
import scorex.util.Base64;
import scorex.util.HashMap;

public class Galleries {
  public Map<Address, ArrayList<String>> userMapCollections = new HashMap<>();
  public Map<String, ArrayList<String>> collectionMapNFTs = new HashMap<>();
  public Map<String, ArrayList<Address>> nftMapRequests = new HashMap<>();

  public Map<String, Collection> collectionInfo = new HashMap<>();
  public Map<String, NFT> nftInfo = new HashMap<>();

  private String generateCollectionId(Address _user, String _name) {
    return _user.toString() + "/" + _name;
  }

  private String decodeTransactionHash(String _hash) {
    byte[] decode = Base64.getDecoder().decode(Context.getTransactionHash());
    return new String(decode, StandardCharsets.UTF_8);
  }

  @External(readonly = true)
  public ArrayList<String> getUserCollections(Address _user) {
    return this.userMapCollections.get(_user);
  }

  @External(readonly = true)
  public ArrayList<String> getCollectionNFTs(String _collection) {
    return this.collectionMapNFTs.get(_collection);
  }

  @External(readonly = true)
  public ArrayList<Address> getNFTRequests(String _nft) {
    return this.nftMapRequests.get(_nft);
  }

  @External(readonly = true)
  public String getCollectionInfo(String _collection) {
    Context.require(this.collectionInfo.containsKey(_collection));
    return (
      this.collectionInfo.get(_collection).name +
      "/" +
      this.collectionInfo.get(_collection).description +
      "/" +
      this.collectionInfo.get(_collection).visibility
    );
  }

  @External(readonly = true)
  public String getNFTInfo(String _nft) {
    Context.require(this.nftInfo.containsKey(_nft));
    return (
      this.nftInfo.get(_nft).owner +
      "/" +
      this.nftInfo.get(_nft).price +
      "/" +
      this.nftInfo.get(_nft).onSale +
      "/" +
      this.nftInfo.get(_nft).visibility
    );
  }

  @External
  public void createCollection(
    Address _user,
    String _name,
    String _description,
    boolean _visibility
  ) {
    Collection collection = new Collection(_name, _description, _visibility);
    ArrayList<String> userCollections = this.userMapCollections.get(_user);
    if (userCollections == null) {
      userCollections = new ArrayList<String>();
    }
    String collectionId = this.generateCollectionId(_user, _name);
    userCollections.add(collectionId);
    this.userMapCollections.put(_user, userCollections);
    this.collectionInfo.put(collectionId, collection);
  }

  @External
  public void removeCollection(Address _user, String _collection) {
    ArrayList<String> userCollections = this.userMapCollections.get(_user);
    if (userCollections == null) {
      return;
    }
    userCollections.remove(_collection);
    this.userMapCollections.put(_user, userCollections);
    this.collectionInfo.remove(_collection);
  }

  @External
  public void toggleCollectionVisibility(String _collection) {
    Collection collection = this.collectionInfo.get(_collection);
    collection.visibility ^= true;
    this.collectionInfo.put(_collection, collection);
  }

  @External
  public void createNFT(
    Address _user,
    BigInteger _price,
    boolean _onSale,
    boolean _visibility,
    String _ipfs,
    String _collection
  ) {
    NFT nft = new NFT(_user, _price, _onSale, _visibility);
    ArrayList<String> collectionNFTs = this.collectionMapNFTs.get(_collection);
    if (collectionNFTs == null) {
      collectionNFTs = new ArrayList<String>();
    }
    collectionNFTs.add(_ipfs);
    this.collectionMapNFTs.put(_collection, collectionNFTs);
    this.nftInfo.put(_ipfs, nft);
  }

  @External
  public void toggleNFTVisibility(
    String _nft,
    boolean _visibility,
    boolean _onSale
  ) {
    NFT nft = this.nftInfo.get(_nft);
    nft.visibility ^= _visibility;
    nft.onSale ^= _onSale;
    this.nftInfo.put(_nft, nft);
  }
}
