// Game Configuration
const CONFIG = {
    canvas: {
        width: 800,
        height: 600
    },
    player: {
        width: 40,
        height: 40,
        speed: 5,
        maxShield: 100,
        maxStructure: 100,
        shieldRegenRate: 0.5, // Shield points per frame when regenerating
        shieldRegenDelay: 2000 // Delay in ms before shield starts regenerating after damage
    },
    weapons: {
        laser: {
            name: 'Laser',
            fireRate: 1200,
            damage: 50,
            speed: 12,
            color: '#ff0000',
            description: 'Single mighty shot'
        },
        plasma: {
            name: 'Plasma',
            fireRate: 400,
            damage: 15,
            speed: 8,
            color: '#00ffff',
            description: 'Moderate rate, medium damage'
        },
        railgun: {
            name: 'Railgun',
            fireRate: 100,
            damage: 3,
            speed: 15,
            color: '#ffff00',
            description: 'High rate, low damage'
        },
        blaster: {
            name: 'Blaster',
            fireRate: 600,
            damage: 8,
            speed: 6,
            pellets: 5,
            spread: 0.3,
            spreadMultiplier: 10,
            color: '#ff8800',
            description: 'Shotgun-style spread'
        }
    },
    weaponLevels: {
        maxLevel: 9,
        // Laser level configurations
        laser: {
            levels: {
                1: { fireRate: 1500, damage: 40, description: 'Low fire, low damage' },
                2: { fireRate: 1500, damage: 50, description: 'Low fire, medium damage' },
                3: { fireRate: 1200, damage: 40, description: 'Medium fire, low damage' },
                4: { fireRate: 1200, damage: 45, description: 'Medium fire, medium damage' },
                5: { fireRate: 1200, damage: 50, description: 'Medium fire, high damage' },
                6: { fireRate: 1000, damage: 55, description: 'High fire, medium damage' },
                7: { fireRate: 1000, damage: 60, description: 'High fire, medium damage' },
                8: { fireRate: 900, damage: 60, description: 'High fire, high damage' },
                9: { fireRate: 900, damage: 65, description: 'Ultra high fire, high damage' }
            }
        },
        // Plasma level configurations
        plasma: {
            levels: {
                1: { fireRate: 600, damage: 13, description: 'Low fire rate, low damage' },
                2: { fireRate: 600, damage: 14, description: 'Low fire rate, medium damage' },
                3: { fireRate: 500, damage: 13, description: 'Medium fire rate, low damage' },
                4: { fireRate: 500, damage: 16, description: 'Medium fire rate, medium damage' },
                5: { fireRate: 450, damage: 18, description: 'Medium fire rate, high damage' },
                6: { fireRate: 420, damage: 20, description: 'High fire rate, high damage' },
                7: { fireRate: 420, damage: 23, description: 'High fire rate, high damage' },
                8: { fireRate: 400, damage: 26, description: 'High fire rate, very high damage' },
                9: { fireRate: 380, damage: 27, description: 'Ultra high fire rate, very high damage' }
            }
        },
        // Railgun level configurations
        railgun: {
            levels: {
                1: { fireRate: 200, damage: 2, bullets: 1, description: 'Low fire, low damage' },
                2: { fireRate: 160, damage: 2, bullets: 1, description: 'Medium fire, low damage' },
                3: { fireRate: 120, damage: 2, bullets: 1, description: 'High fire, low damage' },
                4: { fireRate: 140, damage: 4, bullets: 1, description: 'Medium fire, medium damage' },
                5: { fireRate: 160, damage: 3, bullets: 2, description: 'Two bullets, medium fire, low damage' },
                6: { fireRate: 140, damage: 3, bullets: 2, description: 'Two bullets, high fire, low damage' },
                7: { fireRate: 160, damage: 4, bullets: 2, description: 'Two bullets, medium fire, medium damage' },
                8: { fireRate: 119, damage: 4, bullets: 2, description: 'Two bullets, high fire, medium damage' },
                9: { fireRate: 140, damage: 5, bullets: 2, description: 'Two bullets, high fire, high damage' }
            }
        },
        // Blaster level configurations
        blaster: {
            levels: {
                1: { fireRate: 700, damage: 3, pellets: 5, wingWeapon: 'plasma', description: 'Low fire, low damage' },
                2: { fireRate: 700, damage: 4, pellets: 5, wingWeapon: 'laser', description: 'Low fire, medium damage' },
                3: { fireRate: 700, damage: 4, pellets: 6, wingWeapon: 'railgun', description: 'Medium fire, low damage' },
                4: { fireRate: 700, damage: 5, pellets: 6, wingWeapon: 'railgun', description: 'Medium fire, medium damage' },
                5: { fireRate: 600, damage: 5, pellets: 6, wingWeapon: 'plasma', description: 'Medium fire, high damage' },
                6: { fireRate: 600, damage: 5, pellets: 7, wingWeapon: 'laser', description: 'High fire, medium damage' },
                7: { fireRate: 550, damage: 5, pellets: 7, wingWeapon: 'railgun', description: 'High fire, medium damage' },
                8: { fireRate: 530, damage: 5, pellets: 7, wingWeapon: 'plasma', description: 'High fire, medium damage' },
                9: { fireRate: 555, damage: 5, pellets: 8, wingWeapon: 'plasma', description: 'High fire, medium damage, max pellets' }
            }
        }
    },
    enemy: {
        spawnRate: 2000,
        speed: 2,
        // Wave-based difficulty scaling
        healthScaling: 0.1, // 10% increase per wave
        damageScaling: 0.08, // 8% increase per wave
        blasterSpreadRange: 100, // Range for blaster spread calculation
        // Enemy type definitions
        types: {
            small: {
                health: 15,
                speed: 3.5,
                width: 25,
                height: 25,
                weapon: 'plasma',
                fireRate: 1800,
                damage: 15,
                color: '#ff6666',
                points: 8,
                bulletSpeed: 5 // Faster bullet speed to prevent ship from overtaking shots
            },
            standard: {
                health: 30,
                speed: 2,
                width: 30,
                height: 30,
                weapon: 'plasma',
                fireRate: 1500,
                damage: 20,
                color: '#ff0000',
                points: 15
            },
            advanced: {
                health: 35,
                speed: 2,
                width: 32,
                height: 32,
                weapon: 'blaster',
                fireRate: 2000,
                damage: 12,
                pellets: 3,
                spread: 0.2,
                color: '#ff00ff',
                points: 20
            },
            heavy: {
                health: 60,
                speed: 1.2,
                width: 40,
                height: 40,
                weapon: 'plasma',
                fireRate: 1200,
                damage: 25,
                color: '#aa0000',
                points: 30
            },
            cruiser: {
                health: 100,
                speed: 0.8,
                width: 50,
                height: 50,
                weapon: 'laser',
                fireRate: 1500,
                damage: 35,
                color: '#8800ff',
                points: 50,
                hasTurrets: true,
                turretWeapon: 'plasma',
                turretFireRate: 1000,
                turretDamage: 18
            },
            battleship: {
                health: 150,
                speed: 0.5,
                width: 60,
                height: 60,
                weapon: 'laser',
                fireRate: 1800,
                damage: 40,
                color: '#6600cc',
                points: 75,
                hasTurrets: true,
                turretWeapon: 'plasma',
                turretFireRate: 900,
                turretDamage: 20,
                deployDrones: true,
                droneDeployRate: 8000
            }
        }
    },
    boss: {
        spawnThreshold: 15,
        blasterSpreadRange: 150, // Range for boss blaster spread calculation
        // Boss difficulty scaling per wave
        healthScaling: 0.05, // 5% increase per wave
        damageScaling: 0.04, // 4% increase per wave
        // Star Destroyer variants
        types: {
            blaster: {
                health: 800,
                speed: 0.8,
                width: 100,
                height: 100,
                weapon: 'blaster',
                fireRate: 1200,
                damage: 15,
                pellets: 5,
                spread: 0.3,
                color: '#ff0099',
                points: 500,
                name: 'STAR DESTROYER'
            },
            blasterDrone: {
                health: 900,
                speed: 0.8,
                width: 100,
                height: 100,
                weapon: 'blaster',
                fireRate: 1200,
                damage: 15,
                pellets: 5,
                spread: 0.3,
                color: '#ff0066',
                points: 600,
                name: 'STAR DESTROYER',
                deployDrones: true,
                droneDeployRate: 6000
            },
            plasmaDrone: {
                health: 1000,
                speed: 0.7,
                width: 100,
                height: 100,
                weapon: 'plasma',
                fireRate: 800,
                damage: 30,
                color: '#9900ff',
                points: 700,
                name: 'STAR DESTROYER',
                deployDrones: true,
                droneDeployRate: 5000
            },
            railgunTurret: {
                health: 1100,
                speed: 0.6,
                width: 110,
                height: 110,
                weapon: 'railgun',
                fireRate: 400,
                damage: 8,
                color: '#6600ff',
                points: 800,
                name: 'STAR DESTROYER',
                hasTurrets: true,
                turretWeapon: 'plasma',
                turretFireRate: 1000,
                turretDamage: 25
            }
        }
    },
    asteroid: {
        spawnRate: 3000,
        speed: 1.5,
        health: 30,
        points: 5,
        playerDamage: 40
    },
    bullet: {
        enemyDamage: 20,
        enemySpeed: 3
    },
    powerup: {
        spawnChance: 0.3,
        duration: 10000,
        upgradeIncrement: 0.25,
        upgradeMaxCap: 2.5,
        noseShieldBoost: 50,
        shieldHealAmount: 30,
        shieldBoostAmount: 25,
        structureRepairAmount: 40,
        repairBotDuration: 15000, // 15 seconds
        repairBotHealRate: 0.3, // Structure points per frame
        notificationDuration: 2000 // 2 seconds
    },
    addons: {
        maxLevel: 9,
        // Visual scaling factors per level
        visualScaling: {
            wings: 0.05,  // 5% size increase per level
            nose: 0.04,   // 4% size increase per level
            turret: 0.04, // 4% size increase per level
            maxLevelIndicatorLights: 5  // Maximum number of level indicator lights to show
        },
        wings: {
            structurePerLevel: 10 // Structure increase per level
        },
        nose: {
            shieldPerLevel: 10 // Shield increase per level
        },
        turret: {
            fireRatePerLevel: 100, // Fire rate reduction per level (faster)
            baseFireRate: 1000, // Base fire rate in ms (level 1) - enemy-style intervals
            damage: 20, // Enemy-style damage per shot
            speed: 3, // Enemy-style speed
            range: 0.5, // Half of playfield height
            burstSize: 5, // Number of shots per burst
            burstDelay: 100, // Delay between shots in a burst (ms)
            burstCooldown: 1000, // Cooldown after burst (ms)
            predictionAccuracyPerLevel: 0.1 // 10% improvement per level in prediction accuracy
        }
    },
    kamikazeDrone: {
        spawnRate: 3000, // Spawn every 3 seconds
        speed: 4, // Speed when chasing enemies
        damage: 30, // Damage on impact
        explosionTimeMin: 2000, // Min time before random explosion (ms)
        explosionTimeMax: 5000, // Max time before random explosion (ms)
        dronesPerPickup: 5 // Number of drones per pickup
    },
    enemyDrone: {
        health: 10,
        speed: 2.5,
        width: 15,
        height: 15,
        damage: 15,
        color: '#ffaa00',
        points: 5,
        explosionTime: 1000, // Drones explode after 1 second
        explosionRadius: 50 // Radius for damage calculation
    },
    wave: {
        completionDelay: 3000
    },
    stars: {
        count: 100,
        // Define multiple speed layers to simulate distance/depth
        speedLayers: [
            { speed: 0.3, opacity: 0.3, size: 1 },  // Far stars - slow, dim, small
            { speed: 0.6, opacity: 0.6, size: 1 },  // Mid-far stars
            { speed: 1.0, opacity: 0.8, size: 2 },  // Mid stars
            { speed: 1.5, opacity: 0.9, size: 2 },  // Mid-near stars
            { speed: 2.0, opacity: 1.0, size: 3 }   // Near stars - fast, bright, large
        ]
    }
};

// Game State
const gameState = {
    score: 0,
    wave: 1,
    isPaused: false,
    isGameOver: false,
    player: null,
    enemies: [],
    boss: null,
    asteroids: [],
    bullets: [],
    enemyBullets: [],
    turretBullets: [],
    powerups: [],
    particles: [],
    keys: {},
    lastFire: 0,
    lastEnemySpawn: 0,
    lastAsteroidSpawn: 0,
    scrollOffset: 0,
    enemiesDefeated: 0,
    enemiesInWave: 0,
    currentWeapon: 'plasma',
    weaponLevels: {
        laser: 1,
        plasma: 1,
        railgun: 1,
        blaster: 1
    },
    shipUpgrades: {
        wingsLevel: 0, // 0 = not installed, 1-10 = level
        noseLevel: 0, // 0 = not installed, 1-10 = level
        turretLevel: 0 // 0 = not installed, 1-10 = level
    },
    lastTurretFire: 0, // Track turret fire timing
    turretBurstCount: 0, // Track shots in current burst
    turretBurstTarget: null, // Track current burst target
    turretInBurst: false, // Track if currently in burst mode
    bossActive: false,
    waveComplete: false,
    autoFire: false,
    godMode: true,
    fullEquipMode: false,
    repairBotActive: false,
    repairBotEndTime: 0,
    lastDamageTime: 0,
    pickupNotifications: [], // Array of notification objects {text, startTime}
    kamikazeDrones: [], // Array of active kamikaze drones
    kamikazeDroneActive: false,
    kamikazeDronesRemaining: 0, // Number of drones remaining to spawn
    lastDroneSpawn: 0,
    enemyDrones: [], // Array of enemy-deployed drones
    stars: [] // Array of star objects for parallax starfield
};

// Canvas Setup
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = CONFIG.canvas.width;
canvas.height = CONFIG.canvas.height;

// Utility function to darken a hex color
function darkenColor(color, amount) {
    // Remove # if present
    const hex = color.replace('#', '');
    
    // Parse RGB components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Darken each component
    const newR = Math.max(0, r - amount);
    const newG = Math.max(0, g - amount);
    const newB = Math.max(0, b - amount);
    
    // Convert back to hex
    return '#' + 
        newR.toString(16).padStart(2, '0') +
        newG.toString(16).padStart(2, '0') +
        newB.toString(16).padStart(2, '0');
}

// Utility function to lighten a hex color
function lightenColor(color, amount) {
    // Remove # if present
    const hex = color.replace('#', '');
    
    // Parse RGB components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Lighten each component
    const newR = Math.min(255, r + amount);
    const newG = Math.min(255, g + amount);
    const newB = Math.min(255, b + amount);
    
    // Convert back to hex
    return '#' + 
        newR.toString(16).padStart(2, '0') +
        newG.toString(16).padStart(2, '0') +
        newB.toString(16).padStart(2, '0');
}

// Menu Canvas Setup
const menuCanvas = document.getElementById('menu-canvas');
const menuCtx = menuCanvas.getContext('2d');
menuCanvas.width = CONFIG.canvas.width;
menuCanvas.height = CONFIG.canvas.height;

// Weapons Canvas Setup
const weaponsCanvas = document.getElementById('weapons-canvas');
const weaponsCtx = weaponsCanvas.getContext('2d');
weaponsCanvas.width = CONFIG.canvas.width;
weaponsCanvas.height = CONFIG.canvas.height;

// Menu starfield state
const menuStarfield = {
    scrollOffset: 0,
    animationId: null,
    stars: []
};

// Weapons starfield state
const weaponsStarfield = {
    scrollOffset: 0,
    animationId: null,
    stars: []
};

