--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: tenants; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

INSERT INTO _realtime.tenants VALUES ('4afdb75a-5f04-4b05-9888-b5bfc04a3ed6', 'realtime-dev', 'realtime-dev', 'iNjicxc4+llvc9wovDvqymwfnj9teWMlyOIbJ8Fh6j2WNU8CIJ2ZgjR6MUIKqSmeDmvpsKLsZ9jgXJmQPpwL8w==', 200, '2025-04-22 12:16:45', '2025-04-22 12:16:45', 100, 'postgres_cdc_rls', 100000, 100, 100, false, NULL, false, false);


--
-- Data for Name: extensions; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

INSERT INTO _realtime.extensions VALUES ('080da5c1-dbe8-4980-8d32-ab9e19319f3e', 'postgres_cdc_rls', '{"region": "us-east-1", "db_host": "vNOjo2ESupaA+opOdHAxffRVo7bE2azLz4W87vKVRcQ=", "db_name": "sWBpZNdjggEPTQVlI52Zfw==", "db_port": "+enMDFi1J/3IrrquHHwUmA==", "db_user": "uxbEq/zz8DXVD53TOI1zmw==", "slot_name": "supabase_realtime_replication_slot", "db_password": "sWBpZNdjggEPTQVlI52Zfw==", "publication": "supabase_realtime", "ssl_enforced": false, "poll_interval_ms": 100, "poll_max_changes": 100, "poll_max_record_bytes": 1048576}', 'realtime-dev', '2025-04-22 12:16:45', '2025-04-22 12:16:45');


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

INSERT INTO _realtime.schema_migrations VALUES (20210706140551, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20220329161857, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20220410212326, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20220506102948, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20220527210857, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20220815211129, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20220815215024, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20220818141501, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20221018173709, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20221102172703, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20221223010058, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20230110180046, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20230810220907, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20230810220924, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20231024094642, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20240306114423, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20240418082835, '2025-04-22 12:16:40');
INSERT INTO _realtime.schema_migrations VALUES (20240625211759, '2025-04-22 12:16:41');
INSERT INTO _realtime.schema_migrations VALUES (20240704172020, '2025-04-22 12:16:41');
INSERT INTO _realtime.schema_migrations VALUES (20240902173232, '2025-04-22 12:16:41');
INSERT INTO _realtime.schema_migrations VALUES (20241106103258, '2025-04-22 12:16:41');


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.schema_migrations VALUES ('20171026211738');
INSERT INTO auth.schema_migrations VALUES ('20171026211808');
INSERT INTO auth.schema_migrations VALUES ('20171026211834');
INSERT INTO auth.schema_migrations VALUES ('20180103212743');
INSERT INTO auth.schema_migrations VALUES ('20180108183307');
INSERT INTO auth.schema_migrations VALUES ('20180119214651');
INSERT INTO auth.schema_migrations VALUES ('20180125194653');
INSERT INTO auth.schema_migrations VALUES ('00');
INSERT INTO auth.schema_migrations VALUES ('20210710035447');
INSERT INTO auth.schema_migrations VALUES ('20210722035447');
INSERT INTO auth.schema_migrations VALUES ('20210730183235');
INSERT INTO auth.schema_migrations VALUES ('20210909172000');
INSERT INTO auth.schema_migrations VALUES ('20210927181326');
INSERT INTO auth.schema_migrations VALUES ('20211122151130');
INSERT INTO auth.schema_migrations VALUES ('20211124214934');
INSERT INTO auth.schema_migrations VALUES ('20211202183645');
INSERT INTO auth.schema_migrations VALUES ('20220114185221');
INSERT INTO auth.schema_migrations VALUES ('20220114185340');
INSERT INTO auth.schema_migrations VALUES ('20220224000811');
INSERT INTO auth.schema_migrations VALUES ('20220323170000');
INSERT INTO auth.schema_migrations VALUES ('20220429102000');
INSERT INTO auth.schema_migrations VALUES ('20220531120530');
INSERT INTO auth.schema_migrations VALUES ('20220614074223');
INSERT INTO auth.schema_migrations VALUES ('20220811173540');
INSERT INTO auth.schema_migrations VALUES ('20221003041349');
INSERT INTO auth.schema_migrations VALUES ('20221003041400');
INSERT INTO auth.schema_migrations VALUES ('20221011041400');
INSERT INTO auth.schema_migrations VALUES ('20221020193600');
INSERT INTO auth.schema_migrations VALUES ('20221021073300');
INSERT INTO auth.schema_migrations VALUES ('20221021082433');
INSERT INTO auth.schema_migrations VALUES ('20221027105023');
INSERT INTO auth.schema_migrations VALUES ('20221114143122');
INSERT INTO auth.schema_migrations VALUES ('20221114143410');
INSERT INTO auth.schema_migrations VALUES ('20221125140132');
INSERT INTO auth.schema_migrations VALUES ('20221208132122');
INSERT INTO auth.schema_migrations VALUES ('20221215195500');
INSERT INTO auth.schema_migrations VALUES ('20221215195800');
INSERT INTO auth.schema_migrations VALUES ('20221215195900');
INSERT INTO auth.schema_migrations VALUES ('20230116124310');
INSERT INTO auth.schema_migrations VALUES ('20230116124412');
INSERT INTO auth.schema_migrations VALUES ('20230131181311');
INSERT INTO auth.schema_migrations VALUES ('20230322519590');
INSERT INTO auth.schema_migrations VALUES ('20230402418590');
INSERT INTO auth.schema_migrations VALUES ('20230411005111');
INSERT INTO auth.schema_migrations VALUES ('20230508135423');
INSERT INTO auth.schema_migrations VALUES ('20230523124323');
INSERT INTO auth.schema_migrations VALUES ('20230818113222');
INSERT INTO auth.schema_migrations VALUES ('20230914180801');
INSERT INTO auth.schema_migrations VALUES ('20231027141322');
INSERT INTO auth.schema_migrations VALUES ('20231114161723');
INSERT INTO auth.schema_migrations VALUES ('20231117164230');
INSERT INTO auth.schema_migrations VALUES ('20240115144230');
INSERT INTO auth.schema_migrations VALUES ('20240214120130');
INSERT INTO auth.schema_migrations VALUES ('20240306115329');
INSERT INTO auth.schema_migrations VALUES ('20240314092811');
INSERT INTO auth.schema_migrations VALUES ('20240427152123');
INSERT INTO auth.schema_migrations VALUES ('20240612123726');
INSERT INTO auth.schema_migrations VALUES ('20240729123726');
INSERT INTO auth.schema_migrations VALUES ('20240802193726');
INSERT INTO auth.schema_migrations VALUES ('20240806073726');
INSERT INTO auth.schema_migrations VALUES ('20241009103726');


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: module; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: module_videos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

