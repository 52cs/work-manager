/**
 * Topcoder related utilities
 */
import { MARATHON_MATCH_SUBTRACKS, CHALLENGE_TRACKS, ALLOWED_USER_ROLES, ADMIN_ROLES, SUBMITTER_ROLE_UUID } from '../config/constants'
import _ from 'lodash'
import { decodeToken } from 'tc-auth-lib'
import { fetchResources, fetchResourceRoles } from '../services/challenges'
import store from '../config/store'

export const RATING_COLORS = [{
  color: '#9D9FA0' /* Grey */,
  limit: 900
}, {
  color: '#69C329' /* Green */,
  limit: 1200
}, {
  color: '#616BD5' /* Blue */,
  limit: 1500
}, {
  color: '#FCD617' /* Yellow */,
  limit: 2200
}, {
  color: '#EF3A3A' /* Red */,
  limit: Infinity
}]

/**
 * Given user rating returns corresponding rating level (from 1 to 5, both
 * inclusive). The rating levels are used to group members into categories
 * by their performance, and to assign colors to their handles.
 * @param {Number} rating
 * @return {Number} Rating level.
 */
export function getRatingLevel (rating) {
  if (rating < 900) return 1
  if (rating < 1200) return 2
  if (rating < 1500) return 3
  if (rating < 2200) return 4
  return 5
}

/**
 * Sort list
 * @param {Array} list list need to be sorted
 */
export function sortList (list, field, sort, getValue) {
  const compare = (a, b) => {
    if (a > b) {
      return 1
    }

    if (a === b) {
      return 0
    }

    return -1
  }

  list.sort((a, b) => {
    let valueForAB = {}
    valueForAB = getValue(a, b)
    let { valueA, valueB } = valueForAB
    const { valueIsString } = valueForAB
    if (valueIsString) {
      if (_.isNil(valueA)) {
        valueA = ''
      }
      if (_.isNil(valueB)) {
        valueB = ''
      }
    } else {
      if (_.isNil(valueA)) {
        valueA = 0
      }
      if (_.isNil(valueB)) {
        valueB = 0
      }
    }
    if (sort === 'desc') {
      return compare(valueB, valueA)
    }

    return compare(valueA, valueB)
  })
}
/**
 * Given a rating value, returns corresponding color.
 * @param {Number} rating Rating.
 * @return {String} Color.
 */
export function getRatingColor (rating) {
  let i = 0; const r = Number(rating)
  while (RATING_COLORS[i].limit <= r) i += 1
  return RATING_COLORS[i].color || 'black'
}

/**
 * ********** UNUSED ************************
 *
 * Handle special subtrack DEVELOP_MARATHON_MATCH
 * @param {String} track
 * @param {String} subTrack
 * @returns {String} track
 */
export function fixedTrack (track, subTrack) {
  return MARATHON_MATCH_SUBTRACKS.includes(subTrack) ? CHALLENGE_TRACKS.DATA_SCIENCE : track
}

/**
 * Checks if role is present in allowed roles
 * @param  roles
 */
export const checkAllowedRoles = (roles) => roles.some(val => ALLOWED_USER_ROLES.indexOf(val.toLowerCase()) > -1)

/**
 * Checks if token has any of the admin roles
 * @param  token
 */
export const checkAdmin = (token) => {
  const roles = _.get(decodeToken(token), 'roles')
  return roles.some(val => ADMIN_ROLES.indexOf(val.toLowerCase()) > -1)
}

/**
 * Get resource role by name
 *
 * @param {Object[]} resourceRoles list of resource roles
 * @param {String}   name          resource role name
 *
 * @returns {Object} resource role or `null`
 */
export const getResourceRoleByName = (resourceRoles, name) => {
  // there are multiple junk resource roles with 'Submitter' name,
  // so we use `id` from config to find the correct one
  if (name === 'Submitter') {
    return _.find(resourceRoles, { id: SUBMITTER_ROLE_UUID }) || null
  } else {
    return _.find(resourceRoles, { name }) || null
  }
}

/**
 * check edit permission
 * @param {number}   challengeId  challenge Id
 *
 * @returns {boolean} hasPermission
 */
export const checkChallengeEditPermission = async (challengeId) => {
  const state = store.getState()
  const token = state.auth.token
  const loggedInUser = state.auth.user
  const hasProjectAccess = state.projects.hasProjectAccess

  const isAdmin = checkAdmin(token)
  if (isAdmin) {
    return true
  }
  if (!hasProjectAccess) {
    return false
  }

  return Promise.all([fetchResources(challengeId), fetchResourceRoles()]).then(
    ([challengeResources, resourceRoles]) => {
      const userRoles = _.filter(
        challengeResources,
        cr => cr.memberId === `${loggedInUser.userId}`
      )
      const userResourceRoles = _.filter(resourceRoles, rr =>
        _.some(userRoles, ur => ur.roleId === rr.id)
      )
      return _.some(
        userResourceRoles,
        urr => urr.fullWriteAccess && urr.isActive
      )
    }
  )
}
