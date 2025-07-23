ALTER TABLE payment_cards
  ALTER COLUMN card_number SET DATA TYPE varchar(4),
  ALTER COLUMN provider SET DATA TYPE varchar(255),
  ADD CONSTRAINT payment_card_private_data_user_id_fkey
    FOREIGN KEY (private_data_user_id) REFERENCES private_data_user(id) ON DELETE CASCADE;