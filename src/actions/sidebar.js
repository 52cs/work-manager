/**
 * Sidebar related redux actions
 */
import { fetchMemberProjects } from '../services/projects'
import { SET_ACTIVE_PROJECT, LOAD_PROJECTS_FAILURE, LOAD_PROJECTS_PENDING, LOAD_PROJECTS_SUCCESS, RESET_SIDEBAR_ACTIVE_PARAMS } from '../config/constants'

/**
 * Set active project
 */
export function setActiveProject (projectId) {
  return (dispatch, getState) => {
    if (getState().sidebar.activeProjectId === projectId) return
    dispatch({
      type: SET_ACTIVE_PROJECT,
      projectId: getState().sidebar.activeProjectId === projectId ? -1 : projectId
    })
  }
}

/**
 * Loads projects of the authenticated user
 */
export function loadProjects () {
  return (dispatch) => {
    dispatch({
      type: LOAD_PROJECTS_PENDING
    })

    fetchMemberProjects().then(projects => dispatch({
      type: LOAD_PROJECTS_SUCCESS,
      projects
    })).catch(() => dispatch({
      type: LOAD_PROJECTS_FAILURE
    }))
  }
}

/**
 * Reset active params. e.g activeProjectId
 */
export function resetSidebarActiveParams () {
  return (dispatch) => {
    dispatch({
      type: RESET_SIDEBAR_ACTIVE_PARAMS
    })
  }
}
