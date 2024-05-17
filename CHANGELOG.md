# Changelog

All notable changes to this project will be documented in this file.

## [V1.0] - 2024-05-17

### Added

- **Map Listing:**

  - Interactive map on the home page listing all locations within a 5km radius by default, extendable to 10km.

- **Reverse Geocoding:**

  - Feature allowing users to drag a marker on the map to get potential addresses using the Google Geocoding API.
  - Users can create a location with an additional description.

- **Location List View:**

  - An alternative view to the map, listing available locations.

- **Location Details:**

  - Detailed information about each location, including full address, description, date added, user details, social media sharing buttons, and a link to Google Maps for directions.

- **File Uploading:**

  - File upload functionality using Vercel Blob or AWS S3 storage.

- **Multilingual Support:**

  - Server and client-side translations in French and English.

- **Session Management:**
  - User authentication and session management using NextAuth.js, including Google sign-in.

### Tools and Packages Implemented

- **Google Maps API:** For map listing and geocoding.
- **Google Auth:** For authentication.
- **AWS S3 and Vercel Blob:** For file storage.
- **MongoDB:** For data storage.
- **Tailwind CSS:** For styling.
- **Shadcn UI:** For UI components.
- **Vercel:** For deployment.
- **Prisma ORM:** For database interactions.
- **Zustand:** For state management.
- **Next.js:** As the React framework.
- **TypeScript:** For type safety.
- **Next i18next:** For translations.
- **Zod:** For form validation.
- **React Hook Form:** For handling forms.
- **Lucide React:** For icons.

---

For more detailed information on each feature and to explore the project, visit our [GitHub repository](https://github.com/nelsonmandeladev/elocate).
