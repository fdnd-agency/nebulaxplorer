import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {loadSatellite,loadInstrument,getSatellite,getComponentFocus,getSelectableComponentMeshes,getComponentFromObject,highlightComponent,showSatelliteInterior,showSatellite,showInstrument,getCurrentView} from './src/components/objects/Satellite.js';
import {showInstrumentInterior} from './src/components/objects/Satellite.js';
import {createInstrumentComponents} from './src/components/objects/InstrumentComponents.js';
import {updateCamera} from './src/scripts/updateCamera.js';
globalThis.ProgressEvent=class {constructor(type,init){Object.assign(this,init)}};
globalThis.self=globalThis;
const nativeFetch=globalThis.fetch;
globalThis.fetch=async (request)=>{const url=typeof request==='string'?request:request.url;if(url.startsWith('file:')) return new Response(await fs.readFile(new URL(url)));return nativeFetch(request)};
const scene=new THREE.Scene();
await new Promise((resolve,reject)=>loadSatellite(scene,{onLoad:resolve,onError:reject}));
const root=getSatellite();let meshes=0,triangles=0;const colors=new Set();
root.traverse(o=>{if(!o.isMesh)return;meshes++;triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;for(const m of [].concat(o.material))colors.add(m.color.getHexString());});
assert(colors.size>5);assert(triangles<3929677);
const mapped={};for(const c of ['xrayInstrument','starTrackerModule','dawn4UCubeDrive','sBandAntenna','sunSensor','magnetorquers','solarPanel'])mapped[c]=Boolean(getComponentFocus(c));
const selections=getSelectableComponentMeshes().length;
const originalMaterials=new Map();let trackerSensors=0,instrumentAssemblyParts=0,sunSensors=0,torquerParts=0;
root.traverse(mesh=>{
 if(!mesh.isMesh)return;originalMaterials.set(mesh,mesh.material);
 const id=getComponentFromObject(mesh);const ancestry=[];for(let node=mesh;node;node=node.parent)ancestry.push(node.name);
 if(ancestry.some(name=>name.startsWith('ST-16RT2-LRB'))){assert.equal(id,'starTrackerModule');trackerSensors++;}
 if(ancestry.some(name=>name.startsWith('Instrument19-6_C'))){assert.equal(id,'xrayInstrument');instrumentAssemblyParts++;}
 if(ancestry.some(name=>name.startsWith('SunSensor_Bison64'))){assert.equal(id,'sunSensor');sunSensors++;}
 if(ancestry.some(name=>name.startsWith('MagnetoTorquer_MT10-2-H'))){assert.equal(id,'magnetorquers');torquerParts++;}
 if(mesh.name.startsWith('HE_sensor')||mesh.name.startsWith('Magnetometer_FGM'))assert.notEqual(id,'sunSensor');
});
assert.equal(trackerSensors,16);assert(instrumentAssemblyParts>800);assert.equal(sunSensors,104);assert.equal(torquerParts,6);
for(const component of ['starTrackerModule','xrayInstrument']){
 highlightComponent(component);
 root.traverse(mesh=>{if(!mesh.isMesh)return;const selected=getComponentFromObject(mesh)===component;assert.equal(Boolean(mesh.material.userData.selectionHighlight),selected);if(!selected){assert(mesh.material.transparent);assert.equal(mesh.material.depthWrite,false);assert.equal(mesh.material.forceSinglePass,true);}});
 highlightComponent(null);root.traverse(mesh=>{if(mesh.isMesh)assert.equal(mesh.material,originalMaterials.get(mesh));});
}
const trackerMesh=getSelectableComponentMeshes().find(mesh=>mesh.name==='ST-16RT2-LRB_1');
highlightComponent('starTrackerModule');const cachedHighlight=trackerMesh.material;highlightComponent(null);highlightComponent('starTrackerModule');assert.equal(trackerMesh.material,cachedHighlight);highlightComponent(null);
console.log(JSON.stringify({trackerSensors,instrumentAssemblyParts,sunSensors,torquerParts,highlightRestoresMaterials:true}));
const enclosureWalls=['P21','P22','P31','P32','P61','P121','Concentrator_Sunshades_step','Concentrator_Sunshades_step_1','Concentrator_Sunshades_step_2'];
showSatelliteInterior();let hidden=0;root.traverse(o=>{if(o.isMesh&&!o.visible)hidden++});assert(hidden>0);
for(const name of enclosureWalls){const wall=root.getObjectByName(name);assert(wall,'Enclosure wall '+name);assert.equal(wall.visible,false);}
assert(root.getObjectByName('Six_OB_B1').visible);root.traverse(mesh=>{if(mesh.isMesh&&getComponentFromObject(mesh)==='sunSensor')assert(mesh.visible);});
showSatellite();let restored=0;root.traverse(o=>{if(o.isMesh&&!o.visible)restored++});assert.equal(restored,0);
for(const name of enclosureWalls)assert(root.getObjectByName(name).visible);
const satelliteCenter=new THREE.Box3().setFromObject(root).getCenter(new THREE.Vector3());
const detailCamera=new THREE.PerspectiveCamera(20,1.3,.02,20);
for(const [direction,sensorName] of [[[0,-2,0],'SunSensor_Bison64-ET-B1'],[[-2,0,0],'SunSensor_Bison64-ET-B2'],[[0,0,-2],'SunSensor_Bison64-ET-B3'],[[0,2,0],'SunSensor_Bison64-ET-B4']]){
 detailCamera.position.copy(satelliteCenter).add(new THREE.Vector3(...direction));
 const focus=getComponentFocus('sunSensor',{camera:detailCamera});assert.equal(focus.focusedObject.name,sensorName);assert(focus.detailView);assert(focus.componentRadius<.04);
 const detailControls={target:satelliteCenter.clone(),minDistance:1,maxDistance:8,update(){detailCamera.lookAt(this.target);}};
 updateCamera(detailControls,detailCamera,focus,0);assert(detailCamera.position.distanceTo(detailControls.target)<.6);assert(detailControls.minDistance<.4);
}
const clickedSensor=root.getObjectByName('SunSensor_Bison64-ET-B2');assert.equal(getComponentFocus('sunSensor',{camera:detailCamera,object:clickedSensor.children[0]}).focusedObject,clickedSensor);
const instrument=await loadInstrument(scene);assert.equal(getSelectableComponentMeshes().length,selections);showInstrument();assert.equal(root.visible,false);assert.equal(instrument.visible,true);showSatellite();assert.equal(root.visible,true);assert.equal(instrument.visible,false);
const instrumentParts=createInstrumentComponents(instrument);const instrumentGroups={};
for(const key of ['detectors','baffles','electronics','calibration','structure','mounts','support']) {
 const meshes=instrumentParts.getMeshes(key);assert(meshes.length>0);instrumentGroups[key]=meshes.length;
 const original=meshes[0].material;instrumentParts.highlight(key);assert.notEqual(meshes[0].material,original);instrumentParts.clearHighlight();assert.equal(meshes[0].material,original);
}
instrument.traverse(mesh=>{if(!mesh.isMesh)return;assert(instrumentParts.getComponent(mesh));assert(mesh.material.metalness<=.5);if(mesh.name.startsWith('Sensor_'))assert.equal(instrumentParts.getComponent(mesh),'detectors');if(mesh.parent?.name.startsWith('Science_baffle'))assert.equal(instrumentParts.getComponent(mesh),'baffles');});
showInstrumentInterior();assert.equal(instrumentParts.getMeshes('structure').filter(mesh=>!mesh.visible).length,6);showInstrument();assert(instrumentParts.getMeshes('structure').every(mesh=>mesh.visible));showSatellite();
console.log(JSON.stringify({instrumentGroups,sourceColors:colors.size,interiorPanelsRestore:true}));
console.log(JSON.stringify({meshes,triangles,colors:colors.size,mapped,hidden,selections,view:getCurrentView()}));
