'use client';

import { useEffect } from 'react';

/**
 * Client Component to enhance external links with target="_blank"
 * This is progressive enhancement - works even if JS is disabled
 */
const ExternalLinksEnhancer = () => {
  useEffect(() => {
    // Add target="_blank" to external links (progressive enhancement)
    const links = document.querySelectorAll('.blog-content a[href^="http"]');
    links.forEach((link) => {
      const anchor = link as HTMLAnchorElement;
      if (anchor.hostname !== window.location.hostname) {
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }, []);

  return null; // This component doesn't render anything
};

export default ExternalLinksEnhancer;
