# Sales Management Platform

This is a MERN Stack-based project built as part of an **Intern MERN Stack Coding Challenge**. It features a backend hosted on **Render** and a frontend hosted on **Vercel**. The platform provides a comprehensive interface to manage and visualize product transactions using various API endpoints and interactive charts.

## 🌐 Hosted Website
[Sales Management Platform](https://sales-management-one.vercel.app)

---

## 📚 Features

### Backend
- **Database Initialization**:  
  Fetches JSON data from a third-party API and seeds the database with optimized schema for efficient querying.

- **API Endpoints**:
  - **Transaction Listing API**:
    - Fetch transactions with optional search and pagination.
    - Filter transactions by product title, description, and price.
  - **Statistics API**:
    - Fetch total sales, sold items, and unsold items for a selected month.
  - **Bar Chart API**:
    - Group products into price ranges for a selected month.
  - **Pie Chart API**:
    - Categorize products and count items per category for a selected month.
  - **Combined Data API**:
    - Consolidates data from all other APIs into a single response.

### Frontend
- **Transactions Table**:
  - List transactions with pagination and a search bar.
  - Month dropdown to filter transactions (default: March).
  - Dynamic updates based on search inputs and pagination.
- **Statistics Section**:
  - Displays total sales, sold items, and unsold items for the selected month.
- **Bar Chart**:
  - Visualizes price range distribution for products.
- **Pie Chart**:
  - Visualizes product categorization.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** as the database
- **Mongoose** for schema-based database modeling
- Hosted on **Render**

### Frontend
- **React.js**
- **Chart.js** for visualizations
- Hosted on **Vercel**

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your local machine.
- MongoDB set up for local development or cloud deployment.

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ritesh5556/Sales-Management
   
