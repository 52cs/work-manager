const DEV_API_HOSTNAME = 'https://api.topcoder-dev.com'

module.exports = {
  ACCOUNTS_APP_CONNECTOR_URL: 'https://accounts.topcoder-dev.com/connector.html',
  ACCOUNTS_APP_LOGIN_URL: 'https://accounts.topcoder-dev.com/member',
  COMMUNITY_APP_URL: 'https://www.topcoder-dev.com',
  MEMBER_API_URL: `${DEV_API_HOSTNAME}/v4/members`,
  MEMBER_API_V3_URL: `${DEV_API_HOSTNAME}/v3/members`,
  DEV_APP_URL: 'http://local.topcoder-dev.com',
  CHALLENGE_API_URL: `${DEV_API_HOSTNAME}/v5/challenges`,
  CHALLENGE_TIMELINE_TEMPLATES_URL: `${DEV_API_HOSTNAME}/v5/timeline-templates`,
  CHALLENGE_TYPES_URL: `${DEV_API_HOSTNAME}/v5/challenge-types`,
  CHALLENGE_PHASES_URL: `${DEV_API_HOSTNAME}/v5/challenge-phases`,
  PROJECT_API_URL: `${DEV_API_HOSTNAME}/v5/projects`,
  GROUPS_API_URL: `${DEV_API_HOSTNAME}/v5/groups`,
  TERMS_API_URL: `${DEV_API_HOSTNAME}/v5/terms`,
  RESOURCES_API_URL: `${DEV_API_HOSTNAME}/v5/resources`,
  RESOURCE_ROLES_API_URL: `${DEV_API_HOSTNAME}/v5/resource-roles`,
  PLATFORMS_V4_API_URL: `${DEV_API_HOSTNAME}/v4/platforms`,
  TECHNOLOGIES_V4_API_URL: `${DEV_API_HOSTNAME}/v4/technologies`,
  CONNECT_APP_URL: 'https://connect.topcoder-dev.com',
  /* Filestack configuration for uploading attachments
   * These are for the development back end */
  FILESTACK: {
    API_KEY: 'AzFINuQoqTmqw0QEoaw9az',
    REGION: 'us-east-1',
    SUBMISSION_CONTAINER: 'topcoder-dev-submissions-dmz'
  }
}
