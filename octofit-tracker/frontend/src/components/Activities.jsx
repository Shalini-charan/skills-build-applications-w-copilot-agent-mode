import { ResourceState } from './ResourceStates.jsx'
import useResource from './useResource.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

export default function Activities() {
  const { data, loading, error } = useResource(endpoint)
  return <ResourcePage title="Activities" eyebrow="TRAINING LOG" description="A clear view of the work you have put in."><ResourceState loading={loading} error={error} empty={!data.length}><div className="data-grid">{data.map((activity) => <article className="data-card" key={activity._id}><span className="card-kicker">{activity.type}</span><h2>{activity.durationMinutes} min session</h2><p>{activity.caloriesBurned} calories burned{activity.distanceKm ? ` · ${activity.distanceKm} km` : ''}</p><small>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Date unavailable'}</small></article>)}</div></ResourceState></ResourcePage>
}

function ResourcePage({ title, eyebrow, description, children }) { return <><p className="eyebrow">{eyebrow}</p><h1 className="page-title">{title}</h1><p className="page-description">{description}</p>{children}</> }