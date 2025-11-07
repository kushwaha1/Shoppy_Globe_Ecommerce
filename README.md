# React E-Commerce Store

A modern, responsive **E-Commerce web application** built using **React, Redux Toolkit, Tailwind CSS**, and **React Router**.  
This project allows users to browse products, filter and search, add them to a cart, and place orders — complete with a checkout flow and order summary.

---

## Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React.js** | Frontend UI library |
| **Redux Toolkit** | State management (cart + search) |
| **React Router DOM** | Navigation between pages |
| **Tailwind CSS** | Responsive UI design |
| **Lucide React Icons** | Beautiful, minimal SVG icons |
| **DummyJSON API** | Product data source (https://dummyjson.com/products) |

---

---

## 🧠 How It Works

1. **Product Fetching:**  
   - Products are fetched from the **DummyJSON API** using a custom React Hook (`UseFetchProducts`).
   - Data is stored in local component state with proper loading and error handling.

2. **Browsing & Searching:**  
   - Users can browse all products or filter using the search bar.
   - The `searchSlice` in Redux manages real-time filtering based on user input.

3. **Cart Management:**  
   - Items can be added, removed, or have their quantities updated.
   - All cart operations are handled by `cartSlice.js` in Redux.
   - Cart data persists in `localStorage` so it remains after reload.

4. **Checkout Process:**  
   - Users fill out their shipping and payment details.
   - Real-time validation ensures all required fields are completed.
   - On successful order placement:
     - A popup confirmation appears.
     - The cart clears automatically.
     - The user is redirected to the home page.

5. **Performance Enhancements:**  
   - Product images load lazily using the **Intersection Observer API** for better speed.
   - Smooth transitions and Tailwind CSS animations enhance UX.

---

### Shopping Features
- Browse a list of all products.
- Filter and search products dynamically.
- View detailed information about each product.
- Add or remove items from the cart.
- View total items, subtotal, tax, shipping cost, and total price.
- Clear cart with confirmation popup.

### Checkout Flow
- Collects user details (name, email, address, etc.).
- Real-time form validation with inline error messages.
- Displays an order summary.
- Redirects to a success message after placing an order.

### UI/UX Enhancements
- Lazy loading for product images using `IntersectionObserver` for better performance.
- Animated loading placeholders while images are fetched.
- Empty cart screen with call-to-action button.
- Mobile-responsive layout for all screen sizes.

---

## Folder Structure

* src/
    - assets/                 # Logos and images
    - components/             
        * Header/             # Logo, Menu and Icons
        * TopRatedProducts    # Products rating greater than 4.0
        * ProductItem/        # Displays each product card
        * ProductList/        # Grid/List of products
        * CartItem/           # Individual cart item UI
        * Checkout/           # Checkout form and validation
        * SearchFilter/       # Debounced search input
        * Footer/             # Add Quick Links, social links, etc.
        * ScrollToTop/        # When click on any route it should scroll to top
        * LazyImage/          # Lazy loading image component
    - pages/                  
        * Home.jsx            # Home page with attractive styles and top rated products
        * ProductDetail.jsx   # Product detail view
        * Cart.jsx            # Cart page with summary
        * NotFound.jsx        # 404 page
    - utils/                  
        * cartSlice.js        # Redux slice for cart logic
        * searchSlice.js      # Redux slice for search feature
    - hooks/
        * UseFetchProduct.js  # Custom hook for fetching products
    - store/
        * store.js            # Configure store
    - App.jsx                 # Main React app
    - main.jsx                # React entry point
    - router.jsx              # Create routes

### Setup Instructions
```bash
1. Clone or download this repository 
    (`git clone https://github.com/kushwaha1/Shoppy_Globe_Ecommerce.git`).
2. Run command in vscode terminal `npm i` for installing packages.
3. Open vscode terminal and run `npm run dev`.
4. The app will now be running at `http://localhost:5173/`.

```

### Redux State Overview
```bash
cartSlice.js
- Manages all cart operations:
- Add / remove / clear items
- Calculate subtotal, total count, and total price
- Uses selectors for easy data access:
    * selectCartItems, selectCartSubtotal, selectCartCount

searchSlice.js
- Handles search functionality:
- setSearchQuery() → updates search text
- clearSearchQuery() → resets search

```

### API Integration
```bash
- This project uses DummyJSON Products API: GET `https://dummyjson.com/products`
- Fetched using a custom React hook UseFetchProducts().
- Stores data in a state and handles loading/error states.

```

### Lazy Loading
```bash
- Implemented via LazyImage.jsx using the Intersection Observer API.
- Loads images only when they appear in the viewport.
- Displays skeleton loaders before the image appears.
- Shows an error placeholder if image fails to load.

```

### Styling
```bash
- Fully styled using Tailwind CSS.
- Responsive layouts for mobile, tablet, and desktop.
- Includes utility classes for buttons, inputs, and product galleries.
```

### Checkout Flow Summary
```bash
1. User fills in shipping details.
2. Validation ensures all mandatory fields are filled.
3. Cart summary displayed with subtotal, tax, shipping, and total.
4. On successful form submission:
    - Shows success popup message.
    - Empties the cart.
    - Redirects back to Home page.
```

### Key Learnings
```bash
- How to integrate Redux Toolkit in a React project.
- Efficient data fetching with custom hooks.
- Implementing lazy image loading for performance.
- Creating a responsive UI with Tailwind CSS.
- Managing global app state cleanly and modularly.
```