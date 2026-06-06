import React from 'react'

const Footer = ({ team }) => {
  return (
    <div>
        <h2>{team.name}</h2>
        <h3>Miembros del equipo:</h3>
        <ul>
            {team.members.map((member) => (
              <li key={member.name}>
                <strong>{member.name}</strong>
              </li>
            ))}
        </ul>
    </div>
  )
}

export default Footer
