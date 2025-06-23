const Web3 = require('web3');

class VotingDApp {
  constructor(contractAddress, abi, provider) {
    this.web3 = new Web3(provider);
    this.contract = new this.web3.eth.Contract(abi, contractAddress);
  }

 
  async createProposal(description) {
    const accounts = await this.web3.eth.getAccounts();
    const sender = accounts[0];
    const gas = await this.contract.methods.createProposal(description).estimateGas({ from: sender });

    const tx = await this.contract.methods.createProposal(description).send({
      from: sender,
      gas,
    });

    console.log('Proposal created:', tx.events.ProposalCreated.returnValues);
  }

  
  async vote(proposalId, support) {
    const accounts = await this.web3.eth.getAccounts();
    const sender = accounts[0];
    const gas = await this.contract.methods.vote(proposalId, support).estimateGas({ from: sender });

    const tx = await this.contract.methods.vote(proposalId, support).send({
      from: sender,
      gas,
    });

    console.log('Voted:', tx.events.Voted.returnValues);
  }

 
  async getResults(proposalId) {
    const result = await this.contract.methods.getResults(proposalId).call();
    console.log(`Proposal #${proposalId} - ${result[0]}`);
    console.log(`Yes Votes: ${result[1]}`);
    console.log(`No Votes: ${result[2]}`);
    return result;
  }
}
