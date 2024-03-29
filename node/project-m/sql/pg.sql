INSERT INTO "company" ("comp_name", "fio", "email", "inn")
VALUES ('fires', 'flaskf', 'xopdwawf', 'fsdf');

CREATE TABLE company
(
  id SERIAL PRIMARY KEY,
  comp_name VARCHAR(100) UNIQUE NOT NULL,
  fio VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  inn VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE employee
(
  id SERIAL PRIMARY KEY,
  fio VARCHAR(100) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  phone VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100),
  ruls INTEGER[] NOT NULL,
  fk_company_id INTEGER REFERENCES company(id)
);

CREATE TABLE product
(
  id SERIAL PRIMARY KEY,
  brand: VARCHAR(100) NOT NULL,
  name: VARCHAR(100) NOT NULL,
  offer_id: VARCHAR(100) NOT NULL,
  price: INTEGER NOT NULL,
  price_sale: INTEGER,
  barcodes: VARCHAR(100)[],
  images: VARCHAR(100)[],
  description: VARCHAR(100) NOT NULL,
  color: VARCHAR(100) NOT NULL,
  coo: VARCHAR(100) NOT NULL,
  fk_company_id INTEGER REFERENCES company(id),
  fk_categoty_id INTEGER REFERENCES category(id)
);

CREATE TABLE category
(
  id SERIAL PRIMARY KEY,
  name: VARCHAR(100) UNIQUE NOT NULL,
  fieldList: VARCHAR(100) NOT NULL
);
INSERT INTO brands ("name", "field_list") VALUES
('Model'),
('OS'),
('Memoty'),
('RAM'),
('Port'),
('Display size'),
('SIM type'),
('Sim qty'),
('Core qty'),
('Processor'),
('Network'),
('Type display'),
('Camera mpx main'),
('Camera mpx front')

CREATE TABLE brands
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);
INSERT INTO brands ("name") VALUES
('Apple'),
('Samsung'),
('Huawei'),
('Honor'),
('Xiaomi'),
('Realme')

CREATE TABLE countries
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);
INSERT INTO countries ("name") VALUES
('Afghanistan'),
('Albania'),
('Algeria'),
('American Samoa'),
('Andorra'),
('Angola'),
('Anguilla'),
('Antigua and Barbuda'),
('Argentina'),
('Armenia'),
('Aruba'),
('Australia'),
('Austria'),
('Azerbaijan'),
('Bangladesh'),
('Barbados'),
('Bahamas'),
('Bahrain'),
('Belarus'),
('Belgium'),
('Belize'),
('Benin'),
('Bermuda'),
('Bhutan'),
('Bolivia'),
('Bosnia and Herzegovina'),
('Botswana'),
('Brazil'),
('British Indian Ocean Territory'),
('British Virgin Islands'),
('Brunei Darussalam'),
('Bulgaria'),
('Burkina Faso'),
('Burma'),
('Burundi'),
('Cambodia'),
('Cameroon'),
('Canada'),
('Cape Verde'),
('Cayman Islands'),
('Central African Republic'),
('Chad'),
('Chile'),
('China'),
('Christmas Island'),
('Cocos (Keeling) Islands'),
('Colombia'),
('Comoros'),
('Congo-Brazzaville'),
('Congo-Kinshasa'),
('Cook Islands'),
('Costa Rica'),
('Croatia'),
('Cura?ao'),
('Cyprus'),
('Czech Republic'),
('Denmark'),
('Djibouti'),
('Dominica'),
('Dominican Republic'),
('East Timor'),
('Ecuador'),
('El Salvador'),
('Egypt'),
('Equatorial Guinea'),
('Eritrea'),
('Estonia'),
('Ethiopia'),
('Falkland Islands'),
('Faroe Islands'),
('Federated States of Micronesia'),
('Fiji'),
('Finland'),
('France'),
('French Guiana'),
('French Polynesia'),
('French Southern Lands'),
('Gabon'),
('Gambia'),
('Georgia'),
('Germany'),
('Ghana'),
('Gibraltar'),
('Greece'),
('Greenland'),
('Grenada'),
('Guadeloupe'),
('Guam'),
('Guatemala'),
('Guernsey'),
('Guinea'),
('Guinea-Bissau'),
('Guyana'),
('Haiti'),
('Heard and McDonald Islands'),
('Honduras'),
('Hong Kong'),
('Hungary'),
('Iceland'),
('India'),
('Indonesia'),
('Iraq'),
('Ireland'),
('Isle of Man'),
('Israel'),
('Italy'),
('Jamaica'),
('Japan'),
('Jersey'),
('Jordan'),
('Kazakhstan'),
('Kenya'),
('Kiribati'),
('Kuwait'),
('Kyrgyzstan'),
('Laos'),
('Latvia'),
('Lebanon'),
('Lesotho'),
('Liberia'),
('Libya'),
('Liechtenstein'),
('Lithuania'),
('Luxembourg'),
('Macau'),
('Macedonia'),
('Madagascar'),
('Malawi'),
('Malaysia'),
('Maldives'),
('Mali'),
('Malta'),
('Marshall Islands'),
('Martinique'),
('Mauritania'),
('Mauritius'),
('Mayotte'),
('Mexico'),
('Moldova'),
('Monaco'),
('Mongolia'),
('Montenegro'),
('Montserrat'),
('Morocco'),
('Mozambique'),
('Namibia'),
('Nauru'),
('Nepal'),
('Netherlands'),
('New Caledonia'),
('New Zealand'),
('Nicaragua'),
('Niger'),
('Nigeria'),
('Niue'),
('Norfolk Island'),
('Northern Mariana Islands'),
('Norway'),
('Oman'),
('Pakistan'),
('Palau'),
('Panama'),
('Papua New Guinea'),
('Paraguay'),
('Peru'),
('Philippines'),
('Pitcairn Islands'),
('Poland'),
('Portugal'),
('Puerto Rico'),
('Qatar'),
('R?union'),
('Romania'),
('Russia'),
('Rwanda'),
('Saint Barth?lemy'),
('Saint Helena'),
('Saint Kitts and Nevis'),
('Saint Lucia'),
('Saint Martin'),
('Saint Pierre and Miquelon'),
('Saint Vincent'),
('Samoa'),
('San Marino'),
('S?o Tom? and Pr?ncipe'),
('Saudi Arabia'),
('Senegal'),
('Serbia'),
('Seychelles'),
('Sierra Leone'),
('Singapore'),
('Sint Maarten'),
('Slovakia'),
('Slovenia'),
('Solomon Islands'),
('Somalia'),
('South Africa'),
('South Georgia'),
('South Korea'),
('Spain'),
('Sri Lanka'),
('Sudan'),
('Suriname'),
('Svalbard and Jan Mayen'),
('Sweden'),
('Swaziland'),
('Switzerland'),
('Syria'),
('Taiwan'),
('Tajikistan'),
('Tanzania'),
('Thailand'),
('Togo'),
('Tokelau'),
('Tonga'),
('Trinidad and Tobago'),
('Tunisia'),
('Turkey'),
('Turkmenistan'),
('Turks and Caicos Islands'),
('Tuvalu'),
('Uganda'),
('Ukraine'),
('United Arab Emirates'),
('United Kingdom'),
('United States'),
('Uruguay'),
('Uzbekistan'),
('Vanuatu'),
('Vatican City'),
('Vietnam'),
('Venezuela'),
('Wallis and Futuna'),
('Western Sahara'),
('Yemen'),
('Zambia'),
('Zimbabwe')
