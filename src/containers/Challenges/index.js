/**
 * Container to render Challenges page
 */
import _ from 'lodash'
import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ChallengesComponent from '../../components/ChallengesComponent'
import { loadChallengesByPage } from '../../actions/challenges'
import { loadProject } from '../../actions/projects'
import { resetSidebarActiveParams } from '../../actions/sidebar'
import {
  CHALLENGE_STATUS
} from '../../config/constants'

class Challenges extends Component {
  componentDidMount () {
    const { activeProjectId, filterChallengeName, resetSidebarActiveParams, menu, projectId, challenges, status, projectDetail: reduxProjectInfo } = this.props
    if (menu === 'NULL' && activeProjectId !== -1) {
      resetSidebarActiveParams()
    } else {
      const id = activeProjectId > 0 ? activeProjectId : (projectId ? parseInt(projectId) : null)
      // only load challenge if it's init state
      if (
        challenges.length === 0 ||
        status !== CHALLENGE_STATUS.ACTIVE ||
        filterChallengeName ||
        `${activeProjectId}` !== `${projectId}`
      ) {
        // load first page for challenges
        this.props.loadChallengesByPage(1, id, CHALLENGE_STATUS.ACTIVE, '')
      }
      if (!reduxProjectInfo || reduxProjectInfo.id !== id) {
        this.props.loadProject(id)
      }
    }
  }

  render () {
    const {
      challenges,
      isLoading,
      warnMessage,
      filterChallengeName,
      projects,
      activeProjectId,
      status,
      projectDetail: reduxProjectInfo,
      loadChallengesByPage,
      page,
      perPage,
      totalChallenges
    } = this.props
    const projectInfo = _.find(projects, { id: activeProjectId }) || {}
    return (
      <ChallengesComponent
        activeProject={({
          ...projectInfo,
          ...((reduxProjectInfo && reduxProjectInfo.id === activeProjectId) ? reduxProjectInfo : {})
        })}
        warnMessage={warnMessage}
        challenges={challenges}
        isLoading={isLoading}
        filterChallengeName={filterChallengeName}
        status={status}
        activeProjectId={activeProjectId}
        loadChallengesByPage={loadChallengesByPage}
        page={page}
        perPage={perPage}
        totalChallenges={totalChallenges}
      />
    )
  }
}

Challenges.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape()),
  menu: PropTypes.string,
  challenges: PropTypes.arrayOf(PropTypes.object),
  projectDetail: PropTypes.object,
  isLoading: PropTypes.bool,
  loadChallengesByPage: PropTypes.func,
  loadProject: PropTypes.func.isRequired,
  projectId: PropTypes.string,
  activeProjectId: PropTypes.number,
  warnMessage: PropTypes.string,
  filterChallengeName: PropTypes.string,
  status: PropTypes.string,
  resetSidebarActiveParams: PropTypes.func,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalChallenges: PropTypes.number.isRequired
}

const mapStateToProps = ({ challenges, sidebar, projects }) => ({
  ...challenges,
  activeProjectId: sidebar.activeProjectId,
  projects: sidebar.projects,
  projectDetail: projects.projectDetail

})

const mapDispatchToProps = {
  loadChallengesByPage,
  resetSidebarActiveParams,
  loadProject
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenges)
