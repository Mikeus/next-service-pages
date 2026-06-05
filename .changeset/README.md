# Changesets

This repository uses [Changesets](https://github.com/changesets/changesets) to manage versions and changelogs.

## Adding a changeset

When your PR includes a user-facing change, run:

```bash
npx changeset
```

Select the bump type (patch/minor/major), write a summary, and commit the generated file in `.changeset/`.

## Release flow

1. Changesets accumulate on `main`
2. The Release workflow opens a "Version Packages" PR
3. Merging that PR bumps versions, updates `CHANGELOG.md`, and creates a GitHub release