// Initialize starfield with random star positions
function initializeStarfield() {
    const stars = [];
    for (let i = 0; i < CONFIG.stars.count; i++) {
        // Assign to a layer using round-robin for even distribution
        const layerIndex = i % CONFIG.stars.speedLayers.length;
        const layer = CONFIG.stars.speedLayers[layerIndex];
        
        stars.push({
            x: Math.random() * CONFIG.canvas.width,
            y: Math.random() * CONFIG.canvas.height,
            layerIndex: layerIndex,
            size: layer.size,
            opacity: layer.opacity,
            speed: layer.speed
        });
    }
    return stars;
}

// Update star position and handle wrapping
function updateStar(star) {
    // Update star position based on its speed
    star.y += star.speed;
    
    // Wrap around when star goes off screen
    if (star.y > CONFIG.canvas.height) {
        star.y = 0;
        // Randomize x position when wrapping for more natural feel
        star.x = Math.random() * CONFIG.canvas.width;
    }
}

// Screen Management
const screens = {
    menu: document.getElementById('menu-screen'),
    game: document.getElementById('game-screen'),
    pause: document.getElementById('pause-screen'),
    gameover: document.getElementById('gameover-screen'),
    weaponsOverview: document.getElementById('weapons-overview-screen')
};

// Button Event Listeners
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('weapons-button').addEventListener('click', showWeaponsOverview);
document.getElementById('weapons-back-button').addEventListener('click', quitToMenu);
document.getElementById('resume-button').addEventListener('click', resumeGame);
document.getElementById('quit-button').addEventListener('click', quitToMenu);
document.getElementById('restart-button').addEventListener('click', startGame);
document.getElementById('menu-button').addEventListener('click', quitToMenu);

// GodMode Toggle
const godmodeCheckbox = document.getElementById('godmode-checkbox');
if (godmodeCheckbox) {
    godmodeCheckbox.addEventListener('change', (e) => {
        gameState.godMode = e.target.checked;
    });
}

// Full Equipment Toggle
const fullequipCheckbox = document.getElementById('fullequip-checkbox');
if (fullequipCheckbox) {
    fullequipCheckbox.addEventListener('change', (e) => {
        gameState.fullEquipMode = e.target.checked;
    });
}

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    gameState.keys[e.key.toLowerCase()] = true;
    
    if (e.key === ' ' && !gameState.isPaused && !gameState.isGameOver) {
        e.preventDefault();
        // Toggle auto-fire for all weapons
        gameState.autoFire = !gameState.autoFire;
    }
    
    if (e.key === 'Escape') {
        e.preventDefault();
        if (!gameState.isGameOver) {
            togglePause();
        }
    }
    
    if (e.key === 'Tab') {
        e.preventDefault();
        switchWeapon();
    }
});

document.addEventListener('keyup', (e) => {
    gameState.keys[e.key.toLowerCase()] = false;
});

// Player Class
class Player {
    constructor() {
        this.x = CONFIG.canvas.width / 2 - CONFIG.player.width / 2;
        this.y = CONFIG.canvas.height - 100;
        this.width = CONFIG.player.width;
        this.height = CONFIG.player.height;
        this.shield = CONFIG.player.maxShield;
        this.maxShield = CONFIG.player.maxShield;
        this.structure = CONFIG.player.maxStructure;
        this.maxStructure = CONFIG.player.maxStructure;
        this.color = '#00ff00';
    }

    update() {
        // Movement
        if (gameState.keys['arrowleft'] || gameState.keys['a']) {
            this.x = Math.max(0, this.x - CONFIG.player.speed);
        }
        if (gameState.keys['arrowright'] || gameState.keys['d']) {
            this.x = Math.min(CONFIG.canvas.width - this.width, this.x + CONFIG.player.speed);
        }
        if (gameState.keys['arrowup'] || gameState.keys['w']) {
            this.y = Math.max(0, this.y - CONFIG.player.speed);
        }
        if (gameState.keys['arrowdown'] || gameState.keys['s']) {
            this.y = Math.min(CONFIG.canvas.height - this.height, this.y + CONFIG.player.speed);
        }
    }

    draw() {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        
        // Draw wings first (so they appear behind the ship body)
        const wingsLevel = gameState.shipUpgrades.wingsLevel;
        if (wingsLevel > 0) {
            // Enhanced wing cannons with level-based visual improvements
            const levelScale = 1 + (wingsLevel - 1) * CONFIG.addons.visualScaling.wings;
            const wingWidth = 15 * levelScale;
            const wingHeight = 22 * levelScale;
            
            // Left wing cannon
            ctx.fillStyle = '#00dd00';
            ctx.fillRect(this.x - wingWidth, this.y + this.height / 2 - 2, wingWidth, wingHeight);
            // Wing cannon detail - darker edge
            ctx.fillStyle = '#008800';
            ctx.fillRect(this.x - wingWidth, this.y + this.height / 2 - 2, 3, wingHeight);
            // Cannon barrel
            ctx.fillStyle = '#006600';
            ctx.fillRect(this.x - wingWidth + 3, this.y + this.height / 2 + 2, wingWidth - 6, 4);
            // Muzzle flash indicator (red)
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x - wingWidth + 5, this.y + this.height / 2 + 4, 4, 8);
            // Level indicator lights
            const maxLights = CONFIG.addons.visualScaling.maxLevelIndicatorLights;
            for (let i = 0; i < Math.min(wingsLevel, maxLights); i++) {
                ctx.fillStyle = wingsLevel === CONFIG.addons.maxLevel ? '#ffff00' : '#00ff00';
                ctx.fillRect(this.x - wingWidth + 6, this.y + this.height / 2 + 14 + i * 1.5, 2, 1);
            }
            
            // Right wing cannon (mirrored)
            ctx.fillStyle = '#00dd00';
            ctx.fillRect(this.x + this.width, this.y + this.height / 2 - 2, wingWidth, wingHeight);
            ctx.fillStyle = '#008800';
            ctx.fillRect(this.x + this.width + wingWidth - 3, this.y + this.height / 2 - 2, 3, wingHeight);
            ctx.fillStyle = '#006600';
            ctx.fillRect(this.x + this.width + 3, this.y + this.height / 2 + 2, wingWidth - 6, 4);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x + this.width + wingWidth - 9, this.y + this.height / 2 + 4, 4, 8);
            for (let i = 0; i < Math.min(wingsLevel, maxLights); i++) {
                ctx.fillStyle = wingsLevel === CONFIG.addons.maxLevel ? '#ffff00' : '#00ff00';
                ctx.fillRect(this.x + this.width + wingWidth - 8, this.y + this.height / 2 + 14 + i * 1.5, 2, 1);
            }
        } else {
            // Standard wings (smaller, less detailed)
            ctx.fillStyle = '#00aa00';
            ctx.fillRect(this.x - 5, this.y + this.height / 2, 10, 15);
            ctx.fillRect(this.x + this.width - 5, this.y + this.height / 2, 10, 15);
        }
        
        // Draw nose armor (behind main body, in front of wings)
        const noseLevel = gameState.shipUpgrades.noseLevel;
        if (noseLevel > 0) {
            const levelScale = 1 + (noseLevel - 1) * CONFIG.addons.visualScaling.nose;
            
            // Layered armor plating effect
            ctx.fillStyle = '#0099ff';
            ctx.beginPath();
            ctx.moveTo(centerX, this.y - 12 * levelScale);
            ctx.lineTo(centerX - 10 * levelScale, this.y - 4 * levelScale);
            ctx.lineTo(centerX - 8 * levelScale, this.y);
            ctx.lineTo(centerX + 8 * levelScale, this.y);
            ctx.lineTo(centerX + 10 * levelScale, this.y - 4 * levelScale);
            ctx.closePath();
            ctx.fill();
            
            // Inner armor layer
            ctx.fillStyle = '#00ccff';
            ctx.beginPath();
            ctx.moveTo(centerX, this.y - 8 * levelScale);
            ctx.lineTo(centerX - 6 * levelScale, this.y - 2 * levelScale);
            ctx.lineTo(centerX - 5 * levelScale, this.y);
            ctx.lineTo(centerX + 5 * levelScale, this.y);
            ctx.lineTo(centerX + 6 * levelScale, this.y - 2 * levelScale);
            ctx.closePath();
            ctx.fill();
            
            // Armor highlights
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(centerX - 7 * levelScale, this.y - 3 * levelScale);
            ctx.lineTo(centerX - 5 * levelScale, this.y - 1 * levelScale);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX + 7 * levelScale, this.y - 3 * levelScale);
            ctx.lineTo(centerX + 5 * levelScale, this.y - 1 * levelScale);
            ctx.stroke();
            
            // Level indicator - shield emblem at max level
            if (noseLevel === CONFIG.addons.maxLevel) {
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(centerX - 2, this.y - 6 * levelScale, 4, 3);
            }
        }

        // Draw ship body with enhanced detail
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(centerX, this.y);
        ctx.lineTo(this.x + 2, this.y + this.height);
        ctx.lineTo(centerX, this.y + this.height * 0.75);
        ctx.lineTo(this.x + this.width - 2, this.y + this.height);
        ctx.closePath();
        ctx.fill();
        
        // Add body outline for definition
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Animated engine flame effect
        const now = Date.now();
        const flamePhase = (now / 100) % 1; // Fast animation cycle (100ms)
        const flamePulse = Math.sin(now / 50) * 0.5 + 0.5; // Pulsing effect
        const flameFlicker = Math.random() * 0.3 + 0.7; // Random flicker
        
        // Left engine flame
        const leftEngineX = this.x + 11;
        const rightEngineX = this.x + this.width - 11;
        const engineY = this.y + this.height;
        
        // Flame height varies with pulse and flicker
        const flameHeight = (8 + flamePulse * 6) * flameFlicker;
        
        // Draw engine flames for both engines
        for (let engineX of [leftEngineX, rightEngineX]) {
            // Outer flame (bright cyan/white core - spacey plasma effect)
            ctx.fillStyle = `rgba(0, 255, 255, ${0.6 * flameFlicker})`;
            ctx.beginPath();
            ctx.moveTo(engineX, engineY);
            ctx.lineTo(engineX - 3, engineY + flameHeight * 0.6);
            ctx.lineTo(engineX, engineY + flameHeight);
            ctx.lineTo(engineX + 3, engineY + flameHeight * 0.6);
            ctx.closePath();
            ctx.fill();
            
            // Middle flame (green plasma - matches ship theme)
            ctx.fillStyle = `rgba(0, 255, 100, ${0.8 * flameFlicker})`;
            ctx.beginPath();
            ctx.moveTo(engineX, engineY);
            ctx.lineTo(engineX - 2, engineY + flameHeight * 0.7);
            ctx.lineTo(engineX, engineY + flameHeight * 0.85);
            ctx.lineTo(engineX + 2, engineY + flameHeight * 0.7);
            ctx.closePath();
            ctx.fill();
            
            // Inner core (bright white/yellow hot core)
            ctx.fillStyle = `rgba(255, 255, 200, ${0.9 * flameFlicker})`;
            ctx.beginPath();
            ctx.moveTo(engineX, engineY);
            ctx.lineTo(engineX - 1, engineY + flameHeight * 0.4);
            ctx.lineTo(engineX, engineY + flameHeight * 0.5);
            ctx.lineTo(engineX + 1, engineY + flameHeight * 0.4);
            ctx.closePath();
            ctx.fill();
        }
        
        // Engine exhaust ports (drawn on top of flames for depth)
        ctx.fillStyle = '#004400';
        ctx.fillRect(this.x + 8, this.y + this.height - 4, 6, 4);
        ctx.fillRect(this.x + this.width - 14, this.y + this.height - 4, 6, 4);
        ctx.fillStyle = '#00aa00';
        ctx.fillRect(this.x + 9, this.y + this.height - 3, 4, 3);
        ctx.fillRect(this.x + this.width - 13, this.y + this.height - 3, 4, 3);
        
        // Body panel details
        ctx.fillStyle = '#008800';
        ctx.fillRect(centerX - 3, this.y + 18, 6, 3);
        ctx.fillRect(centerX - 4, this.y + 24, 8, 2);

        // Enhanced cockpit with canopy effect
        ctx.fillStyle = '#003333';
        ctx.fillRect(centerX - 6, this.y + 8, 12, 12);
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(centerX - 5, this.y + 9, 10, 10);
        // Canopy highlight
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(centerX - 3, this.y + 10, 2, 3);
        ctx.fillRect(centerX + 1, this.y + 11, 2, 2);
        // Cockpit frame
        ctx.strokeStyle = '#00cccc';
        ctx.lineWidth = 1;
        ctx.strokeRect(centerX - 5, this.y + 9, 10, 10);

        // Draw turret (on top of cockpit)
        const turretLevel = gameState.shipUpgrades.turretLevel;
        if (turretLevel > 0) {
            const levelScale = 1 + (turretLevel - 1) * CONFIG.addons.visualScaling.turret;
            const turretBaseWidth = 12 * levelScale;
            const turretBaseHeight = 7 * levelScale;
            
            // Turret mounting base
            ctx.fillStyle = '#aa4400';
            ctx.fillRect(centerX - turretBaseWidth / 2, this.y + 22, turretBaseWidth, 4);
            
            // Turret base body
            ctx.fillStyle = '#ff8800';
            ctx.fillRect(centerX - turretBaseWidth / 2 + 1, this.y + 18, turretBaseWidth - 2, turretBaseHeight);
            
            // Turret highlights
            ctx.fillStyle = '#ffaa00';
            ctx.fillRect(centerX - turretBaseWidth / 2 + 2, this.y + 19, turretBaseWidth - 4, 2);
            
            // Turret barrel
            ctx.fillStyle = '#cc6600';
            ctx.fillRect(centerX - 3, this.y + 10, 6, 10 * levelScale);
            ctx.fillStyle = '#ff9900';
            ctx.fillRect(centerX - 2, this.y + 11, 4, 9 * levelScale);
            
            // Barrel tip/muzzle
            ctx.fillStyle = '#330000';
            ctx.fillRect(centerX - 3, this.y + 8, 6, 3);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(centerX - 2, this.y + 9, 4, 2);
            
            // Turret detail - targeting sensors (yellow at max level)
            ctx.fillStyle = turretLevel === CONFIG.addons.maxLevel ? '#ffff00' : '#ff0000';
            ctx.fillRect(centerX - turretBaseWidth / 2 + 2, this.y + 21, 2, 2);
            ctx.fillRect(centerX + turretBaseWidth / 2 - 4, this.y + 21, 2, 2);
            
            // Level indicator lights (max 3 visible, yellow at max level)
            const maxTurretLights = 3;
            for (let i = 0; i < Math.min(turretLevel, maxTurretLights); i++) {
                ctx.fillStyle = turretLevel === CONFIG.addons.maxLevel ? '#ffff00' : '#00ff00';
                ctx.fillRect(centerX - 1 + (i - 1) * 2, this.y + 24, 1, 1);
            }
        }

        // Draw shield indicator (cyan color indicates shield energy field)
        if (this.shield < this.maxShield) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${this.shield / this.maxShield})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, this.width / 2 + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    takeDamage(damage) {
        // GodMode prevents all damage
        if (gameState.godMode) return;
        
        // Record the time of damage
        gameState.lastDamageTime = Date.now();
        
        // Damage shield first
        if (this.shield > 0) {
            this.shield -= damage;
            if (this.shield < 0) {
                // Overflow damage goes to structure
                const overflow = Math.abs(this.shield);
                this.shield = 0;
                this.structure -= overflow;
            }
        } else {
            // Shield depleted, damage structure
            this.structure -= damage;
        }
        
        if (this.structure <= 0) {
            this.structure = 0;
            gameOver();
        }
        updateHUD();
    }

    healShield(amount) {
        this.shield = Math.min(this.maxShield, this.shield + amount);
        updateHUD();
    }

    boostShield(amount) {
        this.maxShield += amount;
        this.shield = Math.min(this.maxShield, this.shield + amount);
        updateHUD();
    }

    repairStructure(amount) {
        this.structure = Math.min(this.maxStructure, this.structure + amount);
        updateHUD();
    }

    boostStructure(amount) {
        this.maxStructure += amount;
        this.structure = Math.min(this.maxStructure, this.structure + amount);
        updateHUD();
    }
}

// Enemy Class
class Enemy {
    constructor(type = 'standard', wave = 1) {
        this.type = type;
        const config = CONFIG.enemy.types[type];
        
        // Apply wave-based scaling
        const healthMultiplier = 1 + (wave - 1) * CONFIG.enemy.healthScaling;
        const damageMultiplier = 1 + (wave - 1) * CONFIG.enemy.damageScaling;
        
        this.width = config.width;
        this.height = config.height;
        this.x = Math.random() * (CONFIG.canvas.width - this.width);
        this.y = -this.height;
        this.speed = config.speed + Math.random() * 0.5;
        this.health = Math.floor(config.health * healthMultiplier);
        this.maxHealth = this.health;
        this.color = config.color;
        this.weapon = config.weapon;
        this.lastFire = 0;
        this.fireRate = config.fireRate + Math.random() * 500;
        this.damage = Math.floor(config.damage * damageMultiplier);
        this.points = config.points;
        this.pellets = config.pellets || 1;
        this.spread = config.spread || 0;
        this.bulletSpeed = config.bulletSpeed || CONFIG.bullet.enemySpeed; // Use custom speed or default
        
        // Turret support for cruiser and battleship
        this.hasTurrets = config.hasTurrets || false;
        if (this.hasTurrets) {
            this.turretWeapon = config.turretWeapon;
            this.turretFireRate = config.turretFireRate;
            this.turretDamage = Math.floor(config.turretDamage * damageMultiplier);
            this.lastTurretFire = 0;
        }
        
        // Drone deployment for battleship
        this.deployDrones = config.deployDrones || false;
        if (this.deployDrones) {
            this.droneDeployRate = config.droneDeployRate;
            this.lastDroneDeploy = 0;
        }
    }

    update() {
        this.y += this.speed;
        
        const now = Date.now();
        
        // Main weapon shooting
        if (now - this.lastFire > this.fireRate && this.y > 50 && this.y < CONFIG.canvas.height - 100) {
            this.shoot();
            this.lastFire = now;
        }
        
        // Turret shooting (for cruiser and battleship)
        if (this.hasTurrets && now - this.lastTurretFire > this.turretFireRate && this.y > 50 && this.y < CONFIG.canvas.height - 100) {
            this.shootTurrets();
            this.lastTurretFire = now;
        }
        
        // Drone deployment (for battleship)
        if (this.deployDrones && now - this.lastDroneDeploy > this.droneDeployRate && this.y > 50 && this.y < CONFIG.canvas.height - 200) {
            this.deployDrone();
            this.lastDroneDeploy = now;
        }

        return this.y < CONFIG.canvas.height + this.height;
    }

    shoot() {
        if (this.weapon === 'blaster') {
            // Shoot spread pattern
            for (let i = 0; i < this.pellets; i++) {
                const spreadAngle = (Math.random() - 0.5) * this.spread;
                const targetX = gameState.player.x + gameState.player.width / 2 + spreadAngle * CONFIG.enemy.blasterSpreadRange;
                const targetY = gameState.player.y + gameState.player.height / 2;
                const bullet = new EnemyBullet(
                    this.x + this.width / 2,
                    this.y + this.height,
                    targetX,
                    targetY,
                    this.damage,
                    'blaster',
                    this.bulletSpeed
                );
                gameState.enemyBullets.push(bullet);
            }
        } else {
            // Shoot straight at player
            const bullet = new EnemyBullet(
                this.x + this.width / 2,
                this.y + this.height,
                gameState.player.x + gameState.player.width / 2,
                gameState.player.y + gameState.player.height / 2,
                this.damage,
                this.weapon,
                this.bulletSpeed
            );
            gameState.enemyBullets.push(bullet);
        }
    }
    
    shootTurrets() {
        // Left turret
        const leftBullet = new EnemyBullet(
            this.x + this.width * 0.25,
            this.y + this.height / 2,
            gameState.player.x + gameState.player.width / 2,
            gameState.player.y + gameState.player.height / 2,
            this.turretDamage,
            this.turretWeapon
        );
        gameState.enemyBullets.push(leftBullet);
        
        // Right turret
        const rightBullet = new EnemyBullet(
            this.x + this.width * 0.75,
            this.y + this.height / 2,
            gameState.player.x + gameState.player.width / 2,
            gameState.player.y + gameState.player.height / 2,
            this.turretDamage,
            this.turretWeapon
        );
        gameState.enemyBullets.push(rightBullet);
    }
    
    deployDrone() {
        const drone = new EnemyDrone(
            this.x + this.width / 2,
            this.y + this.height
        );
        gameState.enemyDrones.push(drone);
    }

    draw() {
        const now = Date.now();
        const centerX = this.x + this.width / 2;
        
        // Animated engine flame effect (enemies fly downward, so flame at top/back)
        const flamePulse = Math.sin(now / 40) * 0.5 + 0.5; // Faster pulse for enemies
        const flameFlicker = Math.random() * 0.3 + 0.7;
        
        // Scale flame size based on ship size
        const flameScale = this.width / 30; // 30 is standard width
        const baseFlameHeight = (4 + flamePulse * 3) * flameFlicker * flameScale;
        const flameY = this.y; // Top of the ship
        
        // Draw engine flames (multiple for larger ships)
        const numEngines = this.type === 'battleship' ? 3 : (this.type === 'cruiser' || this.type === 'heavy' ? 2 : 1);
        for (let e = 0; e < numEngines; e++) {
            const engineX = numEngines === 1 ? centerX : (centerX - this.width * 0.25 + (e * this.width * 0.5));
            
            // Outer flame (reddish/orange - enemy theme)
            ctx.fillStyle = `rgba(255, 100, 0, ${0.6 * flameFlicker})`;
            ctx.beginPath();
            ctx.moveTo(engineX, flameY);
            ctx.lineTo(engineX - 2 * flameScale, flameY - baseFlameHeight * 0.6);
            ctx.lineTo(engineX, flameY - baseFlameHeight);
            ctx.lineTo(engineX + 2 * flameScale, flameY - baseFlameHeight * 0.6);
            ctx.closePath();
            ctx.fill();
            
            // Inner flame
            ctx.fillStyle = `rgba(255, 200, 0, ${0.8 * flameFlicker})`;
            ctx.beginPath();
            ctx.moveTo(engineX, flameY);
            ctx.lineTo(engineX - 1 * flameScale, flameY - baseFlameHeight * 0.7);
            ctx.lineTo(engineX, flameY - baseFlameHeight * 0.85);
            ctx.lineTo(engineX + 1 * flameScale, flameY - baseFlameHeight * 0.7);
            ctx.closePath();
            ctx.fill();
            
            // Core
            ctx.fillStyle = `rgba(255, 255, 100, ${0.9 * flameFlicker})`;
            ctx.beginPath();
            ctx.moveTo(engineX, flameY);
            ctx.lineTo(engineX - 0.5 * flameScale, flameY - baseFlameHeight * 0.4);
            ctx.lineTo(engineX, flameY - baseFlameHeight * 0.5);
            ctx.lineTo(engineX + 0.5 * flameScale, flameY - baseFlameHeight * 0.4);
            ctx.closePath();
            ctx.fill();
        }
        
        // Draw wings/side panels for larger ships
        if (this.type === 'heavy' || this.type === 'cruiser' || this.type === 'battleship') {
            const wingWidth = this.width * 0.15;
            const wingHeight = this.height * 0.6;
            const darkerColor = darkenColor(this.color, 40);
            
            // Left wing
            ctx.fillStyle = darkerColor;
            ctx.fillRect(this.x - wingWidth * 0.5, this.y + this.height * 0.2, wingWidth, wingHeight);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - wingWidth * 0.3, this.y + this.height * 0.25, wingWidth * 0.6, wingHeight * 0.8);
            
            // Right wing
            ctx.fillStyle = darkerColor;
            ctx.fillRect(this.x + this.width - wingWidth * 0.5, this.y + this.height * 0.2, wingWidth, wingHeight);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x + this.width - wingWidth * 0.3, this.y + this.height * 0.25, wingWidth * 0.6, wingHeight * 0.8);
        }
        
        // Draw main ship body with enhanced detail
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(centerX, this.y + this.height);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(centerX, this.y + this.height * 0.2);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.closePath();
        ctx.fill();
        
        // Add body outline for definition
        ctx.strokeStyle = lightenColor(this.color, 40);
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw cockpit/bridge based on ship type
        const cockpitSize = this.type === 'small' ? 3 : (this.type === 'standard' || this.type === 'advanced' ? 4 : 6);
        const cockpitY = this.y + this.height * 0.35;
        
        // Cockpit window
        ctx.fillStyle = '#003366';
        ctx.fillRect(centerX - cockpitSize, cockpitY, cockpitSize * 2, cockpitSize);
        ctx.fillStyle = '#0066cc';
        ctx.fillRect(centerX - cockpitSize + 1, cockpitY + 1, cockpitSize * 2 - 2, cockpitSize - 2);
        
        // Cockpit highlight
        ctx.fillStyle = '#00aaff';
        ctx.fillRect(centerX - cockpitSize + 1, cockpitY + 1, cockpitSize - 1, 1);
        
        // Draw weapon hardpoints for advanced types
        if (this.type === 'advanced' || this.type === 'heavy' || this.type === 'cruiser' || this.type === 'battleship') {
            ctx.fillStyle = '#880000';
            const weaponY = this.y + this.height * 0.6;
            ctx.fillRect(centerX - this.width * 0.3, weaponY, 3, 4);
            ctx.fillRect(centerX + this.width * 0.3 - 3, weaponY, 3, 4);
        }
        
        // Draw turrets for cruiser and battleship with enhanced design
        if (this.hasTurrets) {
            const turretSize = this.type === 'battleship' ? 8 : 6;
            const leftTurretX = this.x + this.width * 0.25;
            const rightTurretX = this.x + this.width * 0.75;
            const turretY = this.y + this.height / 2;
            
            // Left turret
            ctx.fillStyle = '#660000';
            ctx.fillRect(leftTurretX - turretSize/2 - 1, turretY - turretSize/2 - 1, turretSize + 2, turretSize + 2);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(leftTurretX - turretSize/2, turretY - turretSize/2, turretSize, turretSize);
            ctx.fillStyle = '#ff6666';
            ctx.fillRect(leftTurretX - turretSize/2 + 1, turretY - turretSize/2 + 1, turretSize - 2, turretSize - 2);
            
            // Right turret
            ctx.fillStyle = '#660000';
            ctx.fillRect(rightTurretX - turretSize/2 - 1, turretY - turretSize/2 - 1, turretSize + 2, turretSize + 2);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(rightTurretX - turretSize/2, turretY - turretSize/2, turretSize, turretSize);
            ctx.fillStyle = '#ff6666';
            ctx.fillRect(rightTurretX - turretSize/2 + 1, turretY - turretSize/2 + 1, turretSize - 2, turretSize - 2);
        }
        
        // Add armor plating details for larger ships
        if (this.type === 'heavy' || this.type === 'cruiser' || this.type === 'battleship') {
            const plateColor = darkenColor(this.color, 30);
            ctx.fillStyle = plateColor;
            
            // Horizontal armor plates
            ctx.fillRect(centerX - this.width * 0.35, this.y + this.height * 0.15, this.width * 0.7, 2);
            ctx.fillRect(centerX - this.width * 0.3, this.y + this.height * 0.5, this.width * 0.6, 2);
            
            // Vertical armor plates
            ctx.fillRect(centerX - this.width * 0.15, this.y + this.height * 0.2, 2, this.height * 0.4);
            ctx.fillRect(centerX + this.width * 0.15 - 2, this.y + this.height * 0.2, 2, this.height * 0.4);
        }
        
        // Status lights (pulsing red for danger)
        if (this.type !== 'small') {
            const lightPulse = Math.sin(now / 200) * 0.5 + 0.5;
            ctx.fillStyle = `rgba(255, 0, 0, ${0.5 + lightPulse * 0.5})`;
            const lightY = this.y + this.height * 0.15;
            ctx.fillRect(centerX - 1, lightY, 2, 2);
        }

        // Draw health bar
        if (this.health < this.maxHealth) {
            ctx.fillStyle = '#330000';
            ctx.fillRect(this.x, this.y - 8, this.width, 4);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x, this.y - 8, this.width * (this.health / this.maxHealth), 4);
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        return this.health <= 0;
    }
}

// Bullet Class
class Bullet {
    constructor(x, y, weapon, vx = 0, vy = 0, weaponLevel = null) {
        this.x = x;
        this.y = y;
        this.width = weapon === 'laser' ? 6 : 4;
        this.height = weapon === 'laser' ? 20 : (weapon === 'blaster' ? 6 : 12);
        const weaponConfig = CONFIG.weapons[weapon];
        this.speed = weaponConfig.speed;
        
        // Calculate damage based on weapon type and level
        if (weapon === 'railgun' || weapon === 'laser' || weapon === 'plasma' || weapon === 'blaster') {
            // Use provided weaponLevel or fall back to gameState level
            const effectiveLevel = weaponLevel !== null ? weaponLevel : gameState.weaponLevels[weapon];
            const levelConfig = CONFIG.weaponLevels[weapon].levels[effectiveLevel];
            this.damage = levelConfig.damage;
        } else {
            // Fallback for any other weapons (shouldn't happen with current setup)
            this.damage = weaponConfig.damage;
        }
        
        this.color = weaponConfig.color;
        this.weapon = weapon;
        this.vx = vx;
        this.vy = vy;
    }

    update() {
        this.y -= this.speed + this.vy;
        this.x += this.vx;
        return this.y > -this.height && this.x > -this.width && this.x < CONFIG.canvas.width + this.width;
    }

    draw() {
        if (this.weapon === 'laser') {
            // Laser beam effect
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - 1, this.y, this.width + 2, this.height);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(this.x + 1, this.y + 2, this.width - 2, this.height - 4);
        } else if (this.weapon === 'blaster') {
            // Spread pellets - draw as small circles
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Standard bullets
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            if (this.weapon === 'railgun') {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(this.x + 1, this.y + 2, this.width - 2, this.height - 4);
            }
        }
    }
}

// Boss Class
class Boss {
    constructor(type = 'blaster', wave = 1) {
        this.type = type;
        const config = CONFIG.boss.types[type];
        
        // Apply wave-based scaling
        const healthMultiplier = 1 + (wave - 1) * CONFIG.boss.healthScaling;
        const damageMultiplier = 1 + (wave - 1) * CONFIG.boss.damageScaling;
        
        this.width = config.width;
        this.height = config.height;
        this.x = CONFIG.canvas.width / 2 - this.width / 2;
        this.y = -this.height;
        this.speed = config.speed;
        this.health = Math.floor(config.health * healthMultiplier);
        this.maxHealth = this.health;
        this.color = config.color;
        this.weapon = config.weapon;
        this.lastFire = 0;
        this.fireRate = config.fireRate;
        this.damage = Math.floor(config.damage * damageMultiplier);
        this.points = config.points;
        this.moveDirection = 1;
        this.targetY = 100;
        this.name = config.name;
        this.pellets = config.pellets || 1;
        this.spread = config.spread || 0;
        
        // Turret support
        this.hasTurrets = config.hasTurrets || false;
        if (this.hasTurrets) {
            this.turretWeapon = config.turretWeapon;
            this.turretFireRate = config.turretFireRate;
            this.turretDamage = Math.floor(config.turretDamage * damageMultiplier);
            this.lastTurretFire = 0;
        }
        
        // Drone deployment
        this.deployDrones = config.deployDrones || false;
        if (this.deployDrones) {
            this.droneDeployRate = config.droneDeployRate;
            this.lastDroneDeploy = 0;
        }
    }

