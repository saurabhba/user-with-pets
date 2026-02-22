export type Nationality = {
  value: string;
  label: string;
};

export type UserDob = {
  date: string;
  age: number;
};

export type UserWithPet = {
  id: string | null;
  gender: string;
  country: string;
  name: string;
  email: string;
  dob?: UserDob | null;
  phone: string;
  petImage: string;
};
