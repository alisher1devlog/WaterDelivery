import z from "zod";

export const signUpSchema = z.object({
  body: z.object({
    firstName: z
      .string({ required_error: "Ism kiritilishi shart!" })
      .min(1, "Ism kiritilishi shart!"),
    lastName: z.string().optional(),
    email: z
      .string({ required_error: "Email kiritilishi kerak" })
      .email("Email formati natog'ri"),
    phone: z
      .string({ required_error: "Telefon raqami majburiy" })
      .min(9, "Telefon raqam kamida 9 ta belgidan iborat bo'lishi kerak!"),
    password: z
      .string({ required_error: "Parol kiritilishi shart!" })
      .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
  }),
});

export const signInSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email kiritilishi shart!" })
      .email("Email formati natog'ri!"),
    password: z
      .string({ required_error: "Password kiritilishi shart!" })
      .min(1, "Parol kiritilishi shart!"),
  }),
});
