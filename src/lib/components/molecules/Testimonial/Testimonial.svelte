<script>
    import mertenImage from "$lib/assets/images/merten.jpg";
    import rushilImage from "$lib/assets/images/rushil.jpg";

    const testimonials = [
        {
            id: 1,
            // TODO: Verify correct spelling of "Rushil Varsnney" with the original source before release.
            name: "Rushil Varsnney",
            time: "June 2025 – Feb 2026",
            status: "Internship",
            institution: "Aero Space Engineering, TU Delft",
            testimonial:
                "The project all corporate projects wish they could be. The place where agile is actually agile. Heed my words dear reader, this project will serve as valuable experience of the things that can be done right. This was as great experience!",
            image: rushilImage,
        },

        {
            id: 2,
            name: "Merten Tijsma",
            time: "June 2025 – Feb 2026",
            status: "Internship",
            institution: "Aero Space Engineering, TU Delft",
            testimonial:
                "Doing my JIP was a great experience. It really helped that although the JIP and NEBULA-Xplorer team all came from different backgrounds, they all brought the same energy. One meeting I was learning how one previous assumption in power usage can completely change the current concept, and other times I was the one walking everyone through our approach on the system architecture. And knowing that you're working on a real telescope that will actually be launched, is really motivating. I now have the opportunity to start my thesis here aswell!",
            image: mertenImage,
        },

        {
            id: 3,
            name: "Cas Bouter",
            time: "June 2025 - Feb 2026",
            status: "Internship",
            institution: "Aero Space Engineering, TU Delft",
            testimonial:
                "For ten weeks, I had the pleasure of working at SRON as part of my Joint Interdisciplinary Project at TU Delft. Together with five other students, I was tasked with identifying an alternative, European launcher for the NEBULA-Xplorer satellite. From contacting launch providers to proposing potential design modifications to the satellite, the project proved to be an insightful and valuable experience that I would surely recommend. Beyond the technical work, my experience at SRON was very positive. Our coach, Martin Grim, supported us from the beginning and was always available when we needed direction. The weekly stand-up meetings with the other students working on NEBULA-Xplorer helped us get up to speed quickly and made it easy to find the right people to approach whenever questions came up. Overall, I am very satisfied with the experience and would gladly do it again.",
            image: mertenImage,
        },

        {
            id: 4,
            name: "Matei Stoica",
            time: "June 2025 - Feb 2026",
            status: "Internship",
            institution: "Aero Space Engineering, TU Delft",
            testimonial:
                "Initially, my goal in joining the Nebula – Xplorer project was to get a better glimpse at building up a space mission, but I quickly ended up learning far more than that, and I realize there is much left to learn! Working closely with industry experts was an invaluable experience, and I am thrilled to have been able to make a difference in bridging relationships between SRON and ground-station communication operators.",
            image: mertenImage,
        },

        {
            id: 5,
            name: "Shristi Santosh",
            time: "June 2025 - Feb 2026",
            status: "Internship",
            institution: "Aero Space Engineering, TU Delft",
            testimonial:
                "I had an enriching experience working on choosing the best launcher option for the NEBULA-Xplorer mission. It was incredibly rewarding to see that the work we put in made a positive impact on SRON. Working with a large group of students and having insightful discussions was very stimulating. Martin was an amazing coach, and his constant guidance and feedback helped us improve both as a team and as individuals. I had the opportunity to understand how a space mission takes shape and to develop both my technical and soft skills, hat I believe will be useful even beyond this project. I am very grateful to be part of NEBULA-Xplorer forever, and I am truly excited to see it launch and contribute invaluable data about X-ray binaries to the scientific community.",
            image: mertenImage,
        },

        {
            id: 6,
            name: "Sampreet Bharali",
            time: "June 2025 - Feb 2026",
            status: "Internship",
            institution: "Aero Space Engineering, TU Delft",
            testimonial:
                "It was amazing working at SRON. The place felt like working in a museum of space technologies. The people I have had the chance to collaborate with really pushed me to improve my technical capabilities. Overall, it has been one of the best experiences I have had in university!",
            image: mertenImage,
        },

        {
            id: 7,
            name: "Matthijs van Heck",
            time: "June 2025 - Feb 2026",
            status: "Internship",
            institution: "Aero Space Engineering, TU Delft",
            testimonial:
                "Within the NEBULA-Xplorer project, I was part of a team consisting of 6 students. Our aim was to investigate alternative launcher options for the satellite and to evaluate how the science output may be improved when a new launcher is selected. It was really nice to be able to apply the knowledge that I learned during my studies to a real project, and mostly to learn new skills from it. It allowed me to gain some insight into the space sector and gave me a taste of what it is like to work on the development of a satellite. I was very happy with the support and guidance that we received during the project. I would recommend every student who is interested in space to join the team!",
            image: mertenImage,
        },
    ];
</script>

<article class="testimonial-container">
    {#each testimonials as testimonial}
        <div class="testimonial-card">
            <img
                src={testimonial.image}
                alt={testimonial.name}
                class="testimonial-image"
            />
            <div class="testimonial-content">
                <h2>{testimonial.name}</h2>
                <span>{testimonial.time}</span>
                <span>{testimonial.status}</span>
                <span>{testimonial.institution}</span>
                <p>"{testimonial.testimonial}"</p>
            </div>
        </div>
    {/each}
</article>

<style>
    .testimonial-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 1fr;
        gap: 1.5rem;
        max-width: 87.5rem;
        margin: 0 auto;
        padding: 2rem;
        min-height: 100vh;
    }

    .testimonial-card {
        background: var(--space-100);
        backdrop-filter: blur(0.625rem);
        border-radius: 0.5rem;
        padding: 1.5rem;
        display: flex;
        gap: 1rem;
        box-shadow: 0 0.625rem 0.9375rem -0.1875rem rgba(0, 0, 0, 0.3);
        transition: box-shadow 0.3s ease;
    }

    .testimonial-card:hover {
        box-shadow: 0 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.4);
    }

    .testimonial-image {
        width: 5rem;
        height: 5rem;
        border-radius: 0.5rem;
        object-fit: cover;
        flex-shrink: 0;
        border: 1px solid var(--cleanroom-100);
    }

    .testimonial-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
    }

    .testimonial-info {
        margin-bottom: 1rem;
    }

    .testimonial-card h2 {
        color: var(--white);
        font-weight: 600;
        font-size: 1rem;
        margin: 0 0 0.25rem 0;
    }

    .testimonial-card span {
        color: var(--light-grey);
        font-size: 0.75rem;
        display: block;
        margin: 0.125rem 0;
    }

    .testimonial-card p {
        color: #d1d5db;
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 0;
        padding-top: 1rem;
        border-top: 0.0625rem solid var(--cleanroom-100);
        flex: 1;
    }

    /* Desktop: grotere foto en 2 kolommen vanaf 48rem (768px) */
    @media (min-width: 48rem) {
        .testimonial-container {
            grid-template-columns: repeat(2, 1fr);
        }

        .testimonial-image {
            width: 8rem;
            height: 8rem;
        }

        .testimonial-card {
            gap: 1.5rem;
        }
    }
</style>
