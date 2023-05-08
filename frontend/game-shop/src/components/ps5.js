import React, { useContext } from 'react'
import { AppContext } from '../App'

function ps5() {
    const {storeData, persone} = useContext(AppContext)
    const url = 'http://127.0.0.1:8000/ps5'
    console.log(storeData)
  return (

  )
}

export default ps5