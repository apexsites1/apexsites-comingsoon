function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PreSignups");
  const data = JSON.parse(e.postData.contents || "{}");

  if (data.company && String(data.company).trim() !== "") {
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const email = String(data.email || "").toLowerCase().trim();
  const name = String(data.name || "").trim();

  const existing = sheet.getLastRow() > 1
    ? sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues().flat().map(String)
    : [];

  if (existing.includes(email)) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, duplicate: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    new Date(),
    name,
    email,
    data.source || "ApexSites Coming Soon Splash Page",
    "",
    "",
    data.page || "",
    data.referrer || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_content || "",
    data.utm_term || ""
  ]);

  MailApp.sendEmail(
    "awesome@apexsites.ai",
    "New ApexSites Pre-Signup",
    `${name} (${email}) joined the ApexSites pre-launch list.`
  );

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
