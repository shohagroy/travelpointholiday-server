export enum ENUM_USER_ROLE {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

export const userFilterableFields: string[] = ["search", "role"];

export const userSearchableFields: string[] = ["name", "email", "contact"];
