import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill all fields')
      return
    }

    const body = new URLSearchParams()
    body.append('username', email)
    body.append('password', password)

    try {
      setLoading(true)

      const response = await fetch('http://localhost:8000/api/v1/login/access-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed')
      }

      localStorage.setItem('access_token', data.access_token)
      alert('Login successful ✅')
    } catch (error: any) {
      setError(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8fafc',
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          width: '55%',
          background: 'linear-gradient(135deg, #2c6f8f, #1f4e68)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '46px',
            marginBottom: '16px',
            letterSpacing: '1px',
          }}
        >
          GAMA FLOW
        </h1>
  
        <p
          style={{
            maxWidth: '420px',
            fontSize: '18px',
            lineHeight: '1.6',
            opacity: 0.95,
          }}
        >
          AI-powered project management platform built for smarter planning,
          workflow visibility, and efficient delivery.
        </p>
      </div>
  
      {/* RIGHT SIDE */}
      <div
        style={{
          width: '45%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '380px',
            padding: '42px',
            borderRadius: '22px',
            background: '#ffffff',
            boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
          }}
        >
          <h2
            style={{
              margin: '0 0 8px 0',
              fontSize: '30px',
              color: '#0f172a',
            }}
          >
            Welcome Back
          </h2>
  
          <p
            style={{
              marginBottom: '24px',
              color: '#64748b',
              fontSize: '15px',
            }}
          >
            Sign in to continue
          </p>
  
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                marginBottom: '14px',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
  
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                marginBottom: '14px',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
  
            {error && (
              <p
                style={{
                  color: '#dc2626',
                  marginBottom: '14px',
                  fontSize: '14px',
                }}
              >
                {error}
              </p>
            )}
  
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: '#2c6f8f',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: '0.2s',
              }}
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login