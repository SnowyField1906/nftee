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
import score.BranchDB;
import score.Context;
import score.annotation.EventLog;
import score.annotation.External;
import score.annotation.Payable;
import scorex.util.ArrayList;
import scorex.util.HashMap;

public class Gallery {
  // public HashMap<Address, Information> informations = HashMap<Address, Information>();
  private HashMap<Address, HashMap<BigInteger, Collection>> galleries = Context.newBranchDB(
    "galleries",
    Collection.class
  );

  public HashMap<Address, ArrayList<NFT>> requestingQueue = Context.newBranchDB(
    "requestingQueue",
    NFT.class
  );
  public HashMap<Address, ArrayList<NFT>> requestedQueue = Context.newBranchDB(
    "requestingQueue",
    NFT.class
  );

  private final HashMap<BigInteger, Collection> userGallery() {
    return this.galleries.get(Context.getCaller());
  }

  // private static final <Collection> userGallery().get(_timestamp) {
  //   return this.userGallery().get(_timestamp);
  // }

  //========/ CONTRACT'S GALLERY'S METHODS /========//

  private BigInteger getIdByName(String _name) {
    for (BigInteger i : this.userGallery().keySet()) {
      if (this.userGallery().get(i).name == _name) {
        return i;
      }
    }
    return null;
  }

  protected void newCollection(
    BigInteger _timestamp,
    String _name,
    String _description,
    boolean _visibility
  ) {
    // Check the collection's name
    Context.require(_name.length() > 0, "The collection's name is empty");
    Context.require(
      getIdByName(_name) != null,
      "The collection's name already exists"
    );

    // Create a new collection
    Collection collection = new Collection(_name, _description, _visibility);

    // Add the collection to the user's collections
    this.userGallery().put(_timestamp, collection);
  }

  @External
  public void toggleCollectionVisibility(BigInteger _timestamp) {
    Context.require(
      this.userGallery().containsKey(_timestamp),
      "The collection is not found"
    );
    Collection collection = this.userGallery().get(_timestamp);
    collection.visibility ^= true;
    this.userGallery().put(_timestamp, collection);
  }

  //========/ CONTRACT'S NFT's METHODS /========//

  private NFT getNFT(BigInteger _timestamp, String _ipfs) {
    Context.require(
      this.userGallery().containsKey(_timestamp),
      "The collection is not found"
    );
    ArrayList<NFT> nfts = this.userGallery().get(_timestamp).nftList;
    for (NFT nft : nfts) {
      if (nft.ipfs.equals(_ipfs)) {
        return nft;
      }
    }
    Context.revert("The NFT not found or deleted");
    return null;
  }

  private int nftIndex(BigInteger _timestamp, NFT _nft) {
    if (this.userGallery().get(_timestamp).nftList.indexOf(_nft) >= 0) {
      return this.userGallery().get(_timestamp).nftList.indexOf(_nft);
    }
    // Revert if the NFT is not found
    Context.revert(
      "The NFT is not in your " + this.userGallery().get(_timestamp).name
    );
    return -1;
  }

  @External
  public void addNFT(BigInteger _timestamp, NFT _nft) {
    this.userGallery().get(_timestamp).nftList.add(_nft);
  }

  @External
  public void removeNFT(BigInteger _timestamp, NFT _nft) {
    this.userGallery().get(_timestamp).nftList.remove(_nft);
  }

  @External
  public void toggleNFTVisibility(BigInteger _timestamp, String _ipfs) {
    // Revert if the caller is not the owner
    NFT nft = this.getNFT(_timestamp, _ipfs);
    Context.require(Context.getCaller().equals(nft.owner));

    if (this.userGallery().get(_timestamp).name.equals("Selling")) {
      nft.onSale ^= true;
      this.userGallery()
        .get(_timestamp)
        .nftList.set(nftIndex(_timestamp, nft), nft);
    } else {
      nft.visibility ^= true;
      this.userGallery()
        .get(_timestamp)
        .nftList.set(nftIndex(_timestamp, nft), nft);
    }
  }

  @External
  public void markAsOnSale(String _ipfs, BigInteger _price) {
    // Revert if the caller is not the owner
    NFT nft = this.getNFT(BigInteger.ONE, _ipfs);
    Context.require(Context.getCaller().equals(nft.owner));

    handleSelling(_ipfs, _price);
  }

  //========/ CONTRACT'S HANDLING METHODS /========//

