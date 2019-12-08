import './src/three.min.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import './src/three-vrm.js';

class renderer {
    constructor() {
        this.blendShapes = {}
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.3, 200)
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        window.addEventListener('load', this.init());
    }
    blendShapes
    camera
    scene
    renderer
    light
    init() {
        //     var socket = io();
        //     socket.emit('client_to_server_join', 1);
        //     console.log("joined")

        //     socket.on('chat message', function (array) { // from app.js emit()
        //         blendShapes = JSON.parse(array)
        //     });

        var container, controls;
        container = document.createElement('div');
        document.body.appendChild(container);

        this.renderer.setClearColor(0xEEEEEE);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.gammaOutput = true;

        this.camera.position.set(0, 2.6, -2.6);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene.add(this.camera)

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1).normalize();
        this.scene.add(light);

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

        controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 0.9, 0);
        controls.update();

        container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize(this.camera, this.renderer), false);
        this.animate(this.scene, this.camera)
    }
    onWindowResize(camera, renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    animate(scene, camera) {
        // // frame更新毎に呼ばれる
        // if (scene.children[1]) {
        //     scene.children[1].children[2].skeleton.bones[0].quaternion["_y"] = blendShapes.eyeL; //eye_L
        //     scene.children[1].children[2].skeleton.bones[1].quaternion["_y"] = blendShapes.eyeR; //eye_R
        //     scene.children[1].children[4].quaternion["_y"] = blendShapes.faceDir;
        // }
        this.renderer.render(scene, camera);
        requestAnimationFrame(() => this.animate(scene, camera));
    }
}

export default new renderer()