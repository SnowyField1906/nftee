package com.score.Marketplace;

import score.Address;
import score.ObjectReader;
import score.ObjectWriter;

import java.math.BigInteger;

public class Listing {
    Address seller;
    BigInteger _id;
    BigInteger price;
    boolean selling;

    public Listing(Address address, BigInteger _id , BigInteger price) {
        this.seller = address;
        this._id = _id;
        this.price = price;
        this.selling = true;
    }

    public static void writeObject(ObjectWriter w, Listing listing) {
        w.beginList(4);
        w.write(listing.seller);
        w.write(listing._id);
        w.write(listing.price);
        w.write(listing.selling);
        w.end();
    }

    public static Listing readObject(ObjectReader r) {
        Listing listing = new Listing();
        r.beginList();
        listing.seller = r.readAddress();
        listing._id = r.readBigInteger();
        listing.price = r.readBigInteger();
        listing.selling = r.readBoolean();
        r.end();
        return listing;
    }
}