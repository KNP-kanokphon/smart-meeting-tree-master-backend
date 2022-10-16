// ===== DROP ===== //
const dropUpdateCusPreUserInputType =
  'DROP TYPE IF EXISTS cus_pre_user_input_type;';
const dropScripts = 'DROP PROCEDURE IF EXISTS update_cus_pre_user;';

// ==== INIT ===== //
const initUpdateCusPreUserInputType = `CREATE TYPE cus_pre_user_input_type AS (
    cif VARCHAR(30),
    previousUser JSON
    )`;
const initScript = `CREATE OR REPLACE PROCEDURE update_cus_pre_user(_cus_pre_user cus_pre_user_input_type[])
LANGUAGE plpgsql AS $$
DECLARE
    cuspreuser cus_pre_user_input_type;
BEGIN
    FOREACH cuspreuser IN ARRAY _cus_pre_user
    LOOP
    UPDATE cus as c
    SET previous_user = cuspreuser.previousUser
    WHERE c.cif = cuspreuser.cif;
    END LOOP;
    END;
    $$;
`;

export const updateCusPreUserScripts = [
  dropUpdateCusPreUserInputType,
  dropScripts,
  initUpdateCusPreUserInputType,
  initScript,
];
