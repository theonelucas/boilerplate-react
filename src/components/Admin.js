import React from 'react'
import Link from 'redux-first-router-link'

export default () =>
  <div>
    <h1>/admin</h1>
    <Link to={{ type: 'router/HOME' }}>Go to /home</Link>
  </div>
