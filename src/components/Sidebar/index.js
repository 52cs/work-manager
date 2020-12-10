/**
 * Component to render sidebar of app
 */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cn from 'classnames'
import TopcoderLogo from '../../assets/images/topcoder-logo.png'
import styles from './Sidebar.module.scss'

const Sidebar = ({
  projectId, resetSidebarActiveParams
}) => {
  return (
    <div className={styles.sidebar}>
      <img src={TopcoderLogo} className={styles.logo} />
      <div className={styles.title}>Work Manager</div>
      <Link to='/'>
        <div className={cn(styles.homeLink, { [styles.active]: !projectId })} onClick={resetSidebarActiveParams}>
          All Work
        </div>
      </Link>
      <a href='https://github.com/topcoder-platform/work-manager/issues/new' target='_blank' rel='noopener noreferrer' className='chameleon-feedback'>
        <div className={cn(styles.homeLink, { [styles.active]: !projectId })}>
          Give Application Feedback
        </div>
      </a>
      <p className={styles.supportLink}>
        Have an urgent issue?<br />
        E: <a href='mailto:support@topcoder.com'>support@topcoder.com</a>
      </p>
    </div>
  )
}

Sidebar.propTypes = {
  projectId: PropTypes.string,
  resetSidebarActiveParams: PropTypes.func
}

export default Sidebar
