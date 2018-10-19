import web3 from './web3'
import CampaignFactory from './build/CampaignFactory'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xe23a8aDEd3C29A92F7d1067025a4b61F5D079c32'
)

export default instance
