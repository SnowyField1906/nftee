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

import java.lang.reflect.Array;
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

  public HashMap<Address, ArrayList<String>> userMapCollections = new HashMap<>();
  public HashMap<String, ArrayList<String>> collectionMapNFTs = new HashMap<>();
  public HashMap<String, ArrayList<Address>> nftMapRequests = new HashMap<>();
  public HashMap<String, HashMap<Address, BigInteger>> nftMapOwners = new HashMap<>();
  public HashMap<String, ArrayList<String>> nftMapNotifications = new HashMap<>();

  public HashMap<String, Collection> collectionInfo = new HashMap<>();
  public HashMap<String, NFT> nftInfo = new HashMap<>();
  public HashMap<String, Notification> notificationInfo = new HashMap<>();

  //======================================//

  private String generateCollectionID(Address _user, String _name) {
    return String.valueOf(_user) + "/" + _name.replace(" ", "-");
  }

  private String generateNotificationID(String _nft, BigInteger _timestamp) {
    return String.valueOf(_timestamp) + _nft;
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

  @External(readonly = true)
  public ArrayList<String> getPublicNotifications(BigInteger _timestamp) {
    ArrayList<String> publicNotifications = new ArrayList<>();
    for (String nft : this.getPublicNFTs()) {
      for (String notification : this.getNFTNotifications(nft)) {
        if (
          (new BigInteger(notification.substring(0, 16))).compareTo(
              _timestamp
            ) <=
          0
        ) {
          publicNotifications.add(notification);
        }
      }
    }
    return publicNotifications;
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

  @External(readonly = true)
  public ArrayList<String> getUserAuctions(
    Address _user,
    BigInteger _timestamp
  ) {
    ArrayList<String> auctions = new ArrayList<>();
    for (String nft : this.getPublicNFTs()) {
      if (this.getNFTRequests(nft, _timestamp).contains(_user)) {
        auctions.add(nft);
      }
    }
    return auctions;
  }

  @External(readonly = true)
  public ArrayList<String> getUserNotifications(
    Address _user,
    BigInteger _timestamp
  ) {
    ArrayList<String> notifications = new ArrayList<>();
    for (String nft : this.getPublicNFTs()) {
      if (
        this.getNFTRequests(nft, _timestamp).contains(_user) ||
        this.getNFTCurrentOwner(nft, _timestamp).equals(_user)
      ) {
        for (String notification : this.getNFTNotifications(nft)) {
          if (
            (new BigInteger(notification.substring(0, 16))).compareTo(
                _timestamp
              ) <=
            0
          ) {
            notifications.add(notification);
          }
        }
      }
    }
    return notifications;
  }

  //==================//

  @External(readonly = true)
  public ArrayList<String> getCollectionNFTs(String _collection) {
    if (!this.collectionMapNFTs.containsKey(_collection)) {
      return new ArrayList<>();
    }
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
  public ArrayList<Address> getNFTRequests(String _nft, BigInteger _timestamp) {
    ArrayList<Address> requests = this.nftMapRequests.get(_nft);
    if (this.auctionStatus(_nft, _timestamp) == 4) {
      return new ArrayList<>();
    }
    return requests;
  }

  @External(readonly = true)
  public HashMap<Address, BigInteger> getNFTOwners(String _nft) {
    return this.nftMapOwners.get(_nft);
  }

  @External(readonly = true)
  public HashMap<ArrayList<Address>, ArrayList<BigInteger>> showNFTOwners(
    String _nft
  ) {
    ArrayList<Address> addresses = new ArrayList<>();
    ArrayList<BigInteger> timestamps = new ArrayList<>();
    for (Address user : this.users) {
      if (this.getNFTOwners(_nft).containsKey(user)) {
        addresses.add(user);
        timestamps.add(this.getNFTOwners(_nft).get(user));
      }
    }
    HashMap<ArrayList<Address>, ArrayList<BigInteger>> owners = new HashMap<>();
    owners.put(addresses, timestamps);
    return owners;
  }

  @External(readonly = true)
  public Address getNFTCurrentOwner(String _nft, BigInteger _timestamp) {
    int status = this.auctionStatus(_nft, _timestamp);
    if (status == 1 || status == 2) {
      return this.nftInfo.get(_nft).previousOwner;
    }
    return this.nftInfo.get(_nft).currentOwner;
  }

  @External(readonly = true)
  public int getNFTPurchaseTimes(String _nft, BigInteger _timestamp) {
    int status = this.auctionStatus(_nft, _timestamp);
    if (status == 1 || status == 2) {
      return this.nftMapOwners.get(_nft).size() - 2;
    }
    return this.nftMapOwners.get(_nft).size() - 1;
  }

  @External(readonly = true)
  public BigInteger getFirstRequest(String _nft) {
    return this.getNFTOwners(_nft).get(this.nftInfo.get(_nft).currentOwner);
  }

  @External(readonly = true)
  public ArrayList<String> getNFTNotifications(String _nft) {
    ArrayList<String> notifications = this.nftMapNotifications.get(_nft);
    if (notifications == null) {
      return new ArrayList<>();
    }
    return notifications;
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
  public boolean onSale(String _nft, BigInteger _timestamp) {
    int status = this.auctionStatus(_nft, _timestamp);
    if (status == 3 || status == 4) {
      return false;
    }
    return this.nftInfo.get(_nft).onSale;
  }

  @External(readonly = true)
  public ArrayList<String> getNFTInfo(String _nft, BigInteger _timestamp) {
    NFT nft = this.nftInfo.get(_nft);
    return new ArrayList<>(
      List.of(
        String.valueOf(this.getNFTCurrentOwner(_nft, _timestamp)), // [0] current owner on display
        String.valueOf(nft.price), // [1] price
        String.valueOf(nft.description), // [2] description
        String.valueOf(nft.visibility), // [3] visibility
        String.valueOf(this.onSale(_nft, _timestamp)), // [4] on sale
        String.valueOf(this.getNFTPurchaseTimes(_nft, _timestamp)), // [5] purchase times on display
        String.valueOf(this.getNFTOwners(_nft).get(nft.firstOwner)), // [6] date cerated
        String.valueOf(nft.startTime), // [7] auction's start time
        String.valueOf(nft.endTime), // [8] auction's end time
        String.valueOf(nft.step), // [9] auction's step
        String.valueOf(nft.currentOwner), // [10] real current owner
        String.valueOf(this.getFirstRequest(_nft)) // [11] first request's timestamp
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
    boolean _visibility
  ) {
    Collection newCollection = new Collection(
      _name,
      _description,
      _visibility,
      BigInteger.valueOf(Context.getTransactionTimestamp())
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
    boolean _onSale
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
          true
        );
    }
    this.addNFT(_ipfs, collection);

    this.nftInfo.put(_ipfs, nft);

    this.nftMapRequests.put(_ipfs, new ArrayList<>());

    HashMap<Address, BigInteger> owners = new HashMap<>();
    owners.put(_user, BigInteger.valueOf(Context.getTransactionTimestamp()));
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
          true
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

    ArrayList<String> nfts = this.getCollectionNFTs(_collection);
    nfts.add(_nft);
    this.collectionMapNFTs.put(_collection, nfts);
    // Notification notification = new Notification(
    //   "Collection",
    //   "NFT " + _nft + " has been added to collection " + _collection
    // );
  }

  @External
  public void removeNFT(String _nft, String _collection) {
    ArrayList<String> nfts = this.getCollectionNFTs(_collection);
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
    String _description,
    boolean _visibility,
    boolean _onSale
  ) {
    int status =
      this.auctionStatus(
          _nft,
          BigInteger.valueOf(Context.getTransactionTimestamp())
        );
    Context.require(
      status == 0 || status == 4,
      "This NFT is not allowed to be edited now."
    );
    NFT nft = this.nftInfo.get(_nft);
    if (
      !nft.startTime.equals(BigInteger.ZERO) ||
      !nft.endTime.equals(BigInteger.ZERO) ||
      this.nftMapRequests.get(_nft).size() > 0
    ) {
      this.nftMapRequests.put(_nft, new ArrayList<>());
      nft.startTime = BigInteger.ZERO;
      nft.endTime = BigInteger.ZERO;
    }

    nft.description = _description;
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

  @External(readonly = true)
  public int auctionStatus(String _nft, BigInteger _timestamp) {
    NFT nft = this.nftInfo.get(_nft);
    int request = 0;
    if (this.nftMapRequests.containsKey(_nft)) {
      request = this.nftMapRequests.get(_nft).size();
    }
    if (request == 1) {
      if (
        this.getFirstRequest(_nft)
          .add(BigInteger.valueOf(120000000L))
          .compareTo(_timestamp) >
        0
      ) {
        return 1; // pending auction
      } else {
        return 4; // after auction
      }
    }
    if (request > 1) {
      if (nft.startTime.compareTo(_timestamp) > 0) {
        return 2; // before auction
      }
      if (
        nft.startTime.compareTo(_timestamp) <= 0 &&
        nft.endTime.compareTo(_timestamp) > 0
      ) {
        return 3; // during auction
      }
      if (nft.endTime.compareTo(_timestamp) <= 0) {
        return 4; // after auction
      }
    }
    return 0; // no auction
  }

  //======================================//

  @External
  @Payable
  public void sendRequest(Address _user, String _nft) {
    BigInteger timestamp = BigInteger.valueOf(
      Context.getTransactionTimestamp()
    );
    Context.require(this.nftInfo.containsKey(_nft), "NFT does not exist");
    Context.require(this.onSale(_nft, timestamp), "NFT is not on sale");
    Context.require(
      this.balance(_user).compareTo(this.nftInfo.get(_nft).price) >= 0,
      "Insufficient funds"
    );

    ArrayList<String> notifications = this.getNFTNotifications(_nft);
    Notification request = new Notification(
      "Request",
      String.valueOf(_user) + " sent a purchase request."
    );

    String requestID = this.generateNotificationID(_nft, timestamp);
    notifications.add(requestID);
    this.notificationInfo.put(requestID, request);

    ArrayList<Address> requests = this.getNFTRequests(_nft, timestamp);

    if (requests.size() == 1) {
      NFT nft = this.nftInfo.get(_nft);
      nft.startTime =
        this.getFirstRequest(_nft).add(BigInteger.valueOf(120000000L));
      nft.endTime = nft.startTime.add(BigInteger.valueOf(120000000L));
      this.nftInfo.put(_nft, nft);

      Notification start = new Notification(
        "Auction",
        "Auction has started automatically."
      );
      Notification end = new Notification(
        "Auction",
        "Time out. Auction has ended."
      );

      String startID =
        this.generateNotificationID(_nft, this.nftInfo.get(_nft).startTime);
      String endID =
        this.generateNotificationID(_nft, this.nftInfo.get(_nft).endTime);

      notifications.add(startID);
      notifications.add(endID);
      this.notificationInfo.put(startID, start);
      this.notificationInfo.put(endID, end);

      String pendingID =
        this.generateNotificationID(
            _nft,
            this.getFirstRequest(_nft).add(BigInteger.valueOf(120000000L))
          );
      notifications.remove(pendingID);
    }
    if (requests.size() == 0) {
      Notification pending = new Notification(
        "Request",
        "No second request, the owner now has changed."
      );

      String pendingID =
        this.generateNotificationID(
            _nft,
            timestamp.add(BigInteger.valueOf(120000000L))
          );

      notifications.add(pendingID);
      this.notificationInfo.put(pendingID, pending);

      this.sendBid(_user, _nft, this.nftInfo.get(_nft).price);
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
    BigInteger _duration,
    BigInteger _step
  ) {
    BigInteger timestamp = BigInteger.valueOf(
      Context.getTransactionTimestamp()
    );
    Context.require(
      this.getNFTRequests(_nft, timestamp).size() >= 2,
      "Not enough requests"
    );
    Context.require(
      _duration.compareTo(BigInteger.valueOf(259200000000L)) <= 0,
      "Duration must be less than 3 days"
    );
    Context.require(
      this.nftInfo.get(_nft).previousOwner.equals(_user),
      "You don't have permission"
    );

    Context.require(
      this.auctionStatus(_nft, timestamp) == 2,
      "You can't start now."
    );

    NFT nft = this.nftInfo.get(_nft);
    ArrayList<String> notifications = this.getNFTNotifications(_nft);

    String oldStartID = this.generateNotificationID(_nft, nft.startTime);
    String oldEndID = this.generateNotificationID(_nft, nft.endTime);
    notifications.remove(oldStartID);
    notifications.remove(oldEndID);
    this.notificationInfo.remove(oldStartID);
    this.notificationInfo.remove(oldEndID);

    nft.startTime = timestamp;
    nft.endTime = nft.startTime.add(_duration);
    nft.step = _step;
    this.nftInfo.put(_nft, nft);

    Notification start = new Notification(
      "Auction",
      _user + " started the auction"
    );
    Notification end = new Notification("Auction", "Auction has ended.");

    String startID = this.generateNotificationID(_nft, nft.startTime);
    String endID = this.generateNotificationID(_nft, nft.endTime);
    notifications.add(startID);
    notifications.add(endID);
    this.notificationInfo.put(startID, start);
    this.notificationInfo.put(endID, end);

    this.nftMapNotifications.put(_nft, notifications);
  }

  @External
  @Payable
  public void sendBid(Address _user, String _nft, BigInteger _bid) {
    BigInteger timestamp = BigInteger.valueOf(
      Context.getTransactionTimestamp()
    );

    int status = this.auctionStatus(_nft, timestamp);
    Context.require(status == 0 || status == 3, "It's not auction time.");
    Context.require(
      this.balance(_user).compareTo(_bid) >= 0,
      "Insufficient funds"
    );
    Context.require(
      status == 3 || this.onSale(_nft, timestamp),
      "This NFT is not on sale"
    );

    HashMap<Address, BigInteger> owners = this.getNFTOwners(_nft);
    NFT nft = this.nftInfo.get(_nft);

    if (status == 3) {
      Context.require(
        this.nftMapRequests.get(_nft).contains(_user),
        "User is not allowed"
      );
      if (!nft.step.equals(BigInteger.ZERO)) {
        Context.require(
          _bid.subtract(nft.price).add(BigInteger.ONE).compareTo(nft.step) >= 0,
          "Bid must be valid."
        );
      } else {
        Context.require(
          _bid
            .subtract(nft.price)
            .add(BigInteger.ONE)
            .compareTo(nft.price.divide(BigInteger.valueOf(10))) >=
          0,
          "Bid must be valid."
        );
      }
      Context.transfer(nft.previousOwner, _bid.subtract(nft.price));
    }

    Context.transfer(this.getNFTCurrentOwner(_nft, timestamp), nft.price);

    String oldOwner = this.generateCollectionID(nft.previousOwner, "Owning");
    if (status == 3) {
      oldOwner = this.generateCollectionID(nft.currentOwner, "Owning");
      owners.remove(nft.currentOwner);
    }

    owners.put(_user, timestamp);
    nft.price = _bid;
    nft.currentOwner = _user;
    this.nftInfo.put(_nft, nft);

    String newOwner = this.generateCollectionID(_user, "Owning");
    if (!this.collectionInfo.containsKey(newOwner)) {
      this.createCollection(
          _user,
          "Owning",
          "NFTs owned by " + String.valueOf(_user),
          true
        );
    }
    this.removeNFT(_nft, oldOwner);
    this.addNFT(_nft, newOwner);

    ArrayList<String> notifications = this.getNFTNotifications(_nft);

    Notification bid;
    if (status == 3) {
      bid =
        new Notification(
          "Auction",
          String.valueOf(_user) +
          " bidded. NFT's owner & price now have changed and previous bidder has been refunded."
        );
    } else {
      bid =
        new Notification(
          "Request",
          String.valueOf(_user) + " sent first request."
        );
    }

    String bidID = this.generateNotificationID(_nft, timestamp);
    this.notificationInfo.put(bidID, bid);

    notifications.add(bidID);
    this.nftMapNotifications.put(_nft, notifications);
  }

  // @External
  // public void Approve(Address _user, String _nft) {
  //   BigInteger timestamp = BigInteger.valueOf(
  //     Context.getTransactionTimestamp()
  //   );
  //   Context.require(
  //     this.nftInfo.get(_nft).previousOwner.equals(_user),
  //     "You don't have permission"
  //   );
  //   Context.require(
  //     this.auctionStatus(_nft, timestamp) == 2,
  //     "You can't approve now."
  //   );

  //   NFT nft = this.nftInfo.get(_nft);
  //   ArrayList<String> notifications = this.getNFTNotifications(_nft);

  //   String oldStartID = this.generateNotificationID(_nft, nft.startTime);
  //   String oldEndID = this.generateNotificationID(_nft, nft.endTime);
  //   notifications.remove(oldStartID);
  //   notifications.remove(oldEndID);
  //   this.notificationInfo.remove(oldStartID);
  //   this.notificationInfo.remove(oldEndID);

  //   nft.startTime = BigInteger.valueOf(0);
  //   nft.endTime = BigInteger.valueOf(0);
  //   this.nftInfo.put(_nft, nft);

  //   Notification start = new Notification(
  //     "Auction",
  //     _user + " approved the auction"
  //   );
  //   Notification end = new Notification("Auction", "Auction has ended.");

  //   String startID = this.generateNotificationID(_nft, nft.startTime);
  //   String endID = this.generateNotificationID(_nft, nft.endTime);
  //   notifications.add(startID);
  //   notifications.add(endID);
  //   this.notificationInfo.put(startID, start);
  //   this.notificationInfo.put(endID, end);

  //   this.nftMapNotifications.put(_nft, notifications);
  // }

  //======================================//

  @External(readonly = true)
  public HashMap<String, ArrayList<BigInteger>> sortedNFTs(
    BigInteger _timestamp
  ) {
    ArrayList<String> nfts = this.getPublicNFTs();
    HashMap<String, ArrayList<BigInteger>> sortedNFTs = new HashMap<>();

    for (String nft : nfts) {
      ArrayList<BigInteger> keys = new ArrayList<>();

      keys.add(this.getNFTOwners(nft).get(this.nftInfo.get(nft).firstOwner));
      keys.add(this.nftInfo.get(nft).price);
      keys.add(BigInteger.valueOf(this.getNFTRequests(nft, _timestamp).size()));
      keys.add(BigInteger.valueOf(this.getNFTPurchaseTimes(nft, _timestamp)));
      keys.add(this.getNFTOwners(nft).get(this.nftInfo.get(nft).currentOwner));

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
