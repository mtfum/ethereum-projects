const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
	'payment chef build void gospel spirit chase snow light define myth print',
	'https://rinkeby.infura.io/v3/df956b1f067e451bb2fc8293a587afac',
		1,
		2
);
const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);
  console.log(interface);

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: '0x' +  bytecode })
		.send({ from: accounts[0] });


	console.log('Contract deployed to', result.options.address);
};
deploy();
