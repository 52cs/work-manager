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
      <div className={styles.title}>Challenge Editor</div>
      <Link to='/'>
        <div className={cn(styles.homeLink, { [styles.active]: !projectId })} onClick={resetSidebarActiveParams}>
          Active challenges
        </div>
      </Link>
    </div>
  )
}

Sidebar.propTypes = {
  projectId: PropTypes.string,
  resetSidebarActiveParams: PropTypes.func
}

export default Sidebar
