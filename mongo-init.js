const envVar = process.env;

db.createUser(
    {
        user: envVar.MONGO_USERNAME,
        pwd: envVar.MONGO_PASSWORD,
        roles: [
            {
                role: "readWrite",
                db: envVar.MONGO_INITDB_DATABASE
            }
        ]
    }
);