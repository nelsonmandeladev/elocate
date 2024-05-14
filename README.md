# ELOCATE

Place Finder is an open-source project designed to help people find and share places easily. It features an interactive map, location details, and user-generated content, providing a comprehensive platform for discovering new locations around you.

## Table of Contents

1. [Features](#features)
2. [Tools and Packages](#tools-and-packages)
3. [Environment Variables](#environment-variables)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Deployment](#deployment)
6. [Contributing](#contributing)
7. [License](#license)

## Features

- **Map Listing:** The home page features a map listing all locations within a 5km radius by default, extendable to 10km.
- **Reverse Geocoding:** Drag a marker on the map to get potential addresses using the Google Geocoding API. Users can create a location with an additional description.
- **Location List View:** Users can view available locations in a list format as an alternative to the map view.
- **Location Details:** View detailed information about a specific location, including full address, description, date added, and user details. Share locations on social media and get directions via Google Maps.
- **File Uploading:** Users can upload files using Vercel Blob or AWS S3 storage.
- **Multilingual Support:** Both server and client-side translations in French and English.
- **Session Management:** Easy login or account creation using Google sign-in via NextAuth.js.

## Tools and Packages

- **[Google Maps API](https://developers.google.com/maps/documentation/javascript/overview):** For map listing and geocoding.
- **[Google Auth](https://developers.google.com/identity):** For authentication.
- **[AWS S3](https://aws.amazon.com/s3/):** For file storage.
- **[Vercel Blob](https://vercel.com/docs/storage/vercel-blob):** For file storage.
- **[MongoDB](https://www.mongodb.com/):** For data storage.
- **[Tailwind CSS](https://tailwindcss.com/):** For styling.
- **[Shadcn UI](https://shadcn.dev/):** For UI components.
- **[Vercel](https://vercel.com/):** For deployment.
- **[Prisma ORM](https://www.prisma.io/):** To interact with the database.
- **[Zustand](https://github.com/pmndrs/zustand):** For state management.
- **[Next.js](https://nextjs.org/):** As the React framework.
- **[TypeScript](https://www.typescriptlang.org/):** For type safety.
- **[Next i18next](https://github.com/isaachinman/next-i18next):** For translations.
- **[Zod](https://zod.dev/):** For form validation.
- **[React Hook Form](https://react-hook-form.com/):** For handling forms.
- **[Lucide React](https://lucide.dev/):** For icons.

## Environment Variables

Create a `.env` file at the root of your project and add the following variables:

```env
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_FACEBOOK_ID=
AUTH_FACEBOOK_SECRET=
AUTH_RESEND_KEY=
BLOB_READ_WRITE_TOKEN=
AWS_IDENTITY_POOL_ID=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
NEXT_PUBLIC_BASE_URL=
DATABASE_URL=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_ID=
NEXT_PUBLIC_BASE_SITE_URL=
```

## Getting Started

### Prerequisites

Before starting, ensure you have the following configured:

1. **AWS S3:** [Setup Guide](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)
2. **Vercel Blob Storage:** [Setup Guide](https://vercel.com/docs/storage/vercel-blob)
3. **MongoDB:** [Setup Guide](https://docs.mongodb.com/manual/installation/)
4. **Google Maps API:** [Setup Guide](https://developers.google.com/maps/gmp-get-started)
5. **OAuth API Key and Secret:** [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

### Installation

1. Clone the project:

   ```sh
   git clone https://github.com/nelsonmandeladev/locate-elecam
   ```

2. Change to the project directory:

   ```sh
   cd place-finder
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Generate the Prisma client:

   ```sh
   npm run db:gen
   ```

5. Push the Prisma schema to your database:

   ```sh
   npm run db:push
   ```

6. Start the development server:

   ```sh
   npm run dev
   ```

## Deployment

Deploy your project on [Vercel](https://vercel.com/) by following their [deployment documentation](https://vercel.com/docs).

## Contributing

We welcome contributions! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes.
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin my-feature-branch`
6. Submit a pull request.

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. Feel free to use it for any use case.

---

If you encounter any issues or have questions, please feel free to open an issue on the [GitHub repository](https://github.com/nelsonmandeladev/locate-elecam/issues).

Happy coding!
