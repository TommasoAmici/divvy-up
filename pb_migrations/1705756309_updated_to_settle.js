/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8p91imxz1m0bn4r")

  collection.options = {
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  e.\"group\" AS \"group\",\n  e.paid_by AS paid_by,\n  SUM(e.amount) AS total\nFROM expenses e\n  WHERE e.settled_at = ''\n  GROUP BY e.\"group\", e.paid_by"
  }

  // remove
  collection.schema.removeField("xfnt34un")

  // remove
  collection.schema.removeField("mpwug7wu")

  // remove
  collection.schema.removeField("9beievqs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jekkamtm",
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
    "id": "xfkfhbij",
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
    "id": "u6d3cjkn",
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
    "query": "SELECT\n  (ROW_NUMBER() OVER()) as id,\n  e.\"group\" AS \"group\",\n  e.paid_by AS paid_by,\n  SUM(e.amount) AS total\nFROM expenses e\n  WHERE e.settled_at = null\n  GROUP BY e.\"group\", e.paid_by"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xfnt34un",
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
    "id": "mpwug7wu",
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
    "id": "9beievqs",
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
  collection.schema.removeField("jekkamtm")

  // remove
  collection.schema.removeField("xfkfhbij")

  // remove
  collection.schema.removeField("u6d3cjkn")

  return dao.saveCollection(collection)
})
