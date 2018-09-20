import web3 from './web3'
import CampaignFactory from './build/CampaignFactory'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xf4F06B587A9a22801B5039391fc503FC278F20dD'
)

export default instance
