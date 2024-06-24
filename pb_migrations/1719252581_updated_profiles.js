/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('etdl54k56vwybrn');

		collection.indexes = ['CREATE UNIQUE INDEX `idx_VTowXf1` ON `profiles` (`name`)'];

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ykt3zolr',
				name: 'name',
				type: 'text',
				required: true,
				presentable: false,
				unique: false,
				options: {
					min: 2,
					max: null,
					pattern: ''
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('etdl54k56vwybrn');

		collection.indexes = ['CREATE INDEX `idx_VTowXf1` ON `profiles` (`name`)'];

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ykt3zolr',
				name: 'name',
				type: 'text',
				required: true,
				presentable: false,
				unique: false,
				options: {
					min: null,
					max: null,
					pattern: ''
				}
			})
		);

		return dao.saveCollection(collection);
	}
);
