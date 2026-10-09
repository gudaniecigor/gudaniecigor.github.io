# Portfolio: Igor Gudaniec

Strona portfolio w czystym HTML, CSS i JavaScript, bez instalowania czegokolwiek.
Efekty przewijania korzystają z biblioteki GSAP, wczytywanej z internetu (cdnjs).
Bez internetu strona też działa, tylko bez tych efektów.

## Jak otworzyć

Kliknij dwa razy `index.html`, a strona otworzy się w przeglądarce.

## Animacje

- Intro z licznikiem (raz na sesję przeglądarki).
- Magnetyczne przyciski i przechylanie kart 3D (tylko z myszką).
- Interaktywna sieć w tle nagłówka i terminal, który sam wpisuje komendy.
- Paski z technologiami, które przyspieszają przy przewijaniu.
- Zdanie w „O mnie” rozjaśnia się słowo po słowie podczas przewijania.
- Karty projektów nasuwają się na siebie (na dużych ekranach) i mają animowane makiety.
- Oś czasu „rysuje się” przy przewijaniu i ma filtr Praca / Edukacja.

Animacje są zawsze włączone, niezależnie od ustawień systemu odwiedzającego.

## Jak edytować treść

Cała treść jest w jednym pliku: **`js/data.js`**.

| Co zmienić | Gdzie w `data.js` |
|---|---|
| imię, e-mail, GitHub, LinkedIn, CV | `PROFILE` |
| napisy zmieniające się w nagłówku | `ROLES` |
| paski z technologiami | `MARQUEE` |
| fakty i liczniki w „O mnie” | `FACTS`, `STATS` |
| technologie (karty) | `SKILLS` |
| projekty | `PROJECTS` |
| praca i edukacja | `EXPERIENCE` |
| certyfikaty i kursy | `CERTS` |
| teksty menu, nagłówków, przycisków, terminala | `I18N` |

Każdy tekst ma wersję `pl` i `en`. Po zapisaniu pliku odśwież stronę (F5).

**Projekty:** każdy ma animowaną makietę (`mock`). Zamiast niej możesz dać zrzut ekranu:
wrzuć obrazek do folderu `img/` i wpisz ścieżkę w polu `image`, np. `"img/smartsaver.png"`.

**Formularz kontaktowy:** wiadomości przychodzą na e-mail przez darmowy serwis
[FormSubmit](https://formsubmit.co) (ustawienia w `CONTACT_FORM` w `data.js`).
Po wrzuceniu strony do internetu wyślij z formularza jedną testową wiadomość.
FormSubmit przyśle wtedy maila z przyciskiem *Activate Form*. Kliknij go raz, a od tej
pory każda wiadomość z formularza trafi na Twoją skrzynkę (temat: „Nowa wiadomość z portfolio”).
Gdyby nie przyszła, sprawdź folder Spam.

**CV:** wrzuć `cv.pdf` do tego folderu i wpisz `cv: "cv.pdf"` w `PROFILE`.

**Kolory:** zmienne na górze `css/style.css` (np. `--accent` to kolor akcentu).

## Struktura

```
index.html         układ strony
css/style.css      wygląd i animacje CSS
js/data.js         treść (edytujesz tutaj)
js/main.js         renderowanie treści, języki, menu, intro
js/effects.js      sieć w tle, terminal, przechylanie, paski, liczniki
js/scroll-fx.js    efekty przewijania (GSAP)
img/               zrzuty ekranu projektów
```

## Publikacja w internecie (za darmo)

- **GitHub Pages:** wrzuć folder do repozytorium na GitHubie, potem
  Settings → Pages → Deploy from branch → `main`. Strona będzie pod adresem
  `https://twoj-login.github.io/nazwa-repo/`.
- **Netlify:** przeciągnij cały folder na stronę app.netlify.com/drop.
