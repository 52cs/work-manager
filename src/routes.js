/**
 * Component to define routes of the app
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import _ from 'lodash'
import renderApp from './components/App'
import TopBarContainer from './containers/TopbarContainer'
import Sidebar from './containers/Sidebar'
import ChallengeList from './containers/Challenges'
import ChallengeEditor from './containers/ChallengeEditor'
import { getFreshToken, decodeToken } from 'tc-auth-lib'
import { saveToken } from './actions/auth'
import { loadChallengeDetails } from './actions/challenges'
import { connect } from 'react-redux'
import { checkAllowedRoles } from './util/tc'

const { ACCOUNTS_APP_LOGIN_URL } = process.env

class RedirectToChallenge extends React.Component {
  componentWillMount () {
    const { match, loadChallengeDetails } = this.props
    const challengeId = match.params.challengeId
    loadChallengeDetails(null, challengeId)
  }

  componentWillReceiveProps (nextProps) {
    const projectId = _.get(nextProps.challengeDetails, 'projectId')
    const challengeId = _.get(nextProps.challengeDetails, 'id')
    if (projectId && challengeId) {
      console.log('Redircting to full URL')
      this.props.history.replace(`/projects/${projectId}/challenges/${challengeId}/view`)
    }
  }

  render () {
    return <div>Redirecting...</div>
  }
}

let mapStateToProps = ({ challenges: { challengeDetails } }) => ({
  challengeDetails
})

let mapDispatchToProps = {
  loadChallengeDetails
}

RedirectToChallenge.propTypes = {
  loadChallengeDetails: PropTypes.func,
  challengeDetails: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
}

const ConnectRedirectToChallenge = connect(mapStateToProps, mapDispatchToProps)(RedirectToChallenge)

class Routes extends React.Component {
  componentWillMount () {
    this.checkAuth()
  }

  checkAuth () {
    // try to get a token and redirect to login page if it fails
    getFreshToken().then((token) => {
      this.props.saveToken(token)
    }).catch((error) => {
      console.error(error)
      const redirectBackToUrl = window.location.origin + this.props.location.pathname
      window.location = ACCOUNTS_APP_LOGIN_URL + '?retUrl=' + redirectBackToUrl
    })
  }

  render () {
    if (!this.props.isLoggedIn) {
      return null
    }

    let isAllowed = checkAllowedRoles(_.get(decodeToken(this.props.token), 'roles'))

    if (!isAllowed) {
      let warnMessage = 'You are not authorized to use this application'
      return (
        <Switch>
          <Route exact path='/'
            render={() => renderApp(
              <ChallengeList menu='NULL' warnMessage={warnMessage} />,
              <TopBarContainer />,
              <Sidebar />
            )()}
          />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Switch>
        <Route exact path='/'
          render={() => renderApp(
            <ChallengeList menu='NULL' />,
            <TopBarContainer />,
            <Sidebar />
          )()}
        />
        <Route exact path='/projects/:projectId/challenges/new'
          render={({ match }) => renderApp(
            <ChallengeEditor />,
            <TopBarContainer />,
            <Sidebar projectId={match.params.projectId} menu={'New Challenge'} />
          )()} />
        <Route exact path='/challenges/:challengeId' component={ConnectRedirectToChallenge} />
        <Route
          path='/projects/:projectId/challenges/:challengeId'
          render={({ match }) => renderApp(
            <ChallengeEditor />,
            <TopBarContainer />,
            <Sidebar projectId={match.params.projectId} menu={'New Challenge'} />
          )()} />
        <Route exact path='/projects/:projectId/challenges'
          render={({ match }) => renderApp(
            <ChallengeList projectId={match.params.projectId} />,
            <TopBarContainer projectId={match.params.projectId} />,
            <Sidebar projectId={match.params.projectId} />
          )()} />
        {/* If path is not defined redirect to landing page */}
        <Redirect to='/' />
      </Switch>
    )
  }
}

mapStateToProps = ({ auth }) => ({
  ...auth
})

mapDispatchToProps = {
  saveToken
}

Routes.propTypes = {
  saveToken: PropTypes.func,
  location: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  token: PropTypes.string
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))
