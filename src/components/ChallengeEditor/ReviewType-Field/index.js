import React from 'react'
import PropTypes from 'prop-types'
import Select from '../../Select'
import cn from 'classnames'
import styles from './ReviewType-Field.module.scss'
import Tooltip from '../../Tooltip'
import { DES_TRACK_ID, REVIEW_TYPES, MESSAGE } from '../../../config/constants'

const ReviewTypeField = ({ reviewers, challenge, onUpdateOthers, onUpdateSelect }) => {
  const isDesignChallenge = challenge.trackId === DES_TRACK_ID
  const defaultReviewType = isDesignChallenge ? REVIEW_TYPES.INTERNAL : REVIEW_TYPES.COMMUNITY
  const reviewType = challenge.reviewType ? challenge.reviewType.toLowerCase() : defaultReviewType
  const isCommunity = reviewType === REVIEW_TYPES.COMMUNITY
  const isInternal = reviewType === REVIEW_TYPES.INTERNAL
  const communityOption = (disabled) => (<div className={styles.tcRadioButton}>
    <input
      name='community'
      type='radio'
      id='community'
      checked={isCommunity}
      disabled={disabled}
      onChange={(e) => e.target.checked && onUpdateOthers({ field: 'reviewType', value: 'community' })}
    />
    <label htmlFor='community'>
      <div className={styles.radioButtonLabel}>
        Community
      </div>
      <input type='hidden' />
    </label>
  </div>)
  return (
    <div>
      <div className={styles.row}>
        <div className={cn(styles.field, styles.col1)}>
          <label htmlFor='reviewType'>Reviewer <span>*</span> :</label>
        </div>
        <div className={cn(styles.field, styles.col2)}>
          <div className={styles.subGroup}>
            <div className={styles.subRow}>
              { isDesignChallenge &&
                <Tooltip content={MESSAGE.COMMUNITY_REVIEW_DISABLED}>
                  { communityOption(true) }
                </Tooltip>
              }
              { !isDesignChallenge &&
                communityOption()
              }
            </div>
            <div className={styles.subRow}>
              <div className={styles.tcRadioButton}>
                <input
                  name='internal'
                  type='radio'
                  id='internal'
                  checked={isInternal}
                  onChange={(e) => e.target.checked && onUpdateOthers({ field: 'reviewType', value: 'internal' })}
                />
                <label htmlFor='internal'>
                  <div className={styles.radioButtonLabel}>
                    Internal
                  </div>
                  <input type='hidden' />
                </label>
              </div>
              {
                isInternal && (
                  <Select
                    name='reviewer'
                    options={reviewers}
                    placeholder='Select Reviewer'
                    labelKey='handle'
                    valueKey='handle'
                    clearable={false}
                    value={challenge.reviewer}
                    onChange={(e) => onUpdateSelect(e.handle, false, 'reviewer')}
                    disabled={false}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
      {challenge.submitTriggered && isInternal && !challenge.reviewer && <div className={cn(styles.field, styles.row, styles.error)}>
        Select a reviewer
      </div>}
    </div>
  )
}

ReviewTypeField.defaultProps = {
  reviewers: []
}

ReviewTypeField.propTypes = {
  reviewers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  challenge: PropTypes.shape().isRequired,
  onUpdateOthers: PropTypes.func.isRequired,
  onUpdateSelect: PropTypes.func.isRequired
}

export default ReviewTypeField
