const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Use appropriate provider

const contractABI = ['...']; 
const contractAddress = '0x123...'; 

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function interactWithContract() {
  try {
    const accounts = await web3.eth.getAccounts();

    
    const result = await contract.methods.getValue().call();
    console.log('Current value:', result);

   
    const estimatedGas = await contract.methods.setValue(42).estimateGas({ from: accounts[0] });

  
    const tx = await contract.methods.setValue(42).send({
      from: accounts[0],
      gas: estimatedGas,
    });

    console.log('Transaction hash:', tx.transactionHash);

    
    if (tx.events && tx.events.ValueChanged) {
      console.log('ValueChanged event:', tx.events.ValueChanged.returnValues);
    }

  } catch (error) {
    console.error('Error interacting with contract:', error.message || error);
  }
}

interactWithContract();
