#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');

const tsxBin = path.join(__dirname, 'node_modules', '.bin', 'tsx');
const seedScript = path.join(__dirname, 'src', 'seeds', 'seed.ts');

const result = spawnSync(tsxBin, [seedScript], {
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status ?? 0);
