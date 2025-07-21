import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './index';
import { config } from 'dotenv';

config({ path: '.env.local' });

async function main() {
  try {
    await migrate(db, { migrationsFolder: 'src/lib/db/migrations' });
    console.log('Migrations completed!');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

main();