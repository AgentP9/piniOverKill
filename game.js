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
        fireRate: 200,
        maxShield: 100
    },
    enemy: {
        spawnRate: 2000,
        speed: 2
    },
    bullet: {
        speed: 7,
        playerDamage: 10,
        enemyDamage: 20,
        enemySpeed: 3,
        spreadSpacing: 2
    },
    powerup: {
        spawnChance: 0.3,
        duration: 10000
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
    bullets: [],
    enemyBullets: [],
    powerups: [],
    particles: [],
    keys: {},
    lastFire: 0,
    lastEnemySpawn: 0,
    scrollOffset: 0,
    enemiesDefeated: 0,
    weaponLevel: 1,
    weaponType: 'normal'
};

// Canvas Setup
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = CONFIG.canvas.width;
canvas.height = CONFIG.canvas.height;

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

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    gameState.keys[e.key.toLowerCase()] = true;
    
    if (e.key === ' ' && !gameState.isPaused && !gameState.isGameOver) {
        e.preventDefault();
        fireBullet();
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

        // Draw wings
        ctx.fillStyle = '#00aa00';
        ctx.fillRect(this.x - 5, this.y + this.height / 2, 10, 15);
        ctx.fillRect(this.x + this.width - 5, this.y + this.height / 2, 10, 15);

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
        this.shield -= damage;
        if (this.shield <= 0) {
            this.shield = 0;
            gameOver();
        }
        updateHUD();
    }

    heal(amount) {
        this.shield = Math.min(this.maxShield, this.shield + amount);
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
    constructor(x, y, type = 'normal') {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 12;
        this.speed = CONFIG.bullet.speed;
        this.damage = CONFIG.bullet.playerDamage * (type === 'spread' ? 0.7 : 1);
        this.color = type === 'spread' ? '#ffff00' : '#00ff00';
    }

    update() {
        this.y -= this.speed;
        return this.y > -this.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 1, this.y + 2, this.width - 2, this.height - 4);
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

// Powerup Class
class Powerup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.type = type; // 'weapon', 'shield', 'spread'
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
            case 'weapon':
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(-8, -8, 16, 16);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(-4, -4, 8, 8);
                break;
            case 'shield':
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 'spread':
                ctx.fillStyle = '#ff00ff';
                for (let i = 0; i < 3; i++) {
                    ctx.fillRect(-2 + i * 4 - 4, -2, 3, 10);
                }
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
    gameState.bullets = [];
    gameState.enemyBullets = [];
    gameState.powerups = [];
    gameState.particles = [];
    gameState.lastFire = 0;
    gameState.lastEnemySpawn = 0;
    gameState.scrollOffset = 0;
    gameState.enemiesDefeated = 0;
    gameState.weaponLevel = 1;
    gameState.weaponType = 'normal';
    updateHUD();
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.style.display = 'none');
    screens[screenName].style.display = 'flex';
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
    if (now - gameState.lastFire < CONFIG.player.fireRate) return;

    gameState.lastFire = now;
    const player = gameState.player;

    if (gameState.weaponType === 'spread') {
        // Spread shot
        for (let i = -1; i <= 1; i++) {
            const bullet = new Bullet(
                player.x + player.width / 2 - 2,
                player.y,
                'spread'
            );
            bullet.vx = i * CONFIG.bullet.spreadSpacing;
            bullet.update = function() {
                this.y -= this.speed;
                this.x += this.vx;
                return this.y > -this.height && this.x > 0 && this.x < CONFIG.canvas.width;
            };
            gameState.bullets.push(bullet);
        }
    } else {
        // Normal shot
        const bulletCount = gameState.weaponLevel;
        if (bulletCount === 1) {
            gameState.bullets.push(new Bullet(player.x + player.width / 2 - 2, player.y));
        } else if (bulletCount === 2) {
            gameState.bullets.push(new Bullet(player.x + 5, player.y));
            gameState.bullets.push(new Bullet(player.x + player.width - 9, player.y));
        } else {
            gameState.bullets.push(new Bullet(player.x + player.width / 2 - 2, player.y));
            gameState.bullets.push(new Bullet(player.x + 5, player.y));
            gameState.bullets.push(new Bullet(player.x + player.width - 9, player.y));
        }
    }
}

function switchWeapon() {
    if (gameState.weaponType === 'normal') {
        gameState.weaponType = 'spread';
    } else {
        gameState.weaponType = 'normal';
    }
    updateHUD();
}

function spawnEnemy() {
    const now = Date.now();
    if (now - gameState.lastEnemySpawn < CONFIG.enemy.spawnRate) return;

    gameState.lastEnemySpawn = now;
    
    // Spawn harder enemies as waves progress
    const type = Math.random() < 0.2 + (gameState.wave * 0.05) ? 'tough' : 'basic';
    gameState.enemies.push(new Enemy(type));

    // Occasionally spawn multiple enemies
    if (Math.random() < 0.3 + (gameState.wave * 0.05)) {
        setTimeout(() => {
            gameState.enemies.push(new Enemy(type));
        }, 200);
    }
}

function spawnPowerup(x, y) {
    if (Math.random() > CONFIG.powerup.spawnChance) return;

    const types = ['weapon', 'shield', 'spread'];
    const type = types[Math.floor(Math.random() * types.length)];
    gameState.powerups.push(new Powerup(x, y, type));
}

function createExplosion(x, y, color) {
    for (let i = 0; i < 15; i++) {
        gameState.particles.push(new Particle(x, y, color));
    }
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
                    
                    // Check for wave completion
                    if (gameState.enemiesDefeated % 20 === 0) {
                        gameState.wave++;
                        updateHUD();
                    }
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
                case 'weapon':
                    gameState.weaponLevel = Math.min(3, gameState.weaponLevel + 1);
                    break;
                case 'shield':
                    player.heal(30);
                    break;
                case 'spread':
                    gameState.weaponType = 'spread';
                    setTimeout(() => {
                        if (gameState.weaponType === 'spread') {
                            gameState.weaponType = 'normal';
                            updateHUD();
                        }
                    }, CONFIG.powerup.duration);
                    break;
            }
            
            createExplosion(powerup.x + powerup.width / 2, powerup.y + powerup.height / 2, '#ffff00');
            updateHUD();
        }
    }
}

function updateHUD() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('wave').textContent = gameState.wave;
    document.getElementById('weapon-level').textContent = 
        gameState.weaponType === 'spread' ? 'SPREAD' : gameState.weaponLevel;
    
    const shieldPercent = (gameState.player.shield / gameState.player.maxShield) * 100;
    document.getElementById('shield-fill').style.width = shieldPercent + '%';
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

    // Update enemies
    gameState.enemies = gameState.enemies.filter(enemy => enemy.update());

    // Update bullets
    gameState.bullets = gameState.bullets.filter(bullet => bullet.update());
    gameState.enemyBullets = gameState.enemyBullets.filter(bullet => bullet.update());

    // Update powerups
    gameState.powerups = gameState.powerups.filter(powerup => powerup.update());

    // Update particles
    gameState.particles = gameState.particles.filter(particle => particle.update());

    checkCollisions();
}

function render() {
    drawBackground();
    
    gameState.player.draw();
    gameState.enemies.forEach(enemy => enemy.draw());
    gameState.bullets.forEach(bullet => bullet.draw());
    gameState.enemyBullets.forEach(bullet => bullet.draw());
    gameState.powerups.forEach(powerup => powerup.draw());
    gameState.particles.forEach(particle => particle.draw());
}

function gameLoop() {
    if (gameState.isPaused || gameState.isGameOver) return;

    update();
    render();
    requestAnimationFrame(gameLoop);
}
