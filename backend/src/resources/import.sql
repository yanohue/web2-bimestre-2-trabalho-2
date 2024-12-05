--CREATE DATABASE task_manager;

--------------------------------------------------------------
--                          STATUS                          --
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.statuses
(
    id integer NOT NULL DEFAULT nextval('statuses_id_seq'::regclass),
    status character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT statuses_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.statuses
    OWNER to postgres;
*/

--------------------------------------------------------------
--                          TASKS                           --
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tasks
(
    id integer NOT NULL DEFAULT nextval('tasks_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default",
    "creationDate" date,
    "dueDate" date NOT NULL,
    active boolean DEFAULT true,
    id_status integer NOT NULL,
    CONSTRAINT tasks_pkey PRIMARY KEY (id),
    CONSTRAINT tasks_id_status_fkey FOREIGN KEY (id_status)
        REFERENCES public.statuses (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tasks
    OWNER to postgres;

--------------------------------------------------------------
--                          USERS                           --
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_accounts
(
    id integer NOT NULL DEFAULT nextval('user_accounts_id_seq'::regclass),
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_accounts_pkey PRIMARY KEY (id),
    CONSTRAINT user_accounts_username_key UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_accounts
    OWNER to postgres;

--------------------------------------------------------------
--                 SEEDS PARA POPULAR O BANCO               --
--------------------------------------------------------------

INSERT INTO user_accounts (username, password) VALUES ('user', 'pass');

INSERT INTO statuses (status) VALUES
	('pendente'),
	('fazendo'),
	('urgente'),
	('atrasado'),
    ('feito');

INSERT INTO tasks (title, description, creationDate, dueDate, id_status) VALUES
    ('Tarefa 1', 'Descrição da Tarefa 1', '2023-12-11', '2023-12-15', 1),
    ('Tarefa 2', 'Descrição da Tarefa 2', '2023-12-11', '2023-12-17', 2),
    ('Tarefa 3', 'Descrição da Tarefa 3', '2023-12-11', '2023-12-20', 3),
    ('Tarefa 4', 'Descrição da Tarefa 4', '2023-12-11', '2023-12-22', 4),
    ('Tarefa 5', 'Descrição da Tarefa 5', '2023-12-11', '2023-12-25', 5);