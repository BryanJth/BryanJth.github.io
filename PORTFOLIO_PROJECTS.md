# Automatic Portfolio Project Setup

The Projects section now reads public repositories directly from the GitHub API for the `BryanJth` account.

## What happens automatically

- New public repositories automatically appear under **More GitHub Projects**.
- Forked and archived repositories are not shown.
- `BryanJth.github.io` itself is not shown.
- Repositories are sorted by their latest GitHub update.

## Featured Projects

These repositories are featured by default:

1. `PDAM-Tariff-Classification`
2. `KI-Veritas`
3. `Spatial-S.Lag_RF`
4. `Database`
5. `Spatial-GWR`

You can make any other repository featured without editing the website code by adding this GitHub topic to the repository:

`featured`

## Hide a repository

Add this GitHub topic:

`hide-from-portfolio`

The repository will disappear from both sections after the next page refresh.

## Move a default featured project to More Projects

Add this topic to the repository:

`portfolio-only`

## Descriptions and project images

The five default featured projects have curated titles, descriptions, and images in `scripts.js`.

Other repositories use their GitHub repository name, description, primary language, and topics automatically. For the best result, keep each GitHub repository's **About > Description** filled in.

## GitHub API note

The site uses GitHub's public REST API without authentication. If GitHub's anonymous rate limit is temporarily reached, the five featured projects still display from the built-in fallback data and the website links visitors to the GitHub profile for the rest.
