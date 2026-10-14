# Google Sheets Integration — Setup Guide

## Overview
Contact form submissions are saved to Google Sheets using the **Google Sheets API v4** with a **Service Account**. This is the most reliable, production-grade approach.

---

## Step 1: Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **"Select a project"** → **"New Project"**
3. Name it `growthincs-website` and click **Create**

---

## Step 2: Enable the Google Sheets API

1. In the Google Cloud Console, go to **APIs & Services → Library**
2. Search for **"Google Sheets API"**
3. Click it → Click **"Enable"**

---

## Step 3: Create a Service Account

1. Go to **APIs & Services → Credentials**
2. Click **"+ Create Credentials"** → **"Service Account"**
3. Name: `growthincs-forms`
4. Click **Create and Continue** → skip optional steps → click **Done**
5. Click on the newly created service account
6. Go to the **"Keys"** tab → **"Add Key"** → **"Create new key"**
7. Choose **JSON** → Click **Create** — a `.json` file will be downloaded

---

## Step 4: Share Your Google Sheet with the Service Account

1. Open or create a Google Sheet at [sheets.google.com](https://sheets.google.com)
2. Add these headers in **Row 1**: `Timestamp | Name | Email | Phone | Service | Budget | Message`
3. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SHEET_ID/edit
   ```
4. Click **Share** → paste the service account email (looks like `growthincs-forms@your-project.iam.gserviceaccount.com`)
5. Set role to **Editor** → Click Send

---

## Step 5: Install googleapis Package

In your project root, run:
```bash
npm install googleapis
```

Then add it to package.json if not already:
```json
"dependencies": {
  "googleapis": "^140.0.0"
}
```

---

## Step 6: Add Environment Variables to Vercel

Go to your Vercel project → **Settings → Environment Variables** and add:

| Variable | Value | Where to find it |
|---|---|---|
| `GOOGLE_SHEET_ID` | `1BxiMVs0XRA...` | From your Google Sheet URL |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `growthincs-forms@...iam.gserviceaccount.com` | From the downloaded JSON: `client_email` |
| `GOOGLE_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY-----\n...` | From the downloaded JSON: `private_key` — copy the ENTIRE value including `\n` characters |

> **Important:** For `GOOGLE_PRIVATE_KEY`, copy the raw value from the JSON file exactly as-is (with `\n` escape sequences). Vercel will store it correctly.

---

## Step 7: Verify It Works

1. Deploy your updated code to Vercel
2. Submit the contact form
3. Check your Google Sheet — a new row should appear within seconds
4. If it doesn't appear, check Vercel Function Logs for any errors

---

## Troubleshooting

- **"The caller does not have permission"** → Make sure you shared the sheet with the service account email as Editor
- **"invalid_grant"** → The private key format is wrong. Make sure `\n` in the key is preserved (the code does `.replace(/\\n/g, '\n')` automatically)
- **Sheets fails but email still sends** → This is by design. The implementation is non-blocking — sheet errors won't affect form submissions.

---

## Your Sheet Structure

The form will write data in this column order:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Service | Budget | Message |
| 14/10/2026, 3:48 PM | John Smith | john@co.com | +91 98765... | Lead Generation | ₹50K–₹1L/mo | I need help with... |
