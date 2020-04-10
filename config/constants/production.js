import DEV_API_HOSTNAME from './development'
const PROD_API_HOSTNAME = 'https://api.topcoder.com'

module.exports = {
  ACCOUNTS_APP_CONNECTOR_URL: process.env.ACCOUNTS_APP_CONNECTOR_URL || 'https://accounts.topcoder.com/connector.html',
  ACCOUNTS_APP_LOGIN_URL: 'https://accounts.topcoder.com/member',
  COMMUNITY_APP_URL: 'https://www.topcoder.com',
  MEMBER_API_URL: `${PROD_API_HOSTNAME}/v4/members`,
  MEMBER_API_V3_URL: `${PROD_API_HOSTNAME}/v3/members`,
  DEV_APP_URL: 'https://submission-review.topcoder.com',
  CHALLENGE_API_URL: `${PROD_API_HOSTNAME}/v5/challenges`,
  CHALLENGE_TIMELINE_TEMPLATES_URL: `${PROD_API_HOSTNAME}/v5/timelinetemplates`,
  CHALLENGE_TYPES_URL: `${PROD_API_HOSTNAME}/v5/challengetypes`,
  CHALLENGE_PHASES_URL: `${PROD_API_HOSTNAME}/v5/challengephases`,
  PROJECT_API_URL: `${PROD_API_HOSTNAME}/v5/projects`,
  GROUPS_API_URL: `${PROD_API_HOSTNAME}/v5/groups`,
  PLATFORMS_V4_API_URL: `${DEV_API_HOSTNAME}/v4/platforms`,
  TECHNOLOGIES_V4_API_URL: `${DEV_API_HOSTNAME}/v4/technologies`
}
