import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class Book {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  public authorId: number;
}

class BookUpdate {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  public authorId: number;
}

export { Book, BookUpdate };
