const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
		// get a list of all accounts
	accounts = await web3.eth.getAccounts();
		/* .then(fetchedAccounts => {
			*		console.log(fetchedAccounts);
		 	* });
		 */

	// use one of those accounts to deploy
	// the conntract
	inbox = await	new web3.eth.Contract(JSON.parse(interface))	
		.deploy({ data: bytecode, arguments: ['Hi there!'] })
		.send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {

		it('deploys a contract', () => {
	
				// console.log(inbox);
				assert.ok(inbox.options.address);
		});

		it('has a default message', async () => {
			const message = await inbox.methods.message().call();
		});

		it('can change the messaage', async () => {
			await inbox.methods.setMessage('bye').send({ from: accounts[0] });
				const message = await inbox.methods.message().call();
			assert.equal(message, 'bye');
		});
});







/*
 * class Car {
		park() {
				return 'stop';
		}

		drive() {
				return 'vroom';
		}
}

let car;

beforeEach(() => {
  car = new Car();
});

describe('Car', () => {
	it('can park', () => {
		assert.equal(car.park(), 'stop');
	});

	it('can drive', () => {
		assert.equal(car.drive(), 'vroom');
	});
});

*/
