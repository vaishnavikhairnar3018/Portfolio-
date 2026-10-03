import React from 'react'
import ReactDOM from 'react-dom/client'
import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'
import { IdCard } from './components/sections/IdCard'
import { Projects } from './components/sections/Projects'
import { Services } from './components/sections/Services'
import { Stats } from './components/sections/Stats'
import { Reviews } from './components/sections/Reviews'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'
import { ClickSpark } from './components/react-bits'
import './style.css'

function App() {
  return (
    <ClickSpark sparkColor={['#039cfb', '#ec68fd', '#fac900', '#34c75a']} sparkCount={8}>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <div className="creatie-paper-body">
            <IdCard />
            <Projects />
            <Services />
            <Stats />
            <Reviews />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </ClickSpark>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)