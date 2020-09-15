import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Sex } from '@shared';

class Author {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public sex: Sex;

  @IsString()
  @IsNotEmpty()
  public pseudonym: string;
}

class AuthorUpdate {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public sex: Sex;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public pseudonym: string;
}

export { Author, AuthorUpdate };
