import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import PrizeInput from '../../PrizeInput'

import styles from './ChallengePrizes-Field.module.scss'
import cn from 'classnames'
import { PrimaryButton } from '../../Buttons'
import { CHALLENGE_PRIZE_TYPE, VALIDATION_VALUE_TYPE } from '../../../config/constants'
import { validateValue } from '../../../util/input-check'

class ChallengePrizesField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPrizeIndex: -1
    }
    this.renderPrizes = this.renderPrizes.bind(this)
    this.addNewPrize = this.addNewPrize.bind(this)
    this.removePrize = this.removePrize.bind(this)
    this.getChallengePrize = this.getChallengePrize.bind(this)
    this.onUpdateInput = this.onUpdateInput.bind(this)
  }

  addNewPrize () {
    const challengePrize = this.getChallengePrize()
    challengePrize.prizes = [...challengePrize.prizes, { type: CHALLENGE_PRIZE_TYPE.MONEY, value: 0 }]
    this.onUpdateValue(challengePrize)
  }

  removePrize (index) {
    const challengePrize = this.getChallengePrize()
    challengePrize.prizes.splice(index, 1)
    this.onUpdateValue(challengePrize)
  }

  onUpdateInput (value, index) {
    const challengePrize = this.getChallengePrize()
    challengePrize.prizes[index].value = validateValue(value, VALIDATION_VALUE_TYPE.INTEGER)
    this.onUpdateValue(challengePrize)
  }

  onUpdateValue (challengePrize) {
    const type = 'Challenge prizes'
    const { onUpdateOthers, challenge } = this.props

    onUpdateOthers({ field: 'prizeSets', value: [...challenge.prizeSets.filter(p => p.type !== type), challengePrize] })
  }

  getChallengePrize () {
    const type = 'Challenge prizes'
    return this.props.challenge.prizeSets.find(p => p.type === type) || { type, prizes: [{ type: CHALLENGE_PRIZE_TYPE.MONEY, value: 0 }] }
  }

  renderPrizes () {
    const { currentPrizeIndex } = this.state

    return _.map(this.getChallengePrize().prizes, (prize, index) => (
      <div className={styles.row} key={`${index}-${prize.amount}-edit`}>
        <div className={cn(styles.field, styles.col1)}>
          <label htmlFor={`${index}-prize`}>Prize {index + 1}:</label>
        </div>
        <div className={cn(styles.field, styles.col2)}>
          <PrizeInput
            prize={prize}
            isFocus={index === currentPrizeIndex}
            onUpdateInput={this.onUpdateInput}
            index={index} activeIndex={currentPrizeIndex} />
          {
            index > 0 && (
              <div className={styles.icon} onClick={() => this.removePrize(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </div>
            )
          }
        </div>
      </div>
    ))
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={cn(styles.field, styles.col1)}>
            <label htmlFor={`challengePrizes`}>Challenge Prizes :</label>
          </div>
        </div>
        { this.renderPrizes() }
        <div className={styles.button} onClick={this.addNewPrize}>
          <PrimaryButton text={'Add New Prize'} type={'info'} />
        </div>
      </div>
    )
  }
}

ChallengePrizesField.propTypes = {
  challenge: PropTypes.shape().isRequired,
  onUpdateOthers: PropTypes.func.isRequired
}

export default ChallengePrizesField
