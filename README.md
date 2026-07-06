# ApexSites Coming Soon Splash Page

Production-ready static splash page for `comingsoon.apexsites.ai`.

## Included

- `index.html` — one-screen splash page
- `assets/css/styles.css` — ApexSites dark premium styling
- `assets/js/main.js` — Google Sheets submission, email validation, success/error messages
- `assets/video/apexsites-logo.mp4` — center logo animation; plays once and remains on final frame
- `assets/img/favicon.svg` — simple ApexSites favicon
- `robots.txt`, `sitemap.xml`, `_headers` — Cloudflare-ready production files
- `apps-script-backup.gs` — Apps Script backup

## Google Sheet setup

Use the Google account `awesome@apexsites.ai`.

Create a sheet tab named `PreSignups` with these columns:

1. Timestamp
2. Name
3. Email
4. Source
5. Invite Sent
6. Invite Date
7. Page
8. Referral URL
9. UTM Source
10. UTM Medium
11. UTM Campaign
12. UTM Content
13. UTM Term

The frontend is already connected to this Apps Script Web App URL:

`https://script.google.com/a/macros/apexsites.ai/s/AKfycbw0dyr0M7N2FF783LcreOqeVhmQfRHitvIEpM9yRqf6fYn6H2GYgcsW9fxi02Tz-Ij9/exec`

## Cloudflare deployment

### GitHub method

1. Create a GitHub repo named `apexsites-comingsoon`.
2. Upload the contents of this folder.
3. In Cloudflare, go to Workers & Pages.
4. Create application → Connect GitHub.
5. Choose the repo.
6. Build command: leave blank.
7. Output directory: `/`.
8. Deploy.
9. Add custom domain: `comingsoon.apexsites.ai`.

### Static upload method

1. Extract the ZIP.
2. Upload the contents of this folder to Cloudflare static assets.
3. Add custom domain: `comingsoon.apexsites.ai`.

## Testing

Submit:

- a valid name and email
- an invalid email
- a duplicate email

Confirm rows appear in Google Sheets and the success message displays.
