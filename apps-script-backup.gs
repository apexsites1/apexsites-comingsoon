function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PreSignups");
  var data = JSON.parse(e.postData.contents || "{}");

  // Honeypot: silently accept bot submissions without saving them.
  if (data.company && String(data.company).trim() !== "") {
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var name = String(data.name || "").trim();
  var email = String(data.email || "").toLowerCase().trim();
  var source = String(data.source || "ApexSites Coming Soon Page").trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: "Invalid submission" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var emails = sheet.getRange(2, 3, lastRow - 1, 1).getValues().flat().map(function(value) {
      return String(value || "").toLowerCase().trim();
    });

    if (emails.indexOf(email) !== -1) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, duplicate: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  sheet.appendRow([
    new Date(),
    name,
    email,
    source,
    "",
    "",
    data.page || "",
    data.referral_url || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_content || "",
    data.utm_term || ""
  ]);

  MailApp.sendEmail(
    "awesome@apexsites.ai",
    "New ApexSites Pre-Signup",
    name + " (" + email + ") just joined the ApexSites pre-launch list."
  );

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
