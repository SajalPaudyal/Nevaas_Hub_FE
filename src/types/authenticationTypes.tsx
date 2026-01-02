export interface RegisterUser {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  idCard: FileList;
}

export interface SignInUser {
  email: string;
  password: string;
}
