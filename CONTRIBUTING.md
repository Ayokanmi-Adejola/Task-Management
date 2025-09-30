# 🤝 Contributing to Kanban Task Management

Thank you for your interest in contributing to our Kanban Task Management application! We welcome contributions from the community and appreciate your efforts to make this project better.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Development Setup](#development-setup)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. We expect all contributors to:

- Be respectful and considerate in communication
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** or **bun** package manager
- **Git** for version control

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
```bash
git clone https://github.com/your-username/Task-Management.git
cd Task-Management
```

3. **Add upstream remote**:
```bash
git remote add upstream https://github.com/Ayokanmi-Adejola/Task-Management.git
```

## 🔄 Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:
```bash
git checkout -b feature/amazing-feature
```

Branch naming conventions:
- `feature/` - for new features
- `fix/` - for bug fixes
- `docs/` - for documentation changes
- `refactor/` - for code refactoring
- `style/` - for styling changes
- `test/` - for test additions or modifications

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

This will start the development server at `http://localhost:5173/`

### 4. Make Your Changes

- Follow the existing code style and conventions
- Add TypeScript types for new components and functions
- Keep components focused and modular
- Update documentation if needed
- Ensure your changes are responsive (mobile, tablet, desktop)

### 5. Test Your Changes

Before committing, ensure your code passes all checks:

```bash
# Check code quality
npm run lint

# Build to ensure no compilation errors
npm run build

# Preview the production build
npm run preview
```

### 6. Commit Your Changes

Write clear, descriptive commit messages following our [commit convention](#commit-message-convention):

```bash
git add .
git commit -m "feat: add amazing feature"
```

### 7. Keep Your Branch Updated

Regularly sync with the upstream repository:

```bash
git fetch upstream
git rebase upstream/main
```

### 8. Push to Your Fork

```bash
git push origin feature/amazing-feature
```

### 9. Open a Pull Request

- Go to the original repository on GitHub
- Click "New Pull Request"
- Select your fork and branch
- Provide a clear description of changes
- Link any related issues
- Add screenshots for UI changes

## 🎨 Code Style Guidelines

### TypeScript & React

- **TypeScript**: Always use TypeScript for type safety
- **Functional Components**: Use functional components with hooks
- **Type Definitions**: Define proper interfaces and types in `src/types/`
- **Props Validation**: Use TypeScript interfaces for component props
- **Naming Conventions**: 
  - Components: PascalCase (e.g., `TaskCard.tsx`)
  - Functions: camelCase (e.g., `handleSubmit`)
  - Constants: UPPER_SNAKE_CASE (e.g., `DEFAULT_COLUMNS`)

### Code Organization

```
src/
├── components/        # Reusable UI components
├── contexts/          # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and helpers
├── pages/            # Page components
└── types/            # TypeScript type definitions
```

### Styling

- Use **Tailwind CSS** utility classes
- Follow **shadcn/ui** component patterns
- Maintain **responsive design** with mobile-first approach
- Use **CSS variables** for theming in `src/index.css`

### Best Practices

- Keep functions small and focused (single responsibility)
- Avoid deeply nested components
- Use meaningful variable and function names
- Add comments for complex logic
- Handle loading and error states
- Ensure accessibility (ARIA labels, keyboard navigation)

## 📝 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

### Examples

```bash
feat: add task priority filter
fix: resolve drag-and-drop issue on mobile
docs: update installation instructions
style: format code with prettier
refactor: simplify task card component
perf: optimize task list rendering
test: add unit tests for task operations
chore: update dependencies
```

### Scope (Optional)

You can specify the scope of your changes:
```bash
feat(kanban): add swimlane view
fix(auth): resolve login redirect issue
docs(readme): add deployment section
```

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Code builds without errors (`npm run build`)
- [ ] Linter passes without errors (`npm run lint`)
- [ ] Changes are responsive across devices
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow convention

### PR Description Template

```markdown
## Description
Brief description of changes made

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- List of changes
- Another change

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #123
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be acknowledged in release notes

## 🐛 Reporting Issues

When reporting bugs or requesting features, please use the GitHub Issues tab.

### Bug Reports

Include the following information:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the problem
  1. Go to '...'
  2. Click on '...'
  3. See error
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**:
  - Browser and version
  - Operating system
  - Device type (Desktop/Tablet/Mobile)
  - Screen size

### Feature Requests

- **Description**: Clear description of the proposed feature
- **Use Case**: Explain why this feature would be useful
- **Proposed Solution**: If you have ideas on implementation
- **Alternatives**: Any alternative solutions you've considered

## 🛠️ Development Setup

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates an optimized production build |
| `npm run build:dev` | Creates a development build |
| `npm run lint` | Runs ESLint to check code quality |
| `npm run preview` | Preview the production build locally |

### Project Structure

```
Task-Management/
├── public/                   # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── KanbanBoard.tsx # Main kanban board
│   │   ├── TaskCard.tsx    # Task card component
│   │   └── ...
│   ├── contexts/            # React contexts
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities
│   ├── pages/              # Page components
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── vite.config.ts          # Vite build configuration
└── tsconfig.json           # TypeScript configuration
```

### Tech Stack

- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 3.4.11** - Styling
- **shadcn/ui** - Component library
- **Radix UI** - Accessible primitives
- **TanStack Query** - Data synchronization
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 🧪 Testing Guidelines

Currently, the project focuses on:
- **TypeScript compilation** for type checking
- **ESLint** for code quality and consistency

Before submitting a PR:
1. Run `npm run lint` to check for linting errors
2. Run `npm run build` to ensure the project builds successfully
3. Manually test your changes in the browser
4. Test responsive behavior on different screen sizes

## 📚 Documentation

### When to Update Documentation

Update documentation when you:
- Add new features
- Change existing functionality
- Modify configuration options
- Add new dependencies
- Change the project structure

### Documentation Locations

- **README.md**: Overview, features, quick start
- **CONTRIBUTING.md**: Contribution guidelines (this file)
- **Code Comments**: Complex logic, type definitions
- **JSDoc**: Function and component documentation

## 🎯 Areas for Contribution

We welcome contributions in the following areas:

- **Features**: New task management capabilities
- **UI/UX**: Design improvements and accessibility
- **Performance**: Optimization and code improvements
- **Documentation**: Guides, examples, and tutorials
- **Bug Fixes**: Resolving reported issues
- **Testing**: Adding test coverage
- **Localization**: Multi-language support

## 💡 Need Help?

- Check existing [Issues](https://github.com/Ayokanmi-Adejola/Task-Management/issues)
- Review [Pull Requests](https://github.com/Ayokanmi-Adejola/Task-Management/pulls)
- Read the [README](README.md)
- Reach out to maintainers

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Contributing!** 🚀

For questions or discussions, feel free to open an issue or reach out to the maintainers.
