import React from 'react'
import { NavigationComponent } from "../../components/HomePageComponents"
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/DashboardComponents/Navbar/Navbar'

const DashboardPage = () => {

  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn){
      navigate("/")
    }
  },[]);

  return (
    <>
    {/* <NavigationComponent /> */}

    <Navbar />
    </>
  )
}

export default DashboardPage