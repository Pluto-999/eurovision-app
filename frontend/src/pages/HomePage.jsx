import { Link } from "react-router-dom"

function HomePage () {
    return (
        <>
      <h1>Welcome to Euroscore</h1>
      <p>
        Euroscore is a Eurovision-themed web application built by Adam Wood as a learning project to deepen my understanding of full-stack development. This project focuses on using <strong>Node.js</strong> and <strong>Express</strong> for backend development, while also expanding my knowledge of <strong>React</strong> on the frontend.
      </p>
      <p>
        Key features include:
        <ul>
          <li>Automated scraping of official Eurovision results (2021 onward) from Wikipedia</li>
          <li>Secure authentication using JWTs and cookies</li>
          <li>Real-time user chat via WebSockets</li>
          <li>Community rankings and voting</li>
          <li>Detailed viewing of official and user-submitted results</li>
        </ul>
      </p>
      <p>
        ⚠️ Note: This project primarily served as a technical learning experience, so UI/UX design was not the main focus. Visual improvements may be made in future updates.
      </p>
    </>
    )
}

export default HomePage