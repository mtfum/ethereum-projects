import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

class CampaignNew extends Component {
  state ={
    minimuContribution: '',
    errorMessage: ''
  }

  onSubnit = async (event) => {
    event.preventDefault()

    try {

    const accounts = await web3.eth.getAccounts()
    await factory.methods
      .createCampaign(this.state.minimuContribution)
      .send({
        from: accounts[0]
      })
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
  }

  render() {

    return (
      <Layout>
        <h3>Create a Campaign!</h3>

        <Form onSubmit={ this.onSubnit } error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimuContribution}
              onChange={event => this.setState({ minimuContribution: event.target.value})}
            />
          </Form.Field>

          <Button primary>Create!</Button>
          <Message error header="Oops!" content={this.state.errorMessage} />
        </ Form>
      </Layout>
    )
  }
}

export default CampaignNew
