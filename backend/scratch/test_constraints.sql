BEGIN;

-- Insert fake data just to test duplicates
INSERT INTO "user" (id, email, role, verification_status, is_active, created_at, updated_at) 
VALUES ('11111111-1111-1111-1111-111111111111', 'test1@test.com', 'STUDENT', 'PENDING', true, now(), now());
INSERT INTO "user" (id, email, role, verification_status, is_active, created_at, updated_at) 
VALUES ('22222222-2222-2222-2222-222222222222', 'test2@test.com', 'ALUMNI', 'PENDING', true, now(), now());

INSERT INTO student_profile (id, user_id, created_at, updated_at) 
VALUES ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', now(), now());
INSERT INTO alumni_profile (id, user_id, mentorship_available, created_at, updated_at) 
VALUES ('22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', true, now(), now());

INSERT INTO event (id, title, event_date, created_at, updated_at) 
VALUES ('33333333-3333-3333-3333-333333333333', 'Test Event', now(), now(), now());

INSERT INTO opportunity (id, title, description, company, status, created_at, updated_at) 
VALUES ('44444444-4444-4444-4444-444444444444', 'Test Opp', 'Desc', 'Company', 'OPEN', now(), now());

-- Test event registration duplicate
SAVEPOINT sp1;
INSERT INTO event_registration (id, event_id, user_id, created_at, updated_at) 
VALUES ('55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', now(), now());
INSERT INTO event_registration (id, event_id, user_id, created_at, updated_at) 
VALUES ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', now(), now());
ROLLBACK TO sp1;

-- Test job application duplicate
SAVEPOINT sp2;
INSERT INTO job_application (id, user_id, opportunity_id, status, created_at, updated_at) 
VALUES ('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'APPLIED', now(), now());
INSERT INTO job_application (id, user_id, opportunity_id, status, created_at, updated_at) 
VALUES ('88888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'APPLIED', now(), now());
ROLLBACK TO sp2;

-- Test mentorship duplicate
SAVEPOINT sp3;
INSERT INTO mentorship_request (id, mentor_id, student_id, status, created_at, updated_at) 
VALUES ('99999999-9999-9999-9999-999999999999', '22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'PENDING', now(), now());
INSERT INTO mentorship_request (id, mentor_id, student_id, status, created_at, updated_at) 
VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'PENDING', now(), now());
ROLLBACK TO sp3;

ROLLBACK;
