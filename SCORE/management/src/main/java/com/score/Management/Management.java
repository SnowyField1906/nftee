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

package score.com.Management;

import java.math.BigInteger;

import com.eclipsesource.json.Json;
import com.eclipsesource.json.JsonObject;
import com.iconloop.score.test.Account;
import com.iconloop.score.test.Score;



import score.Address;

public class Management {
  
  public static IncentiveKey createIncentive (Account from, Score rewardToken, BigInteger amount, Address staker, Address pool, BigInteger startTime, BigInteger endTime) {

    var params = Json.object()
      .add("pool", pool.toString())
      .add("startTime", startTime.toString())
      .add("endTime", endTime.toString())
      .add("refundee", from.getAddress().toString());
    
    JsonObject data = Json.object()
      .add("method", "createIncentive")
      .add("params", params);

    byte[] dataBytes = data.toString().getBytes();

    rewardToken.invoke(
      from, 
      "transfer", 
      staker,
      amount, 
      dataBytes
    );

    return new IncentiveKey(rewardToken.getAddress(), pool, startTime, endTime, from.getAddress());
  }

  public static void createIncentive (Account from, Score rewardToken, Address staker, IncentiveKey key, BigInteger reward) {

    var params = Json.object()
      .add("pool", key.pool.toString())
      .add("startTime", key.startTime.toString())
      .add("endTime", key.endTime.toString())
      .add("refundee", key.refundee.toString());
    
    JsonObject data = Json.object()
      .add("method", "createIncentive")
      .add("params", params);

    byte[] dataBytes = data.toString().getBytes();

    rewardToken.invoke(
      from, 
      "transfer", 
      staker,
      reward, 
      dataBytes
    );
  }

  public static void stakeToken (
    ScoreSpy<ConvexusStaker> staker, 
    Account from,
    Address rwtk,
    Address pool,
    BigInteger[] timestamps,
    Address refundee,
    BigInteger tokenId
  ) {
    staker.invoke(from, "stakeToken", 
      new IncentiveKey(
        rwtk, 
        pool, 
        timestamps[0], 
        timestamps[1], 
        refundee
      ),
      tokenId
    );
  }

  public static void stakeToken (
    ScoreSpy<ConvexusStaker> staker, 
    Account from,
    IncentiveKey incentiveKey,
    BigInteger tokenId
  ) {
    staker.invoke(from, "stakeToken", incentiveKey, tokenId);
  }
}