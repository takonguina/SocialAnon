psql -U $POSTGRES_USER -d postgres <<EOF
DROP DATABASE mydb WITH (FORCE);

\i /usr/src/database/db.sql
EOF