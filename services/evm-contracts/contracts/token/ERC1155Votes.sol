// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/governance/utils/Votes.sol";

/**
 * @dev Extension of ERC1155 to support voting and delegation as implemented by {Votes}
 */
abstract contract ERC1155Votes is ERC1155, Votes {
    /**
     * @dev See {ERC1155-_afterTokenTransfer}. Adjusts votes when tokens are transferred.
     *
     * Emits a {IVotes-DelegateVotesChanged} event.
     */

    constructor(string memory uri_) ERC1155(uri_) {}

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; i++) {
            _transferVotingUnits(from, to, amounts[i]);
        }
    }
}
