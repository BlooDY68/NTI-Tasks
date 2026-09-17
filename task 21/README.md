# Session 21 Task: Shopping Cart Application Using Angular Signals

A reactive shopping cart application demonstrating state management using modern **Angular Signals**.

## Demonstrated Concepts
- **signal<Product[]>()**: Creates reactive cart state.
- **update()**: Immutably adds and removes products from the cart signal.
- **set()**: Resets the cart state when clearing the cart.
- **computed()**: Automatically derives and recalculates the total price of cart items.
- **effect()**: Logs cart items count to the console on every state change.
- **@for & @if**: Modern Angular control flow for rendering available products and cart items with empty state handling.

## How to Run
1. Navigate to the task directory:
   \\\ash
   cd "task 21"
   \\\
2. Install dependencies:
   \\\ash
   npm install --legacy-peer-deps
   \\\
3. Start the application:
   \\\ash
   npm start
   \\\
4. Open your browser at \http://localhost:4200\.