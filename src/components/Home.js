import React from 'react'
import Link from 'redux-first-router-link'

const Home = () =>
  <div>
    <h1>/home</h1>
    <Link to={{ type: 'router/ADMIN' }}>Go to admin</Link>
  </div>

export default Home
