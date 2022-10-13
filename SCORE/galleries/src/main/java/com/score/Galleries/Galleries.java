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

import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Set;
import score.Address;
import score.BranchDB;
import score.Context;
import score.annotation.EventLog;
import score.annotation.External;
import score.annotation.Payable;
import scorex.util.ArrayList;
import scorex.util.HashMap;

public class Galleries {
  public Map<Address, ArrayList<String>> userMapCollections = new HashMap<>();
  public Map<String, ArrayList<String>> collectionMapNFTs = new HashMap<>();
  public Map<String, ArrayList<Address>> nftMapRequests = new HashMap<>();

  public Map<String, Collection> collectionInfo = new HashMap<>();
  public Map<String, NFT> nftInfo = new HashMap<>();

  private String generateCollectionId() {
    return Context.getTransactionHash().toString();
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
    String collectionId = this.generateCollectionId();
    userCollections.add(collectionId);
    this.userMapCollections.put(_user, userCollections);
    this.collectionInfo.put(collectionId, collection);
  }

  @External
  public void removeCollection(
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
    String collectionId = this.generateCollectionId();
    userCollections.add(collectionId);
    this.userMapCollections.put(_user, userCollections);
    this.collectionInfo.put(collectionId, collection);
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
    ArrayList<String> collectionNFTs = this.collectionMapNFTs.get(_user);
    if (collectionNFTs == null) {
      collectionNFTs = new ArrayList<String>();
    }
    collectionNFTs.add(_ipfs);
    this.collectionMapNFTs.put(_collection, collectionNFTs);
    this.nftInfo.put(_ipfs, nft);
  }
}
