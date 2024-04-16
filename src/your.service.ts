import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YourService {
  private readonly logger = new Logger(YourService.name);

  constructor(private configService: ConfigService) {
    const someConfig = this.configService.get<string>('SOME_ENV_VARIABLE');
    this.logger.log(`Some Config: ${someConfig}`);
  }

}
