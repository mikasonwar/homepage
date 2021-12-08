import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { MeshBasicMaterial } from 'three';

// Fix pdf reference
import cvPdf from './documents/cv.pdf';
document.getElementById('cv-pdf').href = cvPdf;

// Import textures
import berserkSrc from './textures/berserk.jpg';
import chainsawManSrc from './textures/chainsaw_man.jpg';
import evangelionSrc from './textures/evangelion.jpg';
import cowboyBebopSrc from './textures/cowboy_bebop.jpg';
import jojoSrc from './textures/jojo.jpg';
import floorSrc from './textures/floor.jpg';
import ceilingSrc from './textures/ceiling.jpg';

const DEBUG = false;
const HALL_DEPTH = 65;
const HALL_WIDTH = 20;

let controls;
let stats;

// Initial setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.outputEncoding = THREE.sRGBEncoding;
camera.position.set(0, 5, - 15);
renderer.render(scene, camera);


// Lights

RectAreaLightUniformsLib.init();

const rectLight1 = new THREE.RectAreaLight( 0xff0000, 5, 4, 10 );
rectLight1.position.set( - 5, 5, 5 );
scene.add( rectLight1 );

const rectLight2 = new THREE.RectAreaLight( 0x00ff00, 5, 4, 10 );
rectLight2.position.set( 0, 5, 5 );
scene.add( rectLight2 );

const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 5, 4, 10 );
rectLight3.position.set( 5, 5, 5 );
scene.add( rectLight3 );

scene.add( new RectAreaLightHelper( rectLight1 ) );
scene.add( new RectAreaLightHelper( rectLight2 ) );
scene.add( new RectAreaLightHelper( rectLight3 ) );

// Floor

const floorTexture = new THREE.TextureLoader().load(floorSrc, (texture) => {
  texture.rotation = Math.PI / 2;
  texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
  // texture.
});

const geoFloor = new THREE.BoxGeometry( HALL_WIDTH, 0.1, HALL_DEPTH );
const matStdFloor = new THREE.MeshStandardMaterial( { map: floorTexture, roughness: 0.5, metalness: 0 } );
const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
mshStdFloor.position.z = - geoFloor.parameters.depth / 2 + 5;
scene.add( mshStdFloor );

// Ceiling

const ceilingTexture = new THREE.TextureLoader().load(ceilingSrc, (texture) => {
  //texture.rotation = Math.PI / 2;
  texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
  // texture.
})

const matStdCeiling = new THREE.MeshStandardMaterial( { map: ceilingTexture, roughness: 1, metalness: 0 } );
const mshStdCeiling = new THREE.Mesh( geoFloor, matStdCeiling );
mshStdCeiling.position.y = 12;
mshStdCeiling.position.z = - geoFloor.parameters.depth / 2 + 5;
scene.add( mshStdCeiling );

// Walls

const wall_distance = HALL_WIDTH / 2;

const geoWall = new THREE.BoxGeometry( 0.1, 12, HALL_DEPTH );
const matStdWall = new THREE.MeshStandardMaterial( { color: 0x3152a1, roughness: 0.5, metalness: 0 } );
const mshStdLeftWall = new THREE.Mesh( geoWall, matStdWall );
mshStdLeftWall.position.set(- wall_distance, geoWall.parameters.height / 2, - geoWall.parameters.depth / 2 + 5);

const mshStdRightWall = new THREE.Mesh( geoWall, matStdWall );
mshStdRightWall.position.set(wall_distance, geoWall.parameters.height / 2, - geoWall.parameters.depth / 2 + 5);

let walls = [mshStdLeftWall, mshStdRightWall];

scene.add(...walls);

// Add wall-floor protections (i forgot the name and can't seem to google-fu it)

const addWallFloorProtection = (wall) => {

  let geoProtection = new THREE.BoxGeometry(1, 1, wall.geometry.parameters.depth);
  let matProtection = new THREE.MeshStandardMaterial({ color: 0x704733, roughness: 0.5, metalness: 0 });
  let mshProtection = new THREE.Mesh(geoProtection, matProtection);
  mshProtection.position.copy(wall.position);
  mshProtection.position.y = geoProtection.parameters.height / 2;

  scene.add(mshProtection);
}
walls.forEach(addWallFloorProtection);

