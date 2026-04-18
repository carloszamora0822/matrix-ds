# Versioning

`MATRIX-DS` uses semantic versioning with a directory-specific Git tag prefix.

## Tag format

Use:

```text
matrix-ds/vMAJOR.MINOR.PATCH
```

Examples:

```text
matrix-ds/v0.1.0
matrix-ds/v0.1.1
matrix-ds/v0.2.0
matrix-ds/v0.2.0-alpha.1
matrix-ds/v1.0.0
```

## When to bump versions

- `PATCH`
  Small visual fixes, documentation updates, bug fixes, or non-breaking renderer improvements.
- `MINOR`
  New components, new mock pages, new renderer capabilities, new theme capabilities, or additive API changes.
- `MAJOR`
  Breaking renames, structural reorganization, removed APIs, or changes that require downstream consumers to update code.

## Pre-release tags

Use pre-release suffixes while the package is still evolving quickly:

```text
matrix-ds/v0.2.0-alpha.1
matrix-ds/v0.2.0-beta.1
matrix-ds/v0.2.0-rc.1
```

## Release checklist

Before cutting a tag:

1. Update `CHANGELOG.md`.
2. Update `package.json` version.
3. Verify `prototype.html` still boots from `system/registry.js`.
4. Verify the board renderer imports cleanly.
5. Create the Git tag using the `matrix-ds/` prefix.

## Recommendation

Until the API and naming settle, keep releases in the `0.x` range.
