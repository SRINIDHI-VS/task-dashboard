# TaskMaster - AI-Powered Task Management Dashboard

A modern, production-ready task management application with AI integration, dark mode, and smooth animations.

## 🚀 Features

### Core Features
- ✅ **Full CRUD Operations**: Create, Read, Update, Delete tasks
- 🔍 **Advanced Filtering**: Filter by status and search by title
- 📅 **Smart Sorting**: Sort tasks by due date (ascending/descending)
- 💾 **Persistent Storage**: Tasks saved in localStorage
- 📊 **Live Dashboard**: Real-time task statistics and summaries

### AI Integration
- 🤖 **AI Assistant**: Powered by Claude AI for natural language task creation
- 💬 **Smart Suggestions**: Get productivity tips and task recommendations
- ⚡ **Quick Task Creation**: "Create a task to finish project by Friday"

### Modern UI/UX
- 🌓 **Dark/Light Mode**: Seamless theme switching
- 🎨 **Smooth Animations**: Fade-ins, slide-ups, and transitions
- 📱 **Fully Responsive**: Works on mobile, tablet, and desktop
- 🎯 **Modern Design**: Glassmorphism, gradients, and clean layouts

## 📁 Project Structure

```
taskmaster-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── Components/
│   │   ├── AIAssistant.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Navigation.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskSummary.jsx
│   ├── context/
│   │   ├── TaskContext.jsx
│   │   └── taskReducer.js
│   ├── pages/
│   │   ├── AllTasks.jsx
│   │   └── CompletedTasks.jsx
│   ├── utils/
│   │   └── validators.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone or create the project:**
```bash
npx create-react-app taskmaster-dashboard
cd taskmaster-dashboard
```

2. **Install dependencies:**
```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
```

3. **Initialize Tailwind CSS:**
```bash
npx tailwindcss init -p
```

4. **Copy all the files** from the provided code into their respective locations according to the project structure above.

5. **Start the development server:**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🎯 Usage

### Creating Tasks
1. Click the **"New Task"** button
2. Fill in the title (required) and due date (required)
3. Optionally add description and set status
4. Click **"Create"**

### Using AI Assistant
1. Click the **purple gradient button** (bottom-right corner)
2. Type natural language requests like:
   - "Create a task to review code by tomorrow"
   - "Add a task for team meeting on Friday"
   - "Help me prioritize my tasks"
3. AI will create tasks or provide suggestions

### Filtering & Searching
- Use the **search bar** to find tasks by title
- Select **status filter** to view specific task types
- Choose **sort order** to organize by due date

### Theme Switching
- Click the **moon/sun icon** in the navigation to toggle dark mode

## 🔑 Key Technologies

- **React 18**: Modern React with hooks
- **Context API**: State management without Redux
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icon library
- **Claude AI API**: AI-powered assistance
- **LocalStorage**: Client-side data persistence

## 📋 Task Properties

Each task has the following properties:
- `id`: Unique identifier (timestamp)
- `title`: Task name (required)
- `description`: Optional details
- `status`: Pending | In Progress | Completed
- `dueDate`: Date string (required)

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize colors:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    },
  },
}
```

### Animations
Modify animations in `App.css`:
```css
@keyframes yourAnimation {
  /* your keyframes */
}
```

## 🚀 Production Build

Create an optimized production build:
```bash
npm run build
```

The build folder will contain optimized static files ready for deployment.

## 📦 Deployment

Deploy to popular platforms:

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the build folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io/taskmaster-dashboard",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

npm run deploy
```

## 🔒 Security Note

The AI Assistant uses the Anthropic API. In production:
- Store API keys in environment variables
- Use backend proxy for API calls
- Implement rate limiting

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📧 Support

For issues or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using React and AI**