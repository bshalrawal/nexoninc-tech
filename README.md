# nexoninc.tech — Building Page

Static holding page. Pure HTML, CSS, JS.

## Local
Open `index.html` in a browser.

## Deploy to Vercel
1. Create a repo with these files.
2. Vercel → New Project → Import the repo → Framework preset: **Other** → Root: repo root → Deploy.
3. Project → Settings → Domains → add **nexoninc.tech**.
4. Ensure SSL is issued.
5. Edits deploy on push.

## Customize
- Copy: edit `index.html` text.
- Colors and radii: change CSS variables in `styles.css`.
- Social links and email: update anchors in `index.html`.

## Notes
- Emails are validated and stored in `localStorage` under the key `nx-emails` (client-side only).
- Animations respect `prefers-reduced-motion`.
