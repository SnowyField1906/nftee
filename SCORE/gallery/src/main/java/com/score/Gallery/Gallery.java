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
  public HashMap<Address, HashMap<BigInteger, Collection>> galleries = new HashMap<Address, HashMap<BigInteger, Collection>>();

  @External(readonly = true)
  public HashMap<BigInteger, Collection> userGallery() {
    return this.galleries.get(Context.getCaller());
  }

  @External(readonly = true)
  public BigInteger balance() {
    return Context.getBalance(Context.getCaller());
  }

  @External(readonly = true)
  public Address address() {
    return Context.getCaller();
  }

  //========/ GALLERY'S METHODS /========//

  private BigInteger getIdByName(String _name) {
    for (BigInteger i : this.userGallery().keySet()) {
      if (this.userGallery().get(i).name == _name) {
        return i;
      }
    }
    return null;
  }

  @External
  public void createCollection(
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
  public void removeCollection(BigInteger _timestamp) {
    // Check if the collection exists
    Context.require(
      this.userGallery().get(_timestamp) != null,
      "The collection doesn't exist"
    );

    // Delete the collection
    this.userGallery().remove(_timestamp);
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
  public void toggleNFTVisibility(
    String _ipfs,
    boolean _onSale,
    boolean _visibility
  ) {
    NFT nft = this.getNFT(BigInteger.ZERO, _ipfs);

    nft.onSale ^= _onSale;
    nft.visibility ^= _visibility;
    nft.requested.clear();

    if (nft.requested.size() > 0) {
      for (Address address : nft.requested) {
        this.galleries.get(address).get(BigInteger.TEN).nftList.remove(nft);
      }
    }

    this.userGallery()
      .get(BigInteger.ZERO)
      .nftList.set(nftIndex(BigInteger.ZERO, nft), nft);
  }

  //========/ METHODS: HANDLING ACTIONS /========//

  @External
  public void createNFT(
    String _ipfs,
    BigInteger _price,
    boolean _onSale,
    boolean _visibility
  ) {
    if (this.userGallery().containsKey(BigInteger.ZERO)) {
      this.createCollection(
          BigInteger.ZERO,
          "Onwed",
          "The NFT list you're owning.",
          true
        );
    }

    Context.require(
      _price.compareTo(BigInteger.ZERO) > 0,
      "The price must be positive"
    );

    NFT nft = new NFT(Context.getCaller(), _ipfs, _price, _onSale, _visibility);
    this.userGallery().get(BigInteger.ONE).nftList.add(nft);
  }

  @External
  public void addNFT(BigInteger _timestamp, String _ipfs) {
    if (
      _timestamp.equals(BigInteger.ONE) &&
      !this.userGallery().containsKey(BigInteger.ONE)
    ) {
      this.createCollection(
          BigInteger.ONE,
          "Cart",
          "The list of NFTs you're longing.",
          false
        );
    }
    if (
      _timestamp.equals(2) && !this.userGallery().containsKey(BigInteger.TEN)
    ) {
      this.createCollection(
          BigInteger.TEN,
          "Requesting",
          "The list of NFTs you're questing.",
          false
        );
    }

    NFT nft = this.getNFT(_timestamp, _ipfs);

    Context.require(
      !this.userGallery().get(_timestamp).nftList.contains(nft),
      "This NFT is already in your " + this.userGallery().get(_timestamp).name
    );

    this.userGallery().get(_timestamp).nftList.add(nft);
  }

  // Handle removing action
  @External
  public void removeNFT(BigInteger _timestamp, String _ipfs) {
    NFT nft = this.getNFT(_timestamp, _ipfs);

    Context.require(
      this.userGallery().get(_timestamp).nftList.contains(nft),
      "This NFT is not in your " + this.userGallery().get(_timestamp).name
    );

    this.userGallery().get(_timestamp).nftList.remove(nft);

    this.HandleRemoving(Context.getCaller(), _ipfs, nft.price);
  }

  //========/ METHODS: INTERACTIVE CONTRACTS /========//

  @External(readonly = true)
  public BigInteger payableBalance() {
    BigInteger balance = Context.getBalance(Context.getAddress());
    for (NFT nft : this.userGallery().get(BigInteger.TEN).nftList) {
      balance = balance.subtract(nft.price);
    }
    return balance;
  }

  public void sendPurchaseRequest(String _ipfs) {
    NFT nft = this.getNFT(BigInteger.ONE, _ipfs);

    Context.require(nft.onSale, "This NFT is not on sale");
  }

  // @External(readonly = true)
  // public BigInteger openAuction(
  //   String _ipfs,
  //   BigInteger _duration
  // ) {
  //   NFT nft = this.getNFT(BigInteger.ZERO, _ipfs);

  //   Context.require(nft.requested.size() > 0, "No one is requesting this NFT");

  //   return _duration;
  // }

  // @External
  // public void sendBid(String _ipfs, BigInteger _price) {
  //   NFT nft = this.getNFT(BigInteger.TEN, _ipfs);

  //   Context.require(nft.requested.size() > 0, "No one is requesting this NFT");

  //   Context.require(
  //     _price.compareTo(BigInteger.ZERO) > 0,
  //     "The extra price must be positive"
  //   );

  //   Context.require(
  //     _price.compareTo(this.payableBalance()) < 0, "You are not rich enough"
  //   )

  //   nft.price = nft.price.add(_price);
  //   nft.owner = Context.getCaller();
  // }

  //========/ EXPLORE'S CONTRACTS /========//

  @External(readonly = true)
  public ArrayList<NFT> marketplace() {
    ArrayList<NFT> nfts = new ArrayList<NFT>();
    for (Address users : galleries.keySet()) {
      for (NFT nft : galleries.get(users).get(BigInteger.ZERO).nftList) {
        if (nft.onSale) {
          nfts.add(nft);
        }
      }
    }
    return nfts;
  }

  @External(readonly = true)
  public ArrayList<NFT> artMuserum() {
    ArrayList<NFT> nfts = new ArrayList<NFT>();
    for (Address users : galleries.keySet()) {
      for (NFT nft : galleries.get(users).get(BigInteger.ZERO).nftList) {
        if (nft.visibility) {
          nfts.add(nft);
        }
      }
    }
    return nfts;
  }

  @External(readonly = true)
  public HashMap<BigInteger, Collection> publicCollection() {
    HashMap<BigInteger, Collection> collections = new HashMap<BigInteger, Collection>();
    for (Address users : galleries.keySet()) {
      for (BigInteger timestamp : galleries.get(users).keySet()) {
        if (timestamp.compareTo(BigInteger.TEN) <= 0) {
          break;
        }
        if (galleries.get(users).get(timestamp).visibility) {
          collections.put(timestamp, galleries.get(users).get(timestamp));
        }
      }
    }
    return collections;
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
