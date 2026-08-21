import { ResourceState } from './ResourceStates.jsx'
import useResource from './useResource.js'

export default function Leaderboard() {
  const { data, loading, error } = useResource('leaderboard')
  return <><p className="eyebrow">THE RACE</p><h1 className="page-title">Leaderboard</h1><p className="page-description">Small wins add up. See who is setting the pace.</p><ResourceState loading={loading} error={error} empty={!data.length}><div className="table-wrap"><table className="table leaderboard-table"><thead><tr><th>Rank</th><th>Athlete</th><th>Team</th><th>Points</th><th>Period</th></tr></thead><tbody>{data.sort((first, second) => (first.rank ?? 0) - (second.rank ?? 0)).map((entry) => <tr key={entry._id}><td className="rank">{entry.rank}</td><td>{entry.user?.name ?? entry.user ?? 'Athlete'}</td><td>{entry.team?.name ?? entry.team ?? 'Team'}</td><td><strong>{entry.points}</strong></td><td>{entry.period}</td></tr>)}</tbody></table></div></ResourceState></>
}