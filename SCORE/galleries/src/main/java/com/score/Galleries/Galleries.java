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
import java.util.List;
import java.util.Map;
import java.util.Set;
import score.Address;
import score.Context;
import score.annotation.EventLog;
import score.annotation.External;
import score.annotation.Payable;
import scorex.util.ArrayList;
import scorex.util.Base64;
import scorex.util.HashMap;

public class Galleries {
  public ArrayList<Address> users = new ArrayList<>();

  public HashMap<Address, ArrayList<String>> userMapCollections = new HashMap<>();
  public HashMap<String, ArrayList<String>> collectionMapNFTs = new HashMap<>();
  public HashMap<String, ArrayList<Address>> nftMapRequests = new HashMap<>();

  public HashMap<String, Collection> collectionInfo = new HashMap<>();
  public HashMap<String, NFT> nftInfo = new HashMap<>();
  public HashMap<String, Auction> auctionInfo = new HashMap<>();

  public HashMap<Address, ArrayList<String>> userMapAuctions = new HashMap<>();

  private String decodeTransactionHash(String _hash) {
    byte[] decode = Base64.getDecoder().decode(Context.getTransactionHash());
    return new String(decode, StandardCharsets.UTF_8);
  }

  private String generateCollectionID(Address _user, String _name) {
    return _user.toString() + "/" + _name.replace(" ", "-");
  }

  @External(readonly = true)
  public ArrayList<Address> getUsers() {
    return this.users;
  }

  @External(readonly = true)
  public ArrayList<String> getPublicCollections() {
    ArrayList<String> publicCollections = new ArrayList<>();
    for (Address user : this.users) {
      ArrayList<String> collections = this.getUserCustomCollections(user);
      for (String collection : collections) {
        if (this.collectionInfo.get(collection).visibility) {
          publicCollections.add(collection);
        }
      }
    }
    return publicCollections;
  }

  @External(readonly = true)
  public ArrayList<String> getPublicNFTs() {
    ArrayList<String> publicNFTs = new ArrayList<>();
    for (Address user : this.users) {
      String collection = this.generateCollectionID(user, "Owning");
      if (this.collectionInfo.containsKey(collection)) {
        ArrayList<String> nfts = this.getCollectionPublicNFTs(collection);
        publicNFTs.addAll(nfts);
      }
    }
    return publicNFTs;
  }

  @External(readonly = true)
  public ArrayList<String> getUserAuctions(Address _user) {
    return this.userMapAuctions.get(_user);
  }

  @External(readonly = true)
  public ArrayList<String> getUserCollections(Address _user) {
    return this.userMapCollections.get(_user);
  }

  @External(readonly = true)
  public ArrayList<String> getUserCustomCollections(Address _user) {
    ArrayList<String> collections = this.userMapCollections.get(_user);
    ArrayList<String> customCollections = new ArrayList<>();
    for (String collection : collections) {
      if (
        this.collectionInfo.get(collection).name != "Owning" &&
        this.collectionInfo.get(collection).name != "Cart"
      ) {
        customCollections.add(collection);
      }
    }
    return customCollections;
  }

  @External(readonly = true)
  public ArrayList<String> getCollectionNFTs(String _collection) {
    ArrayList<String> nfts = this.collectionMapNFTs.get(_collection);
    ArrayList<String> newNFTs = new ArrayList<>();
    for (String nft : nfts) {
      if (this.nftInfo.containsKey(nft)) {
        newNFTs.add(nft);
      }
    }
    return newNFTs;
  }

  @External(readonly = true)
  public ArrayList<String> getCollectionPublicNFTs(String _collection) {
    ArrayList<String> nfts = this.getCollectionNFTs(_collection);
    ArrayList<String> publicNFTs = new ArrayList<>();
    for (String nft : nfts) {
      if (this.nftInfo.get(nft).visibility) {
        publicNFTs.add(nft);
      }
    }
    return publicNFTs;
  }

  @External(readonly = true)
  public ArrayList<Address> getNFTRequests(String _nft) {
    return this.nftMapRequests.get(_nft);
  }

  @External(readonly = true)
  public ArrayList<String> getCollectionInfo(String _collection) {
    Collection collection = this.collectionInfo.get(_collection);
    return new ArrayList<>(
      List.of(
        collection.name,
        collection.description,
        String.valueOf(collection.visibility)
      )
    );
  }

  @External(readonly = true)
  public ArrayList<String> getNFTInfo(String _nft) {
    NFT nft = this.nftInfo.get(_nft);
    return new ArrayList<>(
      List.of(
        String.valueOf(nft.owner),
        String.valueOf(nft.price),
        String.valueOf(nft.visibility),
        String.valueOf(nft.onSale)
      )
    );
  }

  @External(readonly = true)
  public ArrayList<String> getAuctionInfo(String _auction) {
    Auction auction = this.auctionInfo.get(_auction);
    return new ArrayList<>(
      List.of(
        String.valueOf(auction.timestamp),
        String.valueOf(auction.duration),
        String.valueOf(auction.bid),
        String.valueOf(auction.bidder)
      )
    );
  }

  @External(readonly = true)
  public boolean auctionExists(String _auction) {
    return this.auctionInfo.containsKey(_auction);
  }

