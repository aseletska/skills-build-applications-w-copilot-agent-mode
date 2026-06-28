import { useApiResource } from '../api';

function Teams() {
  const { items: teams, apiUrl, loading, error } = useApiResource('teams');

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