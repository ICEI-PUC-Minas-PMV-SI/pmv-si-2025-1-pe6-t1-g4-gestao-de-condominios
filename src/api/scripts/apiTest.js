import newman from 'newman';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const backendPath = path.dirname(path.join(process.argv[1], '..'));
dotenv.config({ path: path.join(backendPath, '.env') });

const prisma = new PrismaClient();
const condominiumName = 'Residencial Flor do Campo';

class DB {
  async getApartmentMocked() {
    const condominium = await prisma.condominium.findFirst({
      where: { name: condominiumName },
    });
    const apartment = await prisma.apartment.findFirst({
      where: {
        condominiumId: condominium.id,
      }
    });
    return apartment;
  }
  async getFixedManagerUser() {
    const fixedManagerUser = await prisma.user.findUnique({
      where: { email: 'fixed_manager_user@teste.com' }
    });
    return fixedManagerUser;
  }
  async getData() {
    const [
      apartment,
      fixedManagerUser,
    ] = await Promise.all([
      this.getApartmentMocked(),
      this.getFixedManagerUser(),
    ]);
    return {
      apartment,
      fixedManagerUser,
    }
  }
}

new DB().getData().then(({apartment, fixedManagerUser}) => {
  const collectionPath = path.join(backendPath, 'collection', 'gestao-condominio-test.postman_collection.json');
  const forgotPasswordToken = jwt.sign({
    email: 'user_forgot_password@teste.com',
    operation: 'RESET_PASSWORD'
  }, process.env.JWT_SECRET_KEY, {expiresIn: '610d'});
  const changePasswordToken = jwt.sign({
    email: 'user_change_password@teste.com',
    operation: 'RESET_PASSWORD'
  }, process.env.JWT_SECRET_KEY, {expiresIn: '610d'});
  console.log(`\nToken ResetPassword: ${forgotPasswordToken}\n`);
  newman.run({
      collection: JSON.parse(fs.readFileSync(collectionPath, {encoding: 'utf8'})),
      reporters: 'cli',
      environment: {
        id: 'env-collection-vars',
        name: 'Environment to override collection variables',
        values: [
          {
            key: 'forgot_password_token',
            value: forgotPasswordToken,
            enabled: true
          },
          {
            key: 'reset_password_token',
            value: changePasswordToken,
            enabled: true
          },
          {
            key: 'new_apartment_id',
            value: apartment.id,
            enabled: true
          },
          {
            key: 'fixed_manager_user_id',
            value: fixedManagerUser.id,
            enabled: true
          },
        ]
      }
  }, (err, summary) => {
      if (err) {
          console.error('Erro durante a execução dos testes:', err);
          process.exit(1);
      } else {
          console.log('Execução dos testes concluída.');
          console.log('Número de testes falhos:', summary.run.failures.length);
          process.exit(summary.run.failures.length ? 1 : 0);
      }
  });
})
