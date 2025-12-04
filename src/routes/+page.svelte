<script>
  import PopsLogo from "$lib/assets/icons/pops-logo.svelte";
  import { Canvas } from "@threlte/core";

</script>

<footer>
  <Canvas>
    
  </Canvas>
  <a href="/">
    <PopsLogo />
  </a>

  <div class="information">
    <ul>
      <li>Home</li>
      <li>Collection</li>
      <li>Research</li>
      <li>Pop-it</li>
    </ul>
    <ul>
      <li>About</li>
      <li>Privacy</li>
      <li>News</li>
    </ul>
    <form>
      <label>
        Subscribe to our news letter
        <div class="group">
          <input type="email" name="email" />
          <button>send</button>
        </div>
      </label>
      <div class="socials"></div>
    </form>
  </div>
</footer>

<style>
  footer {
    border-top: 6px solid var(--primary);
    padding: 3rem 1.5rem;
    padding-top: 3.375rem;
    display: flex;
    gap: 3rem;
    align-items: end;
    background: var(--soft-accent);
    position: relative;

    &::after {
      content: "";
      width: 100%;
      height: 6px;
      background: var(--secondary);
      position: absolute;
      top: 0;
      left: 0;
    }

    .information {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      > ul {
        width: clamp(7rem, 12vw, 12.875rem);
        list-style: none;
        border-right: 0.1875rem solid var(--primary);

        &:nth-child(2) {
          border-color: var(--secondary);
        }

        > li {
          & + li {
            margin-top: 0.75rem;
          }

          &:nth-child(3) {
            color: var(--primary);
          }

          &:nth-child(4) {
            color: var(--secondary);
          }
        }
      }

      form {
        label {
          display: flex;
          flex-direction: column;
          .group {
            width: 100%;
            display: flex;
            input {
              margin-top: 0.75rem;
              background: #dae9d0;
            }
          }
        }
      }
    }
  }
</style>
