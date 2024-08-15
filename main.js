import * as THREE from 'three';

let camera, scene, renderer;
let stars = [];

init();
addSphere();
render();

function init() {
  // Camera
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / document.body.scrollHeight, 1, 5000);
  camera.position.z = 5;

  // Scene
  scene = new THREE.Scene();

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, document.body.scrollHeight);
  document.getElementById('threejs-container').appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / document.body.scrollHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, document.body.scrollHeight);
}

function addSphere() {
  const depth = document.body.scrollHeight / window.innerHeight * 1000;
  for (let z = -depth; z < depth; z += 5) {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;
    sphere.position.z = z;

    scene.add(sphere);
    stars.push(sphere);
  }
}

function animateStars() {
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    star.position.z += i / 300;
    if (star.position.z > 1000) star.position.z -= 2000;
  }
}

function render() {
  requestAnimationFrame(render);
  animateStars();
  renderer.render(scene, camera);
}

$(window).scroll(function() {
  // Only apply animation for screens wider than 600px
  if (window.innerWidth > 600) {
    $('.timeline-container .content').each(function() {
      const scrollTop = $(window).scrollTop(),
            elementOffset = $(this).offset().top,
            distance = (elementOffset - scrollTop),
            windowHeight = $(window).height(),
            breakPoint = windowHeight * 0.9;

      if (distance <= breakPoint && distance >= 0) {
        $(this).removeClass("more-padding");	
      } else {
        $(this).addClass("more-padding");	
      }
    });
  } else{
    $('.timeline-container .content').each(function() {
      const scrollTop = $(window).scrollTop(),
            elementOffset = $(this).offset().top,
            distance = (elementOffset - scrollTop),
            windowHeight = $(window).height(),
            breakPoint = windowHeight * 0.9;

      if (distance <= breakPoint && distance >= 0) {
        $(this).removeClass("more-padding");	
      }
    });
  }
});

