#!/usr/bin/env ts-node
/**
 * Fetches repository contributors from the GitHub API and writes contributors.json.
 * Intended to run in CI on release (see .github/workflows/release.yml).
 *
 * Required env:
 *   GITHUB_REPOSITORY — owner/repo (set automatically in GitHub Actions)
 *
 * Optional env:
 *   GITHUB_TOKEN — increases API rate limits; required for private repos
 *   CONTRIBUTORS_OUTPUT — output path (default: contributors.json)
 */

import fs from 'fs';
import path from 'path';

interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

interface ContributorEntry {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
}

interface ContributorsFile {
  repository: string;
  updatedAt: string;
  contributors: ContributorEntry[];
}

function getRepository(): string {
  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    throw new Error('GITHUB_REPOSITORY environment variable is required (e.g. owner/repo)');
  }

  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) {
    throw new Error(`Invalid GITHUB_REPOSITORY format: ${repository}`);
  }

  return repository;
}

function getOutputPath(): string {
  return process.env.CONTRIBUTORS_OUTPUT ?? path.join(process.cwd(), 'contributors.json');
}

function getAuthHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'next-service-pages-contributors-script',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function fetchContributorsPage(
  repository: string,
  page: number,
): Promise<GitHubContributor[]> {
  const url = `https://api.github.com/repos/${repository}/contributors?per_page=100&page=${page}`;
  const response = await fetch(url, { headers: getAuthHeaders() });

  if (response.status === 404) {
    throw new Error(`Repository not found: ${repository}`);
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API error ${response.status}: ${body}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Unexpected GitHub API response format');
  }

  return data.filter(isGitHubContributor);
}

function isGitHubContributor(value: unknown): value is GitHubContributor {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.login === 'string' &&
    typeof record.avatar_url === 'string' &&
    typeof record.html_url === 'string' &&
    typeof record.contributions === 'number'
  );
}

async function fetchAllContributors(repository: string): Promise<ContributorEntry[]> {
  const contributors: ContributorEntry[] = [];
  let page = 1;

  while (true) {
    const batch = await fetchContributorsPage(repository, page);

    if (batch.length === 0) {
      break;
    }

    for (const contributor of batch) {
      contributors.push({
        login: contributor.login,
        avatarUrl: contributor.avatar_url,
        profileUrl: contributor.html_url,
        contributions: contributor.contributions,
      });
    }

    if (batch.length < 100) {
      break;
    }

    page += 1;
  }

  return contributors.sort((a, b) => b.contributions - a.contributions);
}

function writeContributorsFile(outputPath: string, payload: ContributorsFile): void {
  fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

async function main(): Promise<void> {
  const repository = getRepository();
  const outputPath = getOutputPath();

  console.log(`Fetching contributors for ${repository}...`);

  const contributors = await fetchAllContributors(repository);

  const payload: ContributorsFile = {
    repository,
    updatedAt: new Date().toISOString(),
    contributors,
  };

  writeContributorsFile(outputPath, payload);

  console.log(`Wrote ${contributors.length} contributor(s) to ${outputPath}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error(`Failed to update contributors: ${message}`);
  process.exit(1);
});
