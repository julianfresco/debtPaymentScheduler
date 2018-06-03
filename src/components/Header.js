import React from 'react'
import { blue, white } from '../utils/constants'

const Header = () => {

  return (
    <header style={{
      backgroundColor: blue,
      margin: 0,
      padding: '1em 2em',
      color: white,
    }}>
      <h1>
        Debt Payment Scheduler &nbsp;
        <small style={{
          fontSize: '0.8rem',
          fontWeight: '100'
        }}>
          See when you'll be debt-free
        </small>
      </h1>
    </header>
  )
}

export default Header
