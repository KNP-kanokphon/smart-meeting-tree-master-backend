// ===== DROP ===== //
const dropPullbackInputType = 'DROP TYPE IF EXISTS pullback_input_type;';
const dropScripts = 'DROP PROCEDURE IF EXISTS update_pullback;';

// ==== INIT ===== //
const initPullbackInputType = `CREATE TYPE pullback_input_type AS (
    id INT8,
    status VARCHAR(32)
    )`;
const initScript = `CREATE OR REPLACE PROCEDURE update_pullback(_pullback pullback_input_type[])
LANGUAGE plpgsql AS $$
DECLARE
    pbuser pullback_input_type;
BEGIN
    FOREACH pbuser IN ARRAY _pullback
    LOOP
    UPDATE debt as d
    SET (user_id, status, update_date) = ( NULL, pbuser.status, CURRENT_TIMESTAMP)
    WHERE d.id = pbuser.id;
    END LOOP;
    END;
    $$;
`;

export const pullbackScripts = [
  dropPullbackInputType,
  dropScripts,
  initPullbackInputType,
  initScript,
];
