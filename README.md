# 📋 Kanban Task Management

<div align="center">

![Task Management](https://img.shields.io/badge/Task-Management-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css)

A modern, responsive Kanban board application built with React and TypeScript, featuring a beautiful UI powered by shadcn/ui and Tailwind CSS. Perfect for teams and individuals to manage tasks efficiently with drag-and-drop functionality, real-time updates, and responsive design.


</div>

| Desktop | Tablet | Mobile |
| ------- | ------ | ------ |
| <img width="1920" height="1237" alt="Desktop view showing full Kanban board with three columns" src="https://github.com/user-attachments/assets/3ddf2507-fb6f-47df-9989-09ac630f845d" /> | <img width="768" height="618" alt="Tablet view with responsive layout" src="https://github.com/user-attachments/assets/504f0b16-f104-4173-9798-37ef3553d6d9" /> | <img width="351" height="892" alt="Mobile view with optimized navigation" src="https://github.com/user-attachments/assets/d07ac3c8-ea4a-4c8f-be9b-37e34995027a" /> |

## ✨ Features

### 🎯 Core Functionality
- **Drag & Drop Interface**: Intuitive task management with smooth drag-and-drop between columns
- **Real-time Updates**: Instant synchronization of task changes across the board
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistent user preference
- **Search & Filter**: Advanced search functionality with multiple filter options

### 👤 User Management
- **Authentication System**: Secure login and registration with local storage
- **User Profiles**: Customizable avatars and profile management
- **Multi-user Support**: Assign tasks to different team members
- **Session Persistence**: Automatic login state management

### 📝 Task Management
- **Create & Edit Tasks**: Comprehensive task creation with rich descriptions
- **Priority Levels**: Set task priorities (Low, Medium, High, Critical)
- **Issue Types**: Categorize tasks as Bug, Feature, Enhancement, or Documentation
- **Due Dates**: Set and track task deadlines
- **Tags & Labels**: Organize tasks with customizable tags
- **Comments & Attachments**: Track task discussions and file attachments
- **Task Analytics**: Visual indicators for task progress and statistics

### 🎨 User Experience
- **Modern UI Components**: Built with shadcn/ui component library
- **Smooth Animations**: Elegant transitions and micro-interactions
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Progressive Web App**: Offline support and native app-like experience
- **Notifications**: Toast notifications for user actions and updates

## 🛠️ Tech Stack

### Frontend
- **[React 18.3.1](https://reactjs.org/)** - Modern React with hooks and concurrent features
- **[TypeScript 5.5.3](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[Vite 5.4.1](https://vitejs.dev/)** - Fast build tool and development server
- **[Tailwind CSS 3.4.11](https://tailwindcss.com/)** - Utility-first CSS framework

### UI & Components
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Utility for merging Tailwind classes

### State Management & Data
- **[TanStack Query 5.56.2](https://tanstack.com/query)** - Powerful data synchronization for React
- **[React Hook Form 7.53.0](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Zod 3.23.8](https://github.com/colinhacks/zod)** - TypeScript-first schema validation
- **[UUID](https://github.com/uuidjs/uuid)** - RFC4122 UUID generation

### Utilities & Enhancements
- **[date-fns 3.6.0](https://date-fns.org/)** - Modern JavaScript date utility library
- **[Sonner](https://sonner.emilkowal.ski/)** - Opinionated toast component for React
- **[React Router DOM 6.26.2](https://reactrouter.com/)** - Declarative routing for React
- **[Class Variance Authority](https://cva.style/docs)** - Creating variant APIs for components

### Development Tools
- **[ESLint 9.9.0](https://eslint.org/)** - Code linting and formatting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting rules
- **[PostCSS 8.4.47](https://postcss.org/)** - CSS transformation tool
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your development machine:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn** (version 1.22 or higher)
- **Git** for version control

```bash
# Check your versions
node --version
npm --version
git --version
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ayokanmi-Adejola/Task-Management.git
cd Task-Management
```

2. **Install dependencies**
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

3. **Start the development server**
```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:8081](http://localhost:8081) to see the application.

### Environment Setup

The application runs on port `8081` by default. You can modify this in the `vite.config.ts` file if needed.

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    host: "::",
    port: 8081, // Change this port if needed
  },
  // ... other config
});
```

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates an optimized production build |
| `npm run build:dev` | Creates a development build |
| `npm run lint` | Runs ESLint to check code quality |
| `npm run preview` | Preview the production build locally |

## 📁 Project Structure

```
Task-Management/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── KanbanBoard.tsx   # Main Kanban board component
│   │   ├── TaskCard.tsx      # Individual task component
│   │   └── ...
│   ├── contexts/             # React context providers
│   │   ├── AuthContext.tsx   # Authentication state
│   │   └── ThemeContext.tsx  # Theme management
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── pages/                # Page components
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Helper functions
│   └── main.tsx              # Application entry point
├── components.json           # shadcn/ui configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── vite.config.ts           # Vite build configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎯 Usage

### Creating Tasks
1. Click the "Create Task" button or "Add Task" in any column
2. Fill in the task details (title, description, priority, etc.)
3. Assign team members and set due dates
4. Click "Create" to add the task to the board

### Managing Tasks
- **Move Tasks**: Drag and drop tasks between columns (To Do, In Progress, Completed)
- **Edit Tasks**: Click on any task to open the edit dialog
- **Filter Tasks**: Use the filter button to search by status, priority, assignee, or tags
- **Delete Tasks**: Remove tasks using the delete button in the task card

### User Authentication
- Register a new account or login with existing credentials
- User sessions are persisted in local storage
- Access user settings through the profile dropdown
- Toggle between light and dark themes

## 🔧 Configuration

### Theme Customization
The application supports custom theming through CSS variables. Modify the theme in `src/index.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* Add your custom colors */
}
```

### Adding New Task Types
Extend the task types in `src/types/kanban.ts`:

```typescript
export type IssueType = 'bug' | 'feature' | 'enhancement' | 'documentation' | 'your-new-type';
```

## 🧪 Testing

Currently, the project focuses on TypeScript compilation and ESLint for code quality. To run the linter:

```bash
npm run lint
```

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deployment Options

- **Vercel**: Deploy directly from GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Docker**: Containerize the application for cloud deployment

### Example GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

### Development Workflow

1. **Fork the repository**
```bash
git clone https://github.com/your-username/Task-Management.git
cd Task-Management
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
   - Follow the existing code style and conventions
   - Add TypeScript types for new components
   - Update documentation if needed

4. **Test your changes**
```bash
npm run lint        # Check code quality
npm run build       # Ensure build works
```

5. **Commit your changes**
```bash
git commit -m "feat: add amazing feature"
```

6. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

7. **Open a Pull Request**
   - Provide a clear description of changes
   - Link any related issues
   - Add screenshots for UI changes

### Contribution Guidelines

- **Code Style**: Follow the existing TypeScript and React patterns
- **Commits**: Use conventional commit messages (feat, fix, docs, style, refactor, test, chore)
- **Documentation**: Update README.md for significant changes
- **Testing**: Ensure your changes don't break existing functionality

### Reporting Issues

When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and device information

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the comprehensive icon library
- The React and TypeScript communities for continuous innovation

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Ayokanmi-Adejola/Task-Management?style=social)
![GitHub forks](https://img.shields.io/github/forks/Ayokanmi-Adejola/Task-Management?style=social)
![GitHub issues](https://img.shields.io/github/issues/Ayokanmi-Adejola/Task-Management)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Ayokanmi-Adejola/Task-Management)
