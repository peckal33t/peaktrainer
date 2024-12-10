declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUser {
  name: string;
  email: string;
  phone: string;
}

declare interface User extends CreateUser {
  $id: string;
}

declare interface RegisterUser extends CreateUser {
  userId: string;
  gender: Gender;
  address: string;
  kg: string;
  height: string;
  birthDate: string;
  primaryTrainer: string;
  agreement: boolean;
}
