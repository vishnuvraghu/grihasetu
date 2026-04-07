# 🏠 GrihaSetu — Home Loan Tracker

A personal home loan tracker that runs entirely in your browser. No app to install, no subscription, no login. Your data stays in your own Google Drive.

---

## What it does

- Tracks your loan balance, EMIs, prepayments, and interest charges
- Shows your outstanding principal, projected closure date, and interest saved
- Calculates interest accrued till today (matching your bank statement logic)
- Stores all your data privately in your own Google Drive
- Works on any device — phone, laptop, desktop
- **Installable as an app** on your phone (PWA — no Play Store needed)

---

## Files in this repo

| File | What it is |
|------|-----------|
| `index.html` | Landing page — explains what GrihaSetu is. This is the page people see first. |
| `grihasetu_v4.html` | The actual app — the loan tracker. |
| `manifest.json` | PWA manifest — makes the app installable on phones. |
| `sw.js` | Service worker — makes the app work offline. |
| `icon-192.png` | App icon (small). |
| `icon-512.png` | App icon (large). |
| `README.md` | This file. |

**Important:** Upload ALL these files to your GitHub repo, not just the HTML. The PWA features (install on phone, offline mode) only work when all files are present.

---

## One-time Setup (takes about 15 minutes)

You will do this only once. After setup, using the app every day takes seconds.

There are two parts:
1. **Host the app on GitHub** — so you have a link you can open on any device
2. **Connect Google Drive** — so your data is saved and syncs across devices

---

## Part 1 — Host the App on GitHub

### Step 1 — Create a GitHub account

