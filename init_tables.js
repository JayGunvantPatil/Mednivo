import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_Zmtd9luC8vrT@ep-rapid-brook-b5df66i2-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

async function initTables() {
    console.log('Initializing tables...');
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS doctors (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                department TEXT,
                slots TEXT,
                lunch_time TEXT,
                leave_periods TEXT,
                photo_url TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log('Doctors table created or already exists.');

        await sql`
            CREATE TABLE IF NOT EXISTS appointments (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                patient_name TEXT NOT NULL,
                patient_age TEXT,
                phone TEXT,
                appointment_date TEXT,
                appointment_time TEXT,
                doctor TEXT,
                symptoms TEXT,
                status TEXT DEFAULT 'Scheduled',
                attended BOOLEAN DEFAULT false,
                email TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log('Appointments table created or already exists.');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
}

initTables();
