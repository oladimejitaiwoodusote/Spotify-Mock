# Spotify-Mock

A full-stack application that emulates key functionalities of Spotify, allowing users to listen to songs, create playlists, and manage a music library. Built with Next.js, this project integrates Stripe for secure payment handling, uses Supabase for backend services, and PostgreSQL for database management. It provides both free and premium user experiences with Tailwind CSS for a sleek, responsive design.

Deployed Site: https://spotify-mock-xi.vercel.app/

## Technologies Used

### Front End

- Next.js with TypeScript
- Tailwind CSS

### Back End

- Supabase
- PostgreSQL
- Stripe

### Deployment

- Vercel

## Features
### User Account and Subscription Management
- **Account Creation and User Authentication**: Allows users to create an account and log in to access their personal space.
- **Subscription to Premium Account**: Users can subscribe to a premium plan using Stripe payment integration, enabling them to upload their songs.


### Music Interacation
- **Song Uploads (For Premium Users)**: Premium users can upload their own songs to the platform.
- **Song Library**: Users can access a vast library of songs.
- **Liking Songs**: Users can like songs, adding them to a 'Liked Songs' playlist for easy access.


### Playlists
- **Liked Songs Playlist**: A special playlist where users can view all the songs they have liked, enhancing their listening experience.

## Installation and Setup

### Prerequisites
- Node.js
- A Stripe account for handling payments

### Setting Up Your Development Environment
1. **Clone the Repository**
- git clone https://github.com/oladimejitaiwoodusote/Spotify-Mock
- cd spotify-clone

2. **Install Dependencies**
- npm install

3. **Set Environment Variables**
Create a `env.local` file in the root of your project to store all your environment variables:
- NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
- NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
- STRIPE_SECRET_KEY=your_stripe_key

4. **Run the Development Server**
- npm run dev



