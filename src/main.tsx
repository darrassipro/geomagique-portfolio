import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/themes.css' // Add this line before index.css
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
