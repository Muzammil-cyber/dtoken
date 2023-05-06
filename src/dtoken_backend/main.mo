import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
  let owner : Principal = Principal.fromText("ajkio-247py-mrrgl-inrmm-ehvy2-2h7ol-74pu6-32qx3-otgk4-wr6jo-2qe");
  let totalSupply : Nat = 1000000000000;
  let symbol : Text = "ZINC";

  private stable var entries : [(Principal, Nat)] = [];

  // HashMap<K, V>(initCapacity : Nat, keyEq : (K, K) -> Bool, keyHash : K -> Hash.Hash)
  // let map = HashMap.HashMap<Text, Nat>(5, Text.equal, Text.hash);
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if (balances.size() < 1) {
    // func put(key : K, value : V)
    balances.put(owner, totalSupply);
  };

  public query func balanceOf(who : Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)) {
      case (null) { 0 };
      case (?result) { result };
    };
    return balance;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared (e) func newUser() : async Text {
    // Debug.print(debug_show (e.caller));
    if (balances.get(e.caller) == null) {
      let amount = 10000;
      let result = await transfer(e.caller, amount);
      return result;
    } else {
      return "Already Claimed";
    };
  };
  public shared (e) func UserID() : async Principal {
    return e.caller;
  };

  public shared (e) func transfer(transferTo : Principal, amount : Nat) : async Text {
    let fromBalance = await balanceOf(e.caller);
    let toBalance = await balanceOf(transferTo);
    if (e.caller == transferTo) {
      return "Hmmmmmm...";
    } else if (fromBalance > amount) {
      balances.put(e.caller, fromBalance - amount);
      balances.put(transferTo, toBalance + amount);
      return "Success";
    } else {
      return "Insufficient Funds";
    };
  };

  system func preupgrade() {
    entries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(
      entries.vals(),
      1,
      Principal.equal,
      Principal.hash,
    );
    if (balances.size() < 1) {
      // func put(key : K, value : V)
      balances.put(owner, totalSupply);
    };
  };
};
