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

package com.score.Token;

import com.iconloop.score.token.irc3.IRC3Basic;
import com.iconloop.score.util.EnumerableIntMap;
import java.math.BigInteger;
import java.util.List;
import score.Address;
import score.ArrayDB;
import score.BranchDB;
import score.Context;
import score.annotation.External;
import scorex.util.ArrayList;

public class User {
  private final Address owner;
  public BranchDB<Address, <Information>> users;

  public User() {
    this.owner = Context.getCaller();
    this.users = Context.newBranchDB(owner, BigInteger.class);
  }

  public Address getOwner() {
    return this.owner;
  }

  @External(readonly = true)
  public getTokeneeBalance(Address address) {
    return this.users.get(address);
  }

  public BigInteger getBalance(Address token) {
    return balances.get(token);
  }

  public void addToken(Address token) {
    tokens.add(token);
  }

  public void setBalance(Address token, BigInteger balance) {
    balances.set(token, balance);
  }
}