INSERT INTO realtime.schema_migrations VALUES (20211116024918, '2025-04-22 12:16:54');
INSERT INTO realtime.schema_migrations VALUES (20211116045059, '2025-04-22 12:16:54');
INSERT INTO realtime.schema_migrations VALUES (20211116050929, '2025-04-22 12:16:54');
INSERT INTO realtime.schema_migrations VALUES (20211116051442, '2025-04-22 12:16:54');
INSERT INTO realtime.schema_migrations VALUES (20211116212300, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20211116213355, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20211116213934, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20211116214523, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20211122062447, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20211124070109, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20211202204204, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20211202204605, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20211210212804, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20211228014915, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20220107221237, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20220228202821, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20220312004840, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20220603231003, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20220603232444, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20220615214548, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20220712093339, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20220908172859, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20220916233421, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20230119133233, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20230128025114, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20230128025212, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20230227211149, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20230228184745, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20230308225145, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20230328144023, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20231018144023, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20231204144023, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20231204144024, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20231204144025, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20240108234812, '2025-04-22 12:16:55');
INSERT INTO realtime.schema_migrations VALUES (20240109165339, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240227174441, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240311171622, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240321100241, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240401105812, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240418121054, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240523004032, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240618124746, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240801235015, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240805133720, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240827160934, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240919163303, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20240919163305, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20241019105805, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20241030150047, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20241108114728, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20241121104152, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20241130184212, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20241220035512, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20241220123912, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20241224161212, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20250107150512, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20250110162412, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20250123174212, '2025-04-22 12:16:56');
INSERT INTO realtime.schema_migrations VALUES (20250128220012, '2025-04-22 12:16:56');


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO storage.migrations VALUES (0, 'create-migrations-table', 'e18db593bcde2aca2a408c4d1100f6abba2195df', '2025-04-22 12:17:00.976779');
INSERT INTO storage.migrations VALUES (1, 'initialmigration', '6ab16121fbaa08bbd11b712d05f358f9b555d777', '2025-04-22 12:17:01.00288');
INSERT INTO storage.migrations VALUES (2, 'storage-schema', '5c7968fd083fcea04050c1b7f6253c9771b99011', '2025-04-22 12:17:01.009191');
INSERT INTO storage.migrations VALUES (3, 'pathtoken-column', '2cb1b0004b817b29d5b0a971af16bafeede4b70d', '2025-04-22 12:17:01.038689');
INSERT INTO storage.migrations VALUES (4, 'add-migrations-rls', '427c5b63fe1c5937495d9c635c263ee7a5905058', '2025-04-22 12:17:01.124196');
INSERT INTO storage.migrations VALUES (5, 'add-size-functions', '79e081a1455b63666c1294a440f8ad4b1e6a7f84', '2025-04-22 12:17:01.132709');
INSERT INTO storage.migrations VALUES (6, 'change-column-name-in-get-size', 'f93f62afdf6613ee5e7e815b30d02dc990201044', '2025-04-22 12:17:01.151061');
INSERT INTO storage.migrations VALUES (7, 'add-rls-to-buckets', 'e7e7f86adbc51049f341dfe8d30256c1abca17aa', '2025-04-22 12:17:01.179719');
INSERT INTO storage.migrations VALUES (8, 'add-public-to-buckets', 'fd670db39ed65f9d08b01db09d6202503ca2bab3', '2025-04-22 12:17:01.218156');
INSERT INTO storage.migrations VALUES (9, 'fix-search-function', '3a0af29f42e35a4d101c259ed955b67e1bee6825', '2025-04-22 12:17:01.300991');
INSERT INTO storage.migrations VALUES (10, 'search-files-search-function', '68dc14822daad0ffac3746a502234f486182ef6e', '2025-04-22 12:17:01.381814');
INSERT INTO storage.migrations VALUES (11, 'add-trigger-to-auto-update-updated_at-column', '7425bdb14366d1739fa8a18c83100636d74dcaa2', '2025-04-22 12:17:01.433762');
INSERT INTO storage.migrations VALUES (12, 'add-automatic-avif-detection-flag', '8e92e1266eb29518b6a4c5313ab8f29dd0d08df9', '2025-04-22 12:17:01.492881');
INSERT INTO storage.migrations VALUES (13, 'add-bucket-custom-limits', 'cce962054138135cd9a8c4bcd531598684b25e7d', '2025-04-22 12:17:01.502307');
INSERT INTO storage.migrations VALUES (14, 'use-bytes-for-max-size', '941c41b346f9802b411f06f30e972ad4744dad27', '2025-04-22 12:17:01.517097');
INSERT INTO storage.migrations VALUES (15, 'add-can-insert-object-function', '934146bc38ead475f4ef4b555c524ee5d66799e5', '2025-04-22 12:17:01.677054');
INSERT INTO storage.migrations VALUES (16, 'add-version', '76debf38d3fd07dcfc747ca49096457d95b1221b', '2025-04-22 12:17:01.701877');
INSERT INTO storage.migrations VALUES (17, 'drop-owner-foreign-key', 'f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101', '2025-04-22 12:17:01.77484');
INSERT INTO storage.migrations VALUES (18, 'add_owner_id_column_deprecate_owner', 'e7a511b379110b08e2f214be852c35414749fe66', '2025-04-22 12:17:01.808508');
INSERT INTO storage.migrations VALUES (19, 'alter-default-value-objects-id', '02e5e22a78626187e00d173dc45f58fa66a4f043', '2025-04-22 12:17:01.829835');
INSERT INTO storage.migrations VALUES (20, 'list-objects-with-delimiter', 'cd694ae708e51ba82bf012bba00caf4f3b6393b7', '2025-04-22 12:17:01.863806');
INSERT INTO storage.migrations VALUES (21, 's3-multipart-uploads', '8c804d4a566c40cd1e4cc5b3725a664a9303657f', '2025-04-22 12:17:01.949306');
INSERT INTO storage.migrations VALUES (22, 's3-multipart-uploads-big-ints', '9737dc258d2397953c9953d9b86920b8be0cdb73', '2025-04-22 12:17:02.133541');
INSERT INTO storage.migrations VALUES (23, 'optimize-search-function', '9d7e604cddc4b56a5422dc68c9313f4a1b6f132c', '2025-04-22 12:17:02.197289');
INSERT INTO storage.migrations VALUES (24, 'operation-function', '8312e37c2bf9e76bbe841aa5fda889206d2bf8aa', '2025-04-22 12:17:02.206943');
INSERT INTO storage.migrations VALUES (25, 'custom-metadata', 'd974c6057c3db1c1f847afa0e291e6165693b990', '2025-04-22 12:17:02.221513');
INSERT INTO storage.migrations VALUES (26, 'objects-prefixes', 'ef3f7871121cdc47a65308e6702519e853422ae2', '2025-04-22 12:17:02.232714');
INSERT INTO storage.migrations VALUES (27, 'search-v2', '33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2', '2025-04-22 12:17:02.314487');
INSERT INTO storage.migrations VALUES (28, 'object-bucket-name-sorting', 'ba85ec41b62c6a30a3f136788227ee47f311c436', '2025-04-22 12:17:02.390124');
INSERT INTO storage.migrations VALUES (29, 'create-prefixes', 'a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b', '2025-04-22 12:17:02.413942');
INSERT INTO storage.migrations VALUES (30, 'update-object-levels', '6c6f6cc9430d570f26284a24cf7b210599032db7', '2025-04-22 12:17:02.445764');
INSERT INTO storage.migrations VALUES (31, 'objects-level-index', '33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8', '2025-04-22 12:17:02.554217');
INSERT INTO storage.migrations VALUES (32, 'backward-compatible-index-on-objects', '2d51eeb437a96868b36fcdfb1ddefdf13bef1647', '2025-04-22 12:17:02.864864');
INSERT INTO storage.migrations VALUES (33, 'backward-compatible-index-on-prefixes', 'fe473390e1b8c407434c0e470655945b110507bf', '2025-04-22 12:17:02.909994');
INSERT INTO storage.migrations VALUES (34, 'optimize-search-function-v1', '82b0e469a00e8ebce495e29bfa70a0797f7ebd2c', '2025-04-22 12:17:02.914758');
INSERT INTO storage.migrations VALUES (35, 'add-insert-trigger-prefixes', '63bb9fd05deb3dc5e9fa66c83e82b152f0caf589', '2025-04-22 12:17:02.925645');
INSERT INTO storage.migrations VALUES (36, 'optimise-existing-functions', '81cf92eb0c36612865a18016a38496c530443899', '2025-04-22 12:17:02.935038');


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

