import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    host: "ep-super-pond-a4yuck6k-pooler.us-east-1.aws.neon.tech",
    user: "neondb_owner",
    password: "npg_PBDs3UtKNT9M",
    database: "neondb",
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const dbController = {
    pool: pool,
};

export const query = async (text, params = []) => {
    const client = await dbController.pool.connect();
    try {
        const result = await client.query(text, params);
        return result;
    } finally {
        client.release();
    }
};
