import { useEffect } from 'react';

export default function LoadingScreen() {
  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.querySelector('.loading-bar');
    
    if (loadingScreen && loadingBar) {
      // Simulate loading progress
      setTimeout(() => {
        loadingBar.style.width = '100%';
      }, 100);

      // Hide screen after progress finishes
      const timer = setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}