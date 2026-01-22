import React, { useEffect } from 'react'
import Mainrouter from './Mainrouter.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from './store/actions/useraction.jsx'


const App = () => {
  const dispacth = useDispatch()

  useEffect(() => {
    dispacth(authenticateUser())

  }, [])

  return (
    <>

      <Mainrouter />
    </>
  )
}

export default App

