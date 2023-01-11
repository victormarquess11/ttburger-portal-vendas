#!/bin/sh

psql -d postgres -U postgres

psql --command "CREATE TABLE IF NOT EXISTS vendas (
  id_venda INT NOT NULL,
  data DATE,
  hora TIME,
  loja varchar(250) NOT NULL,
  id_cliente INT NOT NULL,
  valor_efetivo NUMERIC(20,2),
  cancelada varchar(1),
  PRIMARY KEY (id_venda)
);"

psql --command "CREATE TABLE IF NOT EXISTS venda_produtos (
  id_venda INT NOT NULL,
  data DATE,
  hora TIME,
  loja varchar(250) NOT NULL,
  grupo varchar(250) NOT NULL,
  quantidade INT NOT NULL,
  cancelado varchar(1)
);"

psql --command "CREATE TABLE IF NOT EXISTS metas (
  id_meta INT NOT NULL,
  data DATE,
  loja varchar(250) NOT NULL,
  meta_valor NUMERIC(20,2),
  meta_prod_clt NUMERIC(20,2),
  meta_tckt_medio NUMERIC(20,2),
  PRIMARY KEY (id_meta)
);"

psql --command "COPY metas FROM '/usr/metas.csv' WITH (FORMAT csv, header);"
psql --command "COPY vendas FROM '/usr/vendas.csv' WITH (FORMAT csv, header);"
psql --command "COPY venda_produtos FROM '/usr/venda_produtos.csv' WITH (FORMAT csv, header);"
psql --command "ALTER TABLE venda_produtos ADD COLUMN id_venda_produtos SERIAL PRIMARY KEY;"