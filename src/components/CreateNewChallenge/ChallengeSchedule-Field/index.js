import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ChallengeSchedule-Field.module.scss'
import cn from 'classnames'
import PhaseInput from '../../PhaseInput'
import Select from '../../Select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

class ChallengeScheduleField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEdit: false,
      currentTemplate: ''
    }
    this.toggleEditMode = this.toggleEditMode.bind(this)
  }

  toggleEditMode () {
    const { isEdit } = this.state
    this.setState({ isEdit: !isEdit })
  }

  renderTimeLine () {
    const { challenge } = this.props
    return (
      <React.Fragment>
        <div className={styles.row}>
          <div className={styles.timeline}>
            {
              _.map(challenge.phases, p => (
                <div className={styles.phase} key={p.name}>
                  <div className={styles.circle}>&nbsp;</div>
                  <span>{p.name}</span>
                  {
                    !_.isEmpty(p.date) && !_.isEmpty(p.time) && (
                      <span>{p.date}, {p.time}</span>
                    )
                  }
                </div>
              ))
            }
          </div>
        </div>
      </React.Fragment>
    )
  }

  renderPhaseEditor () {
    const { challenge, onUpdateSelect, onUpdatePhaseDate, onUpdatePhaseTime } = this.props
    return (
      _.map(challenge.phases, (p, index) => <PhaseInput phase={p} key={p.name} onUpdateSelect={onUpdateSelect} index={index} onUpdatePhaseDate={onUpdatePhaseDate} onUpdatePhaseTime={onUpdatePhaseTime} />)
    )
  }

  render () {
    const { isEdit, currentTemplate } = this.state
    const { templates, isOpenAdvanceSettings } = this.props
    return (
      <div className={styles.container}>
        {
          isEdit && !isOpenAdvanceSettings && (
            <hr className={styles.breakLine} />
          )
        }
        <div className={styles.row}>
          <div className={cn(styles.field, styles.col1)}>
            <label htmlFor={`challengeSchedule`}>Challenge Schedule :</label>
          </div>
          <div className={cn(styles.field, styles.col2)} onClick={this.toggleEditMode}>
            <div className={cn(styles.editButton, { [styles.active]: isEdit })}>
              <span>Edit</span>
              <FontAwesomeIcon className={cn(styles.icon, { [styles.active]: isEdit })} icon={faAngleDown} />
            </div>
          </div>
        </div>
        {
          !isEdit && this.renderTimeLine()
        }
        {
          isEdit && (
            <React.Fragment>
              <div className={cn(styles.row, styles.flexStart)}>
                <div className={cn(styles.field, styles.col1)}>
                  <label htmlFor={'notitle'}>&nbsp;</label>
                </div>
                <div className={cn(styles.field, styles.col2)}>
                  <div className={styles.templates}>
                    <Select
                      name='template'
                      options={templates}
                      placeholder='Import Timeline from Templates'
                      labelKey='name'
                      valueKey='name'
                      clearable={false}
                      value={currentTemplate}
                      onChange={(e) => this.setState({
                        currentTemplate: e
                      })}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          )
        }
        {
          isEdit && this.renderPhaseEditor()
        }
        <div className={cn(styles.row, styles.timezone)}>
          <span>Timezone:Europe/Athens</span>
        </div>
      </div>
    )
  }
}

ChallengeScheduleField.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  challenge: PropTypes.shape().isRequired,
  onUpdateSelect: PropTypes.func.isRequired,
  isOpenAdvanceSettings: PropTypes.bool.isRequired,
  onUpdatePhaseDate: PropTypes.func.isRequired,
  onUpdatePhaseTime: PropTypes.func.isRequired
}

export default ChallengeScheduleField
