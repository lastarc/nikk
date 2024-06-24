/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('2q5l1u64zseldm9');

		collection.name = 'nicks';
		collection.indexes = [
			'CREATE UNIQUE INDEX `idx_TdQeCRY` ON `nicks` (\n  `profile`,\n  `character`\n)'
		];

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('2q5l1u64zseldm9');

		collection.name = 'votes';
		collection.indexes = [
			'CREATE UNIQUE INDEX `idx_TdQeCRY` ON `votes` (\n  `profile`,\n  `character`\n)'
		];

		return dao.saveCollection(collection);
	}
);
