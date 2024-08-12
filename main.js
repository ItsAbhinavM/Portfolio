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
    // let colorValue;

    // switch (random) {
    //   case 0:
    //   case 1:
    //   case 2:
    //   case 3:
    //     colorValue = 0x8cde0d;
    //     break;
    //   case 4:
    //   case 5:
    //   case 6:
    //     colorValue = 0x00bfff;
    //     break;
    //   case 7:
    //   case 8:
    //   case 9:
    //     colorValue = 0x8855f3;
    //     break;
    //   default:
    //     colorValue = 0x8cde0d;
    //     break;
    // }

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
