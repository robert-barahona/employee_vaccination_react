import React from "react"
import { LoginContainer } from "./components"

export const LoginPage = React.memo(() => {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center h-full">
        <div className="col-10 col-sm-7 col-lg-5 col-xl-4 align-self-center">
          <LoginContainer />
        </div>
      </div>
    </div>
  )
})
