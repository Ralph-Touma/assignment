export class CreateUserDto {
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly password: string;
    readonly isVIP?: boolean;
    readonly isAdmin?: boolean;
    readonly isEmployee?: boolean;
  }
  