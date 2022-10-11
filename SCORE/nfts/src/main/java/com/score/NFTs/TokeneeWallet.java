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

package com.score.NFTs;

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

public class NFTs {


  public class NFTs(BigInteger supply) {
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