// Backwall

const geoBackWall = new THREE.BoxGeometry(HALL_WIDTH, 12, 0.01);
const mshStdBackWall = new THREE.Mesh(geoBackWall, matStdWall);
mshStdBackWall.position.z = 5.05;
mshStdBackWall.position.y = geoBackWall.parameters.height / 2;

scene.add(mshStdBackWall);

// Torus Knot

const geometry = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
// const material = new THREE.MeshToonMaterial( { color: 0xffffff, depthTest: false, gradientMap: 'threeTone' } );
const material = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0.1, metalness: 0.2 } );
const torusKnot = new THREE.Mesh( geometry, material );
torusKnot.position.set(0, 5, 0);
scene.add(torusKnot);

camera.lookAt(torusKnot.position);

// Paintings

const paintGeometry = new THREE.BoxGeometry( 0.1, 8, 8 );
const berserkTexture = new THREE.TextureLoader().load(berserkSrc);
const evangelionTexture = new THREE.TextureLoader().load(evangelionSrc);
const chainsawManTexture = new THREE.TextureLoader().load(chainsawManSrc);
const jojoTexture = new THREE.TextureLoader().load(jojoSrc);
const cowboyBebopTexture = new THREE.TextureLoader().load(cowboyBebopSrc);

const berserkPainting = new THREE.Mesh( paintGeometry, new THREE.MeshStandardMaterial({ map: berserkTexture, roughness: 0.7 }) );
berserkPainting.position.set(9.9, 6.5, - 10);

const evangelionPainting = new THREE.Mesh( paintGeometry, new THREE.MeshStandardMaterial({ map: evangelionTexture, roughness: 0.7 }) );
evangelionPainting.position.set( - 9.9, 6.5, - 20);

const chainsawManPainting = new THREE.Mesh( paintGeometry, new THREE.MeshStandardMaterial({ map: chainsawManTexture, roughness: 0.7 }) );
chainsawManPainting.position.set(9.9, 6.5, - 30);

const jojoPainting = new THREE.Mesh( paintGeometry, new THREE.MeshStandardMaterial({ map: jojoTexture, roughness: 0.7 }) );
jojoPainting.position.set( - 9.9, 6.5, - 40);

const cowboyBebopPainting = new THREE.Mesh( paintGeometry, new THREE.MeshStandardMaterial({ map: cowboyBebopTexture, roughness: 0.7 }) );
cowboyBebopPainting.position.set(9.9, 6.5, - 50);

let paintings = [berserkPainting, evangelionPainting, chainsawManPainting, jojoPainting, cowboyBebopPainting];

scene.add(...paintings);

// Spotlights

const generateSpotlightForPainting = (painting) => {
  let spotlight = new THREE.SpotLight( 0xffffff, 0.07, 100, -1, 1, 10);
  // spotlight.lookAt(cowboyBebopPainting.position);
  let paint_light_x = painting.position.x + (painting.position.x < 0 ? 3 : -3);
  spotlight.position.set(paint_light_x, 12, painting.position.z);
  spotlight.target = painting;
  scene.add( spotlight );
}
paintings.forEach(generateSpotlightForPainting);



if(DEBUG) {
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(gridHelper);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(torusKnot.position);
  controls.update();
  stats = new Stats();
  document.body.appendChild( stats.dom );
  // controls.enableDamping = true;
  // controls.dampingFactor = 0.25;
  // controls.enableZoom = true;
  const axesHelper = new THREE.AxesHelper( 10 );
  scene.add( axesHelper );
}

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * 0.01 - 15;
  // camera.position.x = t * -0.0002;
  // camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate(time) {
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // moon.rotation.x += 0.005;

  torusKnot.rotation.y = time / 1000;
  if(DEBUG) {
    controls.update();
    stats.update();
  } else {
    camera.position.x = Math.sin(time / 1000);
  }  

  renderer.render(scene, camera);
}

function onWindowResize() {

  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = ( window.innerWidth / window.innerHeight );
  camera.updateProjectionMatrix();

}
window.onresize = onWindowResize;

if(DEBUG) {
  document.getElementById('main').remove();
  ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
  ambientLight.position.set(0, 0, 0);
  scene.add( ambientLight );
}