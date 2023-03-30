import React from 'react'
import withAdminAuth from '../HOC/withAdminAuth'

function AuthenticationTestAdmin() {
  return (
    <div>AuthenticationTestAdmin This page can be accessed by admin</div>
  )
}

export default withAdminAuth(AuthenticationTestAdmin);