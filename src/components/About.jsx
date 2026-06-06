import React from 'react'
import { developmentTeam } from '../data/developmentTeam'
import './About.css'

const About = () => {
    return (
        <main className="about-container">
            <h1>Quienes somos</h1>
            <p id="info" className="team-info">
                Somos el {developmentTeam.name}.
            </p>
            <section className="team-grid" aria-label="Miembros del equipo">
                {developmentTeam.members.map((member) => (
                    <article className="card" key={member.name}>
                        <h2 className="member-name">{member.name}</h2>
                        <p className="member-description">{member.description}</p>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default About
