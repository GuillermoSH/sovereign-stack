import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Analytics from './components/Analytics.tsx'
import CookieBanner from './components/CookieBanner.tsx'
import { ConsentProvider } from './components/ConsentProvider.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'

// Landing ("/") stays eager — it's the entry point. Blog is a secondary path;
// splitting it out keeps its MDX/rendering weight off the landing's bundle.
const BlogLayout = lazy(() => import('./components/BlogLayout.tsx'))
const BlogIndex = lazy(() => import('./pages/BlogIndex.tsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.tsx'))
const LegalPage = lazy(() => import('./pages/LegalPage.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConsentProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route element={<BlogLayout />}>
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/legal" element={<LegalPage kind="legal" />} />
              <Route path="/privacy" element={<LegalPage kind="privacy" />} />
              <Route path="/cookies" element={<LegalPage kind="cookies" />} />
            </Route>
          </Routes>
        </Suspense>
        <CookieBanner />
        <Analytics />
      </BrowserRouter>
    </ConsentProvider>
  </StrictMode>,
)
