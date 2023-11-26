import React from 'react'
import { Outlet } from 'react-router-dom'
import { FavPlayerGallery, NavProfile } from '../../components'

export const Profile = () => {
  return (
    <>
      <NavProfile/>
      <Outlet/>
      <FavPlayerGallery/>
    </>
  )
}