    update() {
        // Move into position
        if (this.y < this.targetY) {
            this.y += this.speed;
        } else {
            // Move side to side
            this.x += this.moveDirection * this.speed;
            if (this.x <= 0 || this.x + this.width >= CONFIG.canvas.width) {
                this.moveDirection *= -1;
            }
        }
        
        const now = Date.now();
        
        // Main weapon shooting
        if (now - this.lastFire > this.fireRate && this.y >= this.targetY) {
            this.shoot();
            this.lastFire = now;
        }
        
        // Turret shooting
        if (this.hasTurrets && now - this.lastTurretFire > this.turretFireRate && this.y >= this.targetY) {
            this.shootTurrets();
            this.lastTurretFire = now;
        }
        
        // Drone deployment
        if (this.deployDrones && now - this.lastDroneDeploy > this.droneDeployRate && this.y >= this.targetY) {
            this.deployDrone();
            this.lastDroneDeploy = now;
        }

        return true;
    }

    shoot() {
        if (this.weapon === 'blaster') {
            // Shoot spread pattern towards player
            for (let i = 0; i < this.pellets; i++) {
                const spreadAngle = (Math.random() - 0.5) * this.spread;
                const targetX = gameState.player.x + gameState.player.width / 2 + spreadAngle * CONFIG.boss.blasterSpreadRange;
                const targetY = gameState.player.y + gameState.player.height / 2;
                const bullet = new EnemyBullet(
                    this.x + this.width / 2,
                    this.y + this.height,
                    targetX,
                    targetY,
                    this.damage,
                    'blaster'
                );
                gameState.enemyBullets.push(bullet);
            }
        } else if (this.weapon === 'railgun') {
            // Shoot intervals straight down
            for (let i = -1; i <= 1; i++) {
                const bullet = new EnemyBullet(
                    this.x + this.width / 2 + (i * 20),
                    this.y + this.height,
                    this.x + this.width / 2 + (i * 20),
                    CONFIG.canvas.height,
                    this.damage,
                    'railgun'
                );
                gameState.enemyBullets.push(bullet);
            }
        } else {
            // Shoot at player (plasma or laser)
            const bullet = new EnemyBullet(
                this.x + this.width / 2,
                this.y + this.height,
                gameState.player.x + gameState.player.width / 2,
                gameState.player.y + gameState.player.height / 2,
                this.damage,
                this.weapon
            );
            gameState.enemyBullets.push(bullet);
        }
    }
    
    shootTurrets() {
        // Left turret
        const leftBullet = new EnemyBullet(
            this.x + this.width * 0.25,
            this.y + this.height / 2,
            gameState.player.x + gameState.player.width / 2,
            gameState.player.y + gameState.player.height / 2,
            this.turretDamage,
            this.turretWeapon
        );
        gameState.enemyBullets.push(leftBullet);
        
        // Right turret
        const rightBullet = new EnemyBullet(
            this.x + this.width * 0.75,
            this.y + this.height / 2,
            gameState.player.x + gameState.player.width / 2,
            gameState.player.y + gameState.player.height / 2,
            this.turretDamage,
            this.turretWeapon
        );
        gameState.enemyBullets.push(rightBullet);
    }
    
    deployDrone() {
        const drone = new EnemyDrone(
            this.x + this.width / 2,
            this.y + this.height
        );
        gameState.enemyDrones.push(drone);
    }

    draw() {
        const now = Date.now();
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        
        // Draw animated engine arrays (multiple engines for massive ship)
        const flamePulse = Math.sin(now / 50) * 0.5 + 0.5;
        const flameFlicker = Math.random() * 0.3 + 0.7;
        const numEngines = 5;
        
        for (let e = 0; e < numEngines; e++) {
            const engineX = this.x + (this.width / (numEngines + 1)) * (e + 1);
            const engineSize = 3 + (e === 2 ? 2 : 0); // Center engine larger
            const flameHeight = (6 + flamePulse * 4) * flameFlicker;
            
            // Engine glow
            ctx.fillStyle = `rgba(255, 100, 0, ${0.6 * flameFlicker})`;
            ctx.beginPath();
            ctx.moveTo(engineX, this.y);
            ctx.lineTo(engineX - engineSize, this.y - flameHeight * 0.6);
            ctx.lineTo(engineX, this.y - flameHeight);
            ctx.lineTo(engineX + engineSize, this.y - flameHeight * 0.6);
            ctx.closePath();
            ctx.fill();
            
            ctx.fillStyle = `rgba(255, 200, 0, ${0.8 * flameFlicker})`;
            ctx.beginPath();
            ctx.moveTo(engineX, this.y);
            ctx.lineTo(engineX - engineSize * 0.6, this.y - flameHeight * 0.7);
            ctx.lineTo(engineX, this.y - flameHeight * 0.85);
            ctx.lineTo(engineX + engineSize * 0.6, this.y - flameHeight * 0.7);
            ctx.closePath();
            ctx.fill();
        }
        
        // Draw outer hull armor (darker shade)
        const armorColor = darkenColor(this.color, 50);
        
        // Main hull structure
        ctx.fillStyle = armorColor;
        ctx.fillRect(this.x + 10, this.y, this.width - 20, this.height);
        ctx.beginPath();
        ctx.moveTo(centerX, this.y + this.height);
        ctx.lineTo(this.x, centerY);
        ctx.lineTo(this.x + 10, this.y);
        ctx.lineTo(this.x + this.width - 10, this.y);
        ctx.lineTo(this.x + this.width, centerY);
        ctx.closePath();
        ctx.fill();
        
        // Inner hull (lighter color)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + 18, this.y + 8, this.width - 36, this.height - 16);
        ctx.beginPath();
        ctx.moveTo(centerX, this.y + this.height - 8);
        ctx.lineTo(this.x + 8, centerY);
        ctx.lineTo(this.x + 18, this.y + 8);
        ctx.lineTo(this.x + this.width - 18, this.y + 8);
        ctx.lineTo(this.x + this.width - 8, centerY);
        ctx.closePath();
        ctx.fill();
        
        // Add armor plating lines
        const plateColor = lightenColor(this.color, 30);
        ctx.strokeStyle = plateColor;
        ctx.lineWidth = 2;
        
        // Horizontal plates
        ctx.beginPath();
        ctx.moveTo(this.x + 15, this.y + this.height * 0.25);
        ctx.lineTo(this.x + this.width - 15, this.y + this.height * 0.25);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.x + 15, this.y + this.height * 0.5);
        ctx.lineTo(this.x + this.width - 15, this.y + this.height * 0.5);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.x + 15, this.y + this.height * 0.75);
        ctx.lineTo(this.x + this.width - 15, this.y + this.height * 0.75);
        ctx.stroke();
        
        // Vertical plates
        ctx.beginPath();
        ctx.moveTo(this.x + this.width * 0.25, this.y + 10);
        ctx.lineTo(this.x + this.width * 0.25, this.y + this.height - 10);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.x + this.width * 0.75, this.y + 10);
        ctx.lineTo(this.x + this.width * 0.75, this.y + this.height - 10);
        ctx.stroke();
        
        // Draw command bridge (elevated center structure)
        const bridgeWidth = this.width * 0.3;
        const bridgeHeight = this.height * 0.4;
        const bridgeX = centerX - bridgeWidth / 2;
        const bridgeY = this.y + this.height * 0.15;
        
        ctx.fillStyle = '#660000';
        ctx.fillRect(bridgeX - 2, bridgeY - 2, bridgeWidth + 4, bridgeHeight + 4);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(bridgeX, bridgeY, bridgeWidth, bridgeHeight);
        ctx.fillStyle = '#ff6666';
        ctx.fillRect(bridgeX + 2, bridgeY + 2, bridgeWidth - 4, bridgeHeight - 4);
        
        // Bridge windows
        ctx.fillStyle = '#003366';
        const windowWidth = bridgeWidth * 0.8;
        const windowHeight = 8;
        ctx.fillRect(centerX - windowWidth / 2, bridgeY + bridgeHeight * 0.3, windowWidth, windowHeight);
        ctx.fillStyle = '#0099ff';
        ctx.fillRect(centerX - windowWidth / 2 + 1, bridgeY + bridgeHeight * 0.3 + 1, windowWidth - 2, windowHeight - 2);
        
        // Window highlights (animated)
        const windowGlow = Math.sin(now / 300) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(0, 200, 255, ${windowGlow})`;
        ctx.fillRect(centerX - windowWidth / 2 + 2, bridgeY + bridgeHeight * 0.3 + 2, windowWidth * 0.3, 2);
        
        // Draw weapon systems based on boss type
        if (this.weapon === 'blaster') {
            // Blaster cannons
            const cannonY = this.y + this.height * 0.6;
            ctx.fillStyle = '#ff8800';
            ctx.fillRect(this.x + 15, cannonY, 8, 12);
            ctx.fillRect(this.x + this.width - 23, cannonY, 8, 12);
            ctx.fillStyle = '#ffaa00';
            ctx.fillRect(this.x + 17, cannonY + 2, 4, 8);
            ctx.fillRect(this.x + this.width - 21, cannonY + 2, 4, 8);
        } else if (this.weapon === 'railgun') {
            // Railgun arrays
            const railgunY = this.y + this.height * 0.55;
            for (let i = 0; i < 3; i++) {
                const railX = centerX - 12 + i * 12;
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(railX, railgunY, 4, 15);
                ctx.fillStyle = '#ffff88';
                ctx.fillRect(railX + 1, railgunY + 2, 2, 11);
            }
        } else if (this.weapon === 'plasma') {
            // Plasma cannons
            const plasmaY = this.y + this.height * 0.65;
            ctx.fillStyle = '#00ffff';
            ctx.fillRect(this.x + 20, plasmaY, 10, 10);
            ctx.fillRect(this.x + this.width - 30, plasmaY, 10, 10);
            ctx.fillStyle = '#88ffff';
            ctx.fillRect(this.x + 22, plasmaY + 2, 6, 6);
            ctx.fillRect(this.x + this.width - 28, plasmaY + 2, 6, 6);
        }
        
        // Draw turrets with enhanced design
        if (this.hasTurrets) {
            const turretSize = 12;
            const leftTurretX = this.x + this.width * 0.2;
            const rightTurretX = this.x + this.width * 0.8;
            const turretY = centerY;
            
            for (let turretX of [leftTurretX, rightTurretX]) {
                // Turret base
                ctx.fillStyle = '#440000';
                ctx.beginPath();
                ctx.arc(turretX, turretY, turretSize + 2, 0, Math.PI * 2);
                ctx.fill();
                
                // Turret body
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(turretX, turretY, turretSize, 0, Math.PI * 2);
                ctx.fill();
                
                // Turret top
                ctx.fillStyle = '#ff6666';
                ctx.beginPath();
                ctx.arc(turretX, turretY, turretSize - 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Turret barrel (pointing down toward player)
                ctx.fillStyle = '#880000';
                ctx.fillRect(turretX - 2, turretY + turretSize - 2, 4, 8);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(turretX - 1, turretY + turretSize - 1, 2, 7);
            }
        }
        
        // Shield generators (pulsing energy fields)
        const shieldPulse = Math.sin(now / 150) * 0.3 + 0.5;
        ctx.fillStyle = `rgba(255, 0, 255, ${shieldPulse})`;
        ctx.fillRect(this.x + this.width * 0.1, this.y + this.height * 0.2, 6, 6);
        ctx.fillRect(this.x + this.width * 0.9 - 6, this.y + this.height * 0.2, 6, 6);
        
        // Status lights (animated)
        const lightPulse = Math.sin(now / 100) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 0, 0, ${0.6 + lightPulse * 0.4})`;
        for (let i = 0; i < 4; i++) {
            const lightX = this.x + 25 + i * 15;
            ctx.fillRect(lightX, this.y + 10, 3, 3);
        }
        
        // Drone bay indicator (if applicable)
        if (this.deployDrones) {
            ctx.fillStyle = '#ff00ff';
            ctx.fillRect(centerX - 8, this.y + this.height - 15, 16, 10);
            ctx.fillStyle = '#ff88ff';
            ctx.fillRect(centerX - 6, this.y + this.height - 13, 12, 6);
        }

        // Draw health bar with segments
        const healthBarHeight = 8;
        ctx.fillStyle = '#330000';
        ctx.fillRect(this.x, this.y - 15, this.width, healthBarHeight);
        
        // Segmented health bar for boss
        const healthPercent = this.health / this.maxHealth;
        const segments = 10;
        const segmentWidth = (this.width - segments + 1) / segments;
        
        for (let i = 0; i < segments; i++) {
            if (i < healthPercent * segments) {
                const segmentHealth = healthPercent * segments - i;
                const alpha = segmentHealth >= 1 ? 1 : segmentHealth;
                ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
                ctx.fillRect(this.x + i * (segmentWidth + 1), this.y - 15, segmentWidth, healthBarHeight);
            }
        }
        
        // Draw boss name with glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = this.color;
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, centerX, this.y - 20);
        ctx.shadowBlur = 0;
        ctx.textAlign = 'left';
    }

    takeDamage(damage) {
        this.health -= damage;
        return this.health <= 0;
    }
}

// Asteroid Class
class Asteroid {
    constructor() {
        this.width = 30 + Math.random() * 20;
        this.height = this.width;
        this.x = Math.random() * (CONFIG.canvas.width - this.width);
        this.y = -this.height;
        this.speed = CONFIG.asteroid.speed + Math.random();
        this.health = CONFIG.asteroid.health;
        this.maxHealth = this.health;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        this.points = CONFIG.asteroid.points;
        
        // Pre-generate shape points to avoid flickering
        this.shapePoints = [];
        const sides = 8;
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            const radius = this.width / 2 * (0.7 + Math.random() * 0.3);
            this.shapePoints.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            });
        }
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        return this.y < CONFIG.canvas.height + this.height;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        // Draw asteroid using pre-generated shape
        ctx.fillStyle = '#888888';
        ctx.beginPath();
        for (let i = 0; i < this.shapePoints.length; i++) {
            const point = this.shapePoints[i];
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.closePath();
        ctx.fill();
        
        // Add some detail
        ctx.fillStyle = '#666666';
        ctx.fillRect(-5, -5, 10, 10);
        ctx.fillRect(3, 3, 6, 6);
        
        ctx.restore();

        // Draw health bar if damaged
        if (this.health < this.maxHealth) {
            ctx.fillStyle = '#330000';
            ctx.fillRect(this.x, this.y - 8, this.width, 4);
            ctx.fillStyle = '#888888';
            ctx.fillRect(this.x, this.y - 8, this.width * (this.health / this.maxHealth), 4);
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        return this.health <= 0;
    }
}

// Enemy Bullet Class
class EnemyBullet {
    constructor(x, y, targetX, targetY, damage = 20, weapon = 'plasma', bulletSpeed = null) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 8;
        this.weapon = weapon;
        
        // Use custom bullet speed or default
        const speed = bulletSpeed !== null ? bulletSpeed : CONFIG.bullet.enemySpeed;
        
        // Calculate direction to player
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;
        this.damage = damage;
        
