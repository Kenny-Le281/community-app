# Community App

The Angular frontend is in `frontend/`, and the ASP.NET Core API is in `CommunityApp.Api/`.

## Run locally

Use the .NET 10 SDK and a Node.js version supported by [Angular 21](https://angular.dev/reference/versions#actively-supported-versions), such as Node.js 24.

1. Configure the API project's local `ConnectionStrings:Default` user secret with your development Supabase PostgreSQL connection string. Keep credentials out of the frontend and Git.
2. From the repository root, start the API:

   ```sh
   dotnet run --project CommunityApp.Api --launch-profile http
   ```

3. From the repository root in a second terminal, start Angular:

   ```sh
   cd frontend
   npx --yes pnpm@11.25.0 install --frozen-lockfile
   npm start
   ```

Open <http://localhost:4200/> to see the Home page and its event cards. The Angular development server forwards `/api/` requests to the API at `http://localhost:5145`. This proxy is for local development; a production host must route `/api/` separately.

API reference: <http://localhost:5145/scalar/v1>.
