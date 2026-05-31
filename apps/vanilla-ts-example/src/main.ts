import "./style.css";
import ll from "./library/langlayer.ts";
import typescriptLogo from "./assets/typescript.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { setupCounter } from "./counter.ts";
import { setupLanguageSwitcher } from "./language-switcher.ts";
import {
  YOUR_DEFAULT_LANGUAGE_KEY,
  YOUR_LANGUAGE_CACHE_KEY,
} from "./library/constants.ts";

const initialLanguage =
  sessionStorage.getItem(YOUR_LANGUAGE_CACHE_KEY) || YOUR_DEFAULT_LANGUAGE_KEY;

try {
  await ll.init(initialLanguage);
} catch (error) {
  console.error(error);
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1 data-llKey="homepage.title"></h1>
    <p>${ll.t("homepage.description", { fileName: "<code>src/main.ts</code>", featureName: "<code>HMR</code>" })}</p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2 data-llKey="homepage.documentation.title"></h2>
    <p data-llKey="homepage.documentation.description"></p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src="${viteLogo}" alt="" />
          <span data-llKey="homepage.documentation.explore_vite"></span>
        </a>
      </li>
      <li>
        <a href="https://www.typescriptlang.org" target="_blank">
          <img class="button-icon" src="${typescriptLogo}" alt="">
          <span data-llKey="homepage.documentation.learn_more"></span>
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2 data-llKey="homepage.connect.title"></h2>
    <p data-llKey="homepage.connect.description"></p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

ll.applyBindings();

setupLanguageSwitcher(
  document.querySelector<HTMLSelectElement>("#language-selector")!,
);
