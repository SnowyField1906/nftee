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
    ArrayList<String> nfts = this.collectionMapNFTs.get(_collection);
    for (String nft : nfts) {
      if (this.nftInfo.containsKey(nft)) {
        nfts.remove(nft);
      }
    }
    return nfts;
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
    Collection newCollection = new Collection(_name, _description, _visibility);
    ArrayList<String> collections = this.userMapCollections.get(_user);
    if (collections == null) {
      collections = new ArrayList<String>();
    }
    String collection = this.generateCollectionId(_user, _name);
    collections.add(collection);
    this.userMapCollections.put(_user, collections);
    this.collectionInfo.put(collection, newCollection);
  }

  @External
  public void deleteCollection(Address _user, String _collection) {
    ArrayList<String> collections = this.userMapCollections.get(_user);
    if (collections == null) {
      return;
    }
    collections.remove(_collection);
    this.userMapCollections.put(_user, collections);
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
    String _ipfs
  ) {
    NFT nft = new NFT(_user, _price, _onSale, _visibility);
    String collection = this.generateCollectionId(_user, "owning");
    ArrayList<String> nfts = this.collectionMapNFTs.get(collection);
    if (nfts == null) {
      nfts = new ArrayList<String>();
    }
    nfts.add(_ipfs);
    this.collectionMapNFTs.put(collection, nfts);
    this.nftInfo.put(_ipfs, nft);
  }

  @External
  public void addNFT(String _ipfs, String _collection) {
    ArrayList<String> nfts = this.collectionMapNFTs.get(_collection);
    if (nfts == null) {
      nfts = new ArrayList<String>();
    }
    nfts.add(_ipfs);
    this.collectionMapNFTs.put(_collection, nfts);
  }

  @External
  public void removeNFT(String _ipfs, String _collection) {
    ArrayList<String> nfts = this.collectionMapNFTs.get(_collection);
    nfts.remove(_ipfs);
    this.collectionMapNFTs.put(_collection, nfts);
  }

  @External
  public void deleteNFT(Address _user, String _ipfs) {
    String collection = this.generateCollectionId(_user, "owning");
    ArrayList<String> nfts = this.collectionMapNFTs.get(collection);
    nfts.remove(_ipfs);
    this.collectionMapNFTs.put(collection, nfts);
    this.nftInfo.remove(_ipfs);
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