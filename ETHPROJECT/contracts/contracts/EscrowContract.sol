// SPDX-License-Identifier: MIT
pragma solidity ^0.6.9;

//delcare contract (a class)
contract EscrowContract {

//variables (the type address will represent an address in the ethereum network) 
// sender, reciever, and approver should all have an address
  address payable sender;
  address payable reciever;
  // the address here is from truffle 
  address public constant approver = 0xdD38BD942Aa427fb47008a867914197c71A25A86;


// takes an address (where the money is being sent to)
// marking it as external because this will allow it to be called from outside the contract
// then we need payable because we need to tell it that its taking ether
// THEN there is this like special object thing called message (msg) 
      // message will have some data in it (sender) basically the addressof whos sending the $$
      //also value of whats being sent
  function deposit(address payable _reciever) external payable {
    //have to make messsage value greater then 0 because there has to SOME money there cant be nothin
    require(msg.value > 0, "Deposit value > 0 required");
    sender = msg.sender;
    reciever = _reciever;
  }
// return address
  function viewApprover() external pure returns(address) {
    return (approver);
  }

// actual approval that will release the money and send it to the reciever. 
  function approve() external {
    require(msg.sender == approver, "Sender = approver required");
    address(uint160(reciever)).transfer(address(this).balance);
  }

  function withdraw() external {
    require(msg.sender == approver, "Sender = approver required");
    address(uint160(sender)).transfer(address(this).balance);
  }
}
