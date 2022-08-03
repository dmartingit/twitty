# Twitty

Twitty is a twitter clone and was built with react, 
typescript and supabase as a backend solution.

## Development

### Supabase

To keep the api keys secret you have to adjust 
`src/api/SupabaseClient.ts.example` and remove 
`example` from the filename.

Additionally, Supabase has a feature to generate type definitions
for your custom database tables.

To use it you could run the following command:

`npx openapi-typescript https://<PROJECT>.supabase.co/rest/v1/?apikey=<API_KEY> --output src/api/Types.ts`
