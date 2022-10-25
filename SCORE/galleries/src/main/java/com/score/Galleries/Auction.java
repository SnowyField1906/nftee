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
import score.Address;
import score.ObjectReader;
import score.ObjectWriter;

public class Auction {
  BigInteger timestamp;
  BigInteger startTime;
  BigInteger duration;

  public Auction(BigInteger _timestamp) {
    this.timestamp = _timestamp;
    this.startTime = _timestamp.add(BigInteger.valueOf(86400));
    this.duration = BigInteger.valueOf(86400);
  }

  public static void writeObject(ObjectWriter w, Auction _auction) {
    w.beginList(3);
    w.write(_auction.timestamp);
    w.write(_auction.startTime);
    w.write(_auction.duration);
    w.end();
  }

  public static Auction readObject(ObjectReader r) {
    r.beginList();
    Auction a = new Auction(r.readBigInteger());
    r.end();
    return a;
  }
}
