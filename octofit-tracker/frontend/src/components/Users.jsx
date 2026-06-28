import { useApiResource } from '../api';

function Users() {
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  const { items: users, apiUrl, loading, error } = useApiResource(apiEndpoint, 'users');

  return (
    <section className="page">
      <h2>Users</h2>
      <p className="api-url">API endpoint: {apiUrl}</p>

      {loading && <p>Loading users...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="card-grid">
        {users.map((user) => (
          <article className="card" key={user._id || user.id || user.email}>
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role || 'user'}</p>
            <p>
              <strong>Team:</strong>{' '}
              {typeof user.team === 'object' ? user.team?.name : user.team || 'No team'}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Users;