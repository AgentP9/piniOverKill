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
        // Railgun level configurations
        railgun: {
            levels: {
                1: { fireRate: 200, damage: 2, bullets: 1, description: 'Low fire, low damage' },
                2: { fireRate: 160, damage: 2, bullets: 1, description: 'Medium fire, low damage' },
                3: { fireRate: 120, damage: 2, bullets: 1, description: 'High fire, low damage' },
                4: { fireRate: 160, damage: 4, bullets: 1, description: 'Medium fire, medium damage' },
                5: { fireRate: 160, damage: 2, bullets: 2, description: 'Two bullets, medium fire, low damage' },
                6: { fireRate: 120, damage: 2, bullets: 2, description: 'Two bullets, high fire, low damage' },
                7: { fireRate: 160, damage: 4, bullets: 2, description: 'Two bullets, medium fire, medium damage' },
                8: { fireRate: 120, damage: 4, bullets: 2, description: 'Two bullets, high fire, medium damage' },
                9: { fireRate: 120, damage: 6, bullets: 2, description: 'Two bullets, high fire, high damage' }
            }
        },
        // Other weapons use simple multiplier system
        laser: { damagePerLevel: 5, fireRateImprovement: 0.05 },
        plasma: { damagePerLevel: 2, fireRateImprovement: 0.05 },
        blaster: { damagePerLevel: 1, fireRateImprovement: 0.05 }
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
        count: 50,
        seedX: 37,
        seedY: 73
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
    enemyDrones: [] // Array of enemy-deployed drones
};

// Canvas Setup
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = CONFIG.canvas.width;
canvas.height = CONFIG.canvas.height;

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
    animationId: null
};

// Weapons starfield state
const weaponsStarfield = {
    scrollOffset: 0,
    animationId: null
};

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
        
        // Animated engine flame effect (enemies fly downward, so flame at top/back)
        const flamePulse = Math.sin(now / 40) * 0.5 + 0.5; // Faster pulse for enemies
        const flameFlicker = Math.random() * 0.3 + 0.7;
        
        // Scale flame size based on ship size (smaller ships = smaller flames)
        const flameScale = this.width / 30; // 30 is standard width
        const baseFlameHeight = (4 + flamePulse * 3) * flameFlicker * flameScale;
        
        // Draw flame at the back (top) of the enemy ship
        const centerX = this.x + this.width / 2;
        const flameY = this.y; // Top of the ship
        
        // Single center flame for enemies (they're smaller than player)
        // Outer flame (reddish/orange - enemy theme)
        ctx.fillStyle = `rgba(255, 100, 0, ${0.6 * flameFlicker})`;
        ctx.beginPath();
        ctx.moveTo(centerX, flameY);
        ctx.lineTo(centerX - 2 * flameScale, flameY - baseFlameHeight * 0.6);
        ctx.lineTo(centerX, flameY - baseFlameHeight);
        ctx.lineTo(centerX + 2 * flameScale, flameY - baseFlameHeight * 0.6);
        ctx.closePath();
        ctx.fill();
        
        // Inner flame (bright orange/yellow)
        ctx.fillStyle = `rgba(255, 200, 0, ${0.8 * flameFlicker})`;
        ctx.beginPath();
        ctx.moveTo(centerX, flameY);
        ctx.lineTo(centerX - 1 * flameScale, flameY - baseFlameHeight * 0.7);
        ctx.lineTo(centerX, flameY - baseFlameHeight * 0.85);
        ctx.lineTo(centerX + 1 * flameScale, flameY - baseFlameHeight * 0.7);
        ctx.closePath();
        ctx.fill();
        
        // Core (bright white/yellow hot core)
        ctx.fillStyle = `rgba(255, 255, 100, ${0.9 * flameFlicker})`;
        ctx.beginPath();
        ctx.moveTo(centerX, flameY);
        ctx.lineTo(centerX - 0.5 * flameScale, flameY - baseFlameHeight * 0.4);
        ctx.lineTo(centerX, flameY - baseFlameHeight * 0.5);
        ctx.lineTo(centerX + 0.5 * flameScale, flameY - baseFlameHeight * 0.4);
        ctx.closePath();
        ctx.fill();
        
        // Draw enemy ship
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height * 0.2);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.closePath();
        ctx.fill();
        
        // Draw turrets for cruiser and battleship
        if (this.hasTurrets) {
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x + this.width * 0.25 - 3, this.y + this.height / 2 - 3, 6, 6);
            ctx.fillRect(this.x + this.width * 0.75 - 3, this.y + this.height / 2 - 3, 6, 6);
        }
        
        // Draw larger ship details for bigger enemies
        if (this.type === 'heavy' || this.type === 'cruiser' || this.type === 'battleship') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(this.x + this.width / 2 - 2, this.y + this.height * 0.3, 4, 4);
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
    constructor(x, y, weapon, vx = 0, vy = 0) {
        this.x = x;
        this.y = y;
        this.width = weapon === 'laser' ? 6 : 4;
        this.height = weapon === 'laser' ? 20 : (weapon === 'blaster' ? 6 : 12);
        const weaponConfig = CONFIG.weapons[weapon];
        this.speed = weaponConfig.speed;
        
        // Calculate damage based on weapon type and level
        if (weapon === 'railgun') {
            const railgunLevel = gameState.weaponLevels.railgun;
            const levelConfig = CONFIG.weaponLevels.railgun.levels[railgunLevel];
            this.damage = levelConfig.damage;
        } else {
            // Other weapons use base damage plus level-based improvements
            const weaponLevel = gameState.weaponLevels[weapon];
            const levelBonus = (weaponLevel - 1) * CONFIG.weaponLevels[weapon].damagePerLevel;
            this.damage = weaponConfig.damage + levelBonus;
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
        // Draw boss ship body (larger and more imposing)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + 15, this.y, this.width - 30, this.height);
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height / 2);
        ctx.lineTo(this.x + 15, this.y);
        ctx.lineTo(this.x + this.width - 15, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        ctx.closePath();
        ctx.fill();

        // Draw boss details
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x + 20, this.y + 25, 12, 12);
        ctx.fillRect(this.x + this.width - 32, this.y + 25, 12, 12);
        ctx.fillRect(this.x + this.width / 2 - 7, this.y + 15, 14, 20);
        
        // Draw turrets if applicable
        if (this.hasTurrets) {
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x + this.width * 0.25 - 5, this.y + this.height / 2 - 5, 10, 10);
            ctx.fillRect(this.x + this.width * 0.75 - 5, this.y + this.height / 2 - 5, 10, 10);
        }

        // Draw health bar
        ctx.fillStyle = '#330000';
        ctx.fillRect(this.x, this.y - 12, this.width, 8);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x, this.y - 12, this.width * (this.health / this.maxHealth), 8);
        
        // Draw boss name
        ctx.fillStyle = this.color;
        ctx.font = '14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x + this.width / 2, this.y - 15);
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
    if (gameState.currentWeapon === 'railgun') {
        const railgunLevel = gameState.weaponLevels.railgun;
        const levelConfig = CONFIG.weaponLevels.railgun.levels[railgunLevel];
        adjustedFireRate = levelConfig.fireRate;
    } else {
        // Other weapons use fire rate improvement per level
        const weaponLevel = gameState.weaponLevels[gameState.currentWeapon];
        const fireRateMultiplier = 1 + (weaponLevel - 1) * CONFIG.weaponLevels[gameState.currentWeapon].fireRateImprovement;
        adjustedFireRate = weaponConfig.fireRate / fireRateMultiplier;
    }
    
    if (now - gameState.lastFire < adjustedFireRate) return;

    gameState.lastFire = now;
    const player = gameState.player;
    const centerX = player.x + player.width / 2;
    const wingsLevel = gameState.shipUpgrades.wingsLevel;

    if (gameState.currentWeapon === 'blaster') {
        // Blaster fires multiple pellets in a spread
        const blasterConfig = CONFIG.weapons.blaster;
        for (let i = 0; i < blasterConfig.pellets; i++) {
            const spread = (Math.random() - 0.5) * blasterConfig.spread;
            const bullet = new Bullet(centerX, player.y, gameState.currentWeapon, spread * blasterConfig.spreadMultiplier, 0);
            gameState.bullets.push(bullet);
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
    // Scrolling starfield
    gameState.scrollOffset = (gameState.scrollOffset + 1) % 600;
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height);
    
    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < CONFIG.stars.count; i++) {
        const x = (i * CONFIG.stars.seedX) % CONFIG.canvas.width;
        const y = ((i * CONFIG.stars.seedY + gameState.scrollOffset) % CONFIG.canvas.height);
        const size = (i % 3) + 1;
        ctx.fillRect(x, y, size, size);
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
    
    // Scrolling starfield
    menuStarfield.scrollOffset = (menuStarfield.scrollOffset + 1) % 600;
    
    // Draw stars
    menuCtx.fillStyle = '#ffffff';
    for (let i = 0; i < CONFIG.stars.count; i++) {
        const x = (i * CONFIG.stars.seedX) % CONFIG.canvas.width;
        const y = ((i * CONFIG.stars.seedY + menuStarfield.scrollOffset) % CONFIG.canvas.height);
        const size = (i % 3) + 1;
        menuCtx.fillRect(x, y, size, size);
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
    
    // Scrolling starfield
    weaponsStarfield.scrollOffset = (weaponsStarfield.scrollOffset + 1) % 600;
    
    // Draw stars
    weaponsCtx.fillStyle = '#ffffff';
    for (let i = 0; i < CONFIG.stars.count; i++) {
        const x = (i * CONFIG.stars.seedX) % CONFIG.canvas.width;
        const y = ((i * CONFIG.stars.seedY + weaponsStarfield.scrollOffset) % CONFIG.canvas.height);
        const size = (i % 3) + 1;
        weaponsCtx.fillRect(x, y, size, size);
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

// Start menu animation on page load
startMenuAnimation();
