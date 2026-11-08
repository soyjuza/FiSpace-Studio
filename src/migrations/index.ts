import * as migration_20261107_210355_initial from './20261107_210355_initial';
import * as migration_20261107_210500_seed_content from './20261107_210500_seed_content';
import * as migration_20261107_233104_credito_soyjuza from './20261107_233104_credito_soyjuza';
import * as migration_20261108_011950_textos_contacto from './20261108_011950_textos_contacto';

export const migrations = [
  {
    up: migration_20261107_210355_initial.up,
    down: migration_20261107_210355_initial.down,
    name: '20261107_210355_initial',
  },
  {
    up: migration_20261107_210500_seed_content.up,
    down: migration_20261107_210500_seed_content.down,
    name: '20261107_210500_seed_content',
  },
  {
    up: migration_20261107_233104_credito_soyjuza.up,
    down: migration_20261107_233104_credito_soyjuza.down,
    name: '20261107_233104_credito_soyjuza',
  },
  {
    up: migration_20261108_011950_textos_contacto.up,
    down: migration_20261108_011950_textos_contacto.down,
    name: '20261108_011950_textos_contacto'
  },
];
