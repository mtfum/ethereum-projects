import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import { Button, Table } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'

class RequestIndex extends Component {

  static async getInitialProps(props) {
    const { address } = props.query
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call()
      })
    )

    console.log(requests)

    return { address, requests, requestCount }
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      return <RequestRow
        key={index}
        id={index}
        request={request}
        address={this.props.address}
      />
    })
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table

    return <Layout>
				<h3>Request List</h3>
				<Link route={`/campaigns/${this.props.address}/requests/new`}>
					<a>
						<Button primary>Add Request</Button>
					</a>
				</Link>
				<Table>
					<Header>
						<Row>
							<HeaderCell>ID</HeaderCell>
							<HeaderCell>Description</HeaderCell>
							<HeaderCell>Amount</HeaderCell>
							<HeaderCell>Receipient</HeaderCell>
							<HeaderCell>Approval Caount</HeaderCell>
							<HeaderCell>Approve</HeaderCell>
							<HeaderCell>Finalize</HeaderCell>
						</Row>
					</Header>
          <Body>
            {this.renderRow()}
          </Body>
				</Table>
			</Layout>;
  }
}

export default RequestIndex