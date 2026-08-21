import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">OctoFit <span>Tracker</span></NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {[
            ['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'],
            ['/teams', 'Teams'], ['/users', 'Users'], ['/workouts', 'Workouts'],
          ].map(([path, label]) => <NavLink key={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={path}>{label}</NavLink>)}
        </nav>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return <section className="overview"><p className="eyebrow">YOUR TRAINING HQ</p><h1>Move with purpose.</h1><p className="lead">Track momentum, find your team, and make every session count.</p><div className="overview-links"><NavLink className="button-primary" to="/activities">Log activity <span aria-hidden="true">→</span></NavLink><NavLink className="button-secondary" to="/workouts">Browse workouts</NavLink></div></section>
}

export default App
