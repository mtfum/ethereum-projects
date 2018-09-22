import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
import Layout from '../components/Layout'


class CampaignIndex extends Component {

  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()

    return { campaigns }
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      }
    })

    return <Card.Group items={items} />
  }

  render() {

    return (
      <div>
        <Layout>
          <link
            rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
          />
          <h3>Open Campaign</h3>

          <Button floated="right"
            content= "Create Campaign"
            icon="add circle"
            primary
          />

          { this.renderCampaigns() }
          
        </Layout>
      </div>
    )
  }
}

export default CampaignIndex
