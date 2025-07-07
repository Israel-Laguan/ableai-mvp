ALTER TABLE buyers DROP CONSTRAINT IF EXISTS buyers_user_id_fkey;
ALTER TABLE gig_works DROP CONSTRAINT IF EXISTS gig_works_buyer_id_fkey;
ALTER TABLE gig_work_teams DROP CONSTRAINT IF EXISTS gig_work_teams_gig_work_id_fkey;
ALTER TABLE recommendations DROP CONSTRAINT IF EXISTS recommendations_worker_id_fkey;
ALTER TABLE recommendations DROP CONSTRAINT IF EXISTS recommendations_user_id_fkey;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS review_user_id_fkey;
ALTER TABLE skills DROP CONSTRAINT IF EXISTS skills_worker_id_fkey;
ALTER TABLE skill_hires DROP CONSTRAINT IF EXISTS skill_hires_buyer_id_fkey;
ALTER TABLE statistics DROP CONSTRAINT IF EXISTS statistics_user_id_fkey;
ALTER TABLE workers DROP CONSTRAINT IF EXISTS worker_user_id_fkey;

ALTER TABLE buyers
  ADD CONSTRAINT buyers_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE gig_works
  ADD CONSTRAINT gig_works_buyer_id_fkey
  FOREIGN KEY (buyer_id) REFERENCES buyers(id) ON DELETE CASCADE;

ALTER TABLE gig_work_teams
  ADD CONSTRAINT gig_work_teams_worker_id_fkey
  FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE;

ALTER TABLE recommendations
  ADD CONSTRAINT recommendations_worker_id_fkey
  FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE;

ALTER TABLE recommendations
  ADD CONSTRAINT recommendations_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE reviews
  ADD CONSTRAINT reviews_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE skills
  ADD CONSTRAINT skills_worker_id_fkey
  FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE;

ALTER TABLE skill_hires
  ADD CONSTRAINT skill_hires_buyer_id_fkey
  FOREIGN KEY (buyer_id) REFERENCES buyers(id) ON DELETE CASCADE;  

ALTER TABLE statistics
  ADD CONSTRAINT statistics_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE workers
  ADD CONSTRAINT workers_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- add roles

INSERT INTO roles (id, name)
SELECT 1, 'USER'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE id = 1 OR name = 'USER');

INSERT INTO roles (id, name)
SELECT 2, 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE id = 2 OR name = 'ADMIN');

INSERT INTO roles (id, name)
SELECT 3, 'QA'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE id = 3 OR name = 'QA');

INSERT INTO roles (id, name)
SELECT 4, 'SUPER_ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE id = 4 OR name = 'SUPER_ADMIN');
