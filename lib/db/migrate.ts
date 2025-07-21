import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';

config({ path: '.env.local' });

// biome-ignore lint: Forbidden non-null assertion.
const migrationClient = postgres(process.env.POSTGRES_URL!, { max: 1 });

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './lib/db/migrations'
  });
  console.log('Migrations completed');
  await migrationClient.end();
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
