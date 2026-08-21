import { ResourceState } from './ResourceStates.jsx'
import useResource from './useResource.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const { data, loading, error } = useResource(endpoint)
  return <><p className="eyebrow">THE COMMUNITY</p><h1 className="page-title">Athletes</h1><p className="page-description">Meet the people making progress alongside you.</p><ResourceState loading={loading} error={error} empty={!data.length}><div className="data-grid">{data.map((user) => <article className="data-card" key={user._id}><span className="avatar">{user.name?.slice(0, 1).toUpperCase()}</span><h2>{user.name}</h2><p>{user.profile?.goal ?? 'Goal not set'}</p><small>{user.profile?.fitnessLevel ?? 'Fitness level not set'} · {user.email}</small></article>)}</div></ResourceState></>
}