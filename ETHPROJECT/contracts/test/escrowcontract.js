
//create constant that represents contract
//use artifacts to bring in the smart contract 
const EscrowContract = artifacts.require('../../contracts/EscrowContract.sol');


//declare the smart contract (function is going to take in accounts)
    //(those fake accounts that truffle gives u by default)
  contract('EscrowContract', function (accounts) {

//set up contract and make sure its working (getting back the approver)
    it('initiates contract', async function() {
      const contract = await EscrowContract.deployed();
      const approver = await contract.approver.call();
      assert.equal(approver, 0xdD38BD942Aa427fb47008a867914197c71A25A86, "approvers don't match")

    });
//take a deposit and then check balance (make sure that they match up)

    it('takes a deposit', async function() {
      const contract = await EscrowContract.deployed();
      await contract.deposit(accounts[0], {value: 2, from: accounts[1]});
      assert.equal(await web3.eth.getBalance(contract.address), 2, "amount doesn't match")
    });

    it('approves', async function() {
      const contract = await EscrowContract.deployed();
      await contract.approve({from: accounts[2]});
      assert.equal(await web3.eth.getBalance(contract.address), 0, "amount doesn't match")
    });

    it('withdraws', async function() {
      const contract = await EscrowContract.deployed();
      await contract.deposit(accounts[0], {value: 2, from: accounts[1]});
      assert.equal(await web3.eth.getBalance(contract.address), 2, "amount doesn't match")
      await contract.withdraw({from: accounts[2]})
      assert.equal(await web3.eth.getBalance(contract.address), 0, "amount doesn't match")
    })
  });
