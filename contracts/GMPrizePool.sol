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
    // mapping (address => uint) public winners;
    Winner[] winnersList;
    
    uint public expiredTime;
    IERC20 usdtContract;

    event RedeemSuccess(address indexed sender, uint256 value);



    // const winners {
    //     '10x098f6F171C7d4c0F31c07b8d511F40b2338347Eb': 20,
    //     '20x098f6F171C7d4c0F31c07b8d511F40b2338347Eb': 0,
    //      '20x098f6F171C7d4c0F31c07b8d511F40b2338347Eb': 10,
    // }

    constructor(address _token) {
        console.log("Deploying a Pool for:", msg.sender);
        owner = msg.sender;
        usdtContract = IERC20(address(_token));
    }

    // Approve => Transfer
    // TODO: Approve => Frontend

    // Deposit prize
    function depositPrize(Winner[] calldata _winnersList, uint _expiredTime) public returns(bool) {
        console.log("Get input");
        console.log(block.number);
        require(msg.sender == owner, "Only Admin");
        require(_expiredTime > block.number, "Can not set expirted time in the past");
        // winners = _winnersList;
        console.log("Done check");
        expiredTime = _expiredTime;

        // TODO: Check getBackprize before override

        uint totalPrize = 0;
        for (uint256 i = 0; i < _winnersList.length; i++) {
            // Perform the desired operation on each element
            console.log("Push");
            totalPrize += _winnersList[i].prizeAmount;
            Winner memory newWinner = Winner(_winnersList[i].winnerAddress, _winnersList[i].prizeAmount);
            winnersList.push(newWinner); // NOTICE: Add to many item here is not a good things
        }

        console.log("Start send money");
        usdtContract.transferFrom(msg.sender, address(this), totalPrize);
        console.log("Done send money");
        return true;
    }

    // Redeem prize
    function redeemPrize() public returns(bool) {
        // require(winners[msg.sender] > 0, "Not on our winners list");
        require (block.number < expiredTime, "You missed your deadline");
        for (uint256 i = 0; i < winnersList.length; i++) {
            // Perform the desired operation on each element
            if (winnersList[i].winnerAddress == msg.sender && winnersList[i].prizeAmount > 0) {
                uint amount = winnersList[i].prizeAmount;
                winnersList[i].prizeAmount = 0;

                usdtContract.transfer(msg.sender, amount);
                emit RedeemSuccess(msg.sender, amount);
                return true;
            }
        }

        return false;
    }

    function getMyPrize() public view returns(uint) {
    for (uint256 i = 0; i < winnersList.length; i++) {
            // Perform the desired operation on each element
            if (winnersList[i].winnerAddress == msg.sender && winnersList[i].prizeAmount > 0) {
                return winnersList[i].prizeAmount;
            }
        }

        return 0;
    }

    // Admin getback prize
    function getBackprize() public returns (bool) {
        require(msg.sender == owner, "Only Admin");
        console.log("Block Number");
        console.log(block.number);
        require(block.number > expiredTime, "Not expired yet");

        uint totalPrize = 0;
        for (uint256 i = 0; i < winnersList.length; i++) {
            // Perform the desired operation on each element
            totalPrize += winnersList[i].prizeAmount;
            winnersList[i].prizeAmount = 0; // Reset after claim
        }

        console.log("Start send back");
        usdtContract.transfer(msg.sender, totalPrize);
        console.log("Done send back");
        return true;
    }

}
