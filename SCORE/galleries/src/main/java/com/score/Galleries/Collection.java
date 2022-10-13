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
import score.BranchDB;
import score.Context;
import score.ObjectReader;
import score.ObjectWriter;
import score.annotation.EventLog;
import score.annotation.External;
import score.annotation.Payable;
import scorex.util.ArrayList;
import scorex.util.HashMap;

public class Collection {
  String name;
  String description;
  Boolean visibility;

  public Collection(String _name, String _description, boolean _visibility) {
    this.name = _name;
    this.description = _description;
    this.visibility = _visibility;
  }

  public static void writeObject(ObjectWriter w, Collection _collection) {
    w.beginList(3);
    w.write(_collection.name);
    w.write(_collection.description);
    w.write(_collection.visibility);
    w.end();
  }

  public static Collection readObject(ObjectReader r) {
    r.beginList();
    Collection c = new Collection(
      r.readString(),
      r.readString(),
      r.readBoolean()
    );
    r.end();
    return c;
  }
}
