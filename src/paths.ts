export const paths = {
  home: "/",
  auth: { signIn: "/auth/sign-in", signUp: "/auth/sign-up", resetPassword: "/auth/reset-password" },
  dashboard: {
    overview: "/dashboard",
    account: "/dashboard/account",
    settings: "/dashboard/settings",
    database: {
      index: "/dashboard/database/",
      overview: "/dashboard/database/overview",
      settings: "/dashboard/database/settings",
      tables: "/dashboard/database/tables"
    },
    storage: {
      index: "/dashboard/storage/",
      overview: "/dashboard/storage/overview",
      settings: "/dashboard/storage/settings",
      files: "/dashboard/storage/files"
    },
    pages: {
      index: "/dashboard/pages/",
      create: "/dashboard/pages/create",
    },
  },
  errors: { notFound: "/errors/not-found" },
} as const;
