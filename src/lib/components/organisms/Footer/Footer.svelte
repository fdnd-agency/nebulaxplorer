<script>
  import leidenImg from "$lib/assets/images/sron-leiden.webp?enhanced";
  import groningenImg from "$lib/assets/images/sron-groningen.webp?enhanced";
  import SRON_Academy_OnSpaceBlue from "$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg";
</script>

<footer>
  <ul class="locations">
    <li>
      <h2>Leiden</h2>
      <enhanced:img src={leidenImg} alt="The SRON building in Leiden" />
      <ul class="contact paragraph">
        <li>Niels Bohrweg 4</li>
        <li class="divider"></li>
        <li>2333 CA Leiden</li>
        <li class="divider"></li>
        <li>The Netherlands</li>
        <li class="divider"></li>
        <li><a href="tel:+31887775600">+31 (0)88 777 56 00</a></li>
      </ul>
    </li>
    <li>
      <h2>Groningen</h2>
      <enhanced:img src={groningenImg} alt="The SRON building in Groningen" />
      <ul class="contact paragraph">
        <li>Landleven 12</li>
        <li class="divider"></li>
        <li>2333 CA Leiden</li>
        <li class="divider"></li>
        <li>The Netherlands</li>
        <li class="divider"></li>
        <li><a href="tel:+31503634074">+31 (0)50 363 40 74</a></li>
      </ul>
    </li>
  </ul>

  <p class="footnote supporting">What happens up there, starts down here.</p>
</footer>

<style>
  footer {
    border-top: 0.375rem solid var(--cleanroom-100);
    background: var(--space-100);
    padding: 0;
    position: relative;
    ul {
      background: var(--ultra-100);
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;

      @media (min-width: 56.25rem) {
        flex-direction: row;
      }
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
        margin-block: 1rem;
        position: relative;
        margin-right: 2.25rem;

        @media (min-width: 26.25rem) {
          gap: 0.5rem 0;
          display: grid;
          grid-template: 1fr 1fr / 1fr 1fr;
          &::after {
            content: "";
            position: absolute;
            height: 100%;
            width: 0.125rem;
            background: var(--cleanroom-100);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        @media (min-width: 56.25rem) {
          align-items: center;
        }

        @media (min-width: 90.625rem) {
          display: flex;
          gap: unset;
          justify-content: space-between;

          &::after {
            display: none;
          }
        }

        li {
          display: inline;
          line-height: inherit;
          width: fit-content;
          position: relative;

          &.divider {
            background: var(--cleanroom-100);
            width: 0.125rem;
            /* Make it as big as the text */
            height: 1em;
            display: none;
          }

          &:nth-child(3),
          &:nth-child(7) {
            justify-self: end;
          }

          @media (min-width: 90.625rem) {
            &.divider {
              display: inline-block;
            }
          }
        }
      }
    }

    .footnote {
      background: var(--cleanroom-100);
      color: var(--space-100);
      text-align: center;
      display: block;
    }
  }
</style>
