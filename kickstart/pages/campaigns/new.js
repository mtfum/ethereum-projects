import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

class CampaignNew extends Component {
  state ={
    minimuContribution: '',
    errorMessage: '',
    loading: false
  }

  onSubnit = async (event) => {
    event.preventDefault()

    this.setState({ loading: true, errorMessage: '' })

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

    this.setState({ loading: false })
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

          <Button loading={this.state.loading} primary>Create!</Button>
          <Message error header="Oops!" content={this.state.errorMessage} />
        </ Form>
      </Layout>
    )
  }
}

export default CampaignNew
