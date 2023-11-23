import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavProfile } from '../../components'

export const Profile = () => {
  return (
    <>
      <NavProfile/>
      <Outlet/>
    </>
  )
}