        // Set weapon-specific properties (color, size, speed)
        switch(weapon) {
            case 'laser':
                this.color = '#ff0000';
                this.width = 6;  // Laser is larger
                this.height = 12;
                break;
            case 'plasma':
                this.color = '#00ffff';
                break;
            case 'railgun':
                this.color = '#ffff00';
                this.vx *= 1.5;  // Railgun is faster
                this.vy *= 1.5;
                break;
            case 'blaster':
                this.color = '#ff8800';
                break;
            default:
                this.color = '#ff0000';
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        return this.y < CONFIG.canvas.height + this.height && 
               this.x > -this.width && 
               this.x < CONFIG.canvas.width + this.width;
    }

    draw() {
        if (this.weapon === 'laser') {
            // Laser beam effect
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - 1, this.y, this.width + 2, this.height);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(this.x + 1, this.y + 2, this.width - 2, this.height - 4);
        } else {
            // Standard circular bullet
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Turret Bullet Class
class TurretBullet {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 8; // Enemy-style bullet dimensions
        
        // Calculate direction to target
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        this.vx = (dx / distance) * CONFIG.addons.turret.speed;
        this.vy = (dy / distance) * CONFIG.addons.turret.speed;
        this.damage = CONFIG.addons.turret.damage;
        this.color = '#ff0000'; // Red color for enemy-style turret bullets
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        return this.y > -this.height && 
               this.y < CONFIG.canvas.height + this.height &&
               this.x > -this.width && 
               this.x < CONFIG.canvas.width + this.width;
    }

    draw() {
        // Enemy-style bullet rendering (circular)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Powerup Class
class Powerup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.type = type; // 'shieldHeal', 'shieldBoost', 'structureRepair', 'repairBot', 'wings', 'nose', 'kamikaze', 'turret', 'weaponLevel'
        this.speed = 1;
        this.rotation = 0;
    }

    update() {
        this.y += this.speed;
        this.rotation += 0.05;
        return this.y < CONFIG.canvas.height + this.height;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        switch (this.type) {
            case 'shieldHeal':
                // Shield heal icon (cyan shield with +)
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#00ffff';
                ctx.fillRect(-5, -1, 10, 2);
                ctx.fillRect(-1, -5, 2, 10);
                break;
            case 'shieldBoost':
                // Shield boost icon (cyan shield with arrow up)
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#00ffff';
                ctx.beginPath();
                ctx.moveTo(0, -6);
                ctx.lineTo(-3, -2);
                ctx.lineTo(3, -2);
                ctx.closePath();
                ctx.fill();
                ctx.fillRect(-1, -2, 2, 8);
                break;
            case 'structureRepair':
                // Structure repair icon (wrench/hammer)
                ctx.strokeStyle = '#ffa500';
                ctx.lineWidth = 2;
                ctx.fillStyle = '#ffa500';
                // Wrench body
                ctx.fillRect(-2, -8, 4, 12);
                // Wrench head
                ctx.beginPath();
                ctx.arc(0, -8, 4, 0, Math.PI * 2);
                ctx.fill();
                // Wrench handle
                ctx.fillRect(-1, 4, 2, 6);
                break;
            case 'repairBot':
                // Repair bot icon (small robot/drone)
                ctx.fillStyle = '#00ff00';
                // Bot body
                ctx.fillRect(-5, -5, 10, 10);
                ctx.fillStyle = '#ffff00';
                // Bot eyes
                ctx.fillRect(-4, -3, 2, 2);
                ctx.fillRect(2, -3, 2, 2);
                // Bot antenna
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, -5);
                ctx.lineTo(0, -8);
                ctx.stroke();
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(0, -8, 2, 0, Math.PI * 2);
                ctx.fill();
                // Bot propellers
                ctx.strokeStyle = '#00ff00';
                ctx.beginPath();
                ctx.moveTo(-8, 0);
                ctx.lineTo(-5, 0);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(8, 0);
                ctx.lineTo(5, 0);
                ctx.stroke();
                break;
            case 'wings':
                // Wing addon icon
                ctx.fillStyle = '#00ff00';
                ctx.fillRect(-10, -6, 20, 12);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(-8, -2, 4, 4);
                ctx.fillRect(4, -2, 4, 4);
                break;
            case 'nose':
                // Nose/armor icon
                ctx.fillStyle = '#00ffff';
                ctx.beginPath();
                ctx.moveTo(0, -10);
                ctx.lineTo(-8, 8);
                ctx.lineTo(8, 8);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#0088ff';
                ctx.fillRect(-4, 0, 8, 6);
                break;
            case 'kamikaze':
                // Kamikaze drone icon (explosive drone)
                ctx.fillStyle = '#ff00ff';
                // Drone diamond shape
                ctx.beginPath();
                ctx.moveTo(0, -8);
                ctx.lineTo(8, 0);
                ctx.lineTo(0, 8);
                ctx.lineTo(-8, 0);
                ctx.closePath();
                ctx.fill();
                // Center warning
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(-3, -3, 6, 6);
                // Explosion effect lines
                ctx.strokeStyle = '#ff0000';
                ctx.lineWidth = 2;
                for (let i = 0; i < 4; i++) {
                    const angle = (Math.PI / 2) * i + (Math.PI / 4);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(Math.cos(angle) * 10, Math.sin(angle) * 10);
                    ctx.stroke();
                }
                break;
            case 'turret':
                // Turret addon icon (gun turret)
                ctx.fillStyle = '#ff8800';
                // Turret base
                ctx.fillRect(-6, -2, 12, 8);
                // Turret barrel
                ctx.fillStyle = '#ffaa00';
                ctx.fillRect(-2, -8, 4, 10);
                // Turret tip
                ctx.fillRect(-3, -10, 6, 2);
                // Side details
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(-7, 0, 2, 4);
                ctx.fillRect(5, 0, 2, 4);
                break;
            case 'weaponLevel':
                // Weapon level upgrade icon (star/badge)
                ctx.fillStyle = '#ffff00';
                ctx.beginPath();
                // Draw star
                for (let i = 0; i < 5; i++) {
                    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                    const radius = i % 2 === 0 ? 8 : 4;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.closePath();
                ctx.fill();
                // Draw level up arrow
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.moveTo(0, -3);
                ctx.lineTo(-2, 0);
                ctx.lineTo(2, 0);
                ctx.closePath();
                ctx.fill();
                ctx.fillRect(-1, 0, 2, 3);
                break;
        }
        
        ctx.restore();
    }
}

// Particle Class for explosions
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        this.life = 30;
        this.maxLife = 30;
        this.color = color;
        this.size = Math.random() * 3 + 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        return this.life > 0;
    }

    draw() {
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1;
    }
}

// Kamikaze Drone Class
class KamikazeDrone {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 12;
        this.height = 12;
        this.speed = CONFIG.kamikazeDrone.speed;
        this.damage = CONFIG.kamikazeDrone.damage;
        this.target = null;
        this.color = '#ff00ff';
        this.rotation = 0;
        
        // Set random explosion time
        const explosionDelay = CONFIG.kamikazeDrone.explosionTimeMin + 
            Math.random() * (CONFIG.kamikazeDrone.explosionTimeMax - CONFIG.kamikazeDrone.explosionTimeMin);
        this.explosionTime = Date.now() + explosionDelay;
        
        // Find the nearest enemy as initial target
        this.findTarget();
    }

    findTarget() {
        // Find nearest enemy or boss
        let nearestTarget = null;
        let minDistance = Infinity;
        
        // Check regular enemies
        gameState.enemies.forEach(enemy => {
            const dx = enemy.x + enemy.width / 2 - this.x;
            const dy = enemy.y + enemy.height / 2 - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
                minDistance = distance;
                nearestTarget = enemy;
            }
        });
        
        // Check boss
        if (gameState.boss) {
            const boss = gameState.boss;
            const dx = boss.x + boss.width / 2 - this.x;
            const dy = boss.y + boss.height / 2 - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
                minDistance = distance;
                nearestTarget = boss;
            }
        }
        
        this.target = nearestTarget;
    }

    update() {
        const now = Date.now();
        
        // Check if explosion time reached
        if (now >= this.explosionTime) {
            createExplosion(this.x + this.width / 2, this.y + this.height / 2, this.color);
            return false; // Remove drone
        }
        
        // Check if target still exists
        if (this.target) {
            const targetExists = gameState.enemies.includes(this.target) || gameState.boss === this.target;
            if (!targetExists) {
                // Target was destroyed, just keep flying in the same direction
                this.target = null;
            }
        }
        
        // Move towards target or continue in current direction
        if (this.target) {
            const dx = this.target.x + this.target.width / 2 - this.x;
            const dy = this.target.y + this.target.height / 2 - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
                this.rotation = Math.atan2(dy, dx);
            }
        } else {
            // No target, continue flying upward
            this.y -= this.speed;
        }
        
        this.rotation += 0.1; // Spin the drone
        
        // Remove if off screen
        return this.y > -this.height && this.y < CONFIG.canvas.height + this.height &&
               this.x > -this.width && this.x < CONFIG.canvas.width + this.width;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        // Draw drone body (diamond shape)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.lineTo(6, 0);
        ctx.lineTo(0, 6);
        ctx.lineTo(-6, 0);
        ctx.closePath();
        ctx.fill();
        
        // Draw center
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(-2, -2, 4, 4);
        
        // Draw propeller lines
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(-6, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(6, 0);
        ctx.stroke();
        
        ctx.restore();
    }
}

// Enemy Drone Class (deployed by battleships and bosses)
class EnemyDrone {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = CONFIG.enemyDrone.width;
        this.height = CONFIG.enemyDrone.height;
        this.speed = CONFIG.enemyDrone.speed;
        this.health = CONFIG.enemyDrone.health;
        this.maxHealth = this.health;
        this.damage = CONFIG.enemyDrone.damage;
        this.color = CONFIG.enemyDrone.color;
        this.rotation = 0;
        this.points = CONFIG.enemyDrone.points;
        
        // Set explosion time (drones explode after 1 second)
        this.explosionTime = Date.now() + CONFIG.enemyDrone.explosionTime;
        
        // Lock on to player's current position (drones don't track, they kamikaze to a fixed point)
        // This gives the player a chance to dodge and makes drones more predictable
        this.targetX = gameState.player.x + gameState.player.width / 2;
        this.targetY = gameState.player.y + gameState.player.height / 2;
    }

    update() {
        const now = Date.now();
        
        // Check if explosion time reached
        if (now >= this.explosionTime) {
            // Explode and deal damage if near player
            const dx = (gameState.player.x + gameState.player.width / 2) - (this.x + this.width / 2);
            const dy = (gameState.player.y + gameState.player.height / 2) - (this.y + this.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < CONFIG.enemyDrone.explosionRadius) {
                // Close enough to damage player
                gameState.player.takeDamage(this.damage);
            }
            
            createExplosion(this.x + this.width / 2, this.y + this.height / 2, this.color);
            return false; // Remove drone
        }
        
        // Move towards last known player position
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
        
        this.rotation += 0.15; // Spin the drone
        
        // Remove if off screen
        return this.y < CONFIG.canvas.height + this.height && 
               this.x > -this.width && 
               this.x < CONFIG.canvas.width + this.width;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        
        // Draw drone body (diamond shape)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(this.width / 2, 0);
        ctx.lineTo(0, this.height / 2);
        ctx.lineTo(-this.width / 2, 0);
        ctx.closePath();
        ctx.fill();
        
        // Draw warning center (flashing)
        const flash = Math.floor(Date.now() / 200) % 2;
        ctx.fillStyle = flash ? '#ff0000' : '#ffff00';
        ctx.fillRect(-3, -3, 6, 6);
        
        ctx.restore();
        
        // Draw health bar if damaged
        if (this.health < this.maxHealth) {
            ctx.fillStyle = '#330000';
            ctx.fillRect(this.x, this.y - 6, this.width, 3);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x, this.y - 6, this.width * (this.health / this.maxHealth), 3);
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            createExplosion(this.x + this.width / 2, this.y + this.height / 2, this.color);
            return true;
        }
        return false;
    }
}

// Game Functions
function startGame() {
    resetGame();
    showScreen('game');
    gameLoop();
}

function resetGame() {
    gameState.score = 0;
    gameState.wave = 1;
    gameState.isPaused = false;
    gameState.isGameOver = false;
    gameState.player = new Player();
    gameState.enemies = [];
    gameState.boss = null;
    gameState.asteroids = [];
    gameState.bullets = [];
    gameState.enemyBullets = [];
    gameState.turretBullets = [];
    gameState.powerups = [];
    gameState.particles = [];
    gameState.lastFire = 0;
    gameState.lastEnemySpawn = 0;
    gameState.lastAsteroidSpawn = 0;
    gameState.scrollOffset = 0;
    gameState.enemiesDefeated = 0;
    gameState.enemiesInWave = 0;
    gameState.currentWeapon = 'plasma';
    gameState.weaponLevels = {
        laser: 1,
        plasma: 1,
        railgun: 1,
        blaster: 1
    };
    gameState.shipUpgrades = {
        wingsLevel: 0,
        noseLevel: 0,
        turretLevel: 0
    };
    gameState.lastTurretFire = 0;
    gameState.turretBurstCount = 0;
    gameState.turretBurstTarget = null;
    gameState.turretInBurst = false;
    gameState.bossActive = false;
    gameState.waveComplete = false;
    gameState.autoFire = false;
    gameState.repairBotActive = false;
    gameState.repairBotEndTime = 0;
    gameState.lastDamageTime = 0;
    gameState.pickupNotifications = [];
    gameState.kamikazeDrones = [];
    gameState.kamikazeDroneActive = false;
    gameState.kamikazeDronesRemaining = 0;
    gameState.lastDroneSpawn = 0;
    gameState.enemyDrones = [];
    
    // Apply full equipment if toggle is enabled
    if (gameState.fullEquipMode) {
        gameState.shipUpgrades = {
            wingsLevel: CONFIG.addons.maxLevel,
            noseLevel: CONFIG.addons.maxLevel,
            turretLevel: CONFIG.addons.maxLevel
        };
        gameState.weaponLevels = {
            laser: CONFIG.weaponLevels.maxLevel,
            plasma: CONFIG.weaponLevels.maxLevel,
            railgun: CONFIG.weaponLevels.maxLevel,
            blaster: CONFIG.weaponLevels.maxLevel
        };
        // Boost player stats to max for all addons
        gameState.player.maxStructure += CONFIG.addons.wings.structurePerLevel * CONFIG.addons.maxLevel;
        gameState.player.structure = gameState.player.maxStructure;
        gameState.player.maxShield += CONFIG.addons.nose.shieldPerLevel * CONFIG.addons.maxLevel;
        gameState.player.shield = gameState.player.maxShield;
    }
    
    updateHUD();
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.style.display = 'none');
    screens[screenName].style.display = 'flex';
    
    // Start or stop animations based on screen
    if (screenName === 'menu') {
        startMenuAnimation();
        stopWeaponsAnimation();
    } else if (screenName === 'weaponsOverview') {
        stopMenuAnimation();
        startWeaponsAnimation();
    } else {
        stopMenuAnimation();
        stopWeaponsAnimation();
    }
}

function showWeaponsOverview() {
    showScreen('weaponsOverview');
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    if (gameState.isPaused) {
        showScreen('pause');
    } else {
        showScreen('game');
        gameLoop();
    }
}

function resumeGame() {
    togglePause();
}

function quitToMenu() {
    gameState.isGameOver = true;
    showScreen('menu');
}

function gameOver() {
    gameState.isGameOver = true;
    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('final-wave').textContent = gameState.wave;
    showScreen('gameover');
}

