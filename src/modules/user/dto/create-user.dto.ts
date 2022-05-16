export class CreateUserDto {
  _id: string;
  id: string;
  username: string;
  email: string;
  password: string;
  first: string;
  last: string;
  location: string;
  locale: string;
  gender: string;
  accessToken: string;
  tutorial: Record<string, any>;
  isBusiness: boolean;
  roles: string;
  collapsed: string;
  code: string;
  hashedPassword: string;
  emailPrev: string;
  creationDate: Date;
}
