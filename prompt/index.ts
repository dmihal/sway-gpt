import { COUNTER_SOL, COUNTER_SWAY, TOKEN_SWAY } from "./examples";

export function getPrompt(solCode: string) {
  return `
Sway is a smart-contract programming language, with a syntax similar to Rust, but also inspired by Solidity.

The following is a Sway smart contract:
${COUNTER_SWAY}

And here is the equivalent Solidity smart contract:
${COUNTER_SOL}

Sway also allows native fungible tokens, unlike Solidity which creates tokens using ERC20 functions.
Here is an example of a simple Sway token contract:
${TOKEN_SWAY}

The following is a Solidity smart contract:
${solCode}

And here is the equivalent Sway smart contract:
  `;
}
