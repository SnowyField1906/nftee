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

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
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

  public HashMap<Address, String> userMapAuction = new HashMap<>();
  public HashMap<Address, ArrayList<String>> userMapCollections = new HashMap<>();
  public HashMap<String, ArrayList<String>> collectionMapNFTs = new HashMap<>();
  public HashMap<String, ArrayList<Address>> nftMapRequests = new HashMap<>();
  public HashMap<String, HashMap<Address, BigInteger>> nftMapOwners = new HashMap<>();
  public HashMap<String, ArrayList<String>> nftMapNotifications = new HashMap<>();

  public HashMap<String, Collection> collectionInfo = new HashMap<>();
  public HashMap<String, NFT> nftInfo = new HashMap<>();
  public HashMap<String, Auction> auctionInfo = new HashMap<>();
  public HashMap<String, Notification> notificationInfo = new HashMap<>();

  //======================================//

  private String decodeTransactionHash(String _hash) {
    byte[] decode = Base64.getDecoder().decode(Context.getTransactionHash());
    return new String(decode, StandardCharsets.UTF_8);
  }

  private String generateCollectionID(Address _user, String _name) {
    return String.valueOf(_user) + "/" + _name.replace(" ", "-");
  }

  private String generateNotificationID(String _nft, BigInteger _timestamp) {
    return _nft + String.valueOf(_timestamp);
  }

  //======================================//

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

  //==================//

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

  //==================//

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

  //==================//

  @External(readonly = true)
  public ArrayList<Address> getNFTRequests(String _nft) {
    ArrayList<Address> requests = this.nftMapRequests.get(_nft);
    if (requests == null) {
      return new ArrayList<>();
    }
    return requests;
  }

  @External(readonly = true)
  public HashMap<Address, BigInteger> getNFTOwners(String _nft) {
    return this.nftMapOwners.get(_nft);
  }

  //==================//

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
        String.valueOf(nft.currentOwner),
        String.valueOf(nft.price),
        String.valueOf(nft.description),
        String.valueOf(nft.visibility),
        String.valueOf(nft.onSale),
        String.valueOf(this.nftMapOwners.get(_nft).get(nft.currentOwner)),
        String.valueOf(this.nftMapOwners.get(_nft).size())
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
        String.valueOf(auction.duration)
      )
    );
  }

  @External(readonly = true)
  public ArrayList<String> getNotificationInfo(String _notification) {
    Notification notification = this.notificationInfo.get(_notification);
    return new ArrayList<>(List.of(notification.title, notification.message));
  }

  //======================================//

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
  public void editCollection(
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

  //==================//

  @External
  public void createNFT(
    Address _user,
    String _ipfs,
    BigInteger _price,
    String _description,
    boolean _visibility,
    boolean _onSale,
    BigInteger _timestamp
  ) {
    Context.require(
      _price.compareTo(BigInteger.ZERO) > 0,
      "Price must be positive"
    );
    Context.require(
      !this.nftInfo.containsKey(_ipfs),
      "NFT already exists on the chain"
    );

    NFT nft = new NFT(_user, _price, _description, _visibility, _onSale);

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

    HashMap<Address, BigInteger> owners = new HashMap<>();
    owners.put(_user, _timestamp);
    this.nftMapOwners.put(_ipfs, owners);

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
  public void editNFT(
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

  //======================================//

  @External(readonly = true)
  public BigInteger balance(Address _user) {
    return Context.getBalance(_user);
  }

  @External(readonly = true)
  public BigInteger value() {
    return Context.getValue();
  }

  //==================//

  @External
  @Payable
  public void sendRequest(Address _user, BigInteger _timestamp, String _nft) {
    Context.require(this.nftInfo.containsKey(_nft), "NFT does not exist");
    Context.require(this.nftInfo.get(_nft).onSale, "NFT is not on sale");
    Context.require(
      this.balance(_user).compareTo(this.nftInfo.get(_nft).price) >= 0,
      "Insufficient funds"
    );
    if (this.auctionInfo.containsKey(_nft)) {
      Context.require(
        _timestamp.compareTo(this.auctionInfo.get(_nft).startTime) < 0,
        "Can't send request during auction"
      );
    }

    ArrayList<String> notifications = this.nftMapNotifications.get(_nft);
    Notification request = new Notification(
      "Request",
      String.valueOf(_user) + " sent a purchase request."
    );

    String requestID = this.generateNotificationID(_nft, _timestamp);
    notifications.add(requestID);
    this.notificationInfo.put(requestID, request);

    ArrayList<Address> requests = this.getNFTRequests(_nft);

    if (requests.size() == 1) {
      Notification start = new Notification("Auction", "Auction has started.");
      Notification end = new Notification("Auction", "Auction has ended.");

      String startID = this.generateNotificationID(_nft, this.startTime(_nft));
      String endID = this.generateNotificationID(_nft, this.endTime(_nft));
      notifications.add(startID);
      notifications.add(endID);
      this.notificationInfo.put(startID, start);
      this.notificationInfo.put(endID, end);
    }
    if (requests.size() == 0) {
      Auction auction = new Auction(_timestamp);
      this.auctionInfo.put(_nft, auction);

      NFT nft = this.nftInfo.get(_nft);
      nft.previousOwner = nft.currentOwner;
      nft.currentOwner = _user;

      HashMap<Address, BigInteger> owners = this.nftMapOwners.get(_nft);
      owners.put(_user, _timestamp);
      this.nftMapOwners.put(_nft, owners);
    }

    this.nftMapNotifications.put(_nft, notifications);

    requests.add(_user);
    this.nftMapRequests.put(_nft, requests);

    if (!this.users.contains(_user)) {
      this.users.add(_user);
    }
  }

  @External
  public void startAuction(
    Address _user,
    String _nft,
    BigInteger _timestamp,
    BigInteger _duration
  ) {
    Context.require(
      this.nftMapRequests.get(_nft).size() >= 2,
      "Not enough requests"
    );
    Context.require(
      _duration.compareTo(BigInteger.valueOf(259200)) <= 0,
      "Duration must be less than 3 days"
    );
    Context.require(
      _user == this.nftInfo.get(_nft).previousOwner,
      "You don't have permission"
    );

    ArrayList<String> notifications = this.nftMapNotifications.get(_nft);

    String oldStartID = this.generateNotificationID(_nft, this.startTime(_nft));
    String oldEndID = this.generateNotificationID(_nft, this.endTime(_nft));
    notifications.remove(oldStartID);
    notifications.remove(oldEndID);
    this.notificationInfo.remove(oldStartID);
    this.notificationInfo.remove(oldEndID);

    Auction auction = this.auctionInfo.get(_nft);
    auction.startTime = _timestamp;
    auction.duration = _duration;
    this.auctionInfo.put(_nft, auction);

    Notification start = new Notification("Auction", "Auction has started.");
    Notification end = new Notification("Auction", "Auction has ended.");

    String startID = this.generateNotificationID(_nft, this.startTime(_nft));
    String endID = this.generateNotificationID(_nft, this.endTime(_nft));
    notifications.add(startID);
    notifications.add(endID);
    this.notificationInfo.put(startID, start);
    this.notificationInfo.put(endID, end);

    this.nftMapNotifications.put(_nft, notifications);
  }

  @External(readonly = true)
  public BigInteger startTime(String _nft) {
    if (this.nftMapRequests.get(_nft).size() < 2) {
      return BigInteger.ZERO;
    }
    return this.auctionInfo.get(_nft).startTime;
  }

  @External(readonly = true)
  public BigInteger endTime(String _nft) {
    if (this.nftMapRequests.get(_nft).size() < 2) {
      return BigInteger.ZERO;
    }
    return this.startTime(_nft).add(this.auctionInfo.get(_nft).duration);
  }

  @External
  @Payable
  public void sendBid(
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
      this.balance(_user).compareTo(_bid) >= 0,
      "Insufficient funds"
    );

    Context.require(
      _bid.compareTo(this.nftInfo.get(_nft).price) > 0,
      "Bid can't be lower than current price"
    );

    Context.transfer(
      this.nftInfo.get(_nft).currentOwner,
      this.nftInfo.get(_nft).price
    );

    HashMap<Address, BigInteger> owners = this.getNFTOwners(_nft);
    NFT nft = this.nftInfo.get(_nft);

    owners.remove(this.nftInfo.get(_nft).currentOwner);
    owners.put(_user, _timestamp);
    nft.price = _bid;
    nft.previousOwner = nft.currentOwner;
    nft.currentOwner = _user;
    this.nftInfo.put(_nft, nft);

    Notification notification = new Notification(
      "Auction",
      String.valueOf(_user) +
      " bidded. NFT's owner & price now have changed and previous bidder has been refunded."
    );

    String bidID = this.generateNotificationID(_nft, _timestamp);
    this.notificationInfo.put(bidID, notification);

    ArrayList<String> notifications = this.nftMapNotifications.get(_nft);
    notifications.add(bidID);
    this.nftMapNotifications.put(_nft, notifications);
  }

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

    String pre =
      this.generateCollectionID(this.nftInfo.get(_nft).previousOwner, "Owning");
    String cur =
      this.generateCollectionID(this.nftInfo.get(_nft).currentOwner, "Owning");

    this.removeNFT(_nft, pre);
    this.addNFT(_nft, cur);

    this.nftMapRequests.put(_nft, new ArrayList<>());

    this.auctionInfo.remove(_nft);
  }

  //======================================//

  @External(readonly = true)
  public HashMap<String, ArrayList<BigInteger>> sortedNFTs() {
    ArrayList<String> nfts = this.getPublicNFTs();
    HashMap<String, ArrayList<BigInteger>> sortedNFTs = new HashMap<>();

    for (String nft : nfts) {
      ArrayList<BigInteger> keys = new ArrayList<>();
      NFT nftInfo = this.nftInfo.get(nft);
      HashMap<Address, BigInteger> owners = this.getNFTOwners(nft);

      keys.add(owners.get(nftInfo.firstOwner));
      keys.add(nftInfo.price);
      keys.add(BigInteger.valueOf(this.nftMapRequests.get(nft).size()));
      keys.add(BigInteger.valueOf(owners.size()));
      keys.add(owners.get(nftInfo.currentOwner));

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
