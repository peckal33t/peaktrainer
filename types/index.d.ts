declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUser extends CreateUserParams {
  userId: string;
  gender: Gender;
  address: string;
  kg: string;
  height: string;
  birthDate: string;
  primaryTrainer: string;
  agreement: boolean;
}
