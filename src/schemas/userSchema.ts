import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа").max(64),
  username: z.string().min(2, "Минимум 2 символа").max(64),
  email: z.email("Некорректный email"),
  city: z.string().min(2, "Минимум 2 символа").max(64),
  phone: z.string().regex(/^\d+$/, "Допустимы только цифры"),
  company: z.string().min(2, "Минимум 2 символа").max(64),
});
export type UserFormData = z.infer<typeof userSchema>;
