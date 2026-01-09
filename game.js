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
            description: 'Single mighty shot',
            heatPerShot: 80
        },
        plasma: {
            name: 'Plasma',
            fireRate: 400,
            damage: 15,
            speed: 8,
            color: '#00ffff',
            description: 'Moderate rate, medium damage',
            heatPerShot: 30
        },
        railgun: {
            name: 'Railgun',
            fireRate: 100,
            damage: 5,
            speed: 15,
            color: '#ffff00',
            description: 'High rate, low damage',
            heatPerShot: 12
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
            description: 'Shotgun-style spread',
            heatPerShot: 45
        }
    },
    enemy: {
        spawnRate: 2000,
        speed: 2
    },
    boss: {
        health: 500,
        speed: 1,
        fireRate: 800,
        points: 500,
        spawnThreshold: 15
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
        maxLevel: 10,
        wings: {
            structurePerLevel: 10 // Structure increase per level
        },
        nose: {
            shieldPerLevel: 10 // Shield increase per level
        },
        cooling: {
            cooldownBonusPerLevel: 0.05 // 5% cooldown improvement per level
        },
        turret: {
            fireRatePerLevel: 200, // Fire rate reduction per level (faster)
            baseFireRate: 2000, // Base fire rate in ms (level 1)
            damage: 15, // Damage per shot
            range: 0.5 // Half of playfield height
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
    overheat: {
        maxHeat: 100,
        cooldownRate: 0.8,
        cooldownRatePassive: 1.5,
        passiveCoolingDelay: 1000,
        overheatThreshold: 75,
        cautionThresholdMultiplier: 0.7,
        fireRatePenalty: 1.8,
        lockoutDuration: 3000, // 3 seconds cooldown animation when overheated
        coolingSystemHeatMultiplier: 0.4,
        coolingSystemCooldownBonus: 1.3
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
    weaponUpgrades: {
        rateOfFire: 1,
        damageRate: 1
    },
    shipUpgrades: {
        wingsLevel: 0, // 0 = not installed, 1-10 = level
        noseLevel: 0, // 0 = not installed, 1-10 = level
        coolingLevel: 0, // 0 = not installed, 1-10 = level
        turretLevel: 0 // 0 = not installed, 1-10 = level
    },
    lastTurretFire: 0, // Track turret fire timing
    bossActive: false,
    waveComplete: false,
    weaponHeat: 0,
    isWeaponLocked: false,
    weaponLockEndTime: 0,
    lastHeatGenerationTime: 0,
    railgunContinuousFire: false,
    cooldownAnimationTriggered: false, // Track if cooldown animation has been triggered
    godMode: true,
    repairBotActive: false,
    repairBotEndTime: 0,
    lastDamageTime: 0,
    pickupNotifications: [], // Array of notification objects {text, startTime}
    kamikazeDrones: [], // Array of active kamikaze drones
    kamikazeDroneActive: false,
    kamikazeDronesRemaining: 0, // Number of drones remaining to spawn
    lastDroneSpawn: 0
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

// Menu starfield state
const menuStarfield = {
    scrollOffset: 0,
    animationId: null
};

// Screen Management
const screens = {
    menu: document.getElementById('menu-screen'),
    game: document.getElementById('game-screen'),
    pause: document.getElementById('pause-screen'),
    gameover: document.getElementById('gameover-screen')
};

// Button Event Listeners
document.getElementById('start-button').addEventListener('click', startGame);
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

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    gameState.keys[e.key.toLowerCase()] = true;
    
    if (e.key === ' ' && !gameState.isPaused && !gameState.isGameOver) {
        e.preventDefault();
        // Toggle continuous fire for railgun, otherwise fire once
        if (gameState.currentWeapon === 'railgun') {
            gameState.railgunContinuousFire = !gameState.railgunContinuousFire;
        } else {
            fireBullet();
        }
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
        // Draw ship body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height * 0.8);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // Draw cockpit
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(this.x + this.width / 2 - 5, this.y + 10, 10, 10);

        // Draw wings (upgraded if player has wings power-up)
        const wingsLevel = gameState.shipUpgrades.wingsLevel;
        if (wingsLevel > 0) {
            // Visual size increases with level (subtle effect)
            const levelScale = 1 + (wingsLevel - 1) * 0.05;
            ctx.fillStyle = '#00ff00';
            // Left wing addon
            ctx.fillRect(this.x - 15 * levelScale, this.y + this.height / 2, 15 * levelScale, 20 * levelScale);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x - 13 * levelScale, this.y + this.height / 2 + 5, 3, 10);
            // Right wing addon
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(this.x + this.width, this.y + this.height / 2, 15 * levelScale, 20 * levelScale);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x + this.width + 10 * levelScale, this.y + this.height / 2 + 5, 3, 10);
        } else {
            ctx.fillStyle = '#00aa00';
            ctx.fillRect(this.x - 5, this.y + this.height / 2, 10, 15);
            ctx.fillRect(this.x + this.width - 5, this.y + this.height / 2, 10, 15);
        }

        // Draw nose upgrade (reinforced front)
        const noseLevel = gameState.shipUpgrades.noseLevel;
        if (noseLevel > 0) {
            // Visual enhancement increases with level
            const levelScale = 1 + (noseLevel - 1) * 0.03;
            ctx.fillStyle = '#00ffff';
            ctx.fillRect(this.x + this.width / 2 - 8 * levelScale, this.y - 5 * levelScale, 16 * levelScale, 8 * levelScale);
            ctx.fillRect(this.x + this.width / 2 - 5 * levelScale, this.y - 10 * levelScale, 10 * levelScale, 5 * levelScale);
        }

        // Draw cooling system (on roof/top of ship)
        const coolingLevel = gameState.shipUpgrades.coolingLevel;
        if (coolingLevel > 0) {
            // Visual enhancement increases with level
            const levelScale = 1 + (coolingLevel - 1) * 0.04;
            ctx.strokeStyle = '#00aaff';
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x + this.width / 2 - 6 * levelScale, this.y + 5, 12 * levelScale, 8 * levelScale);
            ctx.fillStyle = '#00aaff';
            ctx.fillRect(this.x + this.width / 2 - 4 * levelScale, this.y + 7, 8 * levelScale, 1);
            ctx.fillRect(this.x + this.width / 2 - 1, this.y + 6, 2, 6 * levelScale);
        }

        // Draw turret (on top of ship)
        const turretLevel = gameState.shipUpgrades.turretLevel;
        if (turretLevel > 0) {
            const levelScale = 1 + (turretLevel - 1) * 0.03;
            ctx.fillStyle = '#ff8800';
            // Turret base
            ctx.fillRect(this.x + this.width / 2 - 5 * levelScale, this.y + 15, 10 * levelScale, 6 * levelScale);
            // Turret barrel
            ctx.fillStyle = '#ffaa00';
            ctx.fillRect(this.x + this.width / 2 - 2, this.y + 10, 4, 8 * levelScale);
        }

        // Draw shield indicator
        if (this.shield < this.maxShield) {
            ctx.strokeStyle = `rgba(0, 255, 0, ${this.shield / this.maxShield})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2 + 5, 0, Math.PI * 2);
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
    constructor(type = 'basic') {
        this.type = type;
        this.width = 30;
        this.height = 30;
        this.x = Math.random() * (CONFIG.canvas.width - this.width);
        this.y = -this.height;
        this.speed = CONFIG.enemy.speed + Math.random() * 2;
        this.health = type === 'basic' ? 20 : 40;
        this.maxHealth = this.health;
        this.color = type === 'basic' ? '#ff0000' : '#ff00ff';
        this.lastFire = 0;
        this.fireRate = 1500 + Math.random() * 1000;
        this.points = type === 'basic' ? 10 : 25;
    }

    update() {
        this.y += this.speed;
        
        // Enemy shooting
        const now = Date.now();
        if (now - this.lastFire > this.fireRate && this.y > 50 && this.y < CONFIG.canvas.height - 100) {
            this.shoot();
            this.lastFire = now;
        }

        return this.y < CONFIG.canvas.height + this.height;
    }

    shoot() {
        const bullet = new EnemyBullet(
            this.x + this.width / 2 - 2,
            this.y + this.height,
            gameState.player.x + gameState.player.width / 2,
            gameState.player.y + gameState.player.height / 2
        );
        gameState.enemyBullets.push(bullet);
    }

    draw() {
        // Draw enemy ship
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height * 0.2);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.closePath();
        ctx.fill();

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
        this.damage = weaponConfig.damage * gameState.weaponUpgrades.damageRate;
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
    constructor() {
        this.width = 80;
        this.height = 80;
        this.x = CONFIG.canvas.width / 2 - this.width / 2;
        this.y = -this.height;
        this.speed = CONFIG.boss.speed;
        this.health = CONFIG.boss.health;
        this.maxHealth = this.health;
        this.color = '#ff00ff';
        this.lastFire = 0;
        this.fireRate = CONFIG.boss.fireRate;
        this.points = CONFIG.boss.points;
        this.moveDirection = 1;
        this.targetY = 100;
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
        
        // Boss shooting pattern
        const now = Date.now();
        if (now - this.lastFire > this.fireRate && this.y >= this.targetY) {
            this.shoot();
            this.lastFire = now;
        }

        return true;
    }

    shoot() {
        // Boss fires multiple projectiles in a pattern
        for (let i = -1; i <= 1; i++) {
            const bullet = new EnemyBullet(
                this.x + this.width / 2,
                this.y + this.height,
                gameState.player.x + gameState.player.width / 2 + (i * 50),
                gameState.player.y + gameState.player.height / 2
            );
            gameState.enemyBullets.push(bullet);
        }
    }

    draw() {
        // Draw boss ship body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + 10, this.y, this.width - 20, this.height);
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height / 2);
        ctx.lineTo(this.x + 10, this.y);
        ctx.lineTo(this.x + this.width - 10, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        ctx.closePath();
        ctx.fill();

        // Draw boss details
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x + 15, this.y + 20, 10, 10);
        ctx.fillRect(this.x + this.width - 25, this.y + 20, 10, 10);
        ctx.fillRect(this.x + this.width / 2 - 5, this.y + 10, 10, 15);

        // Draw health bar
        ctx.fillStyle = '#330000';
        ctx.fillRect(this.x, this.y - 12, this.width, 8);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x, this.y - 12, this.width * (this.health / this.maxHealth), 8);
        
        // Draw boss name
        ctx.fillStyle = '#ff00ff';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('BOSS', this.x + this.width / 2, this.y - 15);
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
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 8;
        
        // Calculate direction to player
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        this.vx = (dx / distance) * CONFIG.bullet.enemySpeed;
        this.vy = (dy / distance) * CONFIG.bullet.enemySpeed;
        this.damage = CONFIG.bullet.enemyDamage;
        this.color = '#ff0000';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        return this.y < CONFIG.canvas.height + this.height && 
               this.x > -this.width && 
               this.x < CONFIG.canvas.width + this.width;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Turret Bullet Class
class TurretBullet {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 4;
        
        // Calculate direction to target
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const speed = 8; // Turret bullet speed
        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;
        this.damage = CONFIG.addons.turret.damage;
        this.color = '#00ffff'; // Cyan color for turret bullets
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
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        // Add glow effect
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
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
        this.type = type; // 'rateOfFire', 'damageRate', 'shieldHeal', 'shieldBoost', 'structureRepair', 'repairBot', 'wings', 'nose', 'cooling', 'kamikaze', 'turret'
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
            case 'rateOfFire':
                // Clock/speed icon
                ctx.strokeStyle = '#ffff00';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, 8, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(-1, -6, 2, 6);
                ctx.fillRect(-1, -1, 4, 2);
                break;
            case 'damageRate':
                // Power/damage icon
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(-8, -8, 16, 16);
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(-4, -4, 8, 8);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(-2, -2, 4, 4);
                break;
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
            case 'cooling':
                // Cooling system icon (fan/radiator on roof)
                ctx.strokeStyle = '#00aaff';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.rect(-8, -8, 16, 16);
                ctx.stroke();
                ctx.fillStyle = '#00aaff';
                // Draw fan blades
                ctx.fillRect(-6, -1, 12, 2);
                ctx.fillRect(-1, -6, 2, 12);
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
    gameState.weaponUpgrades = {
        rateOfFire: 1,
        damageRate: 1
    };
    gameState.shipUpgrades = {
        wingsLevel: 0,
        noseLevel: 0,
        coolingLevel: 0,
        turretLevel: 0
    };
    gameState.lastTurretFire = 0;
    gameState.bossActive = false;
    gameState.waveComplete = false;
    gameState.weaponHeat = 0;
    gameState.isWeaponLocked = false;
    gameState.weaponLockEndTime = 0;
    gameState.lastHeatGenerationTime = 0;
    gameState.railgunContinuousFire = false;
    gameState.cooldownAnimationTriggered = false;
    gameState.repairBotActive = false;
    gameState.repairBotEndTime = 0;
    gameState.lastDamageTime = 0;
    gameState.pickupNotifications = [];
    gameState.kamikazeDrones = [];
    gameState.kamikazeDroneActive = false;
    gameState.kamikazeDronesRemaining = 0;
    gameState.lastDroneSpawn = 0;
    updateHUD();
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.style.display = 'none');
    screens[screenName].style.display = 'flex';
    
    // Start or stop menu animation based on screen
    if (screenName === 'menu') {
        startMenuAnimation();
    } else {
        stopMenuAnimation();
    }
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
    
    // Check if weapon is locked due to overheating
    if (gameState.isWeaponLocked) {
        if (now >= gameState.weaponLockEndTime) {
            gameState.isWeaponLocked = false;
        } else {
            return; // Weapon still locked
        }
    }
    
    // Apply fire rate penalty if overheating
    let fireRateMultiplier = gameState.weaponUpgrades.rateOfFire;
    if (gameState.weaponHeat >= CONFIG.overheat.overheatThreshold) {
        fireRateMultiplier = fireRateMultiplier / CONFIG.overheat.fireRatePenalty;
    }
    
    const adjustedFireRate = weaponConfig.fireRate / fireRateMultiplier;
    
    if (now - gameState.lastFire < adjustedFireRate) return;

    gameState.lastFire = now;
    const player = gameState.player;
    const centerX = player.x + player.width / 2;

    if (gameState.currentWeapon === 'blaster') {
        // Blaster fires multiple pellets in a spread
        const blasterConfig = CONFIG.weapons.blaster;
        for (let i = 0; i < blasterConfig.pellets; i++) {
            const spread = (Math.random() - 0.5) * blasterConfig.spread;
            const bullet = new Bullet(centerX, player.y, gameState.currentWeapon, spread * blasterConfig.spreadMultiplier, 0);
            gameState.bullets.push(bullet);
        }
    } else {
        // Standard shot from center
        gameState.bullets.push(new Bullet(centerX - 2, player.y, gameState.currentWeapon));
        
        // Wings addon shoots from sides
        const wingsLevel = gameState.shipUpgrades.wingsLevel;
        if (wingsLevel > 0) {
            gameState.bullets.push(new Bullet(player.x - 12, player.y + player.height / 2, gameState.currentWeapon));
            gameState.bullets.push(new Bullet(player.x + player.width + 12, player.y + player.height / 2, gameState.currentWeapon));
        }
    }
    
    // Increase heat after firing
    const coolingLevel = gameState.shipUpgrades.coolingLevel;
    const coolingMultiplier = coolingLevel > 0 ? 
        CONFIG.overheat.coolingSystemHeatMultiplier * (1 - coolingLevel * CONFIG.addons.cooling.cooldownBonusPerLevel) : 1;
    const heatIncrease = weaponConfig.heatPerShot * coolingMultiplier;
    gameState.weaponHeat = Math.min(CONFIG.overheat.maxHeat, gameState.weaponHeat + heatIncrease);
    gameState.lastHeatGenerationTime = now;
    
    // Lock weapon if max heat reached
    if (gameState.weaponHeat >= CONFIG.overheat.maxHeat) {
        gameState.isWeaponLocked = true;
        gameState.weaponLockEndTime = now + CONFIG.overheat.lockoutDuration;
        // Note: railgunContinuousFire stays true during lockout. The weapon lock
        // prevents firing (line 845-850), and once unlocked, continuous fire resumes
        // automatically via the update loop (line 1220-1222)
    }
    
    updateHUD();
}

function switchWeapon() {
    const now = Date.now();
    
    // Check if weapon lock has expired
    if (gameState.isWeaponLocked) {
        if (now >= gameState.weaponLockEndTime) {
            gameState.isWeaponLocked = false;
        } else {
            // Weapon still locked, prevent switching
            return;
        }
    }
    
    const weapons = ['laser', 'plasma', 'railgun', 'blaster'];
    const currentIndex = weapons.indexOf(gameState.currentWeapon);
    gameState.currentWeapon = weapons[(currentIndex + 1) % weapons.length];
    gameState.railgunContinuousFire = false; // Disable continuous fire when switching
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
    
    // Fire at nearest enemy if found
    if (nearestEnemy) {
        const targetX = nearestEnemy.x + nearestEnemy.width / 2;
        const targetY = nearestEnemy.y + nearestEnemy.height / 2;
        
        const bullet = new TurretBullet(
            playerCenterX,
            playerCenterY,
            targetX,
            targetY
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
    
    // Spawn harder enemies as waves progress
    const type = Math.random() < 0.2 + (gameState.wave * 0.05) ? 'tough' : 'basic';
    gameState.enemies.push(new Enemy(type));
    gameState.enemiesInWave++;

    // Occasionally spawn multiple enemies
    if (Math.random() < 0.3 + (gameState.wave * 0.05)) {
        setTimeout(() => {
            gameState.enemies.push(new Enemy(type));
            gameState.enemiesInWave++;
        }, 200);
    }
}

function spawnBoss() {
    gameState.bossActive = true;
    gameState.boss = new Boss();
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

    const types = ['rateOfFire', 'damageRate', 'shieldHeal', 'shieldBoost', 'structureRepair', 'repairBot', 'wings', 'nose', 'cooling', 'kamikaze', 'turret'];
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
                case 'rateOfFire':
                    gameState.weaponUpgrades.rateOfFire = Math.min(
                        CONFIG.powerup.upgradeMaxCap, 
                        gameState.weaponUpgrades.rateOfFire + CONFIG.powerup.upgradeIncrement
                    );
                    showPickupNotification('FIRE RATE UPGRADE');
                    break;
                case 'damageRate':
                    gameState.weaponUpgrades.damageRate = Math.min(
                        CONFIG.powerup.upgradeMaxCap, 
                        gameState.weaponUpgrades.damageRate + CONFIG.powerup.upgradeIncrement
                    );
                    showPickupNotification('DAMAGE UPGRADE');
                    break;
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
                case 'cooling':
                    if (gameState.shipUpgrades.coolingLevel < CONFIG.addons.maxLevel) {
                        gameState.shipUpgrades.coolingLevel++;
                        const level = gameState.shipUpgrades.coolingLevel;
                        showPickupNotification(`COOLING LEVEL ${level} - FASTER COOLDOWN`);
                    } else {
                        showPickupNotification('COOLING MAX LEVEL');
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
}

function updateHUD() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('wave').textContent = gameState.wave;
    const weaponConfig = CONFIG.weapons[gameState.currentWeapon];
    let weaponText = weaponConfig.name.toUpperCase();
    document.getElementById('weapon-name').textContent = weaponText;
    
    if (gameState.player) {
        const shieldPercent = (gameState.player.shield / gameState.player.maxShield) * 100;
        document.getElementById('shield-fill').style.width = shieldPercent + '%';
        
        const structurePercent = (gameState.player.structure / gameState.player.maxStructure) * 100;
        document.getElementById('structure-fill').style.width = structurePercent + '%';
    }
    
    // Update heat bar visuals
    updateHeatBarVisuals();
    
    // Update addon status display
    updateAddonStatus();
}

function updateAddonStatus() {
    const addons = [
        { id: 'addon-wings', levelProperty: 'wingsLevel' },
        { id: 'addon-nose', levelProperty: 'noseLevel' },
        { id: 'addon-cooling', levelProperty: 'coolingLevel' },
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

    // Railgun continuous fire
    if (gameState.railgunContinuousFire && gameState.currentWeapon === 'railgun') {
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

    // Weapon heat cooling with passive bonus
    const timeSinceLastHeat = now - gameState.lastHeatGenerationTime;
    const isPassiveCooling = timeSinceLastHeat > CONFIG.overheat.passiveCoolingDelay;
    
    let cooldownRate = CONFIG.overheat.cooldownRate;
    if (isPassiveCooling) {
        cooldownRate = CONFIG.overheat.cooldownRatePassive;
    }
    
    // Apply cooling system bonus
    const coolingLevel = gameState.shipUpgrades.coolingLevel;
    if (coolingLevel > 0) {
        cooldownRate *= CONFIG.overheat.coolingSystemCooldownBonus * (1 + coolingLevel * CONFIG.addons.cooling.cooldownBonusPerLevel);
    }
    
    gameState.weaponHeat = Math.max(0, gameState.weaponHeat - cooldownRate);

    // Turret auto-firing
    const turretLevel = gameState.shipUpgrades.turretLevel;
    if (turretLevel > 0) {
        const turretFireRate = CONFIG.addons.turret.baseFireRate - (turretLevel - 1) * CONFIG.addons.turret.fireRatePerLevel;
        if (now - gameState.lastTurretFire >= turretFireRate) {
            fireTurret();
            gameState.lastTurretFire = now;
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

// Heat Bar Update System
function updateHeatBarVisuals() {
    const heatPercent = (gameState.weaponHeat / CONFIG.overheat.maxHeat) * 100;
    const heatFill = document.getElementById('heat-fill');
    const cooldownFill = document.getElementById('cooldown-fill');
    
    if (heatFill) {
        heatFill.style.width = heatPercent + '%';
        
        // Change color based on heat level
        if (gameState.isWeaponLocked) {
            heatFill.style.backgroundColor = '#ff0000';
        } else if (gameState.weaponHeat >= CONFIG.overheat.overheatThreshold) {
            heatFill.style.backgroundColor = '#ff6600';
        } else if (gameState.weaponHeat >= CONFIG.overheat.overheatThreshold * CONFIG.overheat.cautionThresholdMultiplier) {
            heatFill.style.backgroundColor = '#ff9900';
        } else {
            heatFill.style.backgroundColor = '#ffff00';
        }
    }
    
    // Update cooldown overlay bar - show animation when locked
    if (cooldownFill) {
        if (gameState.isWeaponLocked && !gameState.cooldownAnimationTriggered) {
            // Trigger cooldown animation only once when weapon first locks
            gameState.cooldownAnimationTriggered = true;
            cooldownFill.style.animation = 'none';
            // Force reflow to restart animation
            void cooldownFill.offsetWidth;
            const animationDuration = CONFIG.overheat.lockoutDuration / 1000; // Convert ms to seconds
            cooldownFill.style.animation = `cooldown-sweep ${animationDuration}s linear forwards`;
        } else if (!gameState.isWeaponLocked) {
            // Reset animation trigger when weapon unlocks
            gameState.cooldownAnimationTriggered = false;
            // Show static cooldown state based on heat
            cooldownFill.style.animation = 'none';
            const cooldownPercent = 100 - heatPercent;
            cooldownFill.style.width = cooldownPercent + '%';
        }
    }
}

// Start menu animation on page load
startMenuAnimation();
