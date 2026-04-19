import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: any) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    // TEMP (no backend yet)
    console.log("Email:", email)
    console.log("Password:", password)

    alert("Login button works ✅")
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT SIDE */}
      <div style={{
        width: "50%",
        background: "#2c6f8f",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
        fontWeight: "bold"
      }}>
        GAMA FLOW
      </div>

      {/* RIGHT SIDE */}
      <div style={{
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{
          padding: "40px",
          borderRadius: "20px",
          background: "#f2f2f2",
          width: "300px",
          textAlign: "center"
        }}>

          <h2>Welcome Back</h2>
          <p>Sign in to continue</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#2c6f8f",
                color: "white",
                border: "none",
                borderRadius: "10px"
              }}
            >
              LOGIN
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}