# AGENTS

## Plan Mode

- In plan mode, always develop in a git worktree.
- In a worktree, symlink `node_modules` from the main repo instead of downloading dependencies again.
- After development is complete, start a local server and test the changes.

## Commit Messages

- Follow Conventional Commits for the subject line, for example: `feat: Add GitHub Pages deployment workflow`
- Include a commit body for non-trivial changes
- Keep the subject concise and imperative
- Use the body to summarize the key changes in 1-2 short sentences
