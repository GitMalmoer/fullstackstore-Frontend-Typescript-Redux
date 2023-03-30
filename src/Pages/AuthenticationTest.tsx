import React from 'react'
import { withAuth } from '../HOC'

function AuthenticationTest() {
  return (
    <div>AuthenticationTest This page can be accessed by any loged in user</div>
  )
}

export default withAuth(AuthenticationTest);