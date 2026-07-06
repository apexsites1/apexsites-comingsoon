# ApexSites Coming Soon Splash Page

Cloudflare-ready static splash page for `comingsoon.apexsites.ai` with updated premium early-access messaging.

## Files

- `index.html` — splash page
- `assets/css/styles.css` — ApexSites styling
- `assets/js/main.js` — form validation and Google Apps Script submission
- `assets/video/apexsites-logo.mp4` — included center logo animation, plays once and stops on final frame
- `apps-script-backup.gs` — backup Apps Script code

## Google Sheet columns

Create a sheet named `PreSignups` with these columns:

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

## Cloudflare Pages / Workers static upload

1. Extract this ZIP.
2. In Cloudflare, go to Workers & Pages / Create application.
3. Choose `Upload your static files`.
4. Project/worker name: `apexsites-comingsoon` or `comingsoon-apexsites`.
5. Upload the contents of this folder, not the ZIP itself.
6. After deployment, add the custom domain: `comingsoon.apexsites.ai`.

## DNS

If Cloudflare manages `apexsites.ai`, it should create the needed DNS record automatically when adding the custom domain. If not, create the CNAME Cloudflare provides during setup.

## Form endpoint

The page is already configured to send submissions to:

`https://script.google.com/a/macros/apexsites.ai/s/AKfycbw0dyr0M7N2FF783LcreOqeVhmQfRHitvIEpM9yRqf6fYn6H2GYgcsW9fxi02Tz-Ij9/exec`

## Notes

The form uses client-side email format validation. True mailbox verification requires either a confirmation email flow or a third-party email validation service.
