const DOMAIN = 'topcoder.com'
const PROD_API_HOSTNAME = `https://api.${DOMAIN}`

module.exports = {
  ACCOUNTS_APP_CONNECTOR_URL: process.env.ACCOUNTS_APP_CONNECTOR_URL || `https://accounts.${DOMAIN}/connector.html`,
  ACCOUNTS_APP_LOGIN_URL: `https://accounts.${DOMAIN}/member`,
  COMMUNITY_APP_URL: `https://www.${DOMAIN}`,
  MEMBER_API_URL: `${PROD_API_HOSTNAME}/v4/members`,
  MEMBER_API_V3_URL: `${PROD_API_HOSTNAME}/v3/members`,
  DEV_APP_URL: `https://submission-review.${DOMAIN}`,
  CHALLENGE_API_URL: `${PROD_API_HOSTNAME}/v5/challenges`,
  CHALLENGE_TIMELINE_TEMPLATES_URL: `${PROD_API_HOSTNAME}/v5/timeline-templates`,
  CHALLENGE_TYPES_URL: `${PROD_API_HOSTNAME}/v5/challenge-types`,
  CHALLENGE_PHASES_URL: `${PROD_API_HOSTNAME}/v5/challenge-phases`,
  CHALLENGE_TIMELINES_URL: `${PROD_API_HOSTNAME}/v5/challenge-timelines`,
  PROJECT_API_URL: `${PROD_API_HOSTNAME}/v5/projects`,
  GROUPS_API_URL: `${PROD_API_HOSTNAME}/v5/groups`,
  TERMS_API_URL: `${PROD_API_HOSTNAME}/v5/terms`,
  RESOURCES_API_URL: `${PROD_API_HOSTNAME}/v5/resources`,
  RESOURCE_ROLES_API_URL: `${PROD_API_HOSTNAME}/v5/resource-roles`,
  PLATFORMS_V4_API_URL: `${PROD_API_HOSTNAME}/v4/platforms`,
  TECHNOLOGIES_V4_API_URL: `${PROD_API_HOSTNAME}/v4/technologies`,
  CONNECT_APP_URL: `https://connect.${DOMAIN}`,
  DIRECT_PROJECT_URL: `https://www.${DOMAIN}/direct`,
  ONLINE_REVIEW_URL: `https://software.${DOMAIN}`,
  DEFAULT_TERM_UUID: '5e217280-1413-4d4f-b183-454f348805ab', // Terms & Conditions of Use at TopCoder
  DEFAULT_NDA_UUID: '05342dcb-3405-445e-95b2-8ea2a3834b0d', // Appirio NDA v2.0
  SUBMITTER_ROLE_UUID: '732339e7-8e30-49d7-9198-cccf9451e221'
}
