/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8p91imxz1m0bn4r",
    "created": "2024-01-07 11:13:17.866Z",
    "updated": "2024-01-07 11:13:17.866Z",
    "name": "to_settle",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6xakqmbs",
        "name": "total",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT e.paid_by AS id, SUM(e.amount) AS total FROM expenses e WHERE e.settled = FALSE GROUP BY e.paid_by"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8p91imxz1m0bn4r");

  return dao.deleteCollection(collection);
})
