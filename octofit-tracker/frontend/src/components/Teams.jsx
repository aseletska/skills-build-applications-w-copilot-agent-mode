import { useApiResource } from '../api';

function Teams() {
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  const { items: teams, apiUrl, loading, error } = useApiResource(apiEndpoint, 'teams');

  return (
    <section className="page">
      <h2>Teams</h2>
      <p className="api-url">API endpoint: {apiUrl}</p>

      {loading && <p>Loading teams...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="card-grid">
        {teams.map((team) => (
          <article className="card" key={team._id || team.id || team.name}>
            <h3>{team.name}</h3>
            <p><strong>Description:</strong> {team.description || 'No description'}</p>
            <p>
              <strong>Members:</strong>{' '}
              {Array.isArray(team.members) ? team.members.length : team.members || 0}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Teams;