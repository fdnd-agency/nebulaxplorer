<header>
    <h1>Impact of NEBULA-Xplorer</h1>
    <div class="impact-stats-container">
        <div class="impact-stats">
            <h3>~100</h3>
            <span>Students involved</span>
        </div>

        <div class="impact-stats">
            <h3>14</h3>
            <span>Dutch universities involved</span>
        </div>

        <div class="impact-stats">
            <h3>In development</h3>
            <span>X-Ray instrument</span>
        </div>

        <div class="impact-stats">
            <h3>1</h3>
            <span>Satellite mission</span>
        </div>
    </div>
</header>

<style>

header {
        padding: 3rem 2rem;
    }
    h1 {
        margin-bottom: 3rem;
    }

    .impact-stats-container {
        display: flex;
        flex-direction: column;
    }

    .impact-stats {
        padding: 1.5rem 2rem;
        border-right: 1px solid var(--light-grey);
        border-left: 1px solid var(--light-grey);

        h3 {
            color: var(--cleanroom-100);
            font-weight: 500;
            margin-bottom: 1rem;
            font-size: medium;
        }

        span {
            color: var(--light-grey);
            font-size: larger;
        }
    }



@media (min-width: 48rem) {

    .impact-stats-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0;
        margin: 0 auto;
    }

    .impact-stats {
        text-align: left;
        padding: 1.5rem 2rem;
        border-left: 1px solid var(--light-grey);

        h3 {
            color: var(--cleanroom-100);
            font-weight: 500;
            margin-bottom: 1rem;
            font-size: medium;
        }

        span {
            color: var(--light-grey);
            font-size: larger;
        }
    }

    .impact-stats:first-child {
        border-left: none;
    }
}
</style>
