import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      manager: '',
      players: [],
      balance: '',
      value: '',
      message: ''
    };
  }

  async componentDidMount() { // Appが表示されるたびに呼ばれる
    const manager = await lottery.methods.manager().call(); // from: accounts[0] はブラウザのメタマスクが自動的にAccounnt1(デフォルトのアドレス)を持っているので必要ない
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on Transaction success... ' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been entered!' });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on Transaction success...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winnner has been picked!' });
  };

  render() {
		// web3.eth.getAccounts().then(console.log); // 表示されない時はmetamaskにloginできてるか確認する

		return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
        This contract is managed by { this.state.manager }.
        There are currently {this.state.players.length} people entered!
        computing to win { web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value = {this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4>Ready to pick a winner?</h4>

        <button onClick={this.onClick}>Pick a winner!</button>


        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
