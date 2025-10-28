import dotenv from "dotenv";

export const configc = {
  app: {
    port: process.env.PORT || 4000,
  },
  db: {
    url:
      process.env.DB_URL ||
      "mongodb+srv://alisher:12345@cluster0.28vzhyn.mongodb.net/",
  },
};
