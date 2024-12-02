import gsap from 'gsap'
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

//create sphere

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./img/globe.jpeg')
            }
        }
    }))
sphere.rotation.y = 4.2
sphere.rotation.x = 0.2

// Create a points to add onto the 3D globe

//Egypt
const Egypt = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32), // Adjust the geometry as needed
    new THREE.MeshBasicMaterial({ color: 0xfcba03 }) // Adjust the material as needed
);

const EgyptPosition = new THREE.Vector3(0, 1.6, 4.45); // Adjust the position as needed
Egypt.position.copy(EgyptPosition);

//UAE
const UAE = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32), // Adjust the geometry as needed
    new THREE.MeshBasicMaterial({ color: 0xffffff }) // Adjust the material as needed
);

const UAEPosition = new THREE.Vector3(2, 1.3, 4.1); // Adjust the position as needed
UAE.position.copy(UAEPosition);

//Qatar
const Qatar = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32), // Adjust the geometry as needed
    new THREE.MeshBasicMaterial({ color: 0x8A1538 }) // Adjust the material as needed
);

const QatarPosition = new THREE.Vector3(1.5, 1.3, 4.3); // Adjust the position as needed
Qatar.position.copy(QatarPosition);

//Saudi
const Saudi = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32), // Adjust the geometry as needed
    new THREE.MeshBasicMaterial({ color: 0x006400 }) // Adjust the material as needed
);

const SaudiPosition = new THREE.Vector3(1, 1.2, 4.5); // Adjust the position as needed
Saudi.position.copy(SaudiPosition);

//Lebanon
const Lebanon = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32), // Adjust the geometry as needed
    new THREE.MeshBasicMaterial({ color: 0xff0000 }) // Adjust the material as needed
);

const LebanonPosition = new THREE.Vector3(0.4, 1.6, 4.41); // Adjust the position as needed
Lebanon.position.copy(LebanonPosition);


//create atmosphere

const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
)
atmosphere.scale.set(1.2, 1.2, 1.2)
scene.add(atmosphere)


const group = new THREE.Group()
group.add(sphere)
group.add(Egypt)
group.add(UAE)
group.add(Qatar)
group.add(Saudi)
group.add(Lebanon)
//Lebanon ,QATAR, SAUDI ARABIA, 
scene.add(group)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
})

const starVertices = []
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = -Math.random() * 2000
    starVertices.push(x, y, z)
}
starGeometry.setAttribute('position',
    new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)

camera.position.z = 15

const mouse = {
    x: undefined,
    y: undefined
}
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    // sphere.rotation.y -= 0.002
    gsap.to(
        group.rotation,
        {
            x: -mouse.y * 0.5,
            y: mouse.x * 0.5,
            duration: 2
        }
    )
}

animate()

addEventListener('click', onClick);

addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1
    mouse.y = -(e.clientY / innerHeight) * 2 + 1
})

function onClick(event) {
    // Calculate mouse position in normalized device coordinates
    const mouseClick = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
    };

    // Update the picking ray with the camera and mouse position
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouseClick, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([Egypt, UAE, Qatar, Saudi, Lebanon]); // Add more meshes as needed

    if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;

        if (clickedMesh === Egypt) {
            console.log('Clicked on the 3D globe!');
            // Example: Change the material color
            window.location.href = 'Egypt.html';
        } else if (clickedMesh === UAE) {
            console.log('Clicked on the clickable point!');
            // Example: Change the material color
            window.location.href = 'UAE.html';
        } else if (clickedMesh === Qatar) {
            console.log('Clicked on the additional mesh!');
            // Example: Change the material color
            window.location.href = 'Qatar.html';
        } else if (clickedMesh === Saudi) {
            console.log('Clicked on the additional mesh!');
            // Example: Change the material color
            window.location.href = 'SaudiArabia.html';
        } else if (clickedMesh === Lebanon) {
            console.log('Clicked on the additional mesh!');
            // Example: Change the material color
            window.location.href = 'Lebanon.html';
        }
    }
}
