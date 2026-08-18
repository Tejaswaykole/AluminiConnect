SELECT COUNT(*) FROM "user";
SELECT COUNT(*) FROM student_profile WHERE user_id NOT IN (SELECT id FROM "user");
SELECT COUNT(*) FROM alumni_profile WHERE user_id NOT IN (SELECT id FROM "user");
SELECT COUNT(*) FROM "user" WHERE hashed_password IS NOT NULL;
SELECT account_status, is_active, COUNT(*) FROM "user" GROUP BY account_status, is_active;
SELECT role, COUNT(*) FROM "user" GROUP BY role;
