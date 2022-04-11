import moment from 'moment'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './PhaseInput.module.scss'
import cn from 'classnames'
import 'react-day-picker/lib/style.css'
import 'rc-time-picker/assets/index.css'
import DateTime from '@nateradebaugh/react-datetime'
import isAfter from 'date-fns/isAfter'
import subDays from 'date-fns/subDays'
import '@nateradebaugh/react-datetime/scss/styles.scss'
import DurationInput from '../DurationInput'

const dateFormat = 'MM/DD/YYYY HH:mm'
const inputDateFormat = 'MM/dd/yyyy'
const inputTimeFormat = 'HH:mm'
const MAX_LENGTH = 5

const PhaseInput = ({ onUpdatePhase, phase, readOnly, phaseIndex, isActive }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [duration, setDuration] = useState()

  useEffect(() => {
    if (phase) {
      setStartDate(phase.scheduledStartDate)
      setEndDate(phase.scheduledEndDate)
      setDuration(moment(phase.scheduledEndDate).diff(phase.scheduledStartDate, 'hours'))
    }
  }, [])

  useEffect(() => {
    if (phase) {
      setStartDate(phase.scheduledStartDate)
      setEndDate(phase.scheduledEndDate)
    }
  }, [phase])

  useEffect(() => {
    if (!readOnly) {
      onUpdatePhase({
        startDate,
        endDate,
        duration
      })
    }
  }, [startDate, endDate, duration])

  const onStartDateChange = (e) => {
    setStartDate(moment(e).format(dateFormat))
    setEndDate(moment(e).add(duration, 'hours').format(dateFormat))
  }

  const onDurationChange = (e) => {
    if (e.length > MAX_LENGTH) return null

    const dur = parseInt(e || 0)
    setDuration(dur)
    const end = moment(startDate).add(dur, 'hours')
    setEndDate(moment(end).format(dateFormat))
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={cn(styles.field, styles.col1, styles.phaseName)}>
          <label htmlFor={`${phase.name}`}>{phase.name} :</label>
        </div>
        <div className={cn(styles.field, styles.col2)}>
          <span className={styles.title}>Start Date:</span>
          <div className={styles.dayPicker}>
            {
              readOnly || !isActive ? (
                <span className={styles.readOnlyValue}>{moment(startDate).format(dateFormat)}</span>
              )
                : (
                  <DateTime
                    className={styles.dateTimeInput}
                    value={moment(startDate).format(dateFormat)}
                    onChange={onStartDateChange}
                    isValidDate={(current) => {
                      const yesterday = subDays(new Date(), 1)
                      return isAfter(current, yesterday)
                    }}
                    dateFormat={inputDateFormat}
                    timeFormat={inputTimeFormat}
                  />)}
          </div>
        </div>
        <div className={cn(styles.field, styles.col2)}>
          <span className={styles.title}>End Date:</span>
          <div className={styles.dayPicker}>
            <span className={styles.readOnlyValue}>{moment(endDate).format(dateFormat)}</span>
          </div>
        </div>
        <div className={cn(styles.field, styles.col2)}>
          <span className={styles.title}>Duration:</span>
          <div className={styles.inputField}>
            {
              readOnly ? (
                <span className={styles.readOnlyValue}>{duration}</span>
              )
                : <DurationInput
                  duration={duration}
                  name={phase.name}
                  onDurationChange={onDurationChange}
                  index={phaseIndex}
                  isActive
                />}
          </div>
        </div>
      </div>
    </div>
  )
}

PhaseInput.defaultProps = {
  endDate: null,
  readOnly: false,
  isActive: false
}

PhaseInput.propTypes = {
  phase: PropTypes.shape().isRequired,
  onUpdatePhase: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  phaseIndex: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}
export default PhaseInput
