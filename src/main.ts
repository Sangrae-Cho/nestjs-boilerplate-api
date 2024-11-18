import { NestFactory } from '@nestjs/core';
import { UserModule } from './apps/user/user.module';

async function bootstrap() {
  // const args = process.argv.slice(2); // 명령줄 인수 확인
  const service = 'user'; // 실행할 서비스 이름
  let app;

  switch (service) {
    case 'user':
      app = await NestFactory.create(UserModule);
      await app.listen(3001);
      console.log('Auth service is running on http://localhost:3001');
      break;

    default:
      console.error('Please specify a valid service: auth, product, order');
      process.exit(1);
  }
}
bootstrap();
