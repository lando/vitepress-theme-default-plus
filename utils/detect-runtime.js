
export default function detectRuntime() {
  // bun
  if (typeof Bun !== 'undefined' || process.versions.bun) {
    return 'bun';

  // node
  } else return 'node';
};
