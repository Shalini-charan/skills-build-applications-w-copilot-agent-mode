export function ResourceState({ loading, error, empty, children }) {
  if (loading) return <p className="status-message">Loading your data...</p>
  if (error) return <p className="status-message error-message">{error}</p>
  if (empty) return <p className="status-message">Nothing here yet.</p>
  return children
}