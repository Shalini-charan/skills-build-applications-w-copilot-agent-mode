import { ResourceState } from './ResourceStates.jsx'
import useResource from './useResource.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  const { data, loading, error } = useResource(endpoint)
  return <><p className="eyebrow">YOUR NEXT SESSION</p><h1 className="page-title">Workouts</h1><p className="page-description">A library of sessions designed to keep you moving.</p><ResourceState loading={loading} error={error} empty={!data.length}><div className="data-grid">{data.map((workout) => <article className="data-card" key={workout._id}><span className="card-kicker">{workout.type} · {workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.description}</p><small>{workout.durationMinutes} minutes · {workout.exercises?.length ?? 0} exercises</small></article>)}</div></ResourceState></>
}