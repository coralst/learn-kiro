---
name: "github"
displayName: "GitHub"
description: "Manage GitHub pull requests, issues, and repositories directly from Kiro. Create PRs, review code, track issues, and manage repos without leaving your editor."
keywords: ["github", "pull-request", "issues", "repository", "code-review"]
author: "coralst"
---

# GitHub

## Overview

This power connects Kiro to GitHub via the official MCP server, giving you direct access to pull requests, issues, and repository management from your editor.

Key capabilities:
- Create, review, merge, and manage pull requests
- Create, search, update, and close issues
- Browse repositories, branches, and file contents
- Search code across repositories
- Manage labels, milestones, and assignees

## Onboarding

### Prerequisites

- Node.js 18+ installed
- A GitHub account
- A GitHub Personal Access Token (PAT)

### Creating a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens?type=beta (fine-grained tokens recommended)
2. Click "Generate new token"
3. Give it a descriptive name (e.g., "Kiro MCP")
4. Set expiration as needed
5. Under "Repository access", select the repos you want to work with
6. Under "Permissions", grant:
   - **Issues**: Read and write
   - **Pull requests**: Read and write
   - **Contents**: Read (and write if you need to push)
   - **Metadata**: Read-only
7. Click "Generate token" and copy it

### Setting Up Your Token

The recommended approach is to set the token as a shell environment variable so it never appears in any config file:

```bash
# Add to ~/.zshrc (macOS) or ~/.bashrc (Linux)
export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_your_token_here"
```

Then restart your terminal or run `source ~/.zshrc`.

The power's `mcp.json` references `${GITHUB_PERSONAL_ACCESS_TOKEN}` which Kiro resolves from your environment automatically.

### Verification

After installing the power and setting your token, restart Kiro. The GitHub MCP server should appear as connected in the MCP Servers panel.

## Common Workflows

### Workflow 1: Create a Pull Request

Use this when you've pushed a feature branch and want to open a PR.

**Steps:**
1. Ask Kiro: "Create a PR from `feat/my-feature` to `main` in `owner/repo`"
2. Provide a title and description
3. Optionally assign reviewers, labels, or milestones

**Example prompt:**
```
Create a pull request in owner/repo from branch feat/add-login to main.
Title: "feat: add login page"
Body: "Implements the login form with email/password authentication."
```

### Workflow 2: Review Pull Requests

Browse open PRs, read diffs, and leave comments.

**Steps:**
1. Ask Kiro: "List open PRs in `owner/repo`"
2. Pick a PR to review: "Show me PR #42 in `owner/repo`"
3. Review files changed and leave comments
4. Merge when ready: "Merge PR #42 in `owner/repo`"

**Example prompt:**
```
Show me the open pull requests in owner/repo that need review.
```

### Workflow 3: Manage Issues

Create, search, update, and close issues.

**Steps:**
1. Create: "Create an issue in `owner/repo` titled 'Bug: login fails on Safari'"
2. Search: "Find open issues labeled `bug` in `owner/repo`"
3. Update: "Add the `priority:high` label to issue #15 in `owner/repo`"
4. Close: "Close issue #15 in `owner/repo` with a comment"

**Example prompt:**
```
Create an issue in owner/repo:
Title: "Bug: profile page crashes on empty bio"
Body: "When a user has no bio set, the profile page throws a TypeError."
Labels: bug, priority:high
```

### Workflow 4: Browse Repository Contents

Explore files, branches, and commits without cloning.

**Steps:**
1. List branches: "Show branches in `owner/repo`"
2. Browse files: "List files in `owner/repo` on branch `main`"
3. Read a file: "Show me `src/index.ts` from `owner/repo`"

**Example prompt:**
```
Show me the contents of src/config.py in owner/repo on the main branch.
```

## Troubleshooting

### MCP Server Won't Connect

**Problem:** GitHub MCP server shows as disconnected
**Solutions:**
1. Verify Node.js is installed: `node --version` (need 18+)
2. Check your token is set: `echo $GITHUB_PERSONAL_ACCESS_TOKEN`
3. Restart Kiro after setting the environment variable
4. Check the MCP Servers panel for error details

### Authentication Errors (401/403)

**Problem:** "Bad credentials" or "Resource not accessible"
**Solutions:**
1. Verify your token hasn't expired at https://github.com/settings/tokens
2. Check the token has the required permissions (Issues, PRs, Contents, Metadata)
3. For fine-grained tokens, ensure the target repository is included in "Repository access"
4. Regenerate the token if needed

### Rate Limiting (429)

**Problem:** "API rate limit exceeded"
**Solutions:**
1. GitHub allows 5,000 requests/hour for authenticated users
2. Wait for the rate limit to reset (check `X-RateLimit-Reset` header)
3. Reduce frequency of bulk operations (e.g., listing all issues across many repos)

### Repository Not Found (404)

**Problem:** "Not Found" when accessing a repo
**Solutions:**
1. Verify the owner/repo format is correct (e.g., `octocat/Hello-World`)
2. For private repos, ensure your token has access to that repository
3. Check for typos in the repository name

## Best Practices

- Always use `owner/repo` format when referencing repositories
- Use fine-grained PATs over classic tokens for better security
- Set token expiration dates and rotate regularly
- Grant minimal permissions needed for your workflows
- Use labels and milestones consistently for better issue tracking

## MCP Config Placeholders

Before using this power, set the following environment variable:

- **`GITHUB_PERSONAL_ACCESS_TOKEN`**: Your GitHub Personal Access Token.
  - **How to get it:**
    1. Go to https://github.com/settings/tokens?type=beta
    2. Click "Generate new token"
    3. Configure permissions (Issues, PRs, Contents, Metadata)
    4. Copy the generated token
    5. Add to your shell profile: `export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_..."`

---

**Package:** `@modelcontextprotocol/server-github`
**MCP Server:** github
