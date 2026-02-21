import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class Simulation {
    constructor() {
        this.container = document.getElementById('simulation-viewport');
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050505);
        this.scene.fog = new THREE.Fog(0x050505, 5, 15);

        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.set(3, 3, 5);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        this.isPaused = false;
        this.clock = new THREE.Clock();

        this.initLights();
        this.initEnvironment();
        this.initAgent();
        this.addEventListeners();
        this.animate();
    }

    initLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0x76b900, 10);
        spotLight.position.set(5, 5, 5);
        spotLight.castShadow = true;
        this.scene.add(spotLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(-5, 3, -2);
        this.scene.add(pointLight);
    }

    initEnvironment() {
        // Grid Helper
        const size = 20;
        const divisions = 20;
        const gridHelper = new THREE.GridHelper(size, divisions, 0x76b900, 0x222222);
        this.scene.add(gridHelper);

        // Ground Plane (Darker)
        const geometry = new THREE.PlaneGeometry(20, 20);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x0a0a0a, 
            side: THREE.DoubleSide 
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = Math.PI / 2;
        plane.position.y = -0.01;
        this.scene.add(plane);
    }

    initAgent() {
        // Simple Robotic Agent Placeholder (Quadruped-like)
        this.agent = new THREE.Group();

        // Body
        const bodyGeo = new THREE.BoxGeometry(1, 0.4, 0.6);
        const bodyMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        this.agent.add(body);

        // Head
        const headGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const headMat = new THREE.MeshPhongMaterial({ color: 0x76b900 });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.set(0.6, 0.2, 0);
        this.agent.add(head);

        // Legs (4)
        const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.6);
        const legMat = new THREE.MeshPhongMaterial({ color: 0x555555 });
        
        const legPositions = [
            [0.4, -0.3, 0.2], [0.4, -0.3, -0.2],
            [-0.4, -0.3, 0.2], [-0.4, -0.3, -0.2]
        ];

        this.legs = [];
        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeo, legMat);
            leg.position.set(...pos);
            this.agent.add(leg);
            this.legs.push(leg);
        });

        this.agent.position.y = 0.6;
        this.scene.add(this.agent);
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.width = this.container.clientWidth;
            this.height = this.container.clientHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        });

        document.getElementById('reset-sim').addEventListener('click', () => {
            this.agent.position.set(0, 0.6, 0);
            this.agent.rotation.set(0, 0, 0);
        });

        document.getElementById('pause-sim').addEventListener('click', (e) => {
            this.isPaused = !this.isPaused;
            e.target.textContent = this.isPaused ? 'Resume' : 'Pause';
        });

        // Copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const code = btn.previousElementSibling.textContent;
                navigator.clipboard.writeText(code);
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(() => btn.textContent = originalText, 2000);
            });
        });

        // Env card click
        document.querySelectorAll('.env-card').forEach(card => {
            card.addEventListener('click', () => {
                const agentName = card.querySelector('h4').textContent;
                document.getElementById('agent-type').textContent = agentName;
                this.updateAgentColor();
            });
        });
    }

    updateAgentColor() {
        const colors = [0x76b900, 0x00aaff, 0xffaa00, 0xff00aa];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.agent.children[1].material.color.setHex(randomColor);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (!this.isPaused) {
            const time = this.clock.getElapsedTime();
            
            // Subtle movement
            this.agent.position.y = 0.6 + Math.sin(time * 2) * 0.05;
            
            // Leg animation
            this.legs.forEach((leg, i) => {
                leg.rotation.x = Math.sin(time * 4 + i) * 0.2;
            });

            // Update FPS display (Simulated)
            if (Math.random() > 0.95) {
                const fps = 58 + Math.floor(Math.random() * 5);
                document.getElementById('fps-display').textContent = `${fps} FPS`;
            }
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    new Simulation();
});