  // Handle selling action
  @External
  public void handleSelling(String _ipfs, BigInteger _price) {
    if (userGallery().containsKey(BigInteger.ZERO)) {
      this.newCollection(BigInteger.ZERO, "Selling", "Selling list", true);
    }

    // Require the NFT's price to be positive
    Context.require(
      _price.compareTo(BigInteger.ZERO) > 0,
      "The price must be positive"
    );

    // Create the NFT and add into Selling gallery
    NFT nft = new NFT(Context.getCaller(), _ipfs, _price, true);
    this.addNFT(BigInteger.ONE, nft);

    // Emit selling event
    this.HandleSelling(Context.getCaller(), _ipfs, _price);
  }

  @External
  public void handleAdding(BigInteger _timestamp, String _ipfs) {
    if (!this.userGallery().containsKey(BigInteger.ONE)) {
      this.newCollection(BigInteger.ONE, "Owned", "Owned List", false);
    }
    if (!this.userGallery().containsKey(BigInteger.valueOf(2))) {
      this.newCollection(
          add(BigInteger.valueOf(2)),
          "Cart",
          "Cart List",
          false
        );
    }
    // Get the NFT from the given IPFS
    NFT nft = this.getNFT(_timestamp, _ipfs);

    // Revert if the NFT is already in the given gallery
    Context.require(
      !this.userGallery().get(_timestamp).nftList.contains(nft),
      "This NFT is already in your " + this.userGallery().get(_timestamp).name
    );

    // Add the NFT into the given gallery
    this.addNFT(_timestamp, nft);

    // Emit adding event
    this.HandleAdding(Context.getCaller(), nft.ipfs, nft.price);
  }

  // Handle removing action
  @External
  public void handleRemoving(BigInteger _timestamp, String _ipfs) {
    // Get the NFT from the given IPFS
    NFT nft = this.getNFT(_timestamp, _ipfs);

    // Revert if the NFT is not in the given gallery
    Context.require(
      this.userGallery().get(_timestamp).nftList.contains(nft),
      "This NFT is not in your " + this.userGallery().get(_timestamp).name
    );

    // Remove the NFT from the given gallery
    this.removeNFT(_timestamp, nft);

    // Emit removing event
    this.HandleRemoving(Context.getCaller(), _ipfs, nft.price);
  }

  //========/ REQUEST'S CONTRACTS /========//

  @External
  public void avaiableMoney() {
    // Get the caller's balance
    BigInteger balance = Context.getBalance(Context.getCaller());
  }

  //========/ EXPLORE'S CONTRACTS /========//

  @External(readonly = true)
  public ArrayList<NFT> marketplace() {
    ArrayList<NFT> nfts = new ArrayList<NFT>();
    for (Address users : galleries.keySet()) {
      for (NFT nft : galleries.get(users).get(getIdByName("Selling")).nftList) {
        nfts.add(nft);
      }
    }
    return nfts;
  }

  @External(readonly = true)
  public HashMap<BigInteger, Collection> publicCollections() {
    HashMap<BigInteger, Collection> collections = new HashMap<BigInteger, Collection>();
    for (Address users : galleries.keySet()) {
      for (BigInteger timestamp : galleries.get(users).keySet()) {
        if (collections.get(users).get(timestamp).visibility) {
          collections.put(timestamp, galleries.get(users).get(timestamp));
        }
      }
    }
    return collections;
  }

  @External(readonly = true)
  public ArrayList<NFT> publicNFTs() {
    ArrayList<NFT> nfts = new ArrayList<NFT>();
    for (Address users : galleries.keySet()) {
      for (BigInteger timestamp : galleries.get(users).keySet()) {
        if (galleries.get(users).get(timestamp).visibility) {
          for (NFT nft : galleries.get(users).get(timestamp).nftList) {
            if (nft.visibility) {
              nfts.add(nft);
            }
          }
        }
      }
    }
    return nfts;
  }

  //========/ CONTRACT'S EVENTS /========//

  @EventLog(indexed = 1)
  public void HandlePurchasing(Address caller, String ipfs, BigInteger price) {}

  // @EventLog(indexed = 1)
  // public void TokenOwnerRequired(Address address) {}

  @EventLog(indexed = 1)
  public void HandleSelling(Address caller, String ipfs, BigInteger price) {}

  @EventLog(indexed = 2)
  public void HandleAdding(Address caller, String ipfs, BigInteger price) {}

  @EventLog(indexed = 2)
  public void HandleRemoving(Address caller, String ipfs, BigInteger price) {}
}
