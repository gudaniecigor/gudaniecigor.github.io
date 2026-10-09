# Igor Gudaniec · Portfolio

**Strona na żywo: https://gudaniecigor.github.io**

Osobiste portfolio Front-End Developera z Gdańska: kim jestem, nad czym pracuję,
moje doświadczenie, certyfikaty i formularz kontaktowy. Strona jest dwujęzyczna
(polski / angielski) i działa na komputerze, tablecie i telefonie.

> **Strona powstała z pomocą AI.** Projekt graficzny, kod i animacje zostały
> wygenerowane we współpracy z asystentem AI **Claude Code** (Anthropic)
> na podstawie moich wskazówek, CV i projektów.

## Co jest na stronie

- **Start:** imię z animacją wejścia, zmieniające się role, terminal, który sam
  wpisuje komendy, oraz interaktywna „sieć” w tle, nawiązująca do mojego
  wykształcenia teleinformatycznego.
- **O mnie:** krótki opis, liczniki i karty z technologiami, z których korzystam.
- **Projekty:** system rezerwacji promowych tworzony dla Pol-Agent, SmartSaver
  (projekt inżynierski), QuizWSB (aplikacja na Androida) oraz strony i sklepy
  na WordPressie. Każdy projekt ma animowaną makietę aplikacji.
- **Doświadczenie:** oś czasu pracy i edukacji z filtrem oraz certyfikaty
  (Cisco CCNA, kwalifikacje zawodowe EE.10 / EE.11 / ELM.02, MongoDB).
- **Kontakt:** formularz wysyłający wiadomość prosto na mój e-mail, link do maila
  i LinkedIna oraz aktualna godzina w Gdańsku.

## Funkcje

- Przełącznik języka PL / EN, zapamiętywany w przeglądarce.
- Animacje sterowane przewijaniem: karty projektów nasuwające się na siebie,
  oś czasu rysująca się podczas przewijania, tekst rozjaśniający się słowo po słowie,
  paralaksa i przesuwające się paski z technologiami.
- Intro z licznikiem, magnetyczne przyciski, przechylanie kart w 3D
  i świecące ramki podążające za kursorem.
- Formularz kontaktowy z walidacją pól, obsługą błędów i animowanym potwierdzeniem wysłania.
- Responsywny układ oraz dbałość o dostępność: semantyczny HTML, etykiety ARIA,
  obsługa klawiatury.

## Technologie

| Obszar | Użyte narzędzia |
|---|---|
| Struktura i wygląd | HTML5, CSS3 (zmienne CSS, Grid, Flexbox, animacje i przejścia) |
| Logika | JavaScript bez frameworków |
| Animacje przewijania | [GSAP](https://gsap.com) + ScrollTrigger |
| Sieć w tle | Canvas API |
| Formularz | [FormSubmit](https://formsubmit.co) |
| Czcionki | Space Grotesk, Inter, JetBrains Mono (Google Fonts) |
| Hosting | GitHub Pages |

## Struktura projektu

```
index.html         układ strony
css/style.css      wygląd i animacje CSS
js/data.js         cała treść strony w dwóch językach
js/main.js         renderowanie treści, języki, nawigacja, formularz
js/effects.js      sieć w tle, terminal, efekty interaktywne
js/scroll-fx.js    animacje sterowane przewijaniem
```

## English

Personal portfolio of Igor Gudaniec, a Front-End Developer based in Gdańsk, Poland.
Bilingual (PL/EN), responsive, built with plain HTML, CSS and JavaScript plus GSAP
scroll animations, and hosted on GitHub Pages. The site was designed and coded with
the help of the AI assistant Claude Code (Anthropic).

## Kontakt

**Igor Gudaniec** · Gdańsk
[LinkedIn](https://www.linkedin.com/in/igorgudaniec/) ·
[gudaniecigor@gmail.com](mailto:gudaniecigor@gmail.com) ·
[formularz na stronie](https://gudaniecigor.github.io/#contact)
