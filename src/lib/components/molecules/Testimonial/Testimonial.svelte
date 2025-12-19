<script>
    const testimonials = [
        {
            id: 1,
            name: "Rushil Varsnney",
            time: "June 2025 – Feb 2026",
            status: "Internship",
            insitution: "Aero Space Engineering, TU Delft",
            testimonial:
                "The project all corporate projects wish they could be. The place where agile is actually agile. Heed my words dear reader, this project will serve as valuable experience of the things that can be done right. This was as great experience!",
        },

        {
            id: 2,
            name: "Merten Tijsma",
            time: "June 2025 – Feb 2026",
            status: "Internship",
            institution: "Aero Space Engineering, TU Delft",
            testimonial:
                "Doing my JIP was a great experience. It really helped that although the JIP and NEBULA-Xplorer team all came from different backgrounds, they all brought the same energy. One meeting I was learning how one previous assumption in power usage can completely change the current concept, and other times I was the one walking everyone through our approach on the system architecture. And knowing that you're working on a real telescope that will actually be launched, is really motivating. I now have the opportunity to start my thesis here aswell!",
        },
    ];
</script>


<article class="testimonial-container">
    {#each testimonials as testimonial}
    <h2>{testimonial.name}</h2>
    <span>{testimonial.status}</span>
    <span>{testimonial.insitution}</span>
    <p>{testimonial.testimonial}</p>
    {/each}
</article>
