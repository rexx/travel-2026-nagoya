# AGENTS

## Plan Mode

- In plan mode, always develop in a new git worktree and never modify the current directory directly.
- Every plan must begin by explicitly stating that development will use a new git worktree and will not modify the current directory.
- If a worktree has not been created yet, the plan must list worktree creation steps before implementation, testing, and validation steps.
- All worktrees must be created under `worktrees/<branch-or-task-name>` inside the current repository.
- For this repository, the valid worktree path pattern is `/Users/gtso/Downloads/ai-studio/travel-2026-nagoya/worktrees/<branch-or-task-name>`.
- In a worktree, symlink `node_modules` from the main repo instead of downloading dependencies again.
- After development is complete, start a local server and test the changes.

## Commit Messages

- Follow Conventional Commits for the subject line, for example: `feat: Add GitHub Pages deployment workflow`
- Include a commit body for non-trivial changes
- Keep the subject concise and imperative
- Use the body to summarize the key changes in 1-2 short sentences
