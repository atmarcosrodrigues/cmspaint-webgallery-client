import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CreateCategory } from './pages/CreateCategory';
import { CategoryPage } from './pages/CategoryPage';
import { PostImage } from './pages/PostImage';

/**
 * Main Application
 * @returns a template html with all routes avaliables in webgallery application
 */

function App() {
 /**
   * Constant meta defines the info to meta html tag
   */
  const meta = {
    title: 'Paint Online Web Gallery',
    description: 'Web Application web gallery to store online drawings from MSPaint mobile app',
    canonical: 'http://alpha-technology.appspot.com',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'paint,gallery,drawing'
      }
    }
  };
  return (

    <div className="App">
      <DocumentMeta {...meta} />

        <Router>
          <AuthContextProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/categories/:id" element={<CategoryPage />} />
                <Route path="/categories/new" element={<CreateCategory />} />
                <Route path="/images/new" element={<PostImage />} />
            </Routes>
          </AuthContextProvider>

        </Router>
      
    </div>
  );
}

export default App;
