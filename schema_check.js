import { neon } from '@neondatabase/serverless';

const url = "https://fwlgqhjytzqtbwnawveu.supabase.co/rest/v1/";
const key = "sb_publishable_kBRbWRsJxxf7WhsiQVZ88w_tx1OM9U4";

async function run() {
    console.log("Fetching doctors...");
    const resDoc = await fetch(url + 'doctors?select=*', { headers: { "apikey": key, "Authorization": `Bearer ${key}` } });
    console.log("Doctors sample:", (await resDoc.json())[0]);

    console.log("Fetching appointments...");
    const resApp = await fetch(url + 'appointments?select=*', { headers: { "apikey": key, "Authorization": `Bearer ${key}` } });
    console.log("Appointments sample:", (await resApp.json())[0]);
}
run();
