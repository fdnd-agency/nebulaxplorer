import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { createSelectionHighlight } from './SelectionHighlight.js';

// Educational cutaway: illustrates the supplied two-reflection reference.
// Dimensions/angles are illustrative, not an optical prescription or ray trace.
export function createOptics(scene) {
 const root = new THREE.Group(); root.name = 'WolterExplanation'; root.visible = false;
 const rays = new THREE.Group(); const markers = []; const paths = [];
 const shellMaterial = new THREE.MeshStandardMaterial({color:0xbad3e7,metalness:.25,roughness:.45,side:THREE.DoubleSide});
 for (const radius of [.48,.63,.78]) {
  const profile=[new THREE.Vector2(radius*1.03,1),new THREE.Vector2(radius,.45),new THREE.Vector2(radius*.92,-.2),new THREE.Vector2(radius*.87,-.55)];
  for (const [points,component] of [[profile.slice(0,3),'primary'],[profile.slice(2),'secondary']]) {
   const shell=new THREE.Mesh(new THREE.LatheGeometry(points,48,Math.PI/2,Math.PI),shellMaterial);shell.userData.component=component;root.add(shell);
  }
  for (const sign of [-1,1]) {
   const points=[new THREE.Vector3(sign*radius,1.7,0),new THREE.Vector3(sign*radius,.45,0),new THREE.Vector3(sign*radius*.92,-.2,0),new THREE.Vector3(0,-2.5,0)];
   const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0xffdb67}));line.userData.component="rays";rays.add(line);paths.push(points);
    const marker=new THREE.Mesh(new THREE.SphereGeometry(.026,8,6),new THREE.MeshBasicMaterial({color:0xfff5b1}));marker.userData.component="rays";rays.add(marker);markers.push(marker);
  }
 }
 const detector=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.05,32),new THREE.MeshStandardMaterial({color:0x75c8ff,emissive:0x155577,roughness:.45}));detector.userData.component="detector";detector.position.y=-2.5;root.add(detector);
 const tube=new THREE.Mesh(new THREE.CylinderGeometry(.2,.25,.6,32,1,true,Math.PI/2,Math.PI),shellMaterial);tube.userData.component="tube";tube.position.y=-2.02;root.add(tube);
 root.add(rays);scene.add(root);
 const selection=createSelectionHighlight(root,{ghostOpacity:.16});
 const selectableMeshes=component=>{const meshes=[];root.traverse(object=>{if((object.isMesh||object.isLine)&&object.userData.component===component)meshes.push(object);});return meshes;};
 let playing=false;
 return {root,show(showRays=false){selection.clear();root.visible=true;rays.visible=showRays;playing=false;this.update(0);},hide(){selection.clear();root.visible=false;playing=false;},select(component){selection.apply(selectableMeshes(component));},clearSelection(){selection.clear();},setPlaying(value){playing=value;},isAnimating(){return root.visible&&rays.visible&&playing;},update(time){
  markers.forEach((marker,i)=>{const progress=(time/1800+i*.13)%1;const points=paths[i];const lengths=points.slice(1).map((p,j)=>p.distanceTo(points[j]));let distance=progress*lengths.reduce((a,b)=>a+b,0);let segment=0;while(segment<lengths.length-1&&distance>lengths[segment])distance-=lengths[segment++];marker.position.lerpVectors(points[segment],points[segment+1],distance/lengths[segment]);});
 }};
}

const partUrls={fpm:new URL('../../assets/cad/fpm.glb',import.meta.url).href,fpcm:new URL('../../assets/cad/fpcm.glb',import.meta.url).href,primary:new URL('../../assets/cad/primary.glb',import.meta.url).href,secondary:new URL('../../assets/cad/secondary.glb',import.meta.url).href};
export function createPartViewer(scene) {
 const cache=new Map();const highlights=new Map();let active=null;
 const getHighlight=root=>{if(!highlights.has(root))highlights.set(root,createSelectionHighlight(root,{ghostOpacity:.16}));return highlights.get(root);};
 return {getActive(){return active;},hide(){if(active){highlights.get(active)?.clear();active.visible=false;}},async load(key){
  if(!partUrls[key])throw new Error('Unknown CAD part');
  if(!cache.has(key)){const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);cache.set(key,loader.loadAsync(partUrls[key]).then(gltf=>{const root=gltf.scene;root.visible=false;scene.add(root);getHighlight(root);return root;}).catch(error=>{cache.delete(key);throw error;}));}
  return cache.get(key);
 },show(root){this.hide();active=root;root.visible=true;},highlight(meshes){if(active)getHighlight(active).apply(meshes);},highlightAll(){if(!active)return;const meshes=[];active.traverse(object=>{if(object.isMesh)meshes.push(object);});getHighlight(active).apply(meshes);},clearSelection(){if(active)highlights.get(active)?.clear();}};
}
