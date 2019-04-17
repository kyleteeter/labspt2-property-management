exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', (table) => {
		table.increments();
		table.text('password').notNullable();
		table.boolean('isAdmin').notNullable().defaultTo(false);
		table.string('email').notNullable().unique();
		table.string('phone').notNullable();
		table.string('displayName').notNullable();
		table.boolean('emailSubscribe').notNullable().defaultTo(false);
		table.boolean('textSubscribe').notNullable().defaultTo(false);
		table.text('application');
	});
};
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
