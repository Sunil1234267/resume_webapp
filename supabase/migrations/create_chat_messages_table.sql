/*
  # Create chat messages table

  1. New Tables
    - `messages`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `user_id` (uuid, foreign key to auth.users, nullable for unauthenticated messages)
      - `content` (text, not null)
      - `is_user_message` (boolean, not null, default true)
      - `created_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `messages` table
    - Add policy for authenticated users to read/insert their own messages
    - Add policy for unauthenticated users to insert messages (e.g., for guest chat)
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_user_message boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read their own messages
CREATE POLICY "Authenticated users can read their own messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for authenticated users to insert their own messages
CREATE POLICY "Authenticated users can insert their own messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for unauthenticated users to insert messages (e.g., for guest chat)
-- Note: For a production chatbot, you might want more sophisticated guest handling
CREATE POLICY "Unauthenticated users can insert messages"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Policy for unauthenticated users to read messages (e.g., if public chat is desired)
-- For a private chatbot, this policy might be omitted or restricted.
-- For now, we'll allow unauthenticated users to read messages where user_id is null (guest messages)
CREATE POLICY "Unauthenticated users can read guest messages"
  ON messages
  FOR SELECT
  TO anon
  USING (user_id IS NULL);
