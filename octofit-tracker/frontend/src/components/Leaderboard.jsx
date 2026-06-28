import { useApiResource } from '../api';

function Leaderboard() {
  const { items: leaderboard, apiUrl, loading, error } = useApiResource('leaderboard');

  return (
    <section className="page">
      <h2>Leaderboard</h2>
      <p className="api-url">API endpoint: {apiUrl}</p>

      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="card-grid">
        {leaderboard.map((entry, index) => (
          <article className="card" key={entry._id || entry.id || entry.username}>
            <h3>#{entry.rank || index + 1} {entry.username}</h3>
            <p>
              <strong>User:</strong>{' '}
              {typeof entry.user === 'object'
                ? entry.user?.name || entry.user?.email
                : entry.user || 'Unknown user'}
            </p>
            <p><strong>Points:</strong> {entry.points}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;