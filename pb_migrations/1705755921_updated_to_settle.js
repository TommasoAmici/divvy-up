/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8p91imxz1m0bn4r")

  collection.options = {
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  e.\"group\" AS \"group\",\n  e.paid_by AS paid_by,\n  SUM(e.amount) AS total\nFROM expenses e\n  -- WHERE e.settled = FALSE\n  GROUP BY e.\"group\", e.paid_by"
  }

  // remove
  collection.schema.removeField("kissrz0m")

  // remove
  collection.schema.removeField("iqtpczsj")

  // remove
  collection.schema.removeField("7brpzrwo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y9kxxpn7",
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
    "id": "vpwpbidk",
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
    "id": "91j5lz0e",
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
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  e.\"group\" AS \"group\",\n  e.paid_by AS paid_by,\n  SUM(e.amount) AS total\nFROM expenses e\n  WHERE e.settled = FALSE\n  GROUP BY e.\"group\", e.paid_by"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kissrz0m",
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
    "id": "iqtpczsj",
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
    "id": "7brpzrwo",
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
  collection.schema.removeField("y9kxxpn7")

  // remove
  collection.schema.removeField("vpwpbidk")

  // remove
  collection.schema.removeField("91j5lz0e")

  return dao.saveCollection(collection)
})
