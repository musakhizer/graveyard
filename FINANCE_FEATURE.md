# Financial Transactions & Billing Feature + Burial Records Enhancements

## Overview
A comprehensive financial management system and enhanced burial records system for tracking payments, generating receipts, monitoring revenue, and managing burial information for cemetery services.

## Key Features

### Financial Transactions & Billing

#### 1. Payment Management Context (`contexts/FinanceContext.tsx`)
- State management for all payment transactions
- localStorage persistence for data
- Helper functions for financial calculations
- Sample data included for demonstration

#### 2. Payment Form (`components/PaymentForm.tsx`)
- Create new payment entries
- Fields: Customer name, amount, date, due date, plot/grave info, service type, status, description
- Comprehensive validation for all fields
- Integration with plots and graves data
- Only shows available graves

#### 3. Premium Receipt UI (`components/PaymentReceipt.tsx`)
- **Professional and modern receipt design** with:
  - Gradient headers and sections
  - Clear typography hierarchy
  - Status icons (checkmark, clock, alert)
  - Color-coded status sections
  - Grid layout for organized information
  - Beautiful amount display box
- Print functionality with professional styling
- Download as HTML file
- Optimized for both screen and print viewing

#### 4. Edit Payment Form (`components/EditPaymentForm.tsx`)
- Update existing payment records
- Pre-filled with current payment data
- Full field editing capability

#### 5. Finance Dashboard (`app/finance/page.tsx`)
- Financial overview with key metrics:
  - Total Revenue
  - Paid Amount
  - Pending Amount
  - Overdue Amount
- Smart payment alerts:
  - Red alert for overdue payments with count and total amount
  - Yellow notice for pending payments with count and total amount
- Payment history table with:
  - Search functionality (customer name, receipt number, description)
  - Filter by status (paid/pending/overdue)
  - Filter by service type
  - Edit and delete actions
  - View receipt option
- **Role-based access control**: Visitors blocked from accessing Finance section

#### 6. Dashboard Integration (`app/page.tsx`)
- Added Total Revenue card
- Added Pending Payments card
- Total Transactions in Quick Stats

#### 7. Navigation Updates
- Added Finance link to sidebar with DollarSign icon

### Burial Records Enhancements

#### 1. Enhanced Burial Record Context (`contexts/BurialRecordContext.tsx`)
- New `getRecordById()` method to retrieve individual records
- Improved return type for `addRecord()` to return created record

#### 2. Improved Burial Record Form (`components/BurialRecordForm.tsx`)
- **Comprehensive validation**:
  - Date of death cannot be a future date (JavaScript max constraint + validation check)
  - Age must be between 0-150 (validation with error messages)
  - All required fields validated before submission
- Only shows **available graves** for burial assignment
- Date picker restricted to past dates only

#### 3. Edit Burial Record Form (`components/EditBurialRecordForm.tsx`)
- New component for editing burial records
- Can only edit non-approved records
- Maintains all validation rules
- Pre-filled with current burial data
- Allows reassignment to different plots/graves

#### 4. Enhanced Burial Records Page (`app/burial-records/page.tsx`)
- Edit button for non-approved records
- **Visitor access restricted**: Shows access denied message
- Improved UI with edit functionality
- Staff/Admin can modify pending and rejected records

#### 5. Grave Display Enhancements (`contexts/GraveyardContext.tsx`)
- Extended Grave interface with burial record information:
  - `burialRecordId`: Link to burial record
  - `deceasedName`: Name of deceased
  - `dateOfDeath`: Date of death
  - `age`: Age at death
  - `gender`: Gender of deceased
  - `religion`: Religion of deceased

#### 6. Graves Page Access Control (`app/graves/page.tsx`)
- **Visitor access restricted**: Shows access denied message
- Staff and Admin only can view grave information

## Payment Status Types
- **Paid**: Payment completed
- **Pending**: Payment awaiting completion
- **Overdue**: Payment past due date

## Service Types
- Plot Booking
- Burial Service
- Maintenance
- Other

## Data Persistence
- All payment data stored in localStorage under `graveyard_payments` key
- All burial records stored in memory with context management
- Data survives page refreshes for payments

## Access Control & Permissions

### Visitors
- ✓ Can access: Dashboard, Graveyards, Plots
- ✗ Cannot access: Finance, Burial Records, Graves
- Denied with professional access denied screen

### Staff
- ✓ Can access: All areas
- ✓ Can create: Payments, Burial Records
- ✓ Can edit: Payments, Burial Records (except approved)
- ✓ Cannot: Approve/Reject burial records

### Admin
- ✓ Full access to all areas
- ✓ Can create, edit, delete payments
- ✓ Can create, edit, delete burial records
- ✓ Can approve/reject burial records

## Validation Rules

### Burial Records
- **Date of Death**: Must not be a future date
- **Age**: Must be a valid number between 0-150
- **All Required Fields**: Name, Father's name, date of death, gender, age, religion, plot, grave
- **Grave Selection**: Only available graves shown (except when editing - allows current grave)

### Payments
- **Amount**: Must be a positive number
- **Required Fields**: Customer name, amount, date, service type, status
- **Date**: Past date required for death records

## Usage Examples

### Creating a Burial Record
1. Navigate to Burial Records page
2. Click "New Record" button
3. Fill in deceased person information
4. Select plot and available grave
5. Date of death validated (no future dates)
6. Submit for review
7. Record starts in "Pending" status

### Editing a Burial Record
1. Click edit icon on pending/rejected records
2. Update any field as needed
3. Reassign to different plot/grave if needed
4. Save changes
5. Cannot edit approved records

### Creating a Payment
1. Navigate to Finance page
2. Click "New Payment" button
3. Fill in customer details and amount
4. Set service type and payment status
5. Optionally link to plot/grave
6. Submit creates payment
7. Receipt automatically displays

### Viewing & Downloading Receipt
1. Click receipt icon on payment row
2. View professional formatted receipt
3. Print directly or download as HTML
4. Print styling optimized for paper

### Filtering & Searching
- **Payments**: Search by customer name, receipt ID, or description
- **Burial Records**: Search by name or father's name
- **Status Filters**: Available on both sections
- **Service Type**: Filter payments by service type

## Technical Details
- Built with React Context API for state management
- localStorage for persistent payment data
- Responsive design for all screen sizes
- Type-safe with TypeScript
- Integrated components across sections
- Professional UI with gradient effects and hover states
- Mobile-friendly interface
- Comprehensive error handling and validation

## Files Modified/Created
- `contexts/FinanceContext.tsx` - Created
- `contexts/BurialRecordContext.tsx` - Enhanced
- `contexts/GraveyardContext.tsx` - Enhanced
- `components/PaymentForm.tsx` - Created
- `components/PaymentReceipt.tsx` - Created (premium UI)
- `components/EditPaymentForm.tsx` - Created
- `components/BurialRecordForm.tsx` - Enhanced with validation
- `components/EditBurialRecordForm.tsx` - Created
- `app/finance/page.tsx` - Created
- `app/burial-records/page.tsx` - Enhanced
- `app/graves/page.tsx` - Enhanced with access control
- `components/Sidebar.tsx` - Updated navigation
- `app/layout.tsx` - Added FinanceProvider
- `app/page.tsx` - Dashboard updates
