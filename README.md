# Google Calendar Events App

This web application allows users to sign in with their Google account and view their upcoming Google Calendar events. Users can filter events by date to streamline their schedule management.

## Live Demo

Experience the application live at: [https://google-calendar-events-delta.vercel.app](https://google-calendar-events-delta.vercel.app)

## Features

- **Google SSO Login**: Secure authentication using Google Single Sign-On.
- **View Calendar Events**: Fetch and display upcoming events from the user's Google Calendar.
- **Date Filtering**: Filter events by specific dates to focus on particular schedules.

## Tech Stack

- **Frontend**: React with Vite for fast and efficient development.
- **UI Components**: Tailwind CSS for styling and Framer Motion for animations.
- **Icons**: Lucide React for iconography.
- **Authentication**: Google OAuth for secure user authentication.

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Mayurtalewar/Google-Calendar-Events.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd google-calendar-events
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and add your Google OAuth Client ID:

   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

5. **Run the Development Server**:

   ```bash
   npm run dev
   ```

6. **Open the Application**:

   Visit [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Deployment

This application is deployed on Vercel. To deploy your own version:

1. **Fork the Repository**.
2. **Connect the Repository to Vercel**.
3. **Set the Environment Variables** in Vercel with your Google OAuth Client ID.
4. **Deploy the Application**.

## Additional Features

- **Responsive Design**: Ensured the application is mobile-friendly and adapts to various screen sizes.
- **Error Handling**: Displays error messages for failed authentication or data fetching.
- **Loading Indicators**: Shows a spinner during data loading for better user experience.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/docs/lucide-react)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- [Google Calendar API](https://developers.google.com/calendar)

This project was developed as part of a Software Developer Intern assignment to demonstrate proficiency in backend, frontend, and API integration skills, with a focus on attention to detail, UI/UX design, and code quality. 
