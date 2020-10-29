/**
 * Topcoder related utilities
 */
import { MARATHON_MATCH_SUBTRACKS, CHALLENGE_TRACKS, ALLOWED_USER_ROLES, ADMIN_ROLES } from '../config/constants'
import _ from 'lodash'
import { decodeToken } from 'tc-auth-lib'

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