  @External
  public void createCollection(
    Address _user,
    String _name,
    String _description,
    boolean _visibility
  ) {
    Collection newCollection = new Collection(_name, _description, _visibility);
    ArrayList<String> collections = this.getUserCollections(_user);

    if (collections == null) {
      collections = new ArrayList<>();
    }

    String collection = this.generateCollectionID(_user, _name);

    collections.add(collection);
    this.userMapCollections.put(_user, collections);
    this.collectionMapNFTs.put(collection, new ArrayList<String>());

    this.collectionInfo.put(collection, newCollection);

    if (!this.users.contains(_user)) {
      this.users.add(_user);
    }
  }

  @External
  public void deleteCollection(Address _user, String _collection) {
    ArrayList<String> collections = this.getUserAuctions(_user);

    collections.remove(_collection);
    this.userMapCollections.put(_user, collections);
    this.collectionInfo.remove(_collection);
  }

  @External
  public void editCollectionInfo(
    String _collection,
    String _name,
    String _description,
    boolean _visibility
  ) {
    Collection collection = this.collectionInfo.get(_collection);
    collection.name = _name;
    collection.description = _description;
    collection.visibility = _visibility;

    String newCollection =
      this.generateCollectionID(
          Address.fromString(
            _collection.substring(0, _collection.indexOf("/"))
          ),
          _name
        );
    ArrayList<String> collections =
      this.getUserCollections(
          Address.fromString(_collection.substring(0, _collection.indexOf("/")))
        );
    collections.set(collections.indexOf(_collection), newCollection);

    this.collectionInfo.remove(_collection);
    this.collectionInfo.put(newCollection, collection);

    ArrayList<String> nfts = this.getCollectionNFTs(_collection);
    this.collectionMapNFTs.remove(_collection);
    this.collectionMapNFTs.put(newCollection, nfts);
  }

  @External
  public void createNFT(
    Address _user,
    String _ipfs,
    BigInteger _price,
    boolean _visibility,
    boolean _onSale
  ) {
    NFT nft = new NFT(_user, _price, _visibility, _onSale);
    String collection = this.generateCollectionID(_user, "Owning");
    if (!this.collectionInfo.containsKey(collection)) {
      this.createCollection(_user, "Owning", "NFTs owned by this user", true);
    }

    this.addNFT(_ipfs, collection);

    this.nftInfo.put(_ipfs, nft);

    this.nftMapRequests.put(_ipfs, new ArrayList<>());

    if (!this.users.contains(_user)) {
      this.users.add(_user);
    }
  }

  @External
  public void addToCart(Address _user, String _nft) {
    String collection = this.generateCollectionID(_user, "Cart");
    if (!this.collectionInfo.containsKey(collection)) {
      this.createCollection(_user, "Cart", "Your Cart", true);
    }
    this.addNFT(_nft, collection);

    if (!this.users.contains(_user)) {
      this.users.add(_user);
    }
  }

  @External
  public void addNFT(String _nft, String _collection) {
    ArrayList<String> nfts = this.collectionMapNFTs.get(_collection);
    nfts.add(_nft);
    this.collectionMapNFTs.put(_collection, nfts);
  }

  @External
  public void removeNFT(String _nft, String _collection) {
    ArrayList<String> nfts = this.collectionMapNFTs.get(_collection);
    nfts.remove(_nft);
    this.collectionMapNFTs.put(_collection, nfts);
  }

  @External
  public void deleteNFT(Address _user, String _nft) {
    String collection = this.generateCollectionID(_user, "Owning");
    ArrayList<String> nfts = this.collectionMapNFTs.get(collection);
    nfts.remove(_nft);
    this.collectionMapNFTs.put(collection, nfts);
    this.nftInfo.remove(_nft);
  }

  @External
  public void editNFTInfo(
    String _nft,
    BigInteger _price,
    boolean _visibility,
    boolean _onSale
  ) {
    NFT nft = this.nftInfo.get(_nft);
    nft.price = _price;
    nft.visibility = _visibility;
    nft.onSale = _onSale;
    this.nftMapRequests.put(_nft, new ArrayList<>());
    this.nftInfo.put(_nft, nft);
  }

  @External
  public void sendRequest(Address _user, String _nft) {
    ArrayList<Address> requests = this.nftMapRequests.get(_nft);
    requests.add(_user);
    this.nftMapRequests.put(_nft, requests);
    if (requests.size() == 1) {
      Auction auction = new Auction(
        (int) Context.getBlockTimestamp(),
        BigInteger.ZERO,
        _user
      );
      this.auctionInfo.put(_nft, auction);
    }

    if (!this.users.contains(_user)) {
      this.users.add(_user);
    }
  }

  @External(readonly = true)
  public boolean duringAuction(String _nft, int _timestamp) {
    return (
      this.auctionInfo.get(_nft).timestamp + 86400 <= _timestamp &&
      _timestamp <=
      this.auctionInfo.get(_nft).timestamp +
      86400 +
      this.auctionInfo.get(_nft).duration
    );
  }

  @External(readonly = true)
  public Address getOwner(String _nft) {
    return this.nftInfo.get(_nft).owner;
  }

  @External
  @Payable
  public void bid(Address _user, String _nft, BigInteger _bid) {
    Auction auction = this.auctionInfo.get(_nft);
    auction.bid = _bid;
    auction.bidder = _user;
    this.auctionInfo.put(_nft, auction);

    NFT nft = this.nftInfo.get(_nft);
    nft.owner = _user;
    nft.price = nft.price.add(_bid);
    this.nftInfo.put(_nft, nft);
  }
}
