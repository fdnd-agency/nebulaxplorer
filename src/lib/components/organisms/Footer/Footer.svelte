<script>
  import leidenImg from "$lib/assets/images/sron-leiden.webp?enhanced";
  import groningenImg from "$lib/assets/images/sron-groningen.webp?enhanced";
</script>

<footer>
  <ul class="locations">
    <li>
      <h2>Leiden</h2>
      <enhanced:img src={leidenImg} alt="The SRON building in Leiden" />
      <ul class="contact paragraph">
        <li>Niels Bohrweg 4</li>
        <li>2333 CA Leiden</li>
        <li>The Netherlands</li>
        <li>+31 (0)88 777 56 00</li>
      </ul>
    </li>
    <li>
      <h2>Groningen</h2>
      <enhanced:img src={groningenImg} alt="The SRON building in Groningen" />
      <ul class="contact paragraph">
        <li>Landleven 12</li>
        <li>2333 CA Leiden</li>
        <li>The Netherlands</li>
        <li>+31 (0)88 777 56 00</li>
      </ul>
    </li>
  </ul>
</footer>

<style>
  footer {
    border-top: .375rem solid var(--cleanroom-100);
    background: var(--space-100);
    padding: 0;
    position: relative;
    ul {
      background: var(--ultra-100);
      list-style: none;
      padding: 0;
      display: flex;

      &.locations {
        gap: 1.5rem;
        padding-left: 1.5rem;
        li {
          position: relative;
          background: inherit;
          width: 100%;
          display: inline-block;

          h2 {
            background: inherit;
            position: absolute;
            top: 0;
            left: 0;
            transform: translateX(-100%) rotate(-90deg);
            transform-origin: right top;
            padding: 1rem 2rem;
          }

          picture {
            display: contents;

            enhanced\:img {
              width: 100%;
              height: auto;
              display: block;
              object-fit: cover;
            }
          }
        }
      }

      &.contact {
        flex-wrap: wrap;
        li {
          display: inline;
          line-height: inherit;
          width: fit-content;
          &:not(:last-child) {
            padding-right: 18px;
          }
        }
      }
    }
  }
</style>
