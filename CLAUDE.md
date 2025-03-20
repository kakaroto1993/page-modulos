# CLAUDE.md - Web Portfolio Project Guide

## Commands
- Run site: Open index.html with browser or use local server (`python -m http.server`)
- Validate HTML: Use W3C validation service
- Validate CSS: Use CSS Lint
- Validate JS: Use ESLint with browser environment

## Code Style Guidelines
- HTML: Semantic elements, component-based architecture
- CSS: BEM naming convention, kebab-case for classes
- JS: Revealing Module Pattern, camelCase variables/functions
- Components: Each in separate HTML file, loaded by component-loader.js

## Naming Conventions
- HTML components: kebab-case (hero-section.html)
- CSS classes: kebab-case (.hero-section)
- JS modules: PascalCase for exports (DarkMode)
- JS variables/functions: camelCase (toggleDarkMode)

## Error Handling
- Check element existence before DOM operations
- Use try/catch for fetching components
- Fallback gracefully with console errors
- Defensive initialization in modules

## Development Workflow
- Edit component HTML in /components directory
- Style components in /css/components
- Add JS functionality in /js/modules
- Register new components in component-loader.js