/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "xwvbgvlgv0v17w8",
    "created": "2024-01-21 17:07:10.197Z",
    "updated": "2024-01-21 17:07:10.197Z",
    "name": "import_settings",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5hjonnms",
        "name": "config",
        "type": "json",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      },
      {
        "system": false,
        "id": "ywpywn6w",
        "name": "user",
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
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_1OuQTHG` ON `import_settings` (`user`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xwvbgvlgv0v17w8");

  return dao.deleteCollection(collection);
})
