# FinPulse — Finance Dashboard

A clean, modern, and fully interactive personal finance dashboard built with React.js.
Track your income, monitor expenses, manage transactions, and get smart insights —
all with role-based access control, dark/light mode, and persistent state.

---

## 🚀 Getting Started

### Step 1 — Make sure Node.js is installed
```bash
node -v
```
You should see v18.x.x or higher. Download from https://nodejs.org if needed.

### Step 2 — Clone or download the project
```bash
git clone https://github.com/your-username/finance-dashboard.git
```
Or download and unzip the ZIP file manually.

### Step 3 — Open the project in VS Code
```bash
cd finance-dashboard
code .
```

### Step 4 — Install dependencies
```bash
npm install
```

### Step 5 — Start the development server
```bash
npm start

To stop the server press Ctrl + C in the terminal.

---

## 📁 Project Structure
finance-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── context/
│   │   └── AppContext.js
│   ├── data/
│   │   └── transactions.js
│   ├── utils/
│   │   └── helpers.js
│   └── components/
│       ├── Layout/
│       │   ├── Sidebar.js
│       │   └── Topbar.js
│       ├── Dashboard/
│       │   ├── index.js
│       │   ├── SummaryCards.js
│       │   ├── BalanceTrendChart.js
│       │   ├── SpendingBreakdownChart.js
│       │   └── RecentTransactions.js
│       ├── Transactions/
│       │   ├── index.js
│       │   └── TransactionModal.js
│       └── Insights/
│           └── index.js
├── package.json
└── README.md

---

## ✅ Features

### 1. Dashboard Overview
- Total Balance card showing all-time net balance
- Monthly Income card showing current month earnings
- Monthly Expenses card showing current month spending
- Savings Rate card showing percentage of income saved
- Balance Trend Chart — area chart showing income, expenses, and balance over 6 months
- Spending Breakdown Chart — interactive donut chart with top 6 expense categories
- Recent Transactions widget showing last 6 transactions with quick view all button

### 2. Transactions Section
- Full transaction table with Date, Description, Category, Type, and Amount columns
- Real-time search across description and category
- Filter by Category dropdown with all 12 categories
- Filter by Type — income or expense
- Sort by any column — click column header to toggle ascending or descending
- Clear all filters with one click
- Export filtered transactions to CSV file
- Empty state when no results match the filters

### 3. Role Based UI
- Viewer Role — read only access, no add, edit, or delete controls shown
- Admin Role — full access with Add Transaction button and edit and delete per row
- Switch roles using the toggle in the top navigation bar
- Role is saved in localStorage and persists on page reload
- Delete confirmation modal to prevent accidental removal

### 4. Insights Section
- Top Spending Category card
- Monthly Savings card for current month
- Expense vs Last Month percentage change card
- Average Monthly Expense card based on all months
- Income vs Last Month percentage change card
- Least Spent Category card
- Spending by Category bar chart across all categories
- Monthly Comparison table for last 4 months with income, expenses, net balance, and trend badge

### 5. State Management
- Built using React Context API and useReducer hook
- No external state library needed
- Single global state with transactions, role, theme, filters, and active tab
- Custom hook useFilteredTransactions applies all filters in one place
- All state changes go through a single reducer function
- Data persisted in localStorage and restored on page load

### 6. UI and UX
- Dark mode by default with full light mode toggle
- Toggle persists across page reloads
- Fully responsive layout that works on mobile, tablet, and desktop
- Sidebar collapses on mobile with overlay and close on background click
- Smooth animations on page load, card hover, and modal open
- Color coded category badges with unique color per category
- Empty state illustrations for no data scenarios
- Form validation in Add and Edit modal with inline error messages
- Delete confirmation dialog before removing any transaction

---

## 🎨 Design System

| Property        | Value                          |
|----------------|-------------------------------|
| Display Font    | Syne                          |
| Body Font       | DM Sans                       |
| Primary Accent  | #7c6aff — violet              |
| Success Color   | #34d399 — emerald green       |
| Danger Color    | #f87171 — soft red            |
| Warning Color   | #fbbf24 — amber               |
| Dark Background | #0a0a0f                       |
| Card Background | #13131c                       |
| Light Mode      | Fully supported via CSS vars  |

All colors use CSS custom properties so switching between dark and light mode
only flips the root variables — no component changes needed.

---

## 🗂️ Mock Data

The project includes 64 realistic mock transactions spread across 6 months.

Categories included:
- Food and Dining
- Transport
- Shopping
- Entertainment
- Health
- Utilities
- Salary
- Freelance
- Investment
- Rent
- Education
- Travel

Each transaction has an id, date, description, category, amount, and type field.
Income amounts are positive and expense amounts are negative internally.

---

## 📦 Dependencies

| Package         | Version   | Purpose                          |
|----------------|-----------|----------------------------------|
| react           | 18.x      | UI framework                     |
| react-dom       | 18.x      | DOM rendering                    |
| recharts        | 2.x       | Area, Pie, and Bar charts        |
| date-fns        | 3.x       | Date formatting and calculation  |
| lucide-react    | 0.383.x   | Icon library                     |

No CSS framework is used. All styling is custom CSS with variables.

---

## 🔧 Assumptions Made

- Currency is Indian Rupees using en-IN locale formatting
- This month refers to the current calendar month for KPI cards
- Role switching is frontend only with no backend authentication
- localStorage is used for persistence and clears on browser data reset
- Admin can add transactions with any past or future date
- All amounts are stored in paisa-free integers for simplicity

---

## 🌟 Optional Enhancements Included

- Dark and light mode with persistent toggle
- Data persistence using localStorage
- Export transactions to CSV
- Smooth animations and hover transitions
- Advanced filtering with search, category, type, and multi-column sort
- Delete confirmation modal
- Empty state handling for all scenarios
- Responsive mobile navigation with sidebar overlay

---

## 📄 Pages

| Page         | Tab Key      | Description                                              |
|-------------|--------------|----------------------------------------------------------|
| Dashboard    | dashboard    | KPI cards, area chart, donut chart, recent transactions  |
| Transactions | transactions | Full table with search, filter, sort, and CRUD for admin |
| Insights     | insights     | Insight cards, category bar chart, monthly table         |

---

## 👤 Role Behavior

| Feature              | Viewer | Admin |
|---------------------|--------|-------|
| View Dashboard       | ✅     | ✅    |
| View Transactions    | ✅     | ✅    |
| View Insights        | ✅     | ✅    |
| Add Transaction      | ❌     | ✅    |
| Edit Transaction     | ❌     | ✅    |
| Delete Transaction   | ❌     | ✅    |
| Export CSV           | ✅     | ✅    |
| Switch Theme         | ✅     | ✅    |

---

## 🛠️ Scripts

| Command       | Description                        |
|--------------|------------------------------------|
| npm start     | Start development server           |
| npm run build | Build optimized production bundle  |

---

## 📱 Responsive Breakpoints

| Breakpoint  | Behavior                                      |
|------------|-----------------------------------------------|
| Above 1100px | Full layout with sidebar and two column charts |
| Below 1100px | Charts stack vertically, summary in two columns |
| Below 768px  | Sidebar hidden, mobile menu button shown       |
| Below 480px  | Summary cards in single column, modal full width |

---

## 💾 localStorage Keys

| Key                      | What is stored                        |
|-------------------------|---------------------------------------|
| finance_dashboard_state  | role, theme, and transactions array   |

---

## 🐛 Common Issues

**npm start shows module not found error**
Make sure all files are created in the correct folders.
Check that Insights/index.js does not contain Dashboard imports.

**Charts not showing**
Run npm install recharts to make sure recharts is installed.

**Styles not loading**
Make sure index.css is imported inside App.js or index.js.

**localStorage not saving**
Make sure your browser allows localStorage. Try disabling private or incognito mode.

---

## 📬 Submission Notes

- Framework used: React.js with JavaScript
- No TypeScript, no external state library, no CSS framework
- All data is mock and generated locally using date-fns
- The project is frontend only with no backend dependency
- Roles are simulated on the frontend for demonstration purposes
- The app is fully functional and ready to run with npm install and npm start

```

### Step 6 — Open in browser
