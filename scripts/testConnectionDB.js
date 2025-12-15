import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'database-mc1',
    });

    // Run a simple query
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    console.log('✅ Connection works! Test query result:', rows[0].result);

    await connection.end();
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

testConnection();
