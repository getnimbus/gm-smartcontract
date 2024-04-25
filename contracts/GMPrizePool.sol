//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GMPrizePool {
	struct Winner {
		address winnerAddress;
		uint256 prizeAmount;
	}

	address public owner;
	address[] winnersList;
	mapping(address account => Winner) private _balances;

	uint public expiredTime;
	IERC20 rewardToken;

	event RedeemSuccess(address indexed sender, uint256 value);

	constructor(address _token) {
		console.log("Deploying a Pool to:", address(this));
		owner = msg.sender;
		rewardToken = IERC20(address(_token));
	}

	// Approve => Transfer
	// TODO: Approve => Frontend

	// Deposit prize
	function depositPrize(
		Winner[] calldata _winnersList,
		uint _expiredTime
	) public returns (bool) {
		console.log("Block Number", block.number);
		require(msg.sender == owner, "Only Admin");
		require(
			_expiredTime > block.number,
			"Can not set expired time in the past"
		);
		require(_winnersList.length > 0, "Must have at least 1 winner");
		console.log("Done check");

		// Get all prize that user not claim last month
		getPrizeBack();

		expiredTime = _expiredTime;

		// Start to deposit
		uint totalPrize = 0;
		for (uint256 i = 0; i < _winnersList.length; i++) {
			console.log("Push winner");
			require(
				_winnersList[i].winnerAddress != address(0),
				"Invalid winner address"
			);

			totalPrize += _winnersList[i].prizeAmount;

			Winner memory newWinner = Winner(
				_winnersList[i].winnerAddress,
				_winnersList[i].prizeAmount
			);

			Winner memory winner = _balances[_winnersList[i].winnerAddress];
			if (winner.winnerAddress == address(0)) {
				winnersList.push(newWinner.winnerAddress);
			}

			// Set new prize to winner
			_balances[_winnersList[i].winnerAddress] = newWinner;
			console.log(
				"Set prize succeed",
				newWinner.winnerAddress,
				newWinner.prizeAmount
			);
		}

		require(totalPrize > 0, "Total prize must larger than 0");

		console.log("Start send money");
		rewardToken.transferFrom(msg.sender, address(this), totalPrize);
		console.log("Done send money");
		return true;
	}

	// Redeem prize
	function redeemPrize() public returns (bool) {
		require(block.number < expiredTime, "You missed your deadline");
		Winner memory winner = _balances[msg.sender];
		if (winner.prizeAmount > 0) {
			_balances[msg.sender].prizeAmount = 0;
			rewardToken.transfer(msg.sender, winner.prizeAmount);
			emit RedeemSuccess(msg.sender, winner.prizeAmount);
			return true;
		}

		return false;
	}

	function getWinner(address account) public view returns (Winner memory) {
		return _balances[account];
	}

	// Admin get prize back
	function getPrizeBack() public returns (bool) {
		console.log("Block Number", block.number);
		require(msg.sender == owner, "Only Admin");
		// require(block.number > expiredTime, "Not expired yet");

		uint totalPrize = 0;
		for (uint256 i = 0; i < winnersList.length; i++) {
			// Perform the desired operation on each element
			Winner memory winner = _balances[winnersList[i]];
			if (winner.prizeAmount > 0) {
				totalPrize += winner.prizeAmount;
				_balances[winnersList[i]].prizeAmount = 0; // Reset after claim
			}
		}

		console.log("Start send back", totalPrize);
		rewardToken.transfer(msg.sender, totalPrize);
		console.log("Done send back", totalPrize);
		return true;
	}
}
