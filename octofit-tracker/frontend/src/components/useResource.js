import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function useResource(resource) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetchResource(resource)
      .then((data) => active && setState({ data, loading: false, error: '' }))
      .catch((error) => active && setState({ data: [], loading: false, error: error.message }))
    return () => { active = false }
  }, [resource])

  return state
}