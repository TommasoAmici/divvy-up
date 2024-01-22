/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8p91imxz1m0bn4r")

  collection.options = {
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  e.\"group\" AS \"group\",\n  e.paid_by AS paid_by,\n  SUM(e.amount) AS total\nFROM expenses e\n  WHERE e.settled = FALSE\n  GROUP BY e.\"group\", e.paid_by"
  }

  // remove
  collection.schema.removeField("1pp9ews3")

  // remove
  collection.schema.removeField("buev166s")

  // remove
  collection.schema.removeField("nsszowi9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mt6iqetf",
    "name": "group",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8lv6ixhzqwsip08",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oly3y516",
    "name": "paid_by",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w2hwkfnc",
    "name": "total",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8p91imxz1m0bn4r")

  collection.options = {
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  e.\"group\" AS group_id,\n  e.paid_by AS paid_by,\n  SUM(e.amount) AS total\nFROM expenses e\n  WHERE e.settled = FALSE\n  GROUP BY e.\"group\", e.paid_by"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1pp9ews3",
    "name": "group_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8lv6ixhzqwsip08",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "buev166s",
    "name": "paid_by",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nsszowi9",
    "name": "total",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("mt6iqetf")

  // remove
  collection.schema.removeField("oly3y516")

  // remove
  collection.schema.removeField("w2hwkfnc")

  return dao.saveCollection(collection)
})
