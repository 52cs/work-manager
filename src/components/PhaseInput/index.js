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

const dateFormat = 'MM/DD/YYYY HH:mm'
const MAX_LENGTH = 5

const PhaseInput = ({ onUpdatePhase, phase, readOnly, phaseIndex }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [duration, setDuration] = useState()

  useEffect(() => {
    if (phase) {
      setStartDate(phase.scheduledStartDate)
      setEndDate(phase.scheduledEndDate)
      setDuration(moment(phase.scheduledEndDate).diff(phase.scheduledStartDate, 'seconds'))
    }
  }, [])

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
    const start = moment(e).format()
    let end = moment(endDate).format()

    if (moment(end).isBefore(moment(start))) {
      end = moment(e).add(1, 'day').format(dateFormat)
      setEndDate(moment(end).format(dateFormat))
    }

    setStartDate(moment(e).format(dateFormat))
    setDuration(moment(end).diff(start, 'seconds'))
  }

  const onEndDateChange = (e) => {
    const end = moment(e).format()
    const start = moment(startDate).format()

    if (moment(end).isBefore(moment(start))) {
      return null
    }

    setEndDate(moment(e).format(dateFormat))
    setDuration(moment(end).diff(start, 'seconds'))
  }

  const onDurationChange = (e) => {
    if (e.target.value.length > MAX_LENGTH) return null

    const dur = parseInt(e.target.value || 0)
    setDuration(dur)
    const end = moment(startDate).add(duration, 'seconds')
    setEndDate(moment(end).format(dateFormat))
  }

  return (
    <div className={styles.container} key={phaseIndex}>
      <div className={styles.row}>
        <div className={cn(styles.field, styles.col1, styles.phaseName)}>
          <label htmlFor={`${phase.name}`}>{phase.name} :</label>
        </div>
        <div className={cn(styles.field, styles.col2)}>
          <span className={styles.title}>Start Date:</span>
          <div className={styles.dayPicker}>
            {
              readOnly ? (
                <span className={styles.readOnlyValue}>{moment(startDate).format(dateFormat)}</span>
              )
                : (
                  <DateTime
                    value={moment(startDate).format(dateFormat)}
                    onChange={onStartDateChange}
                    isValidDate={(current) => {
                      const yesterday = subDays(new Date(), 1)
                      return isAfter(current, yesterday)
                    }}
                  />)}
          </div>
        </div>
        <div className={cn(styles.field, styles.col2)}>
          <span className={styles.title}>End Date:</span>
          <div className={styles.dayPicker}>
            {
              readOnly ? (
                <span className={styles.readOnlyValue}>{moment(endDate).format(dateFormat)}</span>
              )
                : (
                  <DateTime
                    value={moment(endDate).format(dateFormat)}
                    onChange={onEndDateChange}
                    isValidDate={(current) => {
                      return isAfter(current, new Date(startDate))
                    }}
                  />)}
          </div>
        </div>
        <div className={cn(styles.field, styles.col2)}>
          <span className={styles.title}>Duration:</span>
          <div className={styles.inputField}>
            {
              readOnly ? (
                <span className={styles.readOnlyValue}>{duration}</span>
              )
                : (
                  <input
                    min={0}
                    type='number'
                    value={Number(duration).toString()}
                    onChange={onDurationChange}
                  />)}
          </div>
        </div>
      </div>
    </div>
  )
}

PhaseInput.defaultProps = {
  endDate: null,
  readOnly: false
}

PhaseInput.propTypes = {
  phase: PropTypes.shape().isRequired,
  onUpdatePhase: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  phaseIndex: PropTypes.string.isRequired
}
export default PhaseInput
