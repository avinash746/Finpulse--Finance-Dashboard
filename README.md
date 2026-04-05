 ## Finance Dashboard — Project Documentation
React.js  |  Context API  |  Recharts  |  Responsive Design

🚀 Getting Started
Follow these steps exactly to run the project on your machine.

Step 1 — Check Node.js is installed
node -v
You should see v18.x.x or higher. Download from nodejs.org if needed.

Step 2 — Navigate to Desktop (or your preferred folder)
cd Desktop

Step 3 — Create the React app
npx create-react-app finance-dashboard

Step 4 — Open the project in VS Code
cd finance-dashboard
code .

Step 5 — Install required dependencies
npm install recharts date-fns lucide-react

Step 6 — Delete default files
Mac / Linux:
rm src/App.css src/App.test.js src/logo.svg src/reportWebVitals.js src/setupTests.js
Windows:
del src\App.css src\App.test.js src\logo.svg src\reportWebVitals.js src\setupTests.js

Step 7 — Create folder structure
Mac / Linux:
mkdir -p src/components/Dashboard src/components/Transactions src/components/Insights src/components/Layout src/context src/data src/utils
Windows:
mkdir src\components\Dashboard src\components\Transactions src\components\Insights src\components\Layout src\context src\data src\utils

Step 8 — Paste the code into each file
Create all files listed in the Project Structure section below and paste the code from the source files provided.

Step 9 — Start the development server
npm start

Step 10 — Open in browser
http://localhost:3000

To stop the server press Ctrl + C in the terminal.

📁 Project Structure

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

✅ Features Implemented
1. Dashboard Overview
•	Total Balance card — all-time net balance
•	Monthly Income card — current month earnings
•	Monthly Expenses card — current month spending
•	Savings Rate card — percentage of income saved
•	Balance Trend Chart — area chart showing income, expenses, balance over 6 months
•	Spending Breakdown Chart — interactive donut chart with top 6 categories
•	Recent Transactions widget — last 6 transactions with View All button

2. Transactions Section
•	Full transaction table with Date, Description, Category, Type, Amount
•	Real-time search across description and category
•	Filter by Category — dropdown with all 12 categories
•	Filter by Type — income or expense
•	Sort by any column — click header to toggle ascending or descending
•	Clear all filters with one click
•	Export filtered transactions to CSV file
•	Empty state when no results match the filters

3. Role Based UI
•	Viewer Role — read only, no add, edit, or delete controls shown
•	Admin Role — full access with Add, Edit, and Delete per row
•	Switch roles using the toggle in the top navigation bar
•	Role saved in localStorage and persists on page reload
•	Delete confirmation modal to prevent accidental removal

4. Insights Section
•	Top Spending Category card
•	Monthly Savings card for current month
•	Expense vs Last Month percentage change
•	Average Monthly Expense based on all months
•	Income vs Last Month percentage change
•	Least Spent Category card
•	Spending by Category bar chart
•	Monthly Comparison table — last 4 months with trend badges

5. State Management
•	React Context API + useReducer — no external library
•	Single global state: transactions, role, theme, filters, activeTab
•	Custom hook useFilteredTransactions for clean filter logic
•	All changes through single reducer function
•	Persisted in localStorage, restored on page load

6. UI and UX
•	Dark mode by default with full light mode toggle
•	Fully responsive — mobile, tablet, and desktop
•	Sidebar collapses on mobile with overlay navigation
•	Smooth animations on page load, card hover, modal open
•	Color coded category badges with unique colors
•	Empty state handling for all no-data scenarios
•	Form validation with inline error messages

🎨 Design System

Property	Value
Display Font	Syne
Body Font	DM Sans
Primary Accent	#7c6aff — violet
Success Color	#34d399 — emerald green
Danger Color	#f87171 — soft red
Warning Color	#fbbf24 — amber
Dark Background	#0a0a0f
Card Background	#13131c
Light Mode	Fully supported via CSS variables

All colors use CSS custom properties so switching between dark and light mode only flips the root variables — no component changes needed.

🗂️ Mock Data
The project includes 64 realistic mock transactions spread across 6 months.

Categories Included
•	Food and Dining
•	Transport
•	Shopping
•	Entertainment
•	Health
•	Utilities
•	Salary
•	Freelance
•	Investment
•	Rent
•	Education
•	Travel

Each transaction has: id, date, description, category, amount, and type. Income amounts are positive and expense amounts are negative internally.

📦 Dependencies

Package	Version	Purpose
react	18.x	UI framework
react-dom	18.x	DOM rendering
recharts	2.x	Area, Pie, and Bar charts
date-fns	3.x	Date formatting and calculation
lucide-react	0.383.x	Icon library

No CSS framework is used. All styling is custom CSS with design system variables.

👤 Role Behavior

Feature	Viewer	Admin
View Dashboard	Yes	Yes
View Transactions	Yes	Yes
View Insights	Yes	Yes
Add Transaction	No	Yes
Edit Transaction	No	Yes
Delete Transaction	No	Yes
Export CSV	Yes	Yes
Switch Theme	Yes	Yes

📱 Responsive Breakpoints

Breakpoint	Behavior
Above 1100px	Full layout — sidebar visible, two column charts
Below 1100px	Charts stack vertically, summary in two columns
Below 768px	Sidebar hidden, mobile hamburger menu shown
Below 480px	Summary cards single column, modal full width

🛠️ NPM Scripts

Command	Description
npm start	Start development server at localhost:3000
npm run build	Build optimized production bundle

🐛 Common Issues
Module not found error
Make sure all files are in the correct folders. Check that Insights/index.js does not contain Dashboard imports. The file must start with recharts imports, not SummaryCards.

Charts not showing
Run the install command again to ensure recharts is present:
npm install recharts

Styles not loading
Make sure index.css is imported in src/index.js and that the file exists with content.

localStorage not saving
Make sure your browser allows localStorage. Disable private or incognito mode and try again.

📬 Submission Notes
•	Framework used: React.js with JavaScript
•	No TypeScript, no external state library, no CSS framework
•	All data is mock and generated locally using date-fns
•	The project is frontend only with no backend dependency
•	Roles are simulated on the frontend for demonstration purposes
•	The app is fully functional — run npm install then npm start

FinPulse Finance Dashboard  —  Built with React.js
