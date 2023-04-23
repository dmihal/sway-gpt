export const COUNTER_SWAY = `contract;

use std::logging:log;

struct Errors {
  AmountMustBeGreaterThanZero: (),
}
struct IncrementedEvent {}
struct AddEvent {
  amount: u64;
}

abi Counter {
    #[storage(read, write)]
    fn increment();

    #[storage(read)]
    fn counter() -> u64;
}
storage {
    counter: u64 = 0,
}

impl Counter for Contract {
    #[storage(read)]
    fn counter() -> u64 {
      return storage.counter;
    }
    #[storage(read, write)]
    fn increment() {
        storage.counter = storage.counter + 1;
        log(IncrementedEvent {});
    }

    #[storage(read, write)]
    fn add(amount: u64) {
      require(amount > 0, Errors::AmountMustBeGreaterThanZero);
        storage.counter = storage.counter + 1;
        log(AddEvent {
          amount: amount,
        });
    }
}
`;

export const COUNTER_SOL = `pragma solidity 0.8.13;

contract Counter {
  uint256 counter = 0;

  event Incremented();
  event Added(uint256 amount);

  function increment() external {
    counter += 1;
    emit Incremented();
  }

  function add(uint256 amount) external {
    require(amount > 0, "Amount must be greater than zero");
    counter += amount;
    emit Added(amount);
  }
}
`;

export const TOKEN_SWAY = `contract;

use std::{
  token::mint_to,
  u256::U256,
};

abi MyToken {
    #[storage(read)]
    fn total_supply() -> U256;
    fn name() -> str[64];
    fn symbol() -> str[32];
    fn decimals() -> u8;

    #[storage(read, write)]
    fn mint(amount: u64, to: Identity);
}

storage {
  supply: u64 = 0,
}

impl MyToken for Contract {
    #[storage(read)]
    fn total_supply() -> U256 {
        U256 { a: 0, b: 0, c: 0, d: storage.supply }
    }
    fn name() -> str[64] {
        "MyToken                                                         "
    };
    fn symbol() -> str[32] { "MYT                             " }
    fn decimals() -> u8 { 9 }

    #[storage(read, write)]
    fn mint(amount: u64, to: Identity) {
        mint_to(amount, to);
    }
}
`;
