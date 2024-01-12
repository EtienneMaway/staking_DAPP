// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract Staking {
  // Public variable to store the owner's address
  address public owner;

  // Struct to represent a staking position
  struct Position {
    uint positionId;
    address walletAddress;
    uint createdDate;
    uint unlockDate;
    uint percentInterest;
    uint weiStaked;
    uint weiInterest;
    bool open;
  }

  // Variable to store the current staking position
  Position position;

  // Counter for position IDs
  uint currentPositionId;

  // Mapping to store staking positions by position ID
  mapping(uint => Position) public positions;

  // Mapping to store position IDs by wallet address
  mapping(address => uint[] ) public positionIdsByAddress;

  // Mapping to store interest rate tiers based on locked periods
  mapping(uint => uint) public tiers;

  // Array to store different locked periods
  uint[] public lockPeriods;

  bool private reentrancyGuard = false;

  // Constructor function, executed once when the contract is deployed
  constructor() payable {
    // Set the contract owner to the address that deployed the contract
    owner = msg.sender;

    // Define interest rate tiers based on locked periods
    tiers[0] = 700;
    tiers[30] = 800;
    tiers[60] = 900;
    tiers[90] = 1200;

    // Define locked periods
    lockPeriods.push(0);
    lockPeriods.push(30);
    lockPeriods.push(60);
    lockPeriods.push(90);
  }



  receive() payable external {}

  function stakeEther(uint numberOfDays) external payable {
    require(tiers[numberOfDays] > 0, 'mapping not found');
    // require(position[msg.value] > 0, 'you cannot stake 0 Ether');

    positions[currentPositionId] = Position(
      currentPositionId,
      msg.sender,
      block.timestamp,
      block.timestamp + (numberOfDays + 1 days),
      tiers[numberOfDays],
      msg.value,
      calculateInterestTiers(tiers[numberOfDays], msg.value),
      true
    );
    positionIdsByAddress[msg.sender].push(currentPositionId);
    currentPositionId++;
  }

  function getContractBalance() public view returns(uint) {
    return address(this).balance;
  }

  function calculateInterestTiers(uint basisPoint, uint weiAmount) private pure returns(uint){
    return basisPoint * weiAmount / 10000;
  }

  function getInterestRate(uint numberOfDays) external view returns(uint ){
    return tiers[numberOfDays];
  }

  // returns one position from the list of all the positions
  function getPositionById(uint positionId) external view returns( Position memory  ){
    return positions[positionId];
  }

  function getWalletBalance(address walletAddress) external view returns( uint walletBalance ){
    return address(walletAddress).balance;
  }



  // list of all the positions of a specific address
  function getPositionIdsForAddress(address walletAddress) external view returns( uint[]  memory){
    return positionIdsByAddress[walletAddress];
  }

function closePosition(uint positionId) payable external {
    require(reentrancyGuard == false, 'Reentrant call');
    reentrancyGuard = true;

    require(positions[positionId].walletAddress == msg.sender, 'Only the position creator can modify the position');
    require(positions[positionId].open == true, 'Position is already closed');

    positions[positionId].open = false;

    uint amount = positions[positionId].weiStaked + positions[positionId].weiInterest;

    

    // ensuring that the target address can receive Ether
    // payable(msg.sender).transfer(amount);

  (bool sent, ) = payable(msg.sender).call{value: amount}('');
  require(sent, "failed to transfer");

  positions[positionId].weiStaked = 0;
  positions[positionId].weiInterest = 0;

  reentrancyGuard = false;

}

}