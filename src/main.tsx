import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Landing ("/") stays eager — it's the entry point. Blog is a secondary path;
// splitting it out keeps its MDX/rendering weight off the landing's bundle.
const BlogLayout = lazy(() => import('./components/BlogLayout.tsx'))
const BlogIndex = lazy(() => import('./pages/BlogIndex.tsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route element={<BlogLayout />}>
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
