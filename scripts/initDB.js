import fs from 'fs';
import mysql from 'mysql2/promise';

async function initDb() {
  try {
    

    // 1. Read schema.sql and seed file
    //const schema = fs.readFileSync('../ulterion-app/database/schema.sql', 'utf8');
    const seed = fs.readFileSync('../ulterion-app/database/seed.sql', 'utf8');


    // 2. Connect to MariaDB/MySQL
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'database-mc1', 
      multipleStatements: true
    });


    // 3. Execute schema.sql
    await connection.query(schema);


    // 4. Create seed.sql
    await connection.query(seed);
    console.log('✅ Seed data applied');


    // 5. Verify tables
    const [tables] = await connection.query('SHOW TABLES FROM ulterion');
    console.log('Tables created:', tables);


    console.log('✅ Ulterion database and tables created successfully!');
    await connection.end();
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
}

initDb();
