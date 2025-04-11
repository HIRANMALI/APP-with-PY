// app/page.tsx or any client component
'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    axios.get('http://localhost:8000/auth/check_auth', {
      withCredentials: true
    })
    .then((res) => {
      if (res.data.isAuthenticated) {
        setUserName(res.data.name)
      }
    })
    .catch(() => {
      setUserName(null)
    })
  }, [])

  return (
    <div>
      {userName ? (
        <h2>Welcome, {userName}!</h2>
      ) : (
        <h2>Welcome, Guest</h2>
      )}
    </div>
  )
}
