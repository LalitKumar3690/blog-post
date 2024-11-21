import React, {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import authServices from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import {Outlet} from "react-router-dom"
import {Header, Footer} from "./components/index"


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authServices.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  return !loading ? (
    <div>
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
