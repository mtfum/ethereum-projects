import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'

class RequestsNew extends Component {
  state ={
    value: '',
    description: '',
    receipent: ''
  }

  static async getInitialProps(props) {
    const { address } = props.query

    return { address }
  }

  onSubmit = async event => {
    event.preventDefault()

    const campaign = Campaign(this.props.address)
    const { description, value, receipient } = this.state

    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        receipient
        )
        .send({ from: accounts[0] })

    } catch (err) {

    }
  }

  render() {
    return (
      <Layout>
				<h3>Create a Request</h3>

				<Form onSubmit={this.onSubmit}>
					<Form.Field>
						<label>Description</label>
            <Input 
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
					</Form.Field>

					<Form.Field>
						<label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
					</Form.Field>

          <Form.Field>
            <label>Receipent</label>
            <Input
              value={this.state.receipent}
              onChange={event => this.setState({ receipent: event.target.value })}
            />
          </Form.Field>

          <Button primary>Create!        </Button>

				</Form>
			</Layout>
    )
  }
}

export default RequestsNew