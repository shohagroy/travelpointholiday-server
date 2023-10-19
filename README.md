# TravelPoint Server

TravelPoint Server is the backend API for the TravelPoint Holiday booking website, providing the core functionality for managing user data, travel attractions, bookings, reviews, and more. Built using TypeScript, Express.js, Prisma, and PostgreSQL, the TravelPoint Server ensures a robust and secure foundation for the TravelPoint platform.

### Live Link: [https://travelpoint-server-rouge.vercel.app/](https://travelpoint-server-rouge.vercel.app/)

## Technologies Used

- **TypeScript:** The server-side code is written in TypeScript, providing type safety and maintainability.
- **Express.js:** A web framework for building robust and efficient APIs.
- **Prisma:** An Object-Relational Mapping (ORM) tool for managing the database.
- **PostgreSQL:** A powerful and open-source relational database.
- **Cloudinary:** Used for image storage and management.
- **Passport:** For user authentication, including Google OAuth2.

## Application Routes

### Authentication

- `GET /api/v1/auth/google`: Initiate Google OAuth2.0 authentication for user registration.
- `GET /api/v1/auth/callback`: Handle the callback after Google OAuth2.0 authentication.
- `GET /api/v1/auth/get-google-callback`: Retrieve Google login URL.
- `POST /api/v1/auth/create-user`: Register a new user account.
- `POST /api/v1/auth/login`: Log in with an existing user account.
- `PATCH /api/v1/auth/change-password`: Change the user's password (Allowed for super admins, admins, and users).
- `PATCH /api/v1/auth/change-user-role`: Change the user's role (Allowed for super admins and admins).
- `PATCH /api/v1/auth/delete-user`: Delete a user (Allowed for super admins and admins).
- `POST /api/v1/auth/refresh-token`: Refresh the user's access token.

### User

- `GET /api/v1/users`: Get a list of all users (Only allowed for admins).
- `PATCH /api/v1/users/update-info`: Update user's information (login user).
- `PATCH /api/v1/users/update-avatar`: Update user's avatar (login user).
- `GET /api/v1/users/get-profile`: Get the profile of the logged-in user (login user).

### Categories

- `GET /api/v1/categories`: Get a list of all categories.
- `GET /api/v1/categories/get-all`: Get detailed data for all categories.
- `POST /api/v1/categories/create`: Create a new category (Allowed for admins and super admins).
- `PATCH /api/v1/categories/:id`: Update a category's information (Allowed for super admins and admins).
- `GET /api/v1/categories/:id`: Get a single category by ID.
- `DELETE /api/v1/categories/:id`: Delete a category (Allowed for admins and super admins).

### Countries

- `GET /api/v1/countries`: Get a list of all countries.
- `POST /api/v1/countries/create`: Create a new country (Allowed for admins and super admins).
- `GET /api/v1/countries/get-all`: Get detailed data for all countries.
- `PATCH /api/v1/countries/:id`: Update a country's information (Allowed for super admins and admins).
- `GET /api/v1/countries/:id`: Get a single country by ID.
- `DELETE /api/v1/countries/:id`: Delete a country (Allowed for admins and super admins).

### Cities

- `GET /api/v1/cities`: Get a list of all cities.
- `POST /api/v1/cities/create`: Create a new city (Allowed for admins and super admins).
- `GET /api/v1/cities/get-all`: Get detailed data for all cities.
- `PATCH /api/v1/cities/:id`: Update a city's information (Allowed for super admins and admins).
- `GET /api/v1/cities/:id`: Get a single city by ID.
- `DELETE /api/v1/cities/:id`: Delete a city (Allowed for admins and super admins).

### Attraction

- `POST /api/v1/attractions`: Create a new attraction (Only allowed for admins).
- `GET /api/v1/attractions`: Get a list of all attractions.
- `GET /api/v1/attractions/:id`: Get a single attraction by ID.
- `PATCH /api/v1/attractions/:id`: Update an attraction (Only allowed for admins).
- `DELETE /api/v1/attractions/:id`: Delete an attraction (Only allowed for admins).
- `PATCH /api/v1/attractions/edit-info/:id`: Update attraction information (Only allowed for admins).
- `POST /api/v1/attractions/images/:id`: Upload new images for an attraction (Only allowed for admins).
- `PATCH /api/v1/attractions/images/:id`: Remove images for an attraction (Only allowed for admins).

### Booking

- `POST /api/v1/bookings/create`: Create a new booking.
- `PATCH /api/v1/bookings/cancel`: Cancel a booking.
- `GET /api/v1/bookings/user-booking`: Get a list of bookings for a user.
- `GET /api/v1/bookings/get-all`: Get a list of all bookings (Only allowed for admins).
- `PATCH /api/v1/bookings/refund-cancel`: Refund a canceled booking (Only allowed for admins).
- `PATCH /api/v1/bookings/refund-confirm`: Confirm a refund (Only allowed for admins).
- `PATCH /api/v1/bookings/cancel-and-refund`: Cancel a booking and process a refund (Only allowed for admins).

### Review

- `POST /api/v1/reviews/create-review`: Create a new review (Only allowed for customers).
- `GET /api/v1/reviews`: Get a list of all reviews (Only allowed for admins).
- `GET /api/v1/reviews/:id`: Get a single review by ID (Only allowed for admins).
- `PATCH /api/v1/reviews/:id`: Update a review (Only allowed for admins).
- `DELETE /api/v1/reviews/:id`: Delete a review (Only allowed for admins).

### Cart

- `GET /api/v1/carts/get-users-cart`: Get a user's shopping cart.
- `POST /api/v1/carts/add-to-cart`: Add an item to the shopping cart.
- `POST /api/v1/carts/remove-to-cart`: Remove an item from the shopping cart.
- `POST /api/v1/carts/decrement-cart-items-quantity`: Decrement the quantity of an item in the shopping cart.

## Thanks!

Thank you for exploring the TravelPoint Server. If you have any questions or need further assistance, feel free to contact us. We're here to help!

## Contact Information

- Facebook: [Shohag Roy](https://www.facebook.com/shohag.7771)
- Email: pkshohag240@gmail.com

We hope you enjoy using the TravelPoint Server and have a great day!
