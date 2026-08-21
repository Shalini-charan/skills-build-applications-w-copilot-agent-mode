import { ResourceState } from './ResourceStates.jsx'
import useResource from './useResource.js'

export default function Teams() {
  const { data, loading, error } = useResource('teams')
  return <><p className="eyebrow">FIND YOUR PEOPLE</p><h1 className="page-title">Teams</h1><p className="page-description">Train together, stay accountable, go further.</p><ResourceState loading={loading} error={error} empty={!data.length}><div className="data-grid">{data.map((team) => <article className="data-card" key={team._id}><span className="card-kicker">{team.members?.length ?? 0} members</span><h2>{team.name}</h2><p>{team.description}</p><small>Captain: {team.captain?.name ?? team.captain ?? 'Not assigned'}</small></article>)}</div></ResourceState></>
}