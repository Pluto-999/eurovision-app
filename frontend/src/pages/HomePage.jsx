
function HomePage() {
  return (
      <div className="mx-auto max-w-3xl px-4">
        <h1>Welcome to Euroscore</h1>

        <p>
          Euroscore is a Eurovision-themed web application built by Adam Wood as a learning project to deepen my understanding of full-stack development. This project uses <strong>Node.js</strong>, <strong>Express</strong> and <strong>PostgreSQL</strong> for the backend, and <strong>React</strong> for the frontend.
        </p>

        <h2>Key features include:</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Automated scraping of official Eurovision results (2021 onward) from Wikipedia</li>
          <li>Secure authentication using JWTs and cookies as well as reset password functionality through emails</li>
          <li>Real-time user chat via WebSockets</li>
          <li>Community rankings and voting</li>
          <li>Detailed viewing of official and user-submitted results</li>
        </ul>

        <p className="text-sm">
          ⚠️ Note: This project primarily served as a technical learning experience, so UI/UX design was not the main focus. Visual improvements may be made in future updates.
        </p>
      </div>
  );
}

export default HomePage