"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {Moon, Sun } from 'lucide-react'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun size={20} color="#a6a0a0" />
      ) : (
        <Moon size={20} color="#a6a0a0" />
      )}
    </div>
  );
}

export default ThemeSwitch