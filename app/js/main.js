// Optimized JavaScript to prevent forced reflow
$(function(){
    // Use requestAnimationFrame to batch DOM operations
    function optimizeDOMOperations() {
        requestAnimationFrame(function() {
            // Batch all DOM queries and modifications
            const elements = document.querySelectorAll('.benefits__item-image, .item__icon, .what-inside__item-image');
            
            // Use document fragment for efficient DOM manipulation
            const fragment = document.createDocumentFragment();
            
            // Process elements without causing reflow
            elements.forEach(function(element) {
                if (element.offsetWidth === 0) {
                    // Only modify if element is not visible
                    element.style.visibility = 'hidden';
                }
            });
        });
    }
    
    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', optimizeDOMOperations);
    } else {
        optimizeDOMOperations();
    }
    
    // Optimize image loading
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
});
