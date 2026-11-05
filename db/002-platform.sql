CREATE TABLE IF NOT EXISTS colearn.content (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text UNIQUE NOT NULL, kind text NOT NULL CHECK(kind IN ('courses','challenges','projects')),
 title text NOT NULL CHECK(length(title) BETWEEN 3 AND 120), description text NOT NULL, body text NOT NULL, track text NOT NULL DEFAULT 'Web development',
 level text NOT NULL DEFAULT 'Beginner', author_id text REFERENCES colearn."user"(id) ON DELETE SET NULL, author_name text NOT NULL DEFAULT 'CoLearnSpace',
 link text NOT NULL DEFAULT '', lessons jsonb NOT NULL DEFAULT '[]', created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS content_kind_created ON colearn.content(kind,created_at DESC);
CREATE TABLE IF NOT EXISTS colearn.progress (
 user_id text NOT NULL REFERENCES colearn."user"(id) ON DELETE CASCADE,content_id uuid NOT NULL REFERENCES colearn.content(id) ON DELETE CASCADE,
 completed integer[] NOT NULL DEFAULT '{}', updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_id,content_id)
);
CREATE TABLE IF NOT EXISTS colearn.discussion (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), content_id uuid NOT NULL REFERENCES colearn.content(id) ON DELETE CASCADE,
 user_id text NOT NULL REFERENCES colearn."user"(id) ON DELETE CASCADE, body text NOT NULL CHECK(length(body) BETWEEN 3 AND 3000),
 kind text NOT NULL CHECK(kind IN ('comment','submission')),link text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS colearn.votes (
 user_id text NOT NULL REFERENCES colearn."user"(id) ON DELETE CASCADE,content_id uuid NOT NULL REFERENCES colearn.content(id) ON DELETE CASCADE,
 PRIMARY KEY(user_id,content_id)
);
