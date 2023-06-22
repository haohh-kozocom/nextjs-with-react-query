export interface Students {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  country: string;
  avatar: string;
  btc_address: string;
}

export type Student = Omit<
  Students,
  "first_name" | "btc_address" | "gender" | "country"
>;
