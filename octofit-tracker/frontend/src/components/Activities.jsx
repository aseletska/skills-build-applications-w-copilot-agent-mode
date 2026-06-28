import { useApiResource } from '../api';

function Activities() {
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  const { items: activities, apiUrl, loading, error } = useApiResource(apiEndpoint, 'activities');

  return (
    <section className="page">
      <h2>Activities</h2>
      <p className="api-url">API endpoint: {apiUrl}</p>

      {loading && <p>Loading activities...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="card-grid">
        {activities.map((activity) => (
          <article className="card" key={activity._id || activity.id}>
            <h3>{activity.type}</h3>
            <p>
              <strong>User:</strong>{' '}
              {typeof activity.user === 'object'
                ? activity.user?.name || activity.user?.email
                : activity.user || 'Unknown user'}
            </p>
            <p><strong>Duration:</strong> {activity.durationMinutes} minutes</p>
            <p><strong>Distance:</strong> {activity.distanceKm || 0} km</p>
            <p><strong>Calories:</strong> {activity.calories || 0}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Activities;