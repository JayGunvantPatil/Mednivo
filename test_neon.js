import { neon } from '@neondatabase/serverless';
const sql = neon('postgresql://neondb_owner:npg_Zmtd9luC8vrT@ep-rapid-brook-b5df66i2-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
async function run() {
    try {
        const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
        console.log('Tables:', JSON.stringify(tables));
        for (const t of tables) {
            const cols = await sql(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${t.table_name}'`);
            console.log('Table:', t.table_name, 'Cols:', JSON.stringify(cols));
        }
    } catch (e) {
        console.error('Error fetching tables:', e);
    }
}
run();
