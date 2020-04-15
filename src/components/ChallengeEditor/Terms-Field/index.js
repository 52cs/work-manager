import React from 'react'
import PropTypes from 'prop-types'
import Select from '../../Select'
import cn from 'classnames'
import styles from './Terms-Field.module.scss'

const TermsField = ({ terms, challenge, onUpdateMultiSelect }) => {
  const mapOps = item => ({ label: item.title, value: item.id })
  const selectedTerms = challenge.terms ? challenge.terms.map(term => term.id) : challenge.termsIds
  return (
    <div className={styles.row}>
      <div className={cn(styles.field, styles.col1)}>
        <label htmlFor='terms'>Terms  :</label>
      </div>
      <div className={cn(styles.field, styles.col2)}>
        <input type='hidden' />
        <Select
          id='track-select'
          multi
          options={terms.map(mapOps)}
          simpleValue
          value={selectedTerms}
          onChange={(value) => onUpdateMultiSelect(value, 'termsIds')}
        />
      </div>
    </div>
  )
}

TermsField.defaultProps = {
  terms: []
}

TermsField.propTypes = {
  challenge: PropTypes.shape().isRequired,
  terms: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onUpdateMultiSelect: PropTypes.func.isRequired
}

export default TermsField
