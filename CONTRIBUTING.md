# Contributing to next-service-pages

Thank you for helping improve a starter kit used by agencies and freelancers building local service business websites. This guide covers local setup, the PR process, and how we label issues.

## Code of conduct

Be respectful and constructive. We are building developer tooling — focus on clarity, production patterns, and maintainability.

## Local setup

1. **Fork and clone** the repository:

   ```bash
   git clone https://github.com/your-username/next-service-pages.git
   cd next-service-pages
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   Husky pre-commit hooks are installed automatically via the `prepare` script.

3. **Start the dev server:**

   ```bash
   npm run dev
   ```

4. **Verify your changes** before opening a PR:

   ```bash
   npm run typecheck
   npm run lint
   npm run test
   npm run build
   ```

## Development guidelines

- **TypeScript strict** — All new code must pass `npm run typecheck` with zero errors.
- **Minimal scope** — Keep PRs focused. One feature or fix per PR when possible.
- **Match conventions** — Follow existing file structure, naming, and import patterns (`@/` path alias).
- **No UI in infra PRs** — Scaffolding, config, and tooling changes should not include unrelated UI work.
- **Document breaking changes** — Update `CHANGELOG.md` under `[Unreleased]` for user-facing changes.

## Pull request process

1. Create a feature branch from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes and commit. Pre-commit hooks run ESLint and Prettier via lint-staged.

3. Push your branch and open a PR against `main`.

4. Fill out the [pull request template](./.github/PULL_REQUEST_TEMPLATE.md) completely.

5. Ensure CI passes (typecheck + lint).

6. Request review. Maintainers may ask for changes before merging.

### PR title format

Use conventional prefixes:

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation only
- `chore:` — Tooling, deps, CI
- `refactor:` — Code change without behavior change

Example: `feat: add JSON-LD helper for city pages`

## Issue labels

| Label | Description |
|---|---|
| `bug` | Something is broken |
| `enhancement` | New feature or improvement |
| `documentation` | Docs only |
| `good first issue` | Small, well-scoped starter task |
| `help wanted` | Maintainer welcomes community PRs |
| `phase-1` | Scaffolding & config |
| `phase-2` | UI components |
| `phase-3` | AI & content automation |
| `phase-4` | Booking integrations |

## Reporting bugs

Use the [bug report template](./.github/ISSUE_TEMPLATE/bug_report.md). Include steps to reproduce, expected vs actual behavior, and your Node.js version.

## Requesting features

Use the [feature request template](./.github/ISSUE_TEMPLATE/feature_request.md). Describe the agency/freelancer workflow the feature supports and any alternatives you considered.

## Questions

Open a [GitHub Discussion](https://github.com/your-org/next-service-pages/discussions) or issue with the `question` label.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
