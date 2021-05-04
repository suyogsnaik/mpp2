CREATE EXTERNAL TABLE IF NOT EXISTS product.product_detail (
  `model` string,
  `make` string,
  `sku` string,
  `year` int,
  `device_type` string 
)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'

WITH SERDEPROPERTIES (


  'serialization.format' = '1'
) LOCATION 's3://edurekaawsmaster/data/'
TBLPROPERTIES ('has_encrypted_data'='false');