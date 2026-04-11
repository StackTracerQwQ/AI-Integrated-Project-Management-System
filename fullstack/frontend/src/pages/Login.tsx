import { useState } from "react"
import "./login.css"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: any) => {
    e.preventDefault()
    alert("Login working ✅")
  }

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="top-left-text">
          <h1>GamaFlow</h1>
          <p>AI project management intelligence Platform</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back!</h2>
          <p className="subtitle">Sign in to continue</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              classname="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <a href="#" className="forgot">Forgot your password?</a>

            <button type="submit">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  )
}