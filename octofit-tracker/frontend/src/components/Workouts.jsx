import { useApiResource } from '../api';

function Workouts() {
  const { items: workouts, apiUrl, loading, error } = useApiResource('workouts');

  return (
    <section className="page">
      <h2>Workouts</h2>
      <p className="api-url">API endpoint: {apiUrl}</p>

      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="card-grid">
        {workouts.map((workout) => (
          <article className="card" key={workout._id || workout.id || workout.name}>
            <h3>{workout.name}</h3>
            <p><strong>Focus:</strong> {workout.focus}</p>
            <p><strong>Duration:</strong> {workout.durationMinutes} minutes</p>

            {Array.isArray(workout.exercises) && workout.exercises.length > 0 && (
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li key={`${exercise.name}-${index}`}>
                    {exercise.name}
                    {exercise.reps ? ` — ${exercise.reps} reps` : ''}
                    {exercise.sets ? `, ${exercise.sets} sets` : ''}
                    {exercise.durationSeconds ? ` — ${exercise.durationSeconds} sec` : ''}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Workouts;