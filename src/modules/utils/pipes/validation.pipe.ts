import { ArgumentMetadata, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { ValidationException } from '@shared';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
class DTOValidationPipe implements PipeTransform {
  private readonly l = new Logger('DTOValidationPipe', true);

  constructor() {
    this.l.log('Pipe initialized');
  }

  /**
   * Transform to validate
   */
  public async transform(value: unknown, meta: ArgumentMetadata): Promise<ValidationException | unknown> {
    this.l.verbose(`Validating type - [${meta.type}]`);
    const object = plainToClass(meta.metatype, value);
    const errors = await this.validate(object);

    if (errors.length) {
      this.l.warn(`Validation error, length - [${errors.length}]`);

      throw new ValidationException({
        message: 'Validation error',
        errors,
        code: 3001,
      });
    }
    this.l.verbose('Validation ok');

    return value;
  }

  /**
   * Validate object
   */
  private async validate(object: unknown): Promise<Array<string>> {
    const errors = await validate(object);
    const errMessages = [];
    const parseErrors = (errs): void => {
      errs.map((err) => {
        if (!err.children || err.children.length == 0) {
          errMessages.push(err.constraints[Object.keys(err.constraints)[0]]);
        } else {
          parseErrors(err.children);
        }
      });
    };
    parseErrors(errors);
    return errMessages;
  }
}

export { DTOValidationPipe };
