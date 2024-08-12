window.addEventListener('scroll', function() {
  const splineViewer = document.querySelector('spline-viewer');
  const scrollPosition = window.scrollY;
  
  // Adjust the parallax speed by changing the multiplier (e.g., 0.5 for a slower effect)
  splineViewer.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});
