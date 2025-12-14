## Cybersecurity House (MVP)

An interactive, responsive website concept where a **house map** represents your cybersecurity ecosystem.
Each **room** is a conversion surface (with **one primary CTA**) for:

- Training / learning paths
- Hands-on labs
- Mentorship
- Careers / placements
- Hiring & assessments
- Products & tools
- Services / simulations
- Partners / brand ecosystem

### What’s included in this repo
- `index.html`: Single-page MVP
- `styles.css`: Modern “glass + neon” UI + responsive layout
- `app.js`: Room content, persona routing, guided tour, and contact modal

### How to run locally
Option A (recommended):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` and click **Enter the house**.

Option B:
- Open `index.html` directly in a browser (some browsers restrict `mailto` / clipboard behavior without a server).

### Customization
- **Room content**: edit the `ROOMS` object in `app.js`
- **Persona highlights**: edit `personaRecommendations` in `app.js`
- **Contact email**: replace `hello@example.com` in `app.js` with your real inbox

### Notes
This is a static MVP (no backend). CTAs open a contact modal that prepares a `mailto:` message so you can plug in real checkout/booking flows later.
