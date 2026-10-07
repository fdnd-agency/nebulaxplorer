import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createOptics,createPartViewer} from './src/components/objects/Optics.js';
globalThis.self=globalThis;globalThis.ProgressEvent=class{constructor(type,init){Object.assign(this,init)}};
const nativeFetch=globalThis.fetch;globalThis.fetch=async r=>{const url=typeof r==='string'?r:r.url;return url.startsWith('file:')?new Response(await fs.readFile(new URL(url))):nativeFetch(r)};
const scene=new THREE.Scene();const optics=createOptics(scene);assert(!optics.root.visible);optics.show(true);optics.setPlaying(true);assert(optics.isAnimating());optics.update(900);let rays=0;optics.root.traverse(o=>{if(o.isLine){rays++;const a=o.geometry.attributes.position;assert.equal(a.count,4);assert.equal(a.getX(3),0);assert.equal(a.getY(3),-2.5);}});assert.equal(rays,6);optics.hide();assert(!optics.isAnimating());
const parts=createPartViewer(scene);for(const key of ['primary','secondary','fpm','fpcm']){const root=await parts.load(key);assert(!root.visible);parts.show(root);assert(root.visible);parts.hide();assert(!root.visible);const bounds=new THREE.Box3().setFromObject(root);assert(!bounds.isEmpty());}
console.log('PASS: six paths with two bends terminate at detector; animation/visibility; four CAD assets decode, frame and hide.');
