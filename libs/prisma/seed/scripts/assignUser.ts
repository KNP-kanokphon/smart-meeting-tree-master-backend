// ===== DROP ===== //
const dropAssignUserInputType = 'DROP TYPE IF EXISTS assign_user_input_type;';
const dropScripts = 'DROP PROCEDURE IF EXISTS update_assign_user;';

// ==== INIT ===== //
const initAssignUserInputType = `CREATE TYPE assign_user_input_type AS (
    id INT8,
    tmpUserId INT8,
    status VARCHAR(32),
    listName VARCHAR(200),
    assignType VARCHAR(20)
    )`;
const initScript = `CREATE OR REPLACE PROCEDURE update_assign_user(_assign_user assign_user_input_type[])
LANGUAGE plpgsql AS $$
DECLARE
    asuser assign_user_input_type;
BEGIN
    FOREACH asuser IN ARRAY _assign_user
    LOOP
    UPDATE debt as d
    SET (tmp_user_id, status, list_name, assign_type, update_date) = ( asuser.tmpUserId, asuser.status, asuser.listName, asuser.assignType, CURRENT_TIMESTAMP)
    WHERE d.id = asuser.id;
    END LOOP;
    END;
    $$;
`;

export const assignUserScripts = [
  dropAssignUserInputType,
  dropScripts,
  initAssignUserInputType,
  initScript,
];
