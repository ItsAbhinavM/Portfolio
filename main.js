import * as THREE from 'three';

let camera, scene, renderer;
let stars = [];

init();
addSphere();
render();

function init() {
  // Camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 5;

  // Scene
  scene = new THREE.Scene();

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('threejs-container').appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);
}

function addSphere() {
  for (let z = -1000; z < 1000; z += 6) {
    const random = +(Math.random() * 10).toFixed(0);

    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 'oxffffff' });
    const sphere = new THREE.Mesh(geometry, material);
    const sphere1 = new THREE.Mesh(geometry, material);

    sphere.position.x = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;

    sphere1.position.x = Math.random() * 1000 - 500;
    sphere1.position.y = Math.random() * 1000 - 500;

    sphere.position.z = z;
    sphere1.position.z = z;

    sphere.scale.x = sphere.scale.y = 1;
    sphere1.scale.x = sphere1.scale.y = 1;

    scene.add(sphere);
    scene.add(sphere1);

    stars.push(sphere);
    stars.push(sphere1);
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
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
$(window).scroll(function(){				 
	$('.timeline-container .content').each(function(){
    	var scrollTop     = $(window).scrollTop(),
        	elementOffset = $(this).offset().top,
       		distance      = (elementOffset - scrollTop),
			    windowHeight  = $(window).height(),
			    breakPoint    = windowHeight*0.9;

			if(distance > breakPoint) {
				$(this).addClass("more-padding");	
			}  if(distance < breakPoint) {
				$(this).removeClass("more-padding");	
			}
	});
});

