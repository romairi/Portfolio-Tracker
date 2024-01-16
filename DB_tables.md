# Define tables

## stocks table
* id
* symbol
* shortName
* longName
* sector
* industry

## transactions
* id
* stock_id
* date
* quantity
* purchase_price
* purchase_currency
* origin_currency
* exchange

## portfolio table
* id
* name
* list of transaction_ids (reference to another table)