/**
 * Component to render list of challenges
 */
import { debounce, map } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DebounceInput } from 'react-debounce-input'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Pagination from 'react-js-pagination'
import cn from 'classnames'

import { PrimaryButton } from '../../Buttons'
import Modal from '../../Modal'
import 'react-tabs/style/react-tabs.css'
import styles from './ChallengeList.module.scss'
import NoChallenge from '../NoChallenge'
import ChallengeCard from '../ChallengeCard'
import Message from '../Message'

import {
  CHALLENGE_STATUS
} from '../../../config/constants'

require('bootstrap/scss/bootstrap.scss')

const theme = {
  container: styles.modalContainer
}

class ChallengeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: this.props.filterChallengeName,
      errorMessage: null
    }
    this.directUpdateSearchParam = this.updateSearchParam.bind(this) // update search param without debounce
    this.handlePageChange = this.handlePageChange.bind(this) // update search param without debounce
    this.showError = this.showError.bind(this)
    this.hideError = this.hideError.bind(this)
    this.reloadChallengeList = this.reloadChallengeList.bind(this)
    this.updateSearchParam = debounce(this.updateSearchParam.bind(this), 1000)
  }

  /**
   * Update filter for getting project
   * @param {String} searchText search text
   * @param {String} projectStatus project status
   */
  updateSearchParam (searchText, projectStatus) {
    const { status, filterChallengeName, loadChallengesByPage, activeProjectId, selfService } = this.props
    this.setState({ searchText }, () => {
      if (status !== projectStatus || searchText !== filterChallengeName) {
        loadChallengesByPage(1, activeProjectId, projectStatus, searchText, selfService)
      }
    })
  }

  /**
   * Update filter for getting project by pagination
   * @param {Number} pageNumber page numer
   */
  handlePageChange (pageNumber) {
    const { searchText } = this.state
    const { page, loadChallengesByPage, activeProjectId, status, selfService } = this.props
    if (page !== pageNumber) {
      loadChallengesByPage(pageNumber, activeProjectId, status, searchText, selfService)
    }
  }

  /**
   * Reload challenge list
   */
  reloadChallengeList () {
    const { searchText } = this.state
    const { page, loadChallengesByPage, activeProjectId, status, selfService } = this.props
    loadChallengesByPage(page, activeProjectId, status, searchText, selfService)
  }

  /**
   * Show error message
   * @param {String} errorMessage error message
   */
  showError (errorMessage) {
    this.setState({ errorMessage })
  }

  /**
   * Hide error message
   */
  hideError () {
    this.setState({ errorMessage: null })
  }

  getStatusTextFunc (selfService) {
    const draftText = selfService ? 'Waiting for approval' : 'Draft'
    return (status) => {
      switch (status) {
        case CHALLENGE_STATUS.DRAFT:
          return draftText
        default:
          return status
      }
    }
  }

  render () {
    const { searchText, errorMessage } = this.state
    const {
      activeProject,
      warnMessage,
      challenges,
      status,
      page,
      perPage,
      totalChallenges,
      partiallyUpdateChallengeDetails,
      deleteChallenge,
      isBillingAccountExpired,
      selfService
    } = this.props
    if (warnMessage) {
      return <Message warnMessage={warnMessage} />
    }

    let selectedTab = 0
    switch (status) {
      case CHALLENGE_STATUS.NEW:
        selectedTab = 1
        break
      case CHALLENGE_STATUS.DRAFT:
        selectedTab = selfService ? 1 : 2
        break
      case CHALLENGE_STATUS.COMPLETED:
        selectedTab = 3
        break
      case CHALLENGE_STATUS.CANCELLED:
        selectedTab = 4
        break
    }

    let warningModal = null
    if (errorMessage) {
      warningModal = <Modal theme={theme} onCancel={this.hideError}>
        <div className={cn(styles.contentContainer, styles.confirm)}>
          <div className={styles.title}>Error</div>
          {errorMessage}
          <div className={styles.buttonGroup}>
            <div className={styles.buttonSizeA}>
              <PrimaryButton
                text={'Close'}
                type={'info'}
                onClick={this.hideError}
              />
            </div>
          </div>
        </div>
      </Modal>
    }

    return (
      <div className={styles.list}>
        <div className={styles.row}>
          <DebounceInput
            className={styles.challengeInput}
            minLength={2}
            debounceTimeout={300}
            placeholder='Search Challenges'
            onChange={(e) => this.updateSearchParam(e.target.value, status)}
            value={searchText}
          />
        </div>
        {activeProject && (<Tabs
          selectedIndex={selectedTab}
          className={styles.tabsContainer}
          onSelect={(index) => {
            switch (index) {
              case 0: {
                this.directUpdateSearchParam(searchText, CHALLENGE_STATUS.ACTIVE)
                break
              }
              case 1: {
                const status = selfService ? CHALLENGE_STATUS.DRAFT : CHALLENGE_STATUS.NEW
                this.directUpdateSearchParam(searchText, status)
                break
              }
              case 2: {
                this.directUpdateSearchParam(searchText, CHALLENGE_STATUS.DRAFT)
                break
              }
              case 3: {
                this.directUpdateSearchParam(searchText, CHALLENGE_STATUS.COMPLETED)
                break
              }
              case 4: {
                this.directUpdateSearchParam(searchText, CHALLENGE_STATUS.CANCELLED)
                break
              }
            }
          }}>
          <TabList>
            <Tab>{(selfService ? 'Assigned challenges' : 'Active')}</Tab>
            {(!selfService && <Tab>New</Tab>)}
            <Tab>{this.getStatusTextFunc(selfService)(CHALLENGE_STATUS.DRAFT)}</Tab>
            {(!selfService && <Tab>Completed</Tab>)}
            {(!selfService && <Tab>Cancelled</Tab>)}
          </TabList>
          <TabPanel />
          <TabPanel />
          <TabPanel />
        </Tabs>)}
        {
          challenges.length === 0 && (
            <NoChallenge
              activeProject={activeProject}
              selfService={selfService}
            />
          )
        }
        {
          challenges.length > 0 && (
            <div className={styles.header}>
              <div className={styles.col1}>Challenges Name</div>
              <div className={styles.col2}>Last Updated</div>
              <div className={styles.col2}>Status</div>
              {(selectedTab === 0) && (<div className={styles.col3}>Current phase</div>)}
              <div className={styles.col4}>&nbsp;</div>
            </div>
          )
        }
        {
          challenges.length > 0 && (
            <ul className={styles.challengeList}>
              {
                map(challenges, (c) => {
                  return (
                    <li className={styles.challengeItem} key={`challenge-card-${c.id}`}>
                      <ChallengeCard
                        shouldShowCurrentPhase={selectedTab === 0}
                        challenge={c}
                        reloadChallengeList={this.reloadChallengeList}
                        partiallyUpdateChallengeDetails={partiallyUpdateChallengeDetails}
                        deleteChallenge={deleteChallenge}
                        isBillingAccountExpired={isBillingAccountExpired}
                        disableHover={selfService}
                        getStatusText={this.getStatusTextFunc(selfService)}
                      />
                    </li>
                  )
                })
              }
            </ul>
          )
        }
        <div className={styles.paginationContainer}>
          <Pagination
            activePage={page}
            itemsCountPerPage={perPage}
            totalItemsCount={totalChallenges}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            itemClass='page-item'
            linkClass='page-link'
          />
        </div>
        {warningModal}
      </div>
    )
  }
}

ChallengeList.defaultProps = {
}

ChallengeList.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object),
  activeProject: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  warnMessage: PropTypes.string,
  filterChallengeName: PropTypes.string,
  status: PropTypes.string,
  activeProjectId: PropTypes.number,
  loadChallengesByPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalChallenges: PropTypes.number.isRequired,
  partiallyUpdateChallengeDetails: PropTypes.func.isRequired,
  deleteChallenge: PropTypes.func.isRequired,
  isBillingAccountExpired: PropTypes.bool,
  selfService: PropTypes.bool
}

export default ChallengeList
