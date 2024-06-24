/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: 'i7mafqbep52hivh',
			created: '2024-06-19 22:00:53.918Z',
			updated: '2024-06-19 22:00:53.918Z',
			name: 'characters',
			type: 'base',
			system: false,
			schema: [
				{
					system: false,
					id: 'mn4unycx',
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
				},
				{
					system: false,
					id: '47sgeg6w',
					name: 'displayName',
					type: 'text',
					required: true,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: ''
					}
				},
				{
					system: false,
					id: 'urnacitl',
					name: 'element',
					type: 'select',
					required: true,
					presentable: false,
					unique: false,
					options: {
						maxSelect: 1,
						values: ['pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo']
					}
				},
				{
					system: false,
					id: 'mhmjqqet',
					name: 'visible',
					type: 'bool',
					required: false,
					presentable: false,
					unique: false,
					options: {}
				}
			],
			indexes: ['CREATE UNIQUE INDEX `idx_Fd6ZMqS` ON `characters` (`name`)'],
			listRule: 'visible = true',
			viewRule: 'visible = true',
			createRule: null,
			updateRule: null,
			deleteRule: null,
			options: {}
		});

		return Dao(db).saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('i7mafqbep52hivh');

		return dao.deleteCollection(collection);
	}
);
