import './src/three.min.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import './src/three-vrm.js';
// import WebGL from './node_modules/three/examples/jsm/WebGL.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'

// () => {
//     var socket = io();
//     socket.emit('client_to_server_join', 1);
//     onsole.log("joined")

//     socket.on('chat message', function (array) { // from app.js emit()
//         blendShapes = JSON.parse(array)
//     });
// };

class renderer {
    constructor() {
        this.blendShapes = {}
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20)
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.init()
    }
    blendShapes
    camera
    scene
    renderer
    light
    init() {
        var container, stats, controls;
        // if (WEBGL.isWebGLAvailable() === false) {
        //     document.body.appendChild(WEBGL.getWebGLErrorMessage());
        // }
        container = document.createElement('div');
        document.body.appendChild(container);

        this.camera.position.set(0, 1.6, 0.2);

        // controls = new OrbitControls(this.camera);
        // controls.target.set(0, 0.9, 0);
        // controls.update();

        this.rlight = new THREE.HemisphereLight(0xbbbbff, 0x444422);
        this.rlight.position.set(0, 1, 0);
        this.scene.add(this.rlight);

        // model
        var loader = new GLTFLoader();

        loader.load('/src/AliciaSolid.vrm',
            (gltf) => {
                THREE.VRM.from(gltf).then((vrm) => {
                    this.scene.add(vrm.scene);
                })
            },
            (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),
            (error) => console.error(error))

        this.renderer.setClearColor(0xEEEEEE);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.gammaOutput = true;
        container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize, false);

        this.animate(this.scene, this.camera)
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    animate(scene, camera) {
        // // frame更新毎に呼ばれる
        // if (scene.children[1]) {
        //     scene.children[1].children[2].skeleton.bones[0].quaternion["_y"] = blendShapes.eyeL; //eye_L
        //     scene.children[1].children[2].skeleton.bones[1].quaternion["_y"] = blendShapes.eyeR; //eye_R
        //     scene.children[1].children[4].quaternion["_y"] = blendShapes.faceDir;
        // }

        // requestAnimationFrame(this.animate(scene, camera));

        this.renderer.render(scene, camera);
    }
}

export default new renderer()