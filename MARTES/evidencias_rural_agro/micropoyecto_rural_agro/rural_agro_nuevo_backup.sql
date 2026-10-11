--
-- PostgreSQL database dump
--

\restrict o7098lVUkkIRgFTUNvit659sPleAucyabfKc3NtgoMCZgI9tM3CjuQXXmm7APOu

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-10-10 21:11:43

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 24610)
-- Name: alertas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alertas (
    id_alerta integer NOT NULL,
    parcela_id integer NOT NULL,
    cultivo_id integer,
    tipo character varying(50) NOT NULL,
    descripcion text NOT NULL,
    nivel_riesgo character varying(20),
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT alertas_nivel_riesgo_check CHECK (((nivel_riesgo)::text = ANY (ARRAY[('Bajo'::character varying)::text, ('Medio'::character varying)::text, ('Alto'::character varying)::text])))
);


ALTER TABLE public.alertas OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24621)
-- Name: alertas_id_alerta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alertas_id_alerta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alertas_id_alerta_seq OWNER TO postgres;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 220
-- Name: alertas_id_alerta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alertas_id_alerta_seq OWNED BY public.alertas.id_alerta;


--
-- TOC entry 221 (class 1259 OID 24622)
-- Name: compradores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compradores (
    id_compradores integer NOT NULL,
    usuarios_id integer NOT NULL,
    nombre_compradores character varying(20) NOT NULL,
    empresa_compradores character varying(30) NOT NULL,
    email_compradores character varying(100) NOT NULL
);


ALTER TABLE public.compradores OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 24630)
-- Name: compradores_id_compradores_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compradores_id_compradores_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compradores_id_compradores_seq OWNER TO postgres;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 222
-- Name: compradores_id_compradores_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compradores_id_compradores_seq OWNED BY public.compradores.id_compradores;


--
-- TOC entry 223 (class 1259 OID 24631)
-- Name: consumo_insumos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consumo_insumos (
    id_consumo integer NOT NULL,
    insumo_id integer NOT NULL,
    cultivo_id integer NOT NULL,
    cantidad_usada numeric(10,2) NOT NULL,
    fecha date NOT NULL
);


ALTER TABLE public.consumo_insumos OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24639)
-- Name: consumo_insumos_id_consumo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consumo_insumos_id_consumo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consumo_insumos_id_consumo_seq OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 224
-- Name: consumo_insumos_id_consumo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consumo_insumos_id_consumo_seq OWNED BY public.consumo_insumos.id_consumo;


--
-- TOC entry 225 (class 1259 OID 24640)
-- Name: cosechas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cosechas (
    id_cosecha integer NOT NULL,
    cultivo_id integer NOT NULL,
    comprador_id integer,
    fecha_cosecha date NOT NULL,
    cantidad_kg numeric(10,2) NOT NULL,
    precio_venta_unitario numeric(10,2) NOT NULL,
    valor_total numeric(12,2) GENERATED ALWAYS AS ((cantidad_kg * precio_venta_unitario)) STORED
);


ALTER TABLE public.cosechas OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 24649)
-- Name: cosechas_id_cosecha_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cosechas_id_cosecha_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cosechas_id_cosecha_seq OWNER TO postgres;

--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 226
-- Name: cosechas_id_cosecha_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cosechas_id_cosecha_seq OWNED BY public.cosechas.id_cosecha;


--
-- TOC entry 227 (class 1259 OID 24650)
-- Name: cultivos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cultivos (
    id_cultivos integer NOT NULL,
    parcelas_id integer NOT NULL,
    tipo_cultivos character varying(20) NOT NULL,
    variedad_cultivos character varying(30) NOT NULL,
    tipo_semilla character varying(30) NOT NULL,
    cantidad_semilla numeric(12,2) NOT NULL,
    precio_semilla numeric(12,2) NOT NULL,
    fecha_siembra date NOT NULL,
    fecha_estimada_cosecha_cultivos date,
    estado_siembra character varying(30) DEFAULT 'en crecimiento'::character varying
);


ALTER TABLE public.cultivos OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 24662)
-- Name: cultivos_id_cultivos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cultivos_id_cultivos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cultivos_id_cultivos_seq OWNER TO postgres;

--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 228
-- Name: cultivos_id_cultivos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cultivos_id_cultivos_seq OWNED BY public.cultivos.id_cultivos;


--
-- TOC entry 229 (class 1259 OID 24663)
-- Name: empleados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleados (
    id_empleado integer NOT NULL,
    nombre character varying(100) NOT NULL,
    telefono character varying(20),
    tipo_contrato character varying(30),
    CONSTRAINT empleados_tipo_contrato_check CHECK (((tipo_contrato)::text = ANY (ARRAY[('Temporal'::character varying)::text, ('Jornalero'::character varying)::text, ('Fijo'::character varying)::text])))
);


ALTER TABLE public.empleados OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24669)
-- Name: empleados_id_empleado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empleados_id_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleados_id_empleado_seq OWNER TO postgres;

--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 230
-- Name: empleados_id_empleado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empleados_id_empleado_seq OWNED BY public.empleados.id_empleado;


--
-- TOC entry 231 (class 1259 OID 24670)
-- Name: finanzas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.finanzas (
    id_finanza integer NOT NULL,
    parcela_id integer,
    cultivo_id integer,
    tipo character varying(10) NOT NULL,
    categoria character varying(50) NOT NULL,
    monto numeric(12,2) NOT NULL,
    concepto text,
    fecha date NOT NULL,
    CONSTRAINT finanzas_tipo_check CHECK (((tipo)::text = ANY (ARRAY[('Ingreso'::character varying)::text, ('Gasto'::character varying)::text])))
);


ALTER TABLE public.finanzas OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 24681)
-- Name: finanzas_id_finanza_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.finanzas_id_finanza_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.finanzas_id_finanza_seq OWNER TO postgres;

--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 232
-- Name: finanzas_id_finanza_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.finanzas_id_finanza_seq OWNED BY public.finanzas.id_finanza;


--
-- TOC entry 233 (class 1259 OID 24682)
-- Name: fincas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fincas (
    id_fincas integer NOT NULL,
    usuarios_id integer NOT NULL,
    nombre_fincas character varying(50) NOT NULL,
    ubicacion_fincas character varying(50) NOT NULL,
    coordenada_fincas jsonb NOT NULL
);


ALTER TABLE public.fincas OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 24692)
-- Name: fincas_id_fincas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fincas_id_fincas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fincas_id_fincas_seq OWNER TO postgres;

--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 234
-- Name: fincas_id_fincas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fincas_id_fincas_seq OWNED BY public.fincas.id_fincas;


--
-- TOC entry 235 (class 1259 OID 24693)
-- Name: foto_cultivos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foto_cultivos (
    id_fotos integer NOT NULL,
    cultivo_id integer NOT NULL,
    url_imagen_foto_cultivos character varying(255) NOT NULL,
    descripcion_foto_cultivos text NOT NULL,
    fecha_foto_cultivos timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.foto_cultivos OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 24703)
-- Name: foto_cultivos_id_fotos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.foto_cultivos_id_fotos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.foto_cultivos_id_fotos_seq OWNER TO postgres;

--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 236
-- Name: foto_cultivos_id_fotos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.foto_cultivos_id_fotos_seq OWNED BY public.foto_cultivos.id_fotos;


--
-- TOC entry 237 (class 1259 OID 24704)
-- Name: inventario_insumos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventario_insumos (
    id_insumo integer NOT NULL,
    nombre character varying(100) NOT NULL,
    categoria character varying(50) NOT NULL,
    cantidad_stock numeric(10,2) NOT NULL,
    unidad_medida character varying(20) NOT NULL,
    costo_unitario numeric(12,2) NOT NULL
);


ALTER TABLE public.inventario_insumos OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 24713)
-- Name: inventario_insumos_id_insumo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventario_insumos_id_insumo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventario_insumos_id_insumo_seq OWNER TO postgres;

--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 238
-- Name: inventario_insumos_id_insumo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventario_insumos_id_insumo_seq OWNED BY public.inventario_insumos.id_insumo;


--
-- TOC entry 239 (class 1259 OID 24714)
-- Name: jornales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jornales (
    id_jornal integer NOT NULL,
    empleado_id integer NOT NULL,
    cultivo_id integer,
    fecha date NOT NULL,
    pago_jornal numeric(10,2) NOT NULL,
    horas_trabajadas numeric(4,1)
);


ALTER TABLE public.jornales OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 24721)
-- Name: jornales_id_jornal_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jornales_id_jornal_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jornales_id_jornal_seq OWNER TO postgres;

--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 240
-- Name: jornales_id_jornal_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jornales_id_jornal_seq OWNED BY public.jornales.id_jornal;


--
-- TOC entry 241 (class 1259 OID 24722)
-- Name: parcelas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parcelas (
    id_parcelas integer NOT NULL,
    fincas_id integer NOT NULL,
    nombre_parcelas character varying(30) NOT NULL,
    area_parcelas numeric(12,2) NOT NULL,
    coordenadas_parcelas jsonb NOT NULL
);


ALTER TABLE public.parcelas OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 24732)
-- Name: parcelas_id_parcelas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parcelas_id_parcelas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parcelas_id_parcelas_seq OWNER TO postgres;

--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 242
-- Name: parcelas_id_parcelas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parcelas_id_parcelas_seq OWNED BY public.parcelas.id_parcelas;


--
-- TOC entry 243 (class 1259 OID 24733)
-- Name: plan_riego; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_riego (
    id_riego integer NOT NULL,
    cultivo_id integer NOT NULL,
    fecha_programada timestamp without time zone NOT NULL,
    frecuencia_dias integer,
    volumen_agua numeric(8,2),
    completado boolean DEFAULT false
);


ALTER TABLE public.plan_riego OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 24740)
-- Name: plan_riego_id_riego_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plan_riego_id_riego_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plan_riego_id_riego_seq OWNER TO postgres;

--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 244
-- Name: plan_riego_id_riego_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plan_riego_id_riego_seq OWNED BY public.plan_riego.id_riego;


--
-- TOC entry 245 (class 1259 OID 24741)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuarios integer NOT NULL,
    nombre_usuarios character varying(30) NOT NULL,
    apellido_usuarios character varying(30) NOT NULL,
    email_usuarios character varying(100) NOT NULL,
    contrasenia_usuarios character varying(255) NOT NULL,
    rol_usuarios character varying(20) NOT NULL,
    CONSTRAINT usuarios_rol_usuarios_check CHECK (((rol_usuarios)::text = ANY (ARRAY[('cliente'::character varying)::text, ('administrador'::character varying)::text, ('agricultor'::character varying)::text, ('agronomo'::character varying)::text, ('operario'::character varying)::text])))
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 24751)
-- Name: usuarios_id_usuarios_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuarios_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuarios_seq OWNER TO postgres;

--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 246
-- Name: usuarios_id_usuarios_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuarios_seq OWNED BY public.usuarios.id_usuarios;


--
-- TOC entry 4820 (class 2604 OID 24752)
-- Name: alertas id_alerta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas ALTER COLUMN id_alerta SET DEFAULT nextval('public.alertas_id_alerta_seq'::regclass);


--
-- TOC entry 4822 (class 2604 OID 24753)
-- Name: compradores id_compradores; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compradores ALTER COLUMN id_compradores SET DEFAULT nextval('public.compradores_id_compradores_seq'::regclass);


--
-- TOC entry 4823 (class 2604 OID 24754)
-- Name: consumo_insumos id_consumo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumo_insumos ALTER COLUMN id_consumo SET DEFAULT nextval('public.consumo_insumos_id_consumo_seq'::regclass);


--
-- TOC entry 4824 (class 2604 OID 24755)
-- Name: cosechas id_cosecha; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cosechas ALTER COLUMN id_cosecha SET DEFAULT nextval('public.cosechas_id_cosecha_seq'::regclass);


--
-- TOC entry 4826 (class 2604 OID 24756)
-- Name: cultivos id_cultivos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cultivos ALTER COLUMN id_cultivos SET DEFAULT nextval('public.cultivos_id_cultivos_seq'::regclass);


--
-- TOC entry 4828 (class 2604 OID 24757)
-- Name: empleados id_empleado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados ALTER COLUMN id_empleado SET DEFAULT nextval('public.empleados_id_empleado_seq'::regclass);


--
-- TOC entry 4829 (class 2604 OID 24758)
-- Name: finanzas id_finanza; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finanzas ALTER COLUMN id_finanza SET DEFAULT nextval('public.finanzas_id_finanza_seq'::regclass);


--
-- TOC entry 4830 (class 2604 OID 24759)
-- Name: fincas id_fincas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fincas ALTER COLUMN id_fincas SET DEFAULT nextval('public.fincas_id_fincas_seq'::regclass);


--
-- TOC entry 4831 (class 2604 OID 24760)
-- Name: foto_cultivos id_fotos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto_cultivos ALTER COLUMN id_fotos SET DEFAULT nextval('public.foto_cultivos_id_fotos_seq'::regclass);


--
-- TOC entry 4833 (class 2604 OID 24761)
-- Name: inventario_insumos id_insumo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario_insumos ALTER COLUMN id_insumo SET DEFAULT nextval('public.inventario_insumos_id_insumo_seq'::regclass);


--
-- TOC entry 4834 (class 2604 OID 24762)
-- Name: jornales id_jornal; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jornales ALTER COLUMN id_jornal SET DEFAULT nextval('public.jornales_id_jornal_seq'::regclass);


--
-- TOC entry 4835 (class 2604 OID 24763)
-- Name: parcelas id_parcelas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcelas ALTER COLUMN id_parcelas SET DEFAULT nextval('public.parcelas_id_parcelas_seq'::regclass);


--
-- TOC entry 4836 (class 2604 OID 24764)
-- Name: plan_riego id_riego; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_riego ALTER COLUMN id_riego SET DEFAULT nextval('public.plan_riego_id_riego_seq'::regclass);


--
-- TOC entry 4838 (class 2604 OID 24765)
-- Name: usuarios id_usuarios; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuarios SET DEFAULT nextval('public.usuarios_id_usuarios_seq'::regclass);


--
-- TOC entry 5034 (class 0 OID 24610)
-- Dependencies: 219
-- Data for Name: alertas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alertas (id_alerta, parcela_id, cultivo_id, tipo, descripcion, nivel_riesgo, fecha) FROM stdin;
\.


--
-- TOC entry 5036 (class 0 OID 24622)
-- Dependencies: 221
-- Data for Name: compradores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compradores (id_compradores, usuarios_id, nombre_compradores, empresa_compradores, email_compradores) FROM stdin;
\.


--
-- TOC entry 5038 (class 0 OID 24631)
-- Dependencies: 223
-- Data for Name: consumo_insumos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.consumo_insumos (id_consumo, insumo_id, cultivo_id, cantidad_usada, fecha) FROM stdin;
\.


--
-- TOC entry 5040 (class 0 OID 24640)
-- Dependencies: 225
-- Data for Name: cosechas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cosechas (id_cosecha, cultivo_id, comprador_id, fecha_cosecha, cantidad_kg, precio_venta_unitario) FROM stdin;
\.


--
-- TOC entry 5042 (class 0 OID 24650)
-- Dependencies: 227
-- Data for Name: cultivos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cultivos (id_cultivos, parcelas_id, tipo_cultivos, variedad_cultivos, tipo_semilla, cantidad_semilla, precio_semilla, fecha_siembra, fecha_estimada_cosecha_cultivos, estado_siembra) FROM stdin;
\.


--
-- TOC entry 5044 (class 0 OID 24663)
-- Dependencies: 229
-- Data for Name: empleados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleados (id_empleado, nombre, telefono, tipo_contrato) FROM stdin;
\.


--
-- TOC entry 5046 (class 0 OID 24670)
-- Dependencies: 231
-- Data for Name: finanzas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.finanzas (id_finanza, parcela_id, cultivo_id, tipo, categoria, monto, concepto, fecha) FROM stdin;
\.


--
-- TOC entry 5048 (class 0 OID 24682)
-- Dependencies: 233
-- Data for Name: fincas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fincas (id_fincas, usuarios_id, nombre_fincas, ubicacion_fincas, coordenada_fincas) FROM stdin;
\.


--
-- TOC entry 5050 (class 0 OID 24693)
-- Dependencies: 235
-- Data for Name: foto_cultivos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foto_cultivos (id_fotos, cultivo_id, url_imagen_foto_cultivos, descripcion_foto_cultivos, fecha_foto_cultivos) FROM stdin;
\.


--
-- TOC entry 5052 (class 0 OID 24704)
-- Dependencies: 237
-- Data for Name: inventario_insumos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventario_insumos (id_insumo, nombre, categoria, cantidad_stock, unidad_medida, costo_unitario) FROM stdin;
\.


--
-- TOC entry 5054 (class 0 OID 24714)
-- Dependencies: 239
-- Data for Name: jornales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jornales (id_jornal, empleado_id, cultivo_id, fecha, pago_jornal, horas_trabajadas) FROM stdin;
\.


--
-- TOC entry 5056 (class 0 OID 24722)
-- Dependencies: 241
-- Data for Name: parcelas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parcelas (id_parcelas, fincas_id, nombre_parcelas, area_parcelas, coordenadas_parcelas) FROM stdin;
\.


--
-- TOC entry 5058 (class 0 OID 24733)
-- Dependencies: 243
-- Data for Name: plan_riego; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_riego (id_riego, cultivo_id, fecha_programada, frecuencia_dias, volumen_agua, completado) FROM stdin;
\.


--
-- TOC entry 5060 (class 0 OID 24741)
-- Dependencies: 245
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuarios, nombre_usuarios, apellido_usuarios, email_usuarios, contrasenia_usuarios, rol_usuarios) FROM stdin;
2	Admin	RuralAgro	admin@ruralagro.com	$2b$12$bkP.Qxwn7.xaiyJe6KElWONGhnO185IaG2pCdFHJY5LMgiOcJEYWG	administrador
\.


--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 220
-- Name: alertas_id_alerta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alertas_id_alerta_seq', 1, false);


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 222
-- Name: compradores_id_compradores_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compradores_id_compradores_seq', 1, false);


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 224
-- Name: consumo_insumos_id_consumo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consumo_insumos_id_consumo_seq', 1, false);


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 226
-- Name: cosechas_id_cosecha_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cosechas_id_cosecha_seq', 1, false);


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 228
-- Name: cultivos_id_cultivos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cultivos_id_cultivos_seq', 1, false);


--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 230
-- Name: empleados_id_empleado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empleados_id_empleado_seq', 1, false);


--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 232
-- Name: finanzas_id_finanza_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.finanzas_id_finanza_seq', 1, false);


--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 234
-- Name: fincas_id_fincas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fincas_id_fincas_seq', 1, false);


--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 236
-- Name: foto_cultivos_id_fotos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.foto_cultivos_id_fotos_seq', 1, false);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 238
-- Name: inventario_insumos_id_insumo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventario_insumos_id_insumo_seq', 1, false);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 240
-- Name: jornales_id_jornal_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jornales_id_jornal_seq', 1, false);


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 242
-- Name: parcelas_id_parcelas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parcelas_id_parcelas_seq', 1, false);


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 244
-- Name: plan_riego_id_riego_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plan_riego_id_riego_seq', 1, false);


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 246
-- Name: usuarios_id_usuarios_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuarios_seq', 2, true);


--
-- TOC entry 4844 (class 2606 OID 24767)
-- Name: alertas alertas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas
    ADD CONSTRAINT alertas_pkey PRIMARY KEY (id_alerta);


--
-- TOC entry 4846 (class 2606 OID 24769)
-- Name: compradores compradores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compradores
    ADD CONSTRAINT compradores_pkey PRIMARY KEY (id_compradores);


--
-- TOC entry 4848 (class 2606 OID 24771)
-- Name: consumo_insumos consumo_insumos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumo_insumos
    ADD CONSTRAINT consumo_insumos_pkey PRIMARY KEY (id_consumo);


--
-- TOC entry 4850 (class 2606 OID 24773)
-- Name: cosechas cosechas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cosechas
    ADD CONSTRAINT cosechas_pkey PRIMARY KEY (id_cosecha);


--
-- TOC entry 4852 (class 2606 OID 24775)
-- Name: cultivos cultivos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cultivos
    ADD CONSTRAINT cultivos_pkey PRIMARY KEY (id_cultivos);


--
-- TOC entry 4854 (class 2606 OID 24777)
-- Name: empleados empleados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (id_empleado);


--
-- TOC entry 4856 (class 2606 OID 24779)
-- Name: finanzas finanzas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finanzas
    ADD CONSTRAINT finanzas_pkey PRIMARY KEY (id_finanza);


--
-- TOC entry 4858 (class 2606 OID 24781)
-- Name: fincas fincas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fincas
    ADD CONSTRAINT fincas_pkey PRIMARY KEY (id_fincas);


--
-- TOC entry 4860 (class 2606 OID 24783)
-- Name: foto_cultivos foto_cultivos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto_cultivos
    ADD CONSTRAINT foto_cultivos_pkey PRIMARY KEY (id_fotos);


--
-- TOC entry 4862 (class 2606 OID 24785)
-- Name: inventario_insumos inventario_insumos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario_insumos
    ADD CONSTRAINT inventario_insumos_pkey PRIMARY KEY (id_insumo);


--
-- TOC entry 4864 (class 2606 OID 24787)
-- Name: jornales jornales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jornales
    ADD CONSTRAINT jornales_pkey PRIMARY KEY (id_jornal);


--
-- TOC entry 4866 (class 2606 OID 24789)
-- Name: parcelas parcelas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcelas
    ADD CONSTRAINT parcelas_pkey PRIMARY KEY (id_parcelas);


--
-- TOC entry 4868 (class 2606 OID 24791)
-- Name: plan_riego plan_riego_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_riego
    ADD CONSTRAINT plan_riego_pkey PRIMARY KEY (id_riego);


--
-- TOC entry 4870 (class 2606 OID 24793)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuarios);


--
-- TOC entry 4871 (class 2606 OID 24794)
-- Name: alertas alertas_cultivo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas
    ADD CONSTRAINT alertas_cultivo_id_fkey FOREIGN KEY (cultivo_id) REFERENCES public.cultivos(id_cultivos) ON DELETE SET NULL;


--
-- TOC entry 4872 (class 2606 OID 24799)
-- Name: alertas alertas_parcela_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas
    ADD CONSTRAINT alertas_parcela_id_fkey FOREIGN KEY (parcela_id) REFERENCES public.parcelas(id_parcelas) ON DELETE CASCADE;


--
-- TOC entry 4873 (class 2606 OID 24804)
-- Name: compradores compradores_usuarios_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compradores
    ADD CONSTRAINT compradores_usuarios_id_fkey FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id_usuarios) ON DELETE CASCADE;


--
-- TOC entry 4874 (class 2606 OID 24809)
-- Name: consumo_insumos consumo_insumos_cultivo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumo_insumos
    ADD CONSTRAINT consumo_insumos_cultivo_id_fkey FOREIGN KEY (cultivo_id) REFERENCES public.cultivos(id_cultivos) ON DELETE CASCADE;


--
-- TOC entry 4875 (class 2606 OID 24814)
-- Name: consumo_insumos consumo_insumos_insumo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumo_insumos
    ADD CONSTRAINT consumo_insumos_insumo_id_fkey FOREIGN KEY (insumo_id) REFERENCES public.inventario_insumos(id_insumo) ON DELETE RESTRICT;


--
-- TOC entry 4876 (class 2606 OID 24819)
-- Name: cosechas cosechas_comprador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cosechas
    ADD CONSTRAINT cosechas_comprador_id_fkey FOREIGN KEY (comprador_id) REFERENCES public.compradores(id_compradores) ON DELETE SET NULL;


--
-- TOC entry 4877 (class 2606 OID 24824)
-- Name: cosechas cosechas_cultivo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cosechas
    ADD CONSTRAINT cosechas_cultivo_id_fkey FOREIGN KEY (cultivo_id) REFERENCES public.cultivos(id_cultivos) ON DELETE CASCADE;


--
-- TOC entry 4878 (class 2606 OID 24829)
-- Name: cultivos cultivos_parcelas_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cultivos
    ADD CONSTRAINT cultivos_parcelas_id_fkey FOREIGN KEY (parcelas_id) REFERENCES public.parcelas(id_parcelas) ON DELETE CASCADE;


--
-- TOC entry 4879 (class 2606 OID 24834)
-- Name: finanzas finanzas_cultivo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finanzas
    ADD CONSTRAINT finanzas_cultivo_id_fkey FOREIGN KEY (cultivo_id) REFERENCES public.cultivos(id_cultivos) ON DELETE CASCADE;


--
-- TOC entry 4880 (class 2606 OID 24839)
-- Name: finanzas finanzas_parcela_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finanzas
    ADD CONSTRAINT finanzas_parcela_id_fkey FOREIGN KEY (parcela_id) REFERENCES public.parcelas(id_parcelas) ON DELETE CASCADE;


--
-- TOC entry 4881 (class 2606 OID 24844)
-- Name: fincas fincas_usuarios_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fincas
    ADD CONSTRAINT fincas_usuarios_id_fkey FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id_usuarios) ON DELETE CASCADE;


--
-- TOC entry 4882 (class 2606 OID 24849)
-- Name: foto_cultivos foto_cultivos_cultivo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto_cultivos
    ADD CONSTRAINT foto_cultivos_cultivo_id_fkey FOREIGN KEY (cultivo_id) REFERENCES public.cultivos(id_cultivos) ON DELETE CASCADE;


--
-- TOC entry 4883 (class 2606 OID 24854)
-- Name: jornales jornales_cultivo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jornales
    ADD CONSTRAINT jornales_cultivo_id_fkey FOREIGN KEY (cultivo_id) REFERENCES public.cultivos(id_cultivos) ON DELETE SET NULL;


--
-- TOC entry 4884 (class 2606 OID 24859)
-- Name: jornales jornales_empleado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jornales
    ADD CONSTRAINT jornales_empleado_id_fkey FOREIGN KEY (empleado_id) REFERENCES public.empleados(id_empleado) ON DELETE CASCADE;


--
-- TOC entry 4885 (class 2606 OID 24864)
-- Name: parcelas parcelas_fincas_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcelas
    ADD CONSTRAINT parcelas_fincas_id_fkey FOREIGN KEY (fincas_id) REFERENCES public.fincas(id_fincas) ON DELETE CASCADE;


--
-- TOC entry 4886 (class 2606 OID 24869)
-- Name: plan_riego plan_riego_cultivo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_riego
    ADD CONSTRAINT plan_riego_cultivo_id_fkey FOREIGN KEY (cultivo_id) REFERENCES public.cultivos(id_cultivos) ON DELETE CASCADE;


-- Completed on 2026-10-10 21:11:45

--
-- PostgreSQL database dump complete
--

\unrestrict o7098lVUkkIRgFTUNvit659sPleAucyabfKc3NtgoMCZgI9tM3CjuQXXmm7APOu