INSERT INTO supabase_functions.migrations VALUES ('initial', '2025-04-22 12:16:18.034817+00');
INSERT INTO supabase_functions.migrations VALUES ('20210809183423_update_grants', '2025-04-22 12:16:18.034817+00');


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

INSERT INTO supabase_migrations.schema_migrations VALUES ('20250422112139', '{"SET statement_timeout = 0","SET lock_timeout = 0","SET idle_in_transaction_session_timeout = 0","SET client_encoding = ''UTF8''","SET standard_conforming_strings = on","SELECT pg_catalog.set_config(''search_path'', '''', false)","SET check_function_bodies = false","SET xmloption = content","SET client_min_messages = warning","SET row_security = off","COMMENT ON SCHEMA \"public\" IS ''standard public schema''","CREATE EXTENSION IF NOT EXISTS \"pg_graphql\" WITH SCHEMA \"graphql\"","CREATE EXTENSION IF NOT EXISTS \"pg_stat_statements\" WITH SCHEMA \"extensions\"","CREATE EXTENSION IF NOT EXISTS \"pgcrypto\" WITH SCHEMA \"extensions\"","CREATE EXTENSION IF NOT EXISTS \"pgjwt\" WITH SCHEMA \"extensions\"","CREATE EXTENSION IF NOT EXISTS \"supabase_vault\" WITH SCHEMA \"vault\"","CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\" WITH SCHEMA \"extensions\"","SET default_tablespace = ''''","SET default_table_access_method = \"heap\"","CREATE TABLE IF NOT EXISTS \"public\".\"course\" (
    \"id\" \"uuid\" DEFAULT \"gen_random_uuid\"() NOT NULL,
    \"created_at\" timestamp with time zone DEFAULT \"now\"() NOT NULL,
    \"title\" character varying,
    \"category\" character varying,
    \"description\" \"text\",
    \"user_id\" \"uuid\" DEFAULT \"gen_random_uuid\"(),
    \"slug\" character varying
)","ALTER TABLE \"public\".\"course\" OWNER TO \"postgres\"","CREATE TABLE IF NOT EXISTS \"public\".\"module\" (
    \"id\" \"uuid\" DEFAULT \"gen_random_uuid\"() NOT NULL,
    \"created_at\" timestamp with time zone DEFAULT \"now\"() NOT NULL,
    \"title\" character varying,
    \"description\" \"text\",
    \"slug\" character varying,
    \"course_id\" \"uuid\" DEFAULT \"gen_random_uuid\"()
)","ALTER TABLE \"public\".\"module\" OWNER TO \"postgres\"","CREATE TABLE IF NOT EXISTS \"public\".\"module_videos\" (
    \"uiid\" \"uuid\" DEFAULT \"gen_random_uuid\"() NOT NULL,
    \"created_at\" timestamp with time zone DEFAULT \"now\"() NOT NULL,
    \"id\" character varying,
    \"title\" \"text\",
    \"module_id\" \"uuid\" DEFAULT \"gen_random_uuid\"()
)","ALTER TABLE \"public\".\"module_videos\" OWNER TO \"postgres\"","CREATE TABLE IF NOT EXISTS \"public\".\"user\" (
    \"id\" \"uuid\" DEFAULT \"gen_random_uuid\"() NOT NULL,
    \"created_at\" timestamp with time zone DEFAULT \"now\"() NOT NULL,
    \"avatar\" \"text\",
    \"name\" character varying,
    \"username\" character varying,
    \"email\" character varying
)","ALTER TABLE \"public\".\"user\" OWNER TO \"postgres\"","ALTER TABLE ONLY \"public\".\"course\"
    ADD CONSTRAINT \"course_pkey\" PRIMARY KEY (\"id\")","ALTER TABLE ONLY \"public\".\"module\"
    ADD CONSTRAINT \"module_pkey\" PRIMARY KEY (\"id\")","ALTER TABLE ONLY \"public\".\"module_videos\"
    ADD CONSTRAINT \"module_videos_pkey\" PRIMARY KEY (\"uiid\")","ALTER TABLE ONLY \"public\".\"user\"
    ADD CONSTRAINT \"user_pkey\" PRIMARY KEY (\"id\")","ALTER TABLE ONLY \"public\".\"course\"
    ADD CONSTRAINT \"course_user_id_fkey\" FOREIGN KEY (\"user_id\") REFERENCES \"public\".\"user\"(\"id\") ON UPDATE CASCADE ON DELETE CASCADE","ALTER TABLE ONLY \"public\".\"module\"
    ADD CONSTRAINT \"module_course_id_fkey\" FOREIGN KEY (\"course_id\") REFERENCES \"public\".\"course\"(\"id\") ON UPDATE CASCADE ON DELETE CASCADE","ALTER TABLE ONLY \"public\".\"module_videos\"
    ADD CONSTRAINT \"module_videos_module_id_fkey\" FOREIGN KEY (\"module_id\") REFERENCES \"public\".\"module\"(\"id\") ON UPDATE CASCADE ON DELETE CASCADE","ALTER PUBLICATION \"supabase_realtime\" OWNER TO \"postgres\"","ALTER PUBLICATION \"supabase_realtime\" ADD TABLE ONLY \"public\".\"course\"","ALTER PUBLICATION \"supabase_realtime\" ADD TABLE ONLY \"public\".\"module\"","ALTER PUBLICATION \"supabase_realtime\" ADD TABLE ONLY \"public\".\"module_videos\"","GRANT USAGE ON SCHEMA \"public\" TO \"postgres\"","GRANT USAGE ON SCHEMA \"public\" TO \"anon\"","GRANT USAGE ON SCHEMA \"public\" TO \"authenticated\"","GRANT USAGE ON SCHEMA \"public\" TO \"service_role\"","GRANT ALL ON TABLE \"public\".\"course\" TO \"anon\"","GRANT ALL ON TABLE \"public\".\"course\" TO \"authenticated\"","GRANT ALL ON TABLE \"public\".\"course\" TO \"service_role\"","GRANT ALL ON TABLE \"public\".\"module\" TO \"anon\"","GRANT ALL ON TABLE \"public\".\"module\" TO \"authenticated\"","GRANT ALL ON TABLE \"public\".\"module\" TO \"service_role\"","GRANT ALL ON TABLE \"public\".\"module_videos\" TO \"anon\"","GRANT ALL ON TABLE \"public\".\"module_videos\" TO \"authenticated\"","GRANT ALL ON TABLE \"public\".\"module_videos\" TO \"service_role\"","GRANT ALL ON TABLE \"public\".\"user\" TO \"anon\"","GRANT ALL ON TABLE \"public\".\"user\" TO \"authenticated\"","GRANT ALL ON TABLE \"public\".\"user\" TO \"service_role\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON SEQUENCES  TO \"postgres\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON SEQUENCES  TO \"anon\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON SEQUENCES  TO \"authenticated\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON SEQUENCES  TO \"service_role\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON FUNCTIONS  TO \"postgres\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON FUNCTIONS  TO \"anon\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON FUNCTIONS  TO \"authenticated\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON FUNCTIONS  TO \"service_role\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON TABLES  TO \"postgres\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON TABLES  TO \"anon\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON TABLES  TO \"authenticated\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON TABLES  TO \"service_role\"","RESET ALL"}', 'remote_schema');


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('supabase_functions.hooks_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