Go to [github.com](https://github.com) and sign up for a free account. If you already have one, sign in.

---

### Step 2 — Create a new repository

1. After signing in, click the **+** button at the top right → click **New repository**
2. Give it a name, for example: `grihasetu`
3. Make sure **Public** is selected *(this is required for free hosting)*
4. Tick the box that says **Add a README file**
5. Click **Create repository**

---

### Step 3 — Upload ALL the files

1. You are now inside your new repository. Click **Add file** → **Upload files**
2. Drag and drop ALL these files onto the page:
   - `index.html`
   - `grihasetu_v4.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
3. At the bottom, click **Commit changes**

---

### Step 4 — Enable GitHub Pages

1. Click the **Settings** tab (top of your repository page)
2. On the left sidebar, click **Pages**
3. Under **Branch**, select `main` from the dropdown → click **Save**
4. Wait about 1–2 minutes, then refresh the page
5. You will see a green box saying **Your site is live at** `https://yourusername.github.io/grihasetu/`

> 💡 **Bookmark this link.** This is your app's permanent address.

Your landing page will be at:
```
https://yourusername.github.io/grihasetu/
```

The actual tracker app will be at:
```
https://yourusername.github.io/grihasetu/grihasetu_v4.html
```

---

## Part 1B — Install as an App on Your Phone (optional but recommended)

Once GitHub Pages is live:

1. Open `https://yourusername.github.io/grihasetu/grihasetu_v4.html` in **Chrome** on your phone
2. Chrome will show a banner at the bottom saying **"Add GrihaSetu to Home screen"** — tap it
3. If the banner doesn't appear, tap the **⋮** menu (top right) → **"Add to Home screen"** or **"Install app"**
4. GrihaSetu now appears as a regular app icon on your phone
5. It opens full-screen, works offline, and feels like a native app

> On **iPhone/Safari**: Tap the Share button (↑) → **"Add to Home Screen"**

---

## Part 2 — Connect Google Drive (for data backup & cross-device sync)

This lets your data survive if you clear your browser, switch devices, or open the app on your phone. Your data is saved as a private file in your own Google Drive — nobody else can see it.

### Step 1 — Get a Google OAuth Client ID

This sounds technical but just follow the steps below. It is free and takes about 10 minutes.

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Sign in with your Google account
3. Click **Select a project** at the top → click **New Project**
4. Give it any name (e.g. `GrihaSetu`) → click **Create**
5. Make sure your new project is selected at the top

---

### Step 2 — Enable the Google Drive API

1. In the left menu, go to **APIs & Services** → **Library**
2. Search for `Google Drive API`
3. Click on it → click **Enable**

---

### Step 3 — Create credentials

1. In the left menu, go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → select **OAuth client ID**
3. If prompted to configure a consent screen first:
   - Click **Configure Consent Screen**
   - Select **External** → click **Create**
   - Fill in **App name** (e.g. `GrihaSetu`) and your email in both email fields
   - Click **Save and Continue** through all the steps (you can leave everything else blank)
   - Go back to **Credentials** → **+ Create Credentials** → **OAuth client ID**
4. For **Application type**, select **Web application**
5. Give it a name (e.g. `GrihaSetu Web`)
6. Under **Authorised JavaScript origins**, click **+ Add URI** and paste your GitHub Pages URL:
   ```
   https://yourusername.github.io
   ```
7. Click **Create**
8. A popup will show your **Client ID** — it looks like:
   ```
   1234567890-abcdefghijk.apps.googleusercontent.com
   ```
   Copy this. You will need it in the next step.

---

### Step 4 — Paste your Client ID into the app

1. Download your `grihasetu_v4.html` file from GitHub (click the file → click the download icon)
2. Open the file in **Notepad** (Windows) or **TextEdit** (Mac)
3. Press **Ctrl+F** (Windows) or **Cmd+F** (Mac) to search
4. Search for: `YOUR_CLIENT_ID_HERE`
5. Replace that text with your actual Client ID from the previous step
6. Save the file
7. Go back to your GitHub repository and upload this updated file (same way as before — **Add file** → **Upload files**)

---

### Step 5 — Test the Drive connection

1. Open your app URL in the browser
2. Click the **☁ Drive** button at the top right
3. A Google sign-in popup will appear — sign in
4. Your data will sync to a file called `grihasetu_loan_data.json` in your Google Drive

From this point on, every time you add an entry, it auto-saves to Drive. When you open the app on a new device, it will show a blue banner — just click **Load from Drive** and sign in.

---

## Daily Use

Once set up, using the app is simple:

| Task | Where |
|------|-------|
| Record your monthly EMI | **Add Entry** tab → type = EMI Payment |
| Record a prepayment | **Add Entry** tab → type = Prepayment |
| Record month-end interest (from bank statement) | **Add Entry** tab → type = Interest Accrual |
| See your outstanding balance and closure date | **Dashboard** tab |
| See all transactions | **Ledger** tab |
| Plan what-if scenarios (extra prepayment, rate cut) | **Scenarios** tab |

---

## How the loan logic works

This tracker uses your bank's actual method — not the standard textbook split:

- When your **EMI is paid on the 10th**, the entire EMI amount reduces your outstanding balance immediately
- On the **last day of the month**, the bank calculates interest on your daily reducing balance and posts it as a separate debit
- This means your outstanding drops sharply after the 10th, and the month-end interest charge is lower as a result

This matches what you will see on your actual bank statement.

---

## Troubleshooting

**The app opens but shows someone else's loan data**
Go to **Loan Setup** tab and enter your own loan details. Click **Save Configuration**.

**Google sign-in popup is blocked**
Allow popups for your GitHub Pages URL in your browser settings.

**Drive sync shows an error**
Your session token may have expired. Click the **☁ Drive** button again and sign in once more.

**I cleared my browser and lost my data**
If you had synced to Drive at least once, click the **☁ Drive** button → sign in → click **Load from Drive**. Your data will be restored.

**"Add to Home Screen" option doesn't appear**
Make sure you uploaded ALL files (manifest.json, sw.js, icon files) to your GitHub repo. The PWA install prompt only appears when all files are present and served over HTTPS (which GitHub Pages provides).

---

## Privacy

- The app runs entirely in your browser. No data is sent to any server.
- Your loan data is stored only in your own Google Drive, in your own account.
- Nobody — including the app creator — can see your data.

---

*Built with ❤️ — GrihaSetu v4*
