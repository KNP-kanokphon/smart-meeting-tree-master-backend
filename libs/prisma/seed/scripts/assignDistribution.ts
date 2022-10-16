// ===== DROP ===== //
const dropAssignDistInputType = 'DROP TYPE IF EXISTS assign_dist_input_type;';
const dropScripts = 'DROP PROCEDURE IF EXISTS update_assign_dist;';

// ==== INIT ===== //
const initAssignDistInputType = `CREATE TYPE assign_dist_input_type AS (
    id INT8,
    userDistName VARCHAR(50),
    status VARCHAR(32),
    expiredTime INT8,
    listNameSeqSim VARCHAR(10),
    listName VARCHAR(200),
    assignType VARCHAR(20)
    )`;
const initScript = `CREATE OR REPLACE PROCEDURE update_assign_dist(_assign_dist assign_dist_input_type[])
LANGUAGE plpgsql AS $$
DECLARE
    asdist assign_dist_input_type;
BEGIN
    FOREACH asdist IN ARRAY _assign_dist
    LOOP
    UPDATE debt as d
    SET (user_dist_name, status, expired_time, list_name_seq_sim, list_name, assign_type, update_date) = ( asdist.userDistName, asdist.status, asdist.expiredTime, asdist.listNameSeqSim, asdist.listName, asdist.assignType, CURRENT_TIMESTAMP)
    WHERE d.id = asdist.id;
    END LOOP;
    END;
    $$;
`;

export const assignDistributionScripts = [
  dropAssignDistInputType,
  dropScripts,
  initAssignDistInputType,
  initScript,
];
