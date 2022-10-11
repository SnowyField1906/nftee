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
 * WITHOUT WARRANTIES OR CONDpublic class User {}
ITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.score.Token;

import com.iconloop.score.token.irc3.IRC3Basic;
import com.iconloop.score.util.EnumerableIntMap;
import java.util.List;
import java.math.BigInteger;
import score.Address;
import score.ArrayDB;
import score.BranchDB;
import score.Context;
import score.annotation.External;
import scorex.util.ArrayList;

public class TokeneeWallet {
  private final IRC3Basic token;
  private final ArrayDB<Address> owners;
  private final BranchDB<Address, BigInteger> balances;
  private final EnumerableIntMap<Address> ownerIndex;


  public TokeneeWallet(IRC3Basic token) {
    this.token = token;
    this.owners = Context.newArrayDB("owners", Address.class);
    this.balances = Context.newBranchDB("balances", Address.class, BigInteger.class);
    this.ownerIndex = new EnumerableIntMap<>(Context.newArrayDB("ownerIndex", Address.class));
  }

  public Address getOwner() {
    return Context.getCaller();
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

  public void addOwner(Address owner) {
    if (ownerIndex.get(owner) == null) {
      ownerIndex.put(owner, owners.size());
      owners.add(owner);
    }
  }

  public void removeOwner(Address owner) {
    if (ownerIndex.get(owner) != null) {
      int index = ownerIndex.get(owner);
      int lastIndex = owners.size() - 1;
      Address lastOwner = owners.get(lastIndex);
      owners.set(index, lastOwner);
      ownerIndex.put(lastOwner, index);
      owners.remove(lastIndex);
      ownerIndex.remove(owner);
    }
  }


  public class TokeneeWallet(BigInteger supply) {
    require(Context.getCaller().getBalance().compareTo())
  }

  private class convertToken(BigInteger icx) {
    Context.require(icx.remainder(100).equals(0), "ICX converted must be a multiple of 100");
    return icx.divide(100);
  }

  @External(readonly = true)
  public class getBalance() {
    return Context.getCaller().getBalance();
  }
}
