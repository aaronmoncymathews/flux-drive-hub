# FluxTerra Simworks Backend

This is the backend API for the FluxTerra Simworks simulation booking platform.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Stripe account for payment processing

### Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/fluxterrasimworks
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
FRONTEND_URL=http://localhost:3000
PORT=5000
```

5. Set up the database with sample data:
```bash
npm run setup
```

6. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user data

### Users
- `GET /api/users/search` - Search users by email
- `POST /api/users/friends/:userId` - Add friend
- `DELETE /api/users/friends/:userId` - Remove friend

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `PATCH /api/bookings/:bookingId/status` - Update booking status

### Leaderboards
- `GET /api/leaderboards/fastest-laps` - Get fastest lap times
- `GET /api/leaderboards/most-licenses` - Get users with most licenses
- `GET /api/leaderboards/most-hours` - Get users with most hours driven
- `GET /api/leaderboards/most-wins` - Get users with most race wins
- `GET /api/leaderboards/highest-consistency` - Get most consistent drivers
- `GET /api/leaderboards/cleanest-driver` - Get cleanest drivers
- `GET /api/leaderboards/most-sessions` - Get users with most sessions

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (admin only)
- `POST /api/events/:eventId/register` - Register for event
- `PATCH /api/events/:eventId/results` - Update event results (admin only)

### Admin
- `POST /api/admin/award-license` - Award license to user
- `GET /api/admin/users` - Get all users (paginated)
- `GET /api/admin/bookings` - Get all bookings (paginated)
- `PATCH /api/admin/users/:userId/stats` - Update user stats

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/webhook` - Handle Stripe webhooks

## Default Users

The setup script creates two default users:

**Admin User:**
- Email: `admin@fluxterrasimworks.com`
- Password: `admin123`
- Role: admin

**Demo User:**
- Email: `user@example.com`
- Password: `user123`
- Role: user

## Deployment

### Heroku Deployment

1. Create a Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set STRIPE_SECRET_KEY=your_stripe_secret_key
heroku config:set FRONTEND_URL=https://your-frontend-domain.com
```

3. Deploy:
```bash
git push heroku main
```

4. Run database setup:
```bash
heroku run npm run setup
```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string and update MONGODB_URI in your environment variables

### Stripe Setup

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Set up webhooks for payment events
4. Update your environment variables with the Stripe keys

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization

## License

MIT License