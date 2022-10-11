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

import java.lang.Object;
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
  private static BranchDB<Address, HashMap<BigInteger, Collection>> galleries = Context.newBranchDB(
    "galleries",
    Collection.class
  );

  private static final HashMap<BigInteger, Collection> userGallery() {
    return this.galleries.at(Context.getCaller());
  }

  //========/ CONTRACT'S GALLERY'S METHODS /========//

  @External(readonly = true)
  private int collectionSize(BigInteger _timestamp) {
    Context.require(
      this.galleries.at(Context.getCaller()).containsKey(_timestamp),
      "The collection is not found"
    );
    return this.galleries.at(Context.getCaller())
      .get(_timestamp)
      .nftList.size();
  }

  @External(readonly = true)
  private int gallerySize() {
    return this.galleries.at(Context.getCaller()).size();
  }

  private BigInteger getIdByName(String _name) {
    for (BigInteger i : this.galleries.at(Context.getCaller()).keySet()) {
      if (this.galleries.at(Context.getCaller()).get(i).name == _name) {
        return i;
      }
    }
    return null;
  }

  @External
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
    this.galleries.at(Context.getCaller()).set(_timestamp, collection);
  }

  @External
  public void toggleCollectionVisibility(BigInteger _timestamp) {
    Context.require(
      this.galleries.at(Context.getCaller()).containsKey(_timestamp),
      "The collection is not found"
    );
    Collection collection =
      this.galleries.at(Context.getCaller()).get(_timestamp);
    collection.visibility ^= true;
    this.galleries.at(Context.getCaller()).set(_timestamp, collection);
  }

  @External(readonly = true)
  public ArrayList<NFT> marketplace() {
    ArrayList<NFT> nfts = new ArrayList<NFT>();
    for (BigInteger i : this.galleries.at(Context.getCaller()).keySet()) {
      for (NFT nft : this.galleries.at(Context.getCaller()).get(i).nft) {
        if (nft.visibility) {
          nfts.add(nft);
        }
      }
    }
    return nfts;
  }

  //========/ CONTRACT'S NFT's METHODS /========//

  @External(readonly = true)
  protected NFT getNFT(BigInteger _timestamp, String _ipfs) {
    Context.require(
      this.galleries.at(Context.getCaller()).containsKey(_timestamp),
      "The collection is not found"
    );
    ArrayList<NFT> nfts =
      this.galleries.at(Context.getCaller()).get(_timestamp).nftList;
    for (NFT nft : nfts) {
      if (nft._ipfs.equals(_ipfs)) {
        return nft;
      }
    }
    Context.revert("The NFT not found or deleted");
    return null;
  }

  @External(readonly = true)
  protected NFT getNFT(BigInteger _timestamp, int _index) {
    Context.require(
      0 <= _index && _index < this.collectionSize(_timestamp),
      "Index out of bound"
    );
    return this.galleries.at(Context.getCaller())
      .get(_timestamp)
      .nftList.get(_index);
  }

  @External(readonly = true)
  protected int nftIndex(BigInteger _timestamp, NFT _nft) {
    if (
      this.galleries.at(Context.getCaller())
        .get(collectionIndex(_timestamp))
        .indexOf(_nft) >=
      0
    ) {
      return this.galleries.at(Context.getCaller())
        .get(collectionIndex(_timestamp))
        .indexOf(_nft);
    }
    // Revert if the NFT is not found
    Context.revert("The NFT is not in your " + _name);
    return -1;
  }

  @External
  protected void addNFT(BigInteger _timestamp, NFT _nft) {
    this.galleries.at(Context.getCaller())
      .get(collectionIndex(_timestamp))
      .add(_nft);
  }

  @External
  protected void removeNFT(BigInteger _timestamp, NFT _nft) {
    this.galleries.at(Context.getCaller())
      .get(collectionIndex(_timestamp))
      .remove(_nft);
  }

  // @External()
  // public void toggleNFTVisibility(String _name, String _ipfs) {
  //   // Revert if the caller is not the owner
  //   NFT nft = this.getNFT(_name, _ipfs);
  //   Context.require(Context.getCaller().equals(nft.owner));

  //   if(_name.equals("Selling")) {
  //     n.visibility ^= true;
  //     this.galleries.at(Context.getCaller()).get(collectionIndex(_timestamp)).set(nftIndex(_name, nft), nft);
  //   }
  //   else {

  //   }
  //   // Flip sale's status (visibility)
  //   gallery.get(getIndex("Selling", n)).onSale ^=
  //     true;
  // }

  //========/ CONTRACT'S SUB-METHODS /========//

  // Handle selling action
  @External
  public void handleSelling(String _ipfs, BigInteger _price) {
    if (
      this.galleries.at(Context.getCaller()).collectionIndex("Selling") == -1
    ) {
      this.newCollection("Selling", "Selling list", 0, true);
    }
    // Call the caller's balance
    BigInteger balance = Context.getBalance(Context.getCaller());

    // Require the NFT's price to be positive
    Context.require(
      price.compareTo(BigInteger.ZERO) > 0,
      "The price must be positive"
    );

    // Create the NFT and add into Selling gallery
    NFT nft = new NFT(Context.getCaller(), _ipfs, _price);
    this.addNFT("Selling", nft);

    // Emit selling event
    this.HandleSelling(Context.getCaller(), _ipfs, _price);
  }

  // // Handle purchasing action
  // @External() @Payable()
  // public void handlePurchasing(String ipfs) {
  //     // Get NFT from ipfs
  //     NFT nft = getNFT("Selling", ipfs);

  //     // Require caller's balance to be greater than the NFT's price
  //     BigInteger value = Context.getValue();
  //     Context.require(value.compareTo(nft.price) >= 0, "Not enough money");

  //     // Transfer money to seller
  //     Context.call(nft, "transferFrom", nft.owner, Context.getCaller(), nft.ipfs, BigInteger.ONE, null);

  //     BigInteger addingFee = nft.price.divide(BigInteger.valueOf(100)).multiply(this.purchaseFee);
  //     BigInteger sellerReceiveAmount = nft.price.subtract(addingFee);

  //     // emit event
  //     this.HandlePurchasing(Context.getCaller(), nft.ipfs, nft.price);

  //     Context.transfer(Context.getOwner(), sellerReceiveAmount);
  //     Context.transfer(nft.owner, value.subtract(sellerReceiveAmount));
  // }

  @External
  public void handleAdding(BigInteger _timestamp, String _ipfs) {
    if (
      this.galleries.at(Context.getCaller()).collectionIndex("Adding") == -1
    ) {
      this.newCollection(_name, _name + " List", 0, true);
    }
    // Get the NFT from the given IPFS
    NFT n = this.getNFT(_name, _ipfs);

    // Revert if the NFT is already in the given gallery
    Context.require(
      !this.galleries.at(Context.getCaller())
        .get(this.nftIndex(_name, n))
        .contains(n),
      "This NFT is already in your " + type
    );

    // Add the NFT into the given gallery
    this.addNFT(_name, n);

    // Emit adding event
    this.HandleAdding(Context.getCaller(), n._ipfs, n._price);
  }

  // Handle removing action
  @External
  public void handleRemoving(BigInteger _timestamp, String _ipfs) {
    // Get the NFT from the given IPFS
    NFT n = this.getNFT(_name, _ipfs);

    // Revert if the NFT is not in the given gallery
    Context.require(
      this.galleries.at(Context.getCaller())
        .get(nftIndex(_name, n))
        .contains(n),
      "This NFT is not in your " + type
    );

    // Remove the NFT from the given gallery
    this.removeNFT(_name, n);

    // Emit removing event
    this.HandleRemoving(Context.getCaller(), _ipfs, n.price);
  }

  //========/ CONTRACT'S EVENTS /========//

  @EventLog(indexed = 1)
  protected void HandlePurchasing(
    Address caller,
    String ipfs,
    BigInteger price
  ) {}

  // @EventLog(indexed = 1)
  // protected void TokenOwnerRequired(Address address) {}

  @EventLog(indexed = 1)
  protected void HandleSelling(Address caller, String ipfs, BigInteger price) {}

  @EventLog(indexed = 2)
  protected void HandleAdding(Address caller, String ipfs, BigInteger price) {}

  @EventLog(indexed = 2)
  protected void HandleRemoving(
    Address caller,
    String ipfs,
    BigInteger price
  ) {}
}
