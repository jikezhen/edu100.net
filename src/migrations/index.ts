import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260309_071235 from './20260309_071235';
import * as migration_20260309_094516 from './20260309_094516';
import * as migration_20260708_052118 from './20260708_052118';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260309_071235.up,
    down: migration_20260309_071235.down,
    name: '20260309_071235',
  },
  {
    up: migration_20260309_094516.up,
    down: migration_20260309_094516.down,
    name: '20260309_094516',
  },
  {
    up: migration_20260708_052118.up,
    down: migration_20260708_052118.down,
    name: '20260708_052118'
  },
];
