# Tiketi Tamasha

Tiketi Tamasha is a React-based web application for discovering and purchasing event tickets. It includes features such as user authentication, event details, a shopping cart, and order history.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Users can sign up or log in to access personalized features.
- **Event Discovery:** Browse and view details of various events, including ticket information.
- **Shopping Cart:** Add and remove items from the shopping cart for seamless checkout.
- **Order History:** View a history of past orders for logged-in users.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```git clone https://github.com/WanjikuN/tiketi-tamasha-client.git```

2. ```cd tiketi-tamasha```

3. ```npm install```

4. ```npm start```

## Usage
The application provides a user-friendly interface for exploring events, managing a shopping cart, and making purchases. Make sure to check out the private routes, such as the checkout and order history, after logging in.

## Components
1. App
The main component that orchestrates the overall structure of the application. It includes routing, navigation, and the integration of various components.

2. LandingPage
Displays a carousel of trending events and allows users to filter and view upcoming events. Utilizes the Filter and TicketItem components.

3. Authentication
Handles user authentication, including sign up and log in functionalities.

4. Checkout
Manages the checkout process, including the private route protection for authenticated users.

5. OrdersHistory
Displays the order history for authenticated users.

6. Navbar and Footer
Reusable components for the application's navigation and footer sections.

## Contributing

We welcome contributions to Tiketi Tamasha! If you find a bug, have an idea, or want to improve something:

- **Bugs/Issues:** Open an [issue](https://github.com/WanjikuN/tiketi-tamasha-client.git/issues).
  
- **Enhancements/Ideas:** Discuss in the issues.

### Pull Requests

1. Fork the repo, create a branch.
2. Test and document your changes.
3. Follow existing coding style.
4. Use clear commit messages.
5. Open a PR with a brief description.


### Code Style

Follow the established coding style.

### License

Contributions are under [MIT License](LICENSE). Thank you!
