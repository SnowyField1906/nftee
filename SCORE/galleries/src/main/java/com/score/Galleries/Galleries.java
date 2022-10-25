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

  public HashMap<Address, ArrayList<String>> userMapAuctions = new HashMap<>();
  public HashMap<Address, ArrayList<BigInteger>> userMapNotifications = new HashMap<>();

  public HashMap<Address, ArrayList<String>> userMapCollections = new HashMap<>();
  public HashMap<String, ArrayList<String>> collectionMapNFTs = new HashMap<>();
  public HashMap<String, ArrayList<Address>> nftMapRequests = new HashMap<>();

  public HashMap<String, Collection> collectionInfo = new HashMap<>();
  public HashMap<String, NFT> nftInfo = new HashMap<>();
  public HashMap<String, Auction> auctionInfo = new HashMap<>();
  public HashMap<BigInteger, Notification> notificationInfo = new HashMap<>();

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
    ArrayList<String> userAuctions = this.userMapAuctions.get(_user);
    if (userAuctions == null) {
      userAuctions = new ArrayList<>();
    }
    for (String auction : userAuctions) {
      if (!this.auctionInfo.containsKey(auction)) {
        userAuctions.remove(auction);
      }
    }
    return userAuctions;
  }

  @External(readonly = true)
  public ArrayList<String> getUserCollections(Address _user) {
    return this.userMapCollections.get(_user);
  }

  @External(readonly = true)
  public ArrayList<String> getUserCustomCollections(Address _user) {
    ArrayList<String> collections = this.userMapCollections.get(_user);
    if (collections == null) {
      return new ArrayList<>();
    }
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
        String.valueOf(collection.visibility),
        String.valueOf(collection.dateCreated)
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
        String.valueOf(nft.description),
        String.valueOf(nft.visibility),
        String.valueOf(nft.onSale),
        String.valueOf(nft.purchaseTimes),
        String.valueOf(nft.dateCreated)
      )
    );
  }

  @External(readonly = true)
  public ArrayList<String> getAuctionInfo(String _auction) {
    Auction auction = this.auctionInfo.get(_auction);
    return new ArrayList<>(
      List.of(
        String.valueOf(auction.timestamp),
        String.valueOf(auction.startTime),
        String.valueOf(auction.duration),
        String.valueOf(auction.bid),
        String.valueOf(auction.bidder)
      )
    );
  }

  @External(readonly = true)
  public ArrayList<String> getNotificationInfo(BigInteger _notification) {
    Notification notification = this.notificationInfo.get(_notification);
    return new ArrayList<>(
      List.of(
        String.valueOf(notification.title),
        String.valueOf(notification.message),
        String.valueOf(notification.read)
      )
    );
  }

  @External
  public void createCollection(
    Address _user,
    String _name,
    String _description,
    boolean _visibility,
    BigInteger _dateCreated
  ) {
    Collection newCollection = new Collection(
      _name,
      _description,
      _visibility,
      _dateCreated
    );
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
      this.userMapAuctions.put(_user, new ArrayList<String>());
    }
  }

  @External
  public void deleteCollection(Address _user, String _collection) {
    ArrayList<String> collections = this.getUserCollections(_user);

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
    String _description,
    boolean _visibility,
    boolean _onSale,
    BigInteger _dateCreated
  ) {
    Context.require(
      _price.compareTo(BigInteger.ZERO) > 0,
      "Price must be positive"
    );
    Context.require(
      !this.nftInfo.containsKey(_ipfs),
      "NFT already exists on the chain"
    );

    NFT nft = new NFT(
      _user,
      _price,
      _description,
      _visibility,
      _onSale,
      _dateCreated
    );
    String collection = this.generateCollectionID(_user, "Owning");
    if (!this.collectionInfo.containsKey(collection)) {
      this.createCollection(
          _user,
          "Owning",
          "NFTs owned by " + String.valueOf(_user),
          true,
          BigInteger.ZERO
        );
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
      this.createCollection(
          _user,
          "Cart",
          String.valueOf(_user) + "'s Cart",
          true,
          BigInteger.ZERO
        );
    }
    this.addNFT(_nft, collection);

    if (!this.users.contains(_user)) {
      this.users.add(_user);
    }
  }

  @External
  public void addNFT(String _nft, String _collection) {
    Context.require(
      !this.collectionMapNFTs.containsValue(_nft),
      "NFT already exists in collection"
    );

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
    String _description,
    boolean _visibility,
    boolean _onSale
  ) {
    NFT nft = this.nftInfo.get(_nft);
    nft.description = _description;
    nft.price = _price;
    nft.visibility = _visibility;
    nft.onSale = _onSale;
    this.nftInfo.put(_nft, nft);
  }

  /////

  @External(readonly = true)
  public BigInteger payableBalance(Address _user) {
    BigInteger payable = Context.getBalance(_user);
    if (!this.userMapAuctions.containsKey(_user)) {
      return payable;
    }
    ArrayList<String> userAuctions = this.userMapAuctions.get(_user);
    for (String auction : userAuctions) {
      if (this.auctionInfo.containsKey(auction)) {
        if (this.auctionInfo.get(auction).bidder == _user) {
          payable = payable.subtract(this.auctionInfo.get(auction).bid);
        } else {
          continue;
        }
      }
      payable = payable.subtract(this.nftInfo.get(auction).price);
    }
    return payable;
  }

  @External(readonly = true)
  public BigInteger balance(Address _user) {
    return Context.getBalance(_user);
  }

  @External
  public void sendRequest(Address _user, BigInteger _timestamp, String _nft) {
    Context.require(this.nftInfo.containsKey(_nft), "NFT does not exist");
    Context.require(this.nftInfo.get(_nft).onSale, "NFT is not on sale");
    Context.require(
      this.payableBalance(_user).compareTo(this.nftInfo.get(_nft).price) >= 0,
      "Insufficient funds"
    );
    if (this.auctionInfo.containsKey(_nft)) {
      Context.require(
        _timestamp.compareTo(this.auctionInfo.get(_nft).startTime) < 0,
        "Can't send request during auction"
      );
    }

    ArrayList<Address> requests = this.nftMapRequests.get(_nft);
    if (requests == null || requests.size() == 0) {
      Auction auction = new Auction(
        _timestamp,
        this.nftInfo.get(_nft).price,
        _user
      );
      this.auctionInfo.put(_nft, auction);
    }

    requests.add(_user);
    this.nftMapRequests.put(_nft, requests);

    ArrayList<String> userAuctions = this.getUserAuctions(_user);

    userAuctions.add(_nft);
    this.userMapAuctions.put(_user, userAuctions);

    if (!this.users.contains(_user)) {
      this.users.add(_user);
    }
  }

  @External
  public void startAuction(
    String _nft,
    BigInteger _timestamp,
    BigInteger _duration
  ) {
    Context.require(
      this.nftMapRequests.get(_nft).size() >= 2,
      "Not enough requests"
    );

    Auction auction = this.auctionInfo.get(_nft);
    auction.startTime = _timestamp;
    auction.duration = _duration;
    this.auctionInfo.put(_nft, auction);

    NFT nft = this.nftInfo.get(_nft);
    nft.onSale = false;
    this.nftInfo.put(_nft, nft);
  }

  private BigInteger startTime(String _nft) {
    if (this.nftMapRequests.get(_nft).size() < 2) {
      return BigInteger.ZERO;
    }
    return this.auctionInfo.get(_nft).startTime;
  }

  private BigInteger endTime(String _nft) {
    if (this.nftMapRequests.get(_nft).size() < 2) {
      return BigInteger.ZERO;
    }
    return this.startTime(_nft).add(this.auctionInfo.get(_nft).duration);
  }

  @External(readonly = true)
  public Address temporaryOwner(String _nft) {
    Context.require(
      this.auctionInfo.containsKey(_nft),
      "Auction does not exist"
    );

    return this.auctionInfo.get(_nft).bidder;
  }

  @External
  @Payable
  public void bid(
    Address _user,
    String _nft,
    BigInteger _bid,
    BigInteger _timestamp
  ) {
    Context.require(
      this.nftMapRequests.get(_nft).size() >= 2,
      "Not enough requests"
    );
    Context.require(
      this.nftMapRequests.get(_nft).contains(_user),
      "User is not allowed"
    );
    Context.require(
      this.startTime(_nft).compareTo(BigInteger.ZERO) != 0 &&
      this.endTime(_nft).compareTo(BigInteger.ZERO) != 0,
      "Auction does not exists"
    );
    Context.require(
      _timestamp.compareTo(this.startTime(_nft)) >= 0 &&
      _timestamp.compareTo(this.endTime(_nft)) <= 0,
      "Auction does not exists"
    );

    Context.require(
      this.payableBalance(_user).compareTo(_bid) >= 0,
      "Insufficient funds"
    );

    Auction auction = this.auctionInfo.get(_nft);

    Context.require(
      _bid.compareTo(auction.bid) > 0,
      "Bid can't be lower than current bid"
    );

    auction.bid = _bid;
    auction.bidder = _user;
    this.auctionInfo.put(_nft, auction);
  }

  @Payable
  @External
  public void endAuction(String _nft, BigInteger _timestamp) {
    Context.require(
      this.nftMapRequests.get(_nft).size() >= 2,
      "Not enough requests"
    );
    Context.require(
      _timestamp.compareTo(this.endTime(_nft)) >= 0,
      "Auction has not ended yet"
    );

    NFT nft = this.nftInfo.get(_nft);

    Context.transfer(nft.owner, this.auctionInfo.get(_nft).bid);

    nft.owner = this.temporaryOwner(_nft);
    nft.onSale = false;
    nft.price = this.auctionInfo.get(_nft).bid;
    nft.purchaseTimes += 1;
    this.auctionInfo.remove(_nft);

    ArrayList<Address> requests = this.nftMapRequests.get(_nft);
    for (Address user : requests) {
      ArrayList<String> userAuctions = this.getUserAuctions(user);
      userAuctions.remove(_nft);
      this.userMapAuctions.put(user, userAuctions);
    }
    this.nftMapRequests.put(_nft, new ArrayList<>());
  }

  @External(readonly = true)
  public HashMap<String, ArrayList<BigInteger>> sortedNFTs() {
    ArrayList<String> nfts = this.getPublicNFTs();
    HashMap<String, ArrayList<BigInteger>> sortedNFTs = new HashMap<>();

    for (String nft : nfts) {
      ArrayList<BigInteger> keys = new ArrayList<>();
      NFT nftInfo = this.nftInfo.get(nft);

      keys.add(nftInfo.dateCreated);
      keys.add(nftInfo.price);
      keys.add(BigInteger.valueOf(this.nftMapRequests.get(nft).size()));
      keys.add(BigInteger.valueOf(nftInfo.purchaseTimes));

      sortedNFTs.put(nft, keys);
    }
    return sortedNFTs;
  }

  @External(readonly = true)
  public HashMap<String, ArrayList<BigInteger>> sortedCollections() {
    ArrayList<String> collections = this.getPublicCollections();
    HashMap<String, ArrayList<BigInteger>> sortedCollections = new HashMap<>();

    for (String collection : collections) {
      ArrayList<BigInteger> keys = new ArrayList<>();

      keys.add(this.collectionInfo.get(collection).dateCreated);
      keys.add(
        BigInteger.valueOf(this.collectionMapNFTs.get(collection).size())
      );

      sortedCollections.put(collection, keys);
    }
    return sortedCollections;
  }
}
