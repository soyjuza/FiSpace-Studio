import * as migration_20261107_210355_initial from './20261107_210355_initial';
import * as migration_20261107_210500_seed_content from './20261107_210500_seed_content';

export const migrations = [
  {
    up: migration_20261107_210355_initial.up,
    down: migration_20261107_210355_initial.down,
    name: '20261107_210355_initial'
  },
  {
    up: migration_20261107_210500_seed_content.up,
    down: migration_20261107_210500_seed_content.down,
    name: '20261107_210500_seed_content'
  },
];
