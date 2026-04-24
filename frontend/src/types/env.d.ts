declare namespace NodeJS {
  interface ProcessEnv {
    BACKEND_URL: string
    TMDB_API_TOKEN: string
    TMDB_IMAGE_BASE_URL: string
  }
}