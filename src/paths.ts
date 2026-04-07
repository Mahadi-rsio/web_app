export const paths = {
  home: "/",
  auth: { signIn: "/auth/sign-in", signUp: "/auth/sign-up", resetPassword: "/auth/reset-password" },
  dashboard: {
    overview: "/dashboard",
    account: "/dashboard/account",
    customers: "/dashboard/customers",
    integrations: "/dashboard/integrations",
    settings: "/dashboard/settings",
    database: {
      overview: "/dashboard/database/overview",
      settings: "/dashboard/database/settings",
      tables: "/dashboard/database/tables"
    },
  },
  errors: { notFound: "/errors/not-found" },
} as const;