function fireBullet() {
    const now = Date.now();
    const weaponConfig = CONFIG.weapons[gameState.currentWeapon];
    
    // Calculate fire rate based on weapon type and level
    let adjustedFireRate;
    if (gameState.currentWeapon === 'railgun' || gameState.currentWeapon === 'laser' || gameState.currentWeapon === 'plasma' || gameState.currentWeapon === 'blaster') {
        const weaponLevel = gameState.weaponLevels[gameState.currentWeapon];
        const levelConfig = CONFIG.weaponLevels[gameState.currentWeapon].levels[weaponLevel];
        adjustedFireRate = levelConfig.fireRate;
    } else {
        // Fallback for any other weapons
        adjustedFireRate = weaponConfig.fireRate;
    }
    
    if (now - gameState.lastFire < adjustedFireRate) return;

    gameState.lastFire = now;
    const player = gameState.player;
    const centerX = player.x + player.width / 2;
    const wingsLevel = gameState.shipUpgrades.wingsLevel;

    if (gameState.currentWeapon === 'blaster') {
        // Blaster fires multiple pellets in a spread from the ship
        const blasterLevel = gameState.weaponLevels.blaster;
        const levelConfig = CONFIG.weaponLevels.blaster.levels[blasterLevel];
        const blasterConfig = CONFIG.weapons.blaster;
        
        for (let i = 0; i < levelConfig.pellets; i++) {
            const spread = (Math.random() - 0.5) * blasterConfig.spread;
            const bullet = new Bullet(centerX, player.y, gameState.currentWeapon, spread * blasterConfig.spreadMultiplier, 0);
            gameState.bullets.push(bullet);
        }
        
        // Wings fire different weapons based on blaster level
        if (wingsLevel > 0) {
            const wingWeapon = levelConfig.wingWeapon;
            // Use current level of the wing weapon instead of hardcoded level
            // Clamp to valid range (1-maxLevel) to prevent invalid level access
            const currentLevel = gameState.weaponLevels[wingWeapon] || 1;
            const wingWeaponLevel = Math.max(1, Math.min(currentLevel, CONFIG.weaponLevels.maxLevel));
            const leftWingX = player.x - 12;
            const rightWingX = player.x + player.width + 12;
            const wingY = player.y + player.height / 2;
            
            // Fire wing weapons based on type
            if (wingWeapon === 'railgun') {
                // Railgun from wings
                const railgunLevelConfig = CONFIG.weaponLevels.railgun.levels[wingWeaponLevel];
                const bulletsPerShot = railgunLevelConfig.bullets;
                const bulletSpacing = 3;
                const getRandomYOffset = () => Math.floor(Math.random() * 3) - 1;
                
                if (bulletsPerShot === 1) {
                    gameState.bullets.push(new Bullet(leftWingX, wingY + getRandomYOffset(), wingWeapon, 0, 0, wingWeaponLevel));
                    gameState.bullets.push(new Bullet(rightWingX, wingY + getRandomYOffset(), wingWeapon, 0, 0, wingWeaponLevel));
                } else {
                    gameState.bullets.push(new Bullet(leftWingX - bulletSpacing, wingY + getRandomYOffset(), wingWeapon, 0, 0, wingWeaponLevel));
                    gameState.bullets.push(new Bullet(leftWingX + bulletSpacing, wingY + getRandomYOffset(), wingWeapon, 0, 0, wingWeaponLevel));
                    gameState.bullets.push(new Bullet(rightWingX - bulletSpacing, wingY + getRandomYOffset(), wingWeapon, 0, 0, wingWeaponLevel));
                    gameState.bullets.push(new Bullet(rightWingX + bulletSpacing, wingY + getRandomYOffset(), wingWeapon, 0, 0, wingWeaponLevel));
                }
            } else {
                // Laser or Plasma from wings
                gameState.bullets.push(new Bullet(leftWingX, wingY, wingWeapon, 0, 0, wingWeaponLevel));
                gameState.bullets.push(new Bullet(rightWingX, wingY, wingWeapon, 0, 0, wingWeaponLevel));
            }
        }
    } else if (gameState.currentWeapon === 'railgun') {
        // Railgun has special level-based behavior
        const railgunLevel = gameState.weaponLevels.railgun;
        const levelConfig = CONFIG.weaponLevels.railgun.levels[railgunLevel];
        const bulletsPerShot = levelConfig.bullets; // 1 for L1-L4, 2 for L5-L9
        const bulletSpacing = 3; // Spacing between parallel bullets
        
        // Random Y-offset for visual effect (+/- 1 pixel)
        const getRandomYOffset = () => Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        
        // Fire from center of ship
        if (bulletsPerShot === 1) {
            gameState.bullets.push(new Bullet(centerX - 2, player.y + getRandomYOffset(), gameState.currentWeapon));
        } else {
            // Two bullets in parallel from center
            gameState.bullets.push(new Bullet(centerX - bulletSpacing, player.y + getRandomYOffset(), gameState.currentWeapon));
            gameState.bullets.push(new Bullet(centerX + bulletSpacing, player.y + getRandomYOffset(), gameState.currentWeapon));
        }
        
        // Wings addon shoots additional bullets
        if (wingsLevel > 0) {
            const leftWingX = player.x - 12;
            const rightWingX = player.x + player.width + 12;
            const wingY = player.y + player.height / 2;
            
            if (bulletsPerShot === 1) {
                // Single bullet per wing (L1-L4)
                gameState.bullets.push(new Bullet(leftWingX, wingY + getRandomYOffset(), gameState.currentWeapon));
                gameState.bullets.push(new Bullet(rightWingX, wingY + getRandomYOffset(), gameState.currentWeapon));
            } else {
                // Two bullets in parallel per wing (L5-L9)
                gameState.bullets.push(new Bullet(leftWingX - bulletSpacing, wingY + getRandomYOffset(), gameState.currentWeapon));
                gameState.bullets.push(new Bullet(leftWingX + bulletSpacing, wingY + getRandomYOffset(), gameState.currentWeapon));
                gameState.bullets.push(new Bullet(rightWingX - bulletSpacing, wingY + getRandomYOffset(), gameState.currentWeapon));
                gameState.bullets.push(new Bullet(rightWingX + bulletSpacing, wingY + getRandomYOffset(), gameState.currentWeapon));
            }
        }
    } else {
        // Standard shot from center for laser and plasma
        gameState.bullets.push(new Bullet(centerX - 2, player.y, gameState.currentWeapon));
        
        // Wings addon shoots from sides
        if (wingsLevel > 0) {
            gameState.bullets.push(new Bullet(player.x - 12, player.y + player.height / 2, gameState.currentWeapon));
            gameState.bullets.push(new Bullet(player.x + player.width + 12, player.y + player.height / 2, gameState.currentWeapon));
        }
    }
    
    updateHUD();
}

function switchWeapon() {
    const weapons = ['laser', 'plasma', 'railgun', 'blaster'];
    const currentIndex = weapons.indexOf(gameState.currentWeapon);
    gameState.currentWeapon = weapons[(currentIndex + 1) % weapons.length];
    updateHUD();
}

function fireTurret() {
    // Find nearest enemy within range
    const maxRange = CONFIG.canvas.height * CONFIG.addons.turret.range;
    let nearestEnemy = null;
    let minDistance = maxRange;
    
    const player = gameState.player;
    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2;
    
    // Check regular enemies
    gameState.enemies.forEach(enemy => {
        const enemyCenterX = enemy.x + enemy.width / 2;
        const enemyCenterY = enemy.y + enemy.height / 2;
        const dx = enemyCenterX - playerCenterX;
        const dy = enemyCenterY - playerCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestEnemy = enemy;
        }
    });
    
    // Check boss
    if (gameState.boss) {
        const boss = gameState.boss;
        const bossCenterX = boss.x + boss.width / 2;
        const bossCenterY = boss.y + boss.height / 2;
        const dx = bossCenterX - playerCenterX;
        const dy = bossCenterY - playerCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestEnemy = boss;
        }
    }
    
    // Fire at nearest enemy if found (with level-based predictive aiming)
    if (nearestEnemy) {
        const enemyCenterX = nearestEnemy.x + nearestEnemy.width / 2;
        const enemyCenterY = nearestEnemy.y + nearestEnemy.height / 2;
        
        // Calculate predictive aim with level-based accuracy
        const turretLevel = gameState.shipUpgrades.turretLevel;
        const predictionAccuracy = Math.min(1, 0.5 + turretLevel * CONFIG.addons.turret.predictionAccuracyPerLevel);
        
        // Estimate time for bullet to reach target
        const dx = enemyCenterX - playerCenterX;
        const dy = enemyCenterY - playerCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const bulletSpeed = CONFIG.addons.turret.speed;
        const timeToImpact = distance / bulletSpeed;
        
        // Predict enemy position based on their velocity with level-based accuracy
        let predictedX = enemyCenterX;
        let predictedY = enemyCenterY;
        
        if (nearestEnemy.speed !== undefined) {
            // Regular enemy or boss moving downward
            if (gameState.boss === nearestEnemy) {
                // Boss moves horizontally
                const bossVx = nearestEnemy.moveDirection * nearestEnemy.speed;
                predictedX += bossVx * timeToImpact * predictionAccuracy;
            } else {
                // Regular enemy moves downward
                predictedY += nearestEnemy.speed * timeToImpact * predictionAccuracy;
            }
        }
        
        const bullet = new TurretBullet(
            playerCenterX,
            playerCenterY,
            predictedX,
            predictedY
        );
        gameState.turretBullets.push(bullet);
    }
}

function spawnEnemy() {
    // Don't spawn regular enemies if boss is active or wave is complete
    if (gameState.bossActive || gameState.waveComplete) return;
    
    const now = Date.now();
    if (now - gameState.lastEnemySpawn < CONFIG.enemy.spawnRate) return;

    gameState.lastEnemySpawn = now;
    
    // Check if it's time to spawn boss (after threshold enemies defeated)
    if (gameState.enemiesInWave >= CONFIG.boss.spawnThreshold && !gameState.bossActive) {
        spawnBoss();
        return;
    }
    
    // Progressive enemy type selection based on wave
    const wave = gameState.wave;
    const type = selectEnemyTypeForWave(wave);
    
    gameState.enemies.push(new Enemy(type, wave));
    gameState.enemiesInWave++;

    // Occasionally spawn multiple enemies (more frequent in higher waves)
    if (Math.random() < 0.3 + (wave * 0.03)) {
        setTimeout(() => {
            // Intentionally spawn weaker enemy types as secondary spawns for balance
            // This prevents overwhelming the player with too many strong enemies at once
            const secondType = wave === 1 ? 'small' : (Math.random() < 0.6 ? 'small' : 'standard');
            gameState.enemies.push(new Enemy(secondType, wave));
            gameState.enemiesInWave++;
        }, 200);
    }
}

function spawnBoss() {
    gameState.bossActive = true;
    const wave = gameState.wave;
    
    // Select boss type based on wave (cycling through types)
    const bossTypes = ['blaster', 'blasterDrone', 'plasmaDrone', 'railgunTurret'];
    const bossType = bossTypes[(wave - 1) % bossTypes.length];
    
    gameState.boss = new Boss(bossType, wave);
}

function selectEnemyTypeForWave(wave) {
    const roll = Math.random();
    
    // Wave 1: only small and standard
    if (wave === 1) {
        return roll < 0.6 ? 'small' : 'standard';
    }
    
    // Wave 2: introduce advanced
    if (wave === 2) {
        if (roll < 0.3) return 'small';
        if (roll < 0.6) return 'standard';
        return 'advanced';
    }
    
    // Wave 3: introduce heavy
    if (wave === 3) {
        if (roll < 0.2) return 'small';
        if (roll < 0.5) return 'standard';
        if (roll < 0.75) return 'advanced';
        return 'heavy';
    }
    
    // Wave 4: introduce cruiser
    if (wave === 4) {
        if (roll < 0.15) return 'small';
        if (roll < 0.35) return 'standard';
        if (roll < 0.6) return 'advanced';
        if (roll < 0.85) return 'heavy';
        return 'cruiser';
    }
    
    // Wave 5+: include battleship
    if (roll < 0.1) return 'small';
    if (roll < 0.25) return 'standard';
    if (roll < 0.45) return 'advanced';
    if (roll < 0.65) return 'heavy';
    if (roll < 0.85) return 'cruiser';
    return 'battleship';
}

function spawnAsteroid() {
    const now = Date.now();
    if (now - gameState.lastAsteroidSpawn < CONFIG.asteroid.spawnRate) return;

    gameState.lastAsteroidSpawn = now;
    
    // Spawn asteroids randomly
    if (Math.random() < 0.5) {
        gameState.asteroids.push(new Asteroid());
    }
}

function spawnPowerup(x, y) {
    if (Math.random() > CONFIG.powerup.spawnChance) return;

    const types = ['shieldHeal', 'shieldBoost', 'structureRepair', 'repairBot', 'wings', 'nose', 'kamikaze', 'turret', 'weaponLevel'];
    const type = types[Math.floor(Math.random() * types.length)];
    gameState.powerups.push(new Powerup(x, y, type));
}

function createExplosion(x, y, color) {
    for (let i = 0; i < 15; i++) {
        gameState.particles.push(new Particle(x, y, color));
    }
}

function showPickupNotification(text) {
    gameState.pickupNotifications.push({
        text: text,
        startTime: Date.now()
    });
}

function checkCollisions() {
    // Bullets vs Enemies
    for (let i = gameState.bullets.length - 1; i >= 0; i--) {
        const bullet = gameState.bullets[i];
        
        for (let j = gameState.enemies.length - 1; j >= 0; j--) {
            const enemy = gameState.enemies[j];
            
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                
                gameState.bullets.splice(i, 1);
                
                if (enemy.takeDamage(bullet.damage)) {
                    gameState.enemies.splice(j, 1);
                    gameState.score += enemy.points;
                    gameState.enemiesDefeated++;
                    createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
                    spawnPowerup(enemy.x, enemy.y);
                }
                
                updateHUD();
                break;
            }
        }
    }

    // Bullets vs Boss
    if (gameState.boss) {
        for (let i = gameState.bullets.length - 1; i >= 0; i--) {
            const bullet = gameState.bullets[i];
            
            // Check if boss still exists (could be destroyed by previous bullet)
            if (!gameState.boss) break;
            
            const boss = gameState.boss;
            
            if (bullet.x < boss.x + boss.width &&
                bullet.x + bullet.width > boss.x &&
                bullet.y < boss.y + boss.height &&
                bullet.y + bullet.height > boss.y) {
                
                gameState.bullets.splice(i, 1);
                
                if (boss.takeDamage(bullet.damage)) {
                    gameState.score += boss.points;
                    createExplosion(boss.x + boss.width / 2, boss.y + boss.height / 2, boss.color);
                    spawnPowerup(boss.x, boss.y);
                    gameState.boss = null;
                    gameState.bossActive = false;
                    gameState.waveComplete = true;
                    // Start next wave after delay
                    setTimeout(() => {
                        gameState.wave++;
                        gameState.waveComplete = false;
                        gameState.enemiesInWave = 0;
                        updateHUD();
                    }, CONFIG.wave.completionDelay);
                }
                
                updateHUD();
            }
        }
    }

    // Bullets vs Asteroids
    for (let i = gameState.bullets.length - 1; i >= 0; i--) {
        const bullet = gameState.bullets[i];
        
        for (let j = gameState.asteroids.length - 1; j >= 0; j--) {
            const asteroid = gameState.asteroids[j];
            
            if (bullet.x < asteroid.x + asteroid.width &&
                bullet.x + bullet.width > asteroid.x &&
                bullet.y < asteroid.y + asteroid.height &&
                bullet.y + bullet.height > asteroid.y) {
                
                gameState.bullets.splice(i, 1);
                
                if (asteroid.takeDamage(bullet.damage)) {
                    gameState.asteroids.splice(j, 1);
                    gameState.score += asteroid.points;
                    createExplosion(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2, '#888888');
                    spawnPowerup(asteroid.x, asteroid.y);
                }
                
                updateHUD();
                break;
            }
        }
    }

    // Turret Bullets vs Enemies
    for (let i = gameState.turretBullets.length - 1; i >= 0; i--) {
        const bullet = gameState.turretBullets[i];
        
        for (let j = gameState.enemies.length - 1; j >= 0; j--) {
            const enemy = gameState.enemies[j];
            
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                
                gameState.turretBullets.splice(i, 1);
                
                if (enemy.takeDamage(bullet.damage)) {
                    gameState.enemies.splice(j, 1);
                    gameState.score += enemy.points;
                    gameState.enemiesDefeated++;
                    createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
                    spawnPowerup(enemy.x, enemy.y);
                }
                
                updateHUD();
                break;
            }
        }
    }

    // Turret Bullets vs Boss
    if (gameState.boss) {
        for (let i = gameState.turretBullets.length - 1; i >= 0; i--) {
            const bullet = gameState.turretBullets[i];
            
            // Check if boss still exists
            if (!gameState.boss) break;
            
            const boss = gameState.boss;
            
            if (bullet.x < boss.x + boss.width &&
                bullet.x + bullet.width > boss.x &&
                bullet.y < boss.y + boss.height &&
                bullet.y + bullet.height > boss.y) {
                
                gameState.turretBullets.splice(i, 1);
                
                if (boss.takeDamage(bullet.damage)) {
                    gameState.score += boss.points;
                    createExplosion(boss.x + boss.width / 2, boss.y + boss.height / 2, boss.color);
                    spawnPowerup(boss.x, boss.y);
                    gameState.boss = null;
                    gameState.bossActive = false;
                    gameState.waveComplete = true;
                    // Start next wave after delay
                    setTimeout(() => {
                        gameState.wave++;
                        gameState.waveComplete = false;
                        gameState.enemiesInWave = 0;
                        updateHUD();
                    }, CONFIG.wave.completionDelay);
                }
                
                updateHUD();
            }
        }
    }

    // Turret Bullets vs Asteroids
    for (let i = gameState.turretBullets.length - 1; i >= 0; i--) {
        const bullet = gameState.turretBullets[i];
        
        for (let j = gameState.asteroids.length - 1; j >= 0; j--) {
            const asteroid = gameState.asteroids[j];
            
            if (bullet.x < asteroid.x + asteroid.width &&
                bullet.x + bullet.width > asteroid.x &&
                bullet.y < asteroid.y + asteroid.height &&
                bullet.y + bullet.height > asteroid.y) {
                
                gameState.turretBullets.splice(i, 1);
                
                if (asteroid.takeDamage(bullet.damage)) {
                    gameState.asteroids.splice(j, 1);
                    gameState.score += asteroid.points;
                    createExplosion(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2, '#888888');
                    spawnPowerup(asteroid.x, asteroid.y);
                }
                
                updateHUD();
                break;
            }
        }
    }

    // Enemy Bullets vs Player
    for (let i = gameState.enemyBullets.length - 1; i >= 0; i--) {
        const bullet = gameState.enemyBullets[i];
        const player = gameState.player;
        
        if (bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y) {
            
            gameState.enemyBullets.splice(i, 1);
            player.takeDamage(bullet.damage);
            createExplosion(bullet.x, bullet.y, '#ff0000');
        }
    }

    // Enemies vs Player
    for (let i = gameState.enemies.length - 1; i >= 0; i--) {
        const enemy = gameState.enemies[i];
        const player = gameState.player;
        
        if (enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.y + enemy.height > player.y) {
            
            gameState.enemies.splice(i, 1);
            player.takeDamage(30);
            createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
        }
    }

    // Asteroids vs Player
    for (let i = gameState.asteroids.length - 1; i >= 0; i--) {
        const asteroid = gameState.asteroids[i];
        const player = gameState.player;
        
        if (asteroid.x < player.x + player.width &&
            asteroid.x + asteroid.width > player.x &&
            asteroid.y < player.y + player.height &&
            asteroid.y + asteroid.height > player.y) {
            
            gameState.asteroids.splice(i, 1);
            player.takeDamage(CONFIG.asteroid.playerDamage);
            createExplosion(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2, '#888888');
        }
    }

    // Powerups vs Player
    for (let i = gameState.powerups.length - 1; i >= 0; i--) {
        const powerup = gameState.powerups[i];
        const player = gameState.player;
        
        if (powerup.x < player.x + player.width &&
            powerup.x + powerup.width > player.x &&
            powerup.y < player.y + player.height &&
            powerup.y + powerup.height > player.y) {
            
            gameState.powerups.splice(i, 1);
            
            switch (powerup.type) {
                case 'shieldHeal':
                    player.healShield(CONFIG.powerup.shieldHealAmount);
                    showPickupNotification('SHIELD HEALED');
                    break;
                case 'shieldBoost':
                    player.boostShield(CONFIG.powerup.shieldBoostAmount);
                    showPickupNotification('SHIELD CAPACITY INCREASED');
                    break;
                case 'structureRepair':
                    player.repairStructure(CONFIG.powerup.structureRepairAmount);
                    showPickupNotification('STRUCTURE REPAIRED');
                    break;
                case 'repairBot':
                    gameState.repairBotActive = true;
                    gameState.repairBotEndTime = Date.now() + CONFIG.powerup.repairBotDuration;
                    showPickupNotification('REPAIR BOT DEPLOYED');
                    break;
                case 'wings':
                    if (gameState.shipUpgrades.wingsLevel < CONFIG.addons.maxLevel) {
                        gameState.shipUpgrades.wingsLevel++;
                        const level = gameState.shipUpgrades.wingsLevel;
                        // Increase structure with each level
                        player.boostStructure(CONFIG.addons.wings.structurePerLevel);
                        showPickupNotification(`WINGS LEVEL ${level} - STRUCTURE BOOST`);
                    } else {
                        showPickupNotification('WINGS MAX LEVEL');
                    }
                    break;
                case 'nose':
                    if (gameState.shipUpgrades.noseLevel < CONFIG.addons.maxLevel) {
                        gameState.shipUpgrades.noseLevel++;
                        const level = gameState.shipUpgrades.noseLevel;
                        // Increase shield with each level
                        player.boostShield(CONFIG.addons.nose.shieldPerLevel);
                        showPickupNotification(`NOSE LEVEL ${level} - SHIELD BOOST`);
                    } else {
                        showPickupNotification('NOSE MAX LEVEL');
                    }
                    break;
                case 'turret':
                    if (gameState.shipUpgrades.turretLevel < CONFIG.addons.maxLevel) {
                        gameState.shipUpgrades.turretLevel++;
                        const level = gameState.shipUpgrades.turretLevel;
                        showPickupNotification(`TURRET LEVEL ${level} - FASTER FIRE RATE`);
                    } else {
                        showPickupNotification('TURRET MAX LEVEL');
                    }
                    break;
                case 'kamikaze':
                    gameState.kamikazeDroneActive = true;
                    gameState.kamikazeDronesRemaining += CONFIG.kamikazeDrone.dronesPerPickup;
                    gameState.lastDroneSpawn = Date.now();
                    showPickupNotification(`KAMIKAZE DRONES ACTIVATED (x${CONFIG.kamikazeDrone.dronesPerPickup})`);
                    break;
                case 'weaponLevel':
                    const currentWeapon = gameState.currentWeapon;
                    if (gameState.weaponLevels[currentWeapon] < CONFIG.weaponLevels.maxLevel) {
                        gameState.weaponLevels[currentWeapon]++;
                        const level = gameState.weaponLevels[currentWeapon];
                        showPickupNotification(`${CONFIG.weapons[currentWeapon].name.toUpperCase()} LEVEL ${level}`);
                    } else {
                        showPickupNotification(`${CONFIG.weapons[currentWeapon].name.toUpperCase()} MAX LEVEL`);
                    }
                    break;
            }
            
            createExplosion(powerup.x + powerup.width / 2, powerup.y + powerup.height / 2, '#ffff00');
            updateHUD();
        }
    }

    // Kamikaze Drones vs Enemies
    for (let i = gameState.kamikazeDrones.length - 1; i >= 0; i--) {
        const drone = gameState.kamikazeDrones[i];
        
        for (let j = gameState.enemies.length - 1; j >= 0; j--) {
            const enemy = gameState.enemies[j];
            
            if (drone.x < enemy.x + enemy.width &&
                drone.x + drone.width > enemy.x &&
                drone.y < enemy.y + enemy.height &&
                drone.y + drone.height > enemy.y) {
                
                // Remove drone and damage enemy
                gameState.kamikazeDrones.splice(i, 1);
                createExplosion(drone.x + drone.width / 2, drone.y + drone.height / 2, drone.color);
                
                if (enemy.takeDamage(drone.damage)) {
                    gameState.enemies.splice(j, 1);
                    gameState.score += enemy.points;
                    gameState.enemiesDefeated++;
                    createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
                    spawnPowerup(enemy.x, enemy.y);
                }
                
                updateHUD();
                break;
            }
        }
    }

    // Kamikaze Drones vs Boss
    if (gameState.boss) {
        for (let i = gameState.kamikazeDrones.length - 1; i >= 0; i--) {
            const drone = gameState.kamikazeDrones[i];
            
            // Check if boss still exists
            if (!gameState.boss) break;
            
            const boss = gameState.boss;
            
            if (drone.x < boss.x + boss.width &&
                drone.x + drone.width > boss.x &&
                drone.y < boss.y + boss.height &&
                drone.y + drone.height > boss.y) {
                
                // Remove drone and damage boss
                gameState.kamikazeDrones.splice(i, 1);
                createExplosion(drone.x + drone.width / 2, drone.y + drone.height / 2, drone.color);
                
                if (boss.takeDamage(drone.damage)) {
                    gameState.score += boss.points;
                    createExplosion(boss.x + boss.width / 2, boss.y + boss.height / 2, boss.color);
                    spawnPowerup(boss.x, boss.y);
                    gameState.boss = null;
                    gameState.bossActive = false;
                    gameState.waveComplete = true;
                    // Start next wave after delay
                    setTimeout(() => {
                        gameState.wave++;
                        gameState.waveComplete = false;
                        gameState.enemiesInWave = 0;
                        updateHUD();
                    }, CONFIG.wave.completionDelay);
                }
                
                updateHUD();
            }
        }
    }
    
    // Bullets vs Enemy Drones
    for (let i = gameState.bullets.length - 1; i >= 0; i--) {
        const bullet = gameState.bullets[i];
        
        for (let j = gameState.enemyDrones.length - 1; j >= 0; j--) {
            const drone = gameState.enemyDrones[j];
            
            if (bullet.x < drone.x + drone.width &&
                bullet.x + bullet.width > drone.x &&
                bullet.y < drone.y + drone.height &&
                bullet.y + bullet.height > drone.y) {
                
                gameState.bullets.splice(i, 1);
                
                if (drone.takeDamage(bullet.damage)) {
                    gameState.enemyDrones.splice(j, 1);
                    gameState.score += drone.points;
                }
                
                updateHUD();
                break;
            }
        }
    }
    
    // Turret Bullets vs Enemy Drones
    for (let i = gameState.turretBullets.length - 1; i >= 0; i--) {
        const bullet = gameState.turretBullets[i];
        
        for (let j = gameState.enemyDrones.length - 1; j >= 0; j--) {
            const drone = gameState.enemyDrones[j];
            
            if (bullet.x < drone.x + drone.width &&
                bullet.x + bullet.width > drone.x &&
                bullet.y < drone.y + drone.height &&
                bullet.y + bullet.height > drone.y) {
                
                gameState.turretBullets.splice(i, 1);
                
                if (drone.takeDamage(bullet.damage)) {
                    gameState.enemyDrones.splice(j, 1);
                    gameState.score += drone.points;
                }
                
                updateHUD();
                break;
            }
        }
    }
}

function updateHUD() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('wave').textContent = gameState.wave;
    
    if (gameState.player) {
        const shieldPercent = (gameState.player.shield / gameState.player.maxShield) * 100;
        document.getElementById('shield-fill').style.width = shieldPercent + '%';
        
        const structurePercent = (gameState.player.structure / gameState.player.maxStructure) * 100;
        document.getElementById('structure-fill').style.width = structurePercent + '%';
    }
    
    // Update addon status display
    updateAddonStatus();
}

function updateAddonStatus() {
    const addons = [
        { id: 'addon-wings', levelProperty: 'wingsLevel' },
        { id: 'addon-nose', levelProperty: 'noseLevel' },
        { id: 'addon-turret', levelProperty: 'turretLevel' }
    ];
    
    addons.forEach(addon => {
        const element = document.getElementById(addon.id);
        if (element) {
            const statusSpan = element.querySelector('span');
            const level = gameState.shipUpgrades[addon.levelProperty];
            statusSpan.textContent = level > 0 ? `L${level}` : 'NO';
            
            if (level > 0) {
                element.classList.add('addon-active');
            } else {
                element.classList.remove('addon-active');
            }
        }
    });
    
    // Update drone counter
    const droneElement = document.getElementById('addon-drones');
    if (droneElement) {
        const statusSpan = droneElement.querySelector('span');
        statusSpan.textContent = gameState.kamikazeDronesRemaining;
        
        if (gameState.kamikazeDronesRemaining > 0) {
            droneElement.classList.add('addon-active');
        } else {
            droneElement.classList.remove('addon-active');
        }
    }
    
    // Update weapon levels display
    const weapons = ['laser', 'plasma', 'railgun', 'blaster'];
    weapons.forEach(weapon => {
        const element = document.getElementById(`weapon-${weapon}`);
        if (element) {
            const statusSpan = element.querySelector('span');
            const level = gameState.weaponLevels[weapon];
            statusSpan.textContent = `L${level}`;
            
            // Remove all classes first
            element.classList.remove('weapon-active', 'weapon-max-level');
            
            // Highlight current weapon
            if (gameState.currentWeapon === weapon) {
                element.classList.add('weapon-active');
            }
            
            // Highlight max level weapons
            if (level === CONFIG.weaponLevels.maxLevel) {
                element.classList.add('weapon-max-level');
            }
        }
    });
}

function drawBackground() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height);
    
    // Initialize stars if not yet done
    if (!gameState.stars || gameState.stars.length === 0) {
        gameState.stars = initializeStarfield();
    }
    
    // Update and draw stars grouped by layer to minimize fillStyle changes
    for (let layerIndex = 0; layerIndex < CONFIG.stars.speedLayers.length; layerIndex++) {
        const layer = CONFIG.stars.speedLayers[layerIndex];
        ctx.fillStyle = `rgba(255, 255, 255, ${layer.opacity})`;
        
        // Update and draw all stars in this layer
        for (let i = 0; i < gameState.stars.length; i++) {
            const star = gameState.stars[i];
            if (star.layerIndex !== layerIndex) continue;
            
            updateStar(star);
            ctx.fillRect(star.x, star.y, star.size, star.size);
        }
    }
}

function update() {
    if (gameState.isPaused || gameState.isGameOver) return;

    gameState.player.update();
    spawnEnemy();
    spawnAsteroid();

    // Auto-fire for all weapons
    if (gameState.autoFire) {
        fireBullet();
    }

    // Shield regeneration (after delay from last damage)
    const now = Date.now();
    const timeSinceLastDamage = now - gameState.lastDamageTime;
    let hudNeedsUpdate = false;
    
    if (timeSinceLastDamage > CONFIG.player.shieldRegenDelay && gameState.player.shield < gameState.player.maxShield) {
        gameState.player.shield = Math.min(gameState.player.maxShield, gameState.player.shield + CONFIG.player.shieldRegenRate);
        hudNeedsUpdate = true;
    }

    // Repair bot structure healing
    if (gameState.repairBotActive) {
        if (now < gameState.repairBotEndTime) {
            if (gameState.player.structure < gameState.player.maxStructure) {
                gameState.player.structure = Math.min(gameState.player.maxStructure, gameState.player.structure + CONFIG.powerup.repairBotHealRate);
                hudNeedsUpdate = true;
            }
        } else {
            gameState.repairBotActive = false;
        }
    }
    
    // Update HUD once if any health values changed
    if (hudNeedsUpdate) {
        updateHUD();
    }

    // Turret auto-firing with burst mode
    const turretLevel = gameState.shipUpgrades.turretLevel;
    if (turretLevel > 0) {
        // Find current target to check if it changed
        const maxRange = CONFIG.canvas.height * CONFIG.addons.turret.range;
        let currentTarget = null;
        let minDistance = maxRange;
        
        const player = gameState.player;
        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;
        
        // Find nearest enemy
        gameState.enemies.forEach(enemy => {
            const dx = (enemy.x + enemy.width / 2) - playerCenterX;
            const dy = (enemy.y + enemy.height / 2) - playerCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
                minDistance = distance;
                currentTarget = enemy;
            }
        });
        
        if (gameState.boss) {
            const dx = (gameState.boss.x + gameState.boss.width / 2) - playerCenterX;
            const dy = (gameState.boss.y + gameState.boss.height / 2) - playerCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
                currentTarget = gameState.boss;
            }
        }
        
        // Check if target changed (reset burst if it did)
        if (currentTarget !== gameState.turretBurstTarget) {
            gameState.turretBurstCount = 0;
            gameState.turretBurstTarget = currentTarget;
            gameState.turretInBurst = false;
        }
        
        if (currentTarget) {
            // Determine timing based on burst state
            let fireDelay;
            if (gameState.turretInBurst && gameState.turretBurstCount < CONFIG.addons.turret.burstSize) {
                // In burst mode - rapid fire between shots
                fireDelay = CONFIG.addons.turret.burstDelay;
            } else if (gameState.turretBurstCount >= CONFIG.addons.turret.burstSize) {
                // Burst complete - in cooldown period
                fireDelay = CONFIG.addons.turret.burstCooldown;
            } else {
                // Not in burst - ready to start new burst
                fireDelay = 0; // Fire immediately
            }
            
            if (now - gameState.lastTurretFire >= fireDelay) {
                fireTurret();
                gameState.lastTurretFire = now;
                
                if (gameState.turretBurstCount < CONFIG.addons.turret.burstSize) {
                    // Increment burst count
                    gameState.turretBurstCount++;
                    gameState.turretInBurst = true;
                    
                    if (gameState.turretBurstCount >= CONFIG.addons.turret.burstSize) {
                        // Burst just completed - enter cooldown
                        gameState.turretInBurst = false;
                    }
                } else {
                    // Cooldown complete - reset for next burst
                    gameState.turretBurstCount = 0;
                    gameState.turretInBurst = false;
                }
            }
        } else {
            // No target - reset burst state
            gameState.turretBurstCount = 0;
            gameState.turretInBurst = false;
            gameState.turretBurstTarget = null;
        }
    }

    // Update pickup notifications (remove expired ones)
    gameState.pickupNotifications = gameState.pickupNotifications.filter(notification => {
        return (now - notification.startTime) < CONFIG.powerup.notificationDuration;
    });

    // Spawn kamikaze drones every 3 seconds when active
    if (gameState.kamikazeDroneActive && gameState.kamikazeDronesRemaining > 0) {
        if (now - gameState.lastDroneSpawn >= CONFIG.kamikazeDrone.spawnRate) {
            const drone = new KamikazeDrone(
                gameState.player.x + gameState.player.width / 2,
                gameState.player.y
            );
            gameState.kamikazeDrones.push(drone);
            gameState.kamikazeDronesRemaining--;
            gameState.lastDroneSpawn = now;
            
            // Deactivate if no drones remaining
            if (gameState.kamikazeDronesRemaining === 0) {
                gameState.kamikazeDroneActive = false;
            }
        }
    }

    // Update kamikaze drones
    gameState.kamikazeDrones = gameState.kamikazeDrones.filter(drone => drone.update());

    // Update enemy drones
    gameState.enemyDrones = gameState.enemyDrones.filter(drone => drone.update());

    // Update enemies
    gameState.enemies = gameState.enemies.filter(enemy => enemy.update());

    // Update boss
    if (gameState.boss) {
        gameState.boss.update();
    }

    // Update asteroids
    gameState.asteroids = gameState.asteroids.filter(asteroid => asteroid.update());

    // Update bullets
    gameState.bullets = gameState.bullets.filter(bullet => bullet.update());
    gameState.enemyBullets = gameState.enemyBullets.filter(bullet => bullet.update());
    gameState.turretBullets = gameState.turretBullets.filter(bullet => bullet.update());

    // Update powerups
    gameState.powerups = gameState.powerups.filter(powerup => powerup.update());

    // Update particles
    gameState.particles = gameState.particles.filter(particle => particle.update());

    checkCollisions();
}

function render() {
    drawBackground();
    
    const now = Date.now();
    
    gameState.player.draw();
    gameState.enemies.forEach(enemy => enemy.draw());
    if (gameState.boss) {
        gameState.boss.draw();
    }
    gameState.asteroids.forEach(asteroid => asteroid.draw());
    gameState.bullets.forEach(bullet => bullet.draw());
    gameState.enemyBullets.forEach(bullet => bullet.draw());
    gameState.turretBullets.forEach(bullet => bullet.draw());
    gameState.powerups.forEach(powerup => powerup.draw());
    gameState.particles.forEach(particle => particle.draw());
    gameState.kamikazeDrones.forEach(drone => drone.draw());
    gameState.enemyDrones.forEach(drone => drone.draw());
    
    // Draw repair bot indicator (small robot circling the ship)
    if (gameState.repairBotActive) {
        const botAngle = (now / 500) % (Math.PI * 2); // Complete rotation every 0.5 seconds
        const botX = gameState.player.x + gameState.player.width / 2 + Math.cos(botAngle) * 35;
        const botY = gameState.player.y + gameState.player.height / 2 + Math.sin(botAngle) * 35;
        
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(botX - 4, botY - 4, 8, 8);
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(botX - 2, botY - 2, 1, 1);
        ctx.fillRect(botX + 1, botY - 2, 1, 1);
        
        // Draw repair bot beam to ship
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(botX, botY);
        ctx.lineTo(gameState.player.x + gameState.player.width / 2, gameState.player.y + gameState.player.height / 2);
        ctx.stroke();
    }
    
    // Draw pickup notifications
    gameState.pickupNotifications.forEach((notification, index) => {
        const age = now - notification.startTime;
        const opacity = Math.max(0, 1 - (age / CONFIG.powerup.notificationDuration));
        
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#ffff00';
        ctx.font = '20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(notification.text, CONFIG.canvas.width / 2, 60 + (index * 30));
        ctx.globalAlpha = 1;
    });
    ctx.textAlign = 'left';
    
    // Draw wave complete message
    if (gameState.waveComplete) {
        ctx.fillStyle = '#00ff00';
        ctx.font = '40px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('WAVE COMPLETE!', CONFIG.canvas.width / 2, CONFIG.canvas.height / 2);
        ctx.textAlign = 'left';
    }
}

function gameLoop() {
    if (gameState.isPaused || gameState.isGameOver) return;

    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Menu Starfield Animation
function drawMenuStarfield() {
    // Clear canvas
    menuCtx.fillStyle = '#000000';
    menuCtx.fillRect(0, 0, menuCanvas.width, menuCanvas.height);
    
    // Initialize stars if not yet done
    if (!menuStarfield.stars || menuStarfield.stars.length === 0) {
        menuStarfield.stars = initializeStarfield();
    }
    
    // Update and draw stars grouped by layer to minimize fillStyle changes
    for (let layerIndex = 0; layerIndex < CONFIG.stars.speedLayers.length; layerIndex++) {
        const layer = CONFIG.stars.speedLayers[layerIndex];
        menuCtx.fillStyle = `rgba(255, 255, 255, ${layer.opacity})`;
        
        // Update and draw all stars in this layer
        for (let i = 0; i < menuStarfield.stars.length; i++) {
            const star = menuStarfield.stars[i];
            if (star.layerIndex !== layerIndex) continue;
            
            updateStar(star);
            menuCtx.fillRect(star.x, star.y, star.size, star.size);
        }
    }
}

function menuAnimationLoop() {
    drawMenuStarfield();
    menuStarfield.animationId = requestAnimationFrame(menuAnimationLoop);
}

function startMenuAnimation() {
    if (!menuStarfield.animationId) {
        menuAnimationLoop();
    }
}

function stopMenuAnimation() {
    if (menuStarfield.animationId) {
        cancelAnimationFrame(menuStarfield.animationId);
        menuStarfield.animationId = null;
    }
}

// Weapons Starfield Animation
function drawWeaponsStarfield() {
    // Clear canvas
    weaponsCtx.fillStyle = '#000000';
    weaponsCtx.fillRect(0, 0, weaponsCanvas.width, weaponsCanvas.height);
    
    // Initialize stars if not yet done
    if (!weaponsStarfield.stars || weaponsStarfield.stars.length === 0) {
        weaponsStarfield.stars = initializeStarfield();
    }
    
    // Update and draw stars grouped by layer to minimize fillStyle changes
    for (let layerIndex = 0; layerIndex < CONFIG.stars.speedLayers.length; layerIndex++) {
        const layer = CONFIG.stars.speedLayers[layerIndex];
        weaponsCtx.fillStyle = `rgba(255, 255, 255, ${layer.opacity})`;
        
        // Update and draw all stars in this layer
        for (let i = 0; i < weaponsStarfield.stars.length; i++) {
            const star = weaponsStarfield.stars[i];
            if (star.layerIndex !== layerIndex) continue;
            
            updateStar(star);
            weaponsCtx.fillRect(star.x, star.y, star.size, star.size);
        }
    }
}

function weaponsAnimationLoop() {
    drawWeaponsStarfield();
    weaponsStarfield.animationId = requestAnimationFrame(weaponsAnimationLoop);
}

function startWeaponsAnimation() {
    if (!weaponsStarfield.animationId) {
        weaponsAnimationLoop();
    }
}

function stopWeaponsAnimation() {
    if (weaponsStarfield.animationId) {
        cancelAnimationFrame(weaponsStarfield.animationId);
        weaponsStarfield.animationId = null;
    }
}

// Weapons Table Functions
let currentShipView = 'noWings'; // 'noWings' or 'withWings'

function populateWeaponsTable() {
    const tbody = document.getElementById('weapons-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Weapon order
    const weapons = ['laser', 'plasma', 'railgun', 'blaster'];
    
    // Store DPS values for each level to find max
    const dpsPerLevel = [];
    for (let level = 1; level <= 9; level++) {
        dpsPerLevel[level] = [];
    }
    
    // First pass: Calculate all DPS values
    const weaponDPSData = {};
    weapons.forEach(weaponKey => {
        const weaponConfig = CONFIG.weaponLevels[weaponKey];
        weaponDPSData[weaponKey] = {};
        
        for (let level = 1; level <= 9; level++) {
            const levelConfig = weaponConfig.levels[level];
            const fireRateSeconds = levelConfig.fireRate / 1000;
            let baseDPS = 0;
            
            if (weaponKey === 'railgun') {
                const bullets = levelConfig.bullets || 1;
                const totalDamagePerShot = levelConfig.damage * bullets;
                baseDPS = totalDamagePerShot / fireRateSeconds;
            } else if (weaponKey === 'blaster') {
                const pellets = levelConfig.pellets;
                const totalDamagePerShot = levelConfig.damage * pellets;
                baseDPS = totalDamagePerShot / fireRateSeconds;
            } else {
                baseDPS = levelConfig.damage / fireRateSeconds;
            }
            
            // For "with wings" view, all weapons fire 3x (main + 2 wings)
            // But Blaster wings fire the specific wing weapon, not Blaster itself
            let dpsWithWings = baseDPS;
            
            if (weaponKey === 'blaster' && levelConfig.wingWeapon) {
                // Blaster has special wing weapons that fire different weapons
                const wingWeapon = levelConfig.wingWeapon;
                // For DPS calculation, assume wing weapon is at same level as blaster
                // Ensure wing level doesn't exceed max available levels (all weapons have 1-9)
                const wingLevel = Math.min(level, CONFIG.weaponLevels.maxLevel);
                const wingConfig = CONFIG.weaponLevels[wingWeapon].levels[wingLevel];
                const wingFireRateSeconds = wingConfig.fireRate / 1000;
                let wingDPS = 0;
                
                if (wingWeapon === 'railgun') {
                    const wingBullets = wingConfig.bullets || 1;
                    const wingTotalDamage = wingConfig.damage * wingBullets;
                    wingDPS = wingTotalDamage / wingFireRateSeconds;
                } else {
                    wingDPS = wingConfig.damage / wingFireRateSeconds;
                }
                
                // Blaster: base + 2 wing weapons (which fire different weapon types)
                dpsWithWings = baseDPS + (wingDPS * 2);
            } else {
                // For Laser, Plasma, Railgun: when wings are equipped, they fire the same weapon
                // Main weapon + 2 wings firing same weapon = 3x
                dpsWithWings = baseDPS * 3;
            }
            
            weaponDPSData[weaponKey][level] = {
                noWings: baseDPS,
                withWings: dpsWithWings
            };
            
            // Add to dpsPerLevel for max calculation based on current view
            const dpsForView = currentShipView === 'noWings' ? baseDPS : dpsWithWings;
            dpsPerLevel[level].push(dpsForView);
        }
    });
    
    // Find max DPS for each level
    const maxDPSPerLevel = {};
    for (let level = 1; level <= 9; level++) {
        maxDPSPerLevel[level] = Math.max(...dpsPerLevel[level]);
    }
    
    // Second pass: Create table rows with highlighting
    weapons.forEach(weaponKey => {
        const weaponConfig = CONFIG.weaponLevels[weaponKey];
        const weaponName = CONFIG.weapons[weaponKey].name;
        
        const row = document.createElement('tr');
        
        // Weapon name cell
        const nameCell = document.createElement('td');
        nameCell.className = 'weapon-name';
        nameCell.textContent = weaponName.toUpperCase();
        row.appendChild(nameCell);
        
        // Level cells (1-9)
        for (let level = 1; level <= 9; level++) {
            const cell = document.createElement('td');
            cell.className = 'stat-value';
            
            const dpsValue = weaponDPSData[weaponKey][level][currentShipView];
            const formattedDPS = dpsValue.toFixed(1);
            
            if (Math.abs(dpsValue - maxDPSPerLevel[level]) < 0.01) {
                cell.classList.add('highest-dps');
            }
            
            cell.textContent = formattedDPS;
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
    });
}

function setupShipViewToggle() {
    const noWingsButton = document.getElementById('ship-no-wings-toggle');
    const withWingsButton = document.getElementById('ship-with-wings-toggle');
    
    if (!noWingsButton || !withWingsButton) return;
    
    noWingsButton.addEventListener('click', () => {
        currentShipView = 'noWings';
        noWingsButton.classList.add('active');
        withWingsButton.classList.remove('active');
        populateWeaponsTable();
    });
    
    withWingsButton.addEventListener('click', () => {
        currentShipView = 'withWings';
        withWingsButton.classList.add('active');
        noWingsButton.classList.remove('active');
        populateWeaponsTable();
    });
}

// Initialize weapons table on page load
document.addEventListener('DOMContentLoaded', () => {
    populateWeaponsTable();
    setupShipViewToggle();
});

// Start menu animation on page load
startMenuAnimation();
