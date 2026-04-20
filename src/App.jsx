import React from 'react'
import HeroSection from './components/HeroSection'
import SmoothScroll from './components/SmoothScroll'

function App() {
  return (
    <main className="scroll-container">
      <SmoothScroll />
      <HeroSection />
    </main>
  )
}

export default App
