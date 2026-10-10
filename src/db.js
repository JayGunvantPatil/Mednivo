import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_Zmtd9luC8vrT@ep-rapid-brook-b5df66i2-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

export const db = {
    // Doctors
    async getDoctors() {
        try {
            const data = await sql`SELECT * FROM doctors ORDER BY created_at ASC`;
            return { data, error: null };
        } catch (error) {
            console.error('Error fetching doctors:', error);
            return { data: null, error };
        }
    },

    async insertDoctor(docInfo) {
        try {
            const data = await sql`
                INSERT INTO doctors (
                    name, department, slots, lunch_time, leave_periods, photo_url
                ) VALUES (
                    ${docInfo.name}, ${docInfo.department || null}, ${docInfo.slots || null}, 
                    ${docInfo.lunch_time || null}, ${docInfo.leave_periods || null}, ${docInfo.photo_url || null}
                ) RETURNING *;
            `;
            return { data, error: null };
        } catch (error) {
            console.error('Error inserting doctor:', error);
            return { data: null, error };
        }
    },

    async updateDoctor(id, updatePayload) {
        try {
            const entries = Object.entries(updatePayload);
            if (entries.length === 0) return { data: null, error: null };

            // Basic dynamic update query approach
            let query = 'UPDATE doctors SET ';
            const values = [];
            entries.forEach(([key, val], idx) => {
                query += `${key} = $${idx + 1}`;
                if (idx < entries.length - 1) query += ', ';
                values.push(val);
            });
            query += ` WHERE id = $${entries.length + 1} RETURNING *`;
            values.push(id);

            const data = await sql(query, values);
            return { data, error: null };
        } catch (error) {
            console.error('Error updating doctor:', error);
            return { data: null, error };
        }
    },

    async deleteDoctor(id) {
        try {
            const data = await sql`DELETE FROM doctors WHERE id = ${id}`;
            return { data, error: null };
        } catch (error) {
            console.error('Error deleting doctor:', error);
            return { data: null, error };
        }
    },

    // Appointments
    async getAppointments() {
        try {
            const data = await sql`SELECT * FROM appointments ORDER BY created_at DESC`;
            return { data, error: null };
        } catch (error) {
            console.error('Error fetching appointments:', error);
            return { data: null, error };
        }
    },

    async insertAppointment(apptInfo) {
        try {
            const data = await sql`
                INSERT INTO appointments (
                    patient_name, patient_age, phone, appointment_date, 
                    appointment_time, doctor, symptoms, status, attended, email
                ) VALUES (
                    ${apptInfo.patient_name}, ${apptInfo.patient_age || null}, ${apptInfo.phone || null}, 
                    ${apptInfo.appointment_date || null}, ${apptInfo.appointment_time || null}, 
                    ${apptInfo.doctor || null}, ${apptInfo.symptoms || null}, 
                    ${apptInfo.status || 'Scheduled'}, ${apptInfo.attended || false}, ${apptInfo.email || null}
                ) RETURNING *;
            `;
            return { data, error: null };
        } catch (error) {
            console.error('Error inserting appointment:', error);
            return { data: null, error };
        }
    },

    async updateAppointment(id, updatePayload) {
        try {
            const entries = Object.entries(updatePayload);
            if (entries.length === 0) return { data: null, error: null };

            let query = 'UPDATE appointments SET ';
            const values = [];
            entries.forEach(([key, val], idx) => {
                query += `${key} = $${idx + 1}`;
                if (idx < entries.length - 1) query += ', ';
                values.push(val);
            });
            query += ` WHERE id = $${entries.length + 1} RETURNING *`;
            values.push(id);

            const data = await sql(query, values);
            return { data, error: null };
        } catch (error) {
            console.error('Error updating appointment:', error);
            return { data: null, error };
        }
    },

    async deleteAppointment(id) {
        try {
            const data = await sql`DELETE FROM appointments WHERE id = ${id}`;
            return { data, error: null };
        } catch (error) {
            console.error('Error deleting appointment:', error);
            return { data: null, error };
        }
    }
};
