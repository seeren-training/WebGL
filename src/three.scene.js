import { GUI } from "dat.gui";
import { BoxGeometry, Object3D, Vector2, Raycaster, Mesh, PointLight, AmbientLight, MeshBasicMaterial, MeshLambertMaterial, Scene, Color, Fog } from "three";
import { ResizeEvent } from "./events/resize.event";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LoopEvent } from "./events/loop.event";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class ThreeScene extends Scene
{

    #rotation = { x: 0, y: 0, z: 0  };

    #scale = { x: 0, y: 0, z: 0  };

    mouse = new Vector2();
    
    raycaster = new Raycaster();
    camera;

    #mesh = new Mesh(
        new BoxGeometry(5,1,1),
        new MeshLambertMaterial(
        )
    )

    constructor(camera, domElement) {
        super();
this.add(new Mesh(
    new BoxGeometry(5,1,1),
    new MeshLambertMaterial({
        color: 0xff0000,
        wireframe: true
    })))


        ResizeEvent.enable();
        camera.position.z = 5;
        this.camera = camera;
        this.#mesh.castShadow = true;
        // this.#mesh.position.y = 5;
        this.#mesh.receiveShadow = true;
        const ambiant = new AmbientLight( 0x404040, 2 );
        const light = new PointLight( 0xffffff, 2, 100 );
        light.position.set( 2, 2,2 );
        this.add( ambiant );
        this.add( light );
        
        var pivot = new Object3D();
        pivot.position.x = 2.5;
        // this.#mesh.position.x = -2.5;
        // pivot.add(this.#mesh);
        this.add(this.#mesh);



        const controls = new OrbitControls(camera, domElement);
        controls.autoRotate = true;
    
        camera.lookAt(this.#mesh.position);
        let i = 0;
        const update = () => {
        //     i++;
        //     if (i === 100) {
    
        //         LoopEvent.remove(update)
        //     }
    
        controls.update();
        camera.lookAt(this.#mesh.position);
        };
        LoopEvent.add(update)

        // const loader = new GLTFLoader();
        // loader.load( 'assets/models/LowPolyMill.glb',  
        //     (gltf) => {this.add( gltf.scene ), this.foo(gltf.scene)},
        //     undefined,
        //     (error) => console.error( error )
        // );

        // window.addEventListener( 'click', (e) => this.onMouseMove(e), false );

        const gui = new GUI;
        const position = gui.addFolder("Position");
        position.add(camera.position, "x", -10, 10);
        position.add(camera.position, "y", -10, 10);
        position.add(camera.position, "z", -10, 10);
        const rotation = gui.addFolder("Rotation");
        rotation.add(pivot.rotation, "x", -Math.PI, Math.PI);
        rotation.add(pivot.rotation, "y", -Math.PI, Math.PI);
        rotation.add(pivot.rotation, "z", -Math.PI, Math.PI);
        position.add(this.#mesh.position, "z", -10, 10);
        const scale = gui.addFolder("Scale");
        scale.add(this.#mesh.scale, "x", 0, 2);
        scale.add(this.#mesh.scale, "y", 0, 2);
        scale.add(this.#mesh.scale, "z", 0, 2);
    }

    onMouseMove( event ) {
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    	this.raycaster.setFromCamera( this.mouse, this.camera );

        const intersects = this.raycaster.intersectObjects( this.children[2].children );
        for ( let i = 0; i < intersects.length; i ++ ) {
            intersects[ i ].object.material.color.set( 0xff0000 );

        }
    }

    foo(scene) {
        const elice = scene.children[5];
        let rotation = 0;
        LoopEvent.add(() => {
            elice.rotateY(0.1);
        })


    }
    
}
