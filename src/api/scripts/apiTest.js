import mysql from 'mysql2';
import newman from 'newman';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

const backendPath = path.dirname(path.join(process.argv[1], '..'));
dotenv.config({ path: path.join(backendPath, '.env') });

const collectionPath = path.join(backendPath, 'collection', 'gestao-condominio-test.postman_collection.json');

const valuesToInsert = [
  `('cm8gho9up0000ly7sn0zdneoc','Admin','ADMIN','admin@admin.com','$2b$10$0Qm1te9D4F.DQu46OJVNPOKh1seSMSXYymWrreLCzGS8D79zh6Vry',NULL,NULL,'2025-03-19 22:23:33.590','2025-03-19 22:23:33.590',NULL,NULL,1)`,
  `('cm8ghp8510001ly7swfuiop1g','Manager','MANAGER','manager@manager.com','$2b$10$dvfjZ9ECnfxGZ21wwQ82P.8AC1//sFbZbMFQtAh6QCsPGQbSIexBG',NULL,NULL,'2025-03-19 22:24:18.037','2025-03-19 22:24:18.037',NULL,NULL,1)`,
  `('cm8ghpvi70002ly7s05sfxl72','Resident','RESIDENT','resident@resident.com','$2b$10$uFGUnHDymOPSOJKY4l5RC.UGPyCm/IASrxJxuI2AnvODqTqVHhVyK',NULL,NULL,'2025-03-19 22:24:48.319','2025-03-19 22:24:48.319',NULL,NULL,1)`,
  `('cm8gwtwur0006lyo4rwlsyj0w','User to Delete','RESIDENT','user_to_delete@teste.com','$2b$10$0Qm1te9D4F.DQu46OJVNPOKh1seSMSXYymWrreLCzGS8D79zh6Vry',NULL,NULL,'2025-03-19 22:23:33.590','2025-03-19 22:23:33.590',NULL,NULL,1)`,
  `('cm8i76f940000lyc4yj92ou1w','User forgot password','RESIDENT','user_forgot_password@teste.com','$2b$10$0Qm1te9D4F.DQu46OJVNPOKh1seSMSXYymWrreLCzGS8D79zh6Vry',NULL,NULL,'2025-03-19 22:23:33.590','2025-03-19 22:23:33.590',NULL,NULL,1)`,
  `('cm8i7azvl0001lyc4h3mu4360','User change password','RESIDENT','user_change_password@teste.com','$2b$10$0Qm1te9D4F.DQu46OJVNPOKh1seSMSXYymWrreLCzGS8D79zh6Vry',NULL,NULL,'2025-03-19 22:23:33.590','2025-03-19 22:23:33.590',NULL,NULL,1)`,
];
const INSERT_SQL = `INSERT INTO \`user\` VALUES ${valuesToInsert.join(',')}`
const DELETE_SQL = `
    DELETE FROM user
    WHERE email IN ('admin@admin.com', 'manager@manager.com', 'resident@resident.com', 'user_to_delete@teste.com', 'user_forgot_password@teste.com', 'user_change_password@teste.com');
`;

class ApiTest {
  async getConnection(){
    const regex = /^mysql:\/\/(?<user>.*?):(?<password>.*?)@(?<host>.*?):(?<port>\d+)\/(?<database>.*?)$/;
    const match = process.env.DATABASE_URL.match(regex);

    if (!match) {
        console.error('URL de conexão inválida.');
        process.exit(1);
    }

    const { user, password, host, port, database } = match.groups;

    const connection = mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
    });
    return new Promise((resolve, reject) => {
      connection.connect(err => {
        if (err) {
          console.error('Erro ao conectar ao banco de dados:', err);
          reject(err);
          return;
        }
        resolve(connection);
      });
    })
  }
  async executeQuery(sql, conn = null) {
    let connection = conn;
    if (!conn) {
      connection = await this.getConnection();
    }
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
          console.error(`Erro ao executar o comando: \nSQL: ${sql}\n\nERROR: `, err);
        } else {
          resolve();
          let operation = '';
          if(sql.toUpperCase().includes('INSERT')) {
            operation = 'criados';
          } else if (sql.toUpperCase().includes('UPDATE')) {
            operation = 'atualizados';
          } else if (sql.toUpperCase().includes('DELETE')) {
            operation = 'excluídos';
          }
          console.log(`Número de registros ${operation}: ${result.affectedRows}`);
        }
        if (!conn) {
          connection.end();
        }
      });
    })
  }
  async prepareDB() {
    const conn = await this.getConnection();
    await this.executeQuery(DELETE_SQL, conn);
    await this.executeQuery(INSERT_SQL, conn);
  }
}

new ApiTest().prepareDB().then(() => {
  newman.run({
      collection: JSON.parse(fs.readFileSync(collectionPath, {encoding: 'utf8'})),
      // environment: require(environmentPath),
      reporters: 'cli'
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
});