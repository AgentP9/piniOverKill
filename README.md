# PiniOverKill

A browser-based vertically scrolling shooter inspired by the classic DOS game [OverKill (1992)](https://en.wikipedia.org/wiki/OverKill_(video_game)).

## About

PiniOverKill is a retro-style space shooter featuring:

- **Vertical scrolling gameplay** - Classic top-down shooting action
- **Shield system** - Take multiple hits before losing a life (inspired by OverKill's shield mechanics)
- **Weapon upgrades** - Collect power-ups to enhance your firepower
- **Multiple weapon types** - Switch between normal and spread shot weapons using TAB
- **Progressive difficulty** - Face increasingly challenging waves of enemies
- **Retro aesthetics** - Green terminal-style graphics with smooth animations

## Features

### Gameplay Mechanics
- **Movement**: Use arrow keys or WASD to navigate your ship
- **Shooting**: Press SPACE to fire your weapons
- **Weapon switching**: Press TAB to switch between weapon types
- **Health system**: Your ship has both Shield (regenerates over time) and Structure (requires repair)
- **Power-ups**: Collect weapon upgrades, health repairs, and special enhancements

### Enemy Types
- **Basic enemies**: Standard alien ships that fire at your position
- **Tough enemies**: More resilient foes with increased health
- **Progressive spawning**: Enemy difficulty increases with each wave

### Power-ups
- **Fire Rate Upgrade** (Yellow Clock): Increases weapon fire rate
- **Damage Upgrade** (Red/Yellow Square): Increases weapon damage
- **Shield Heal** (Cyan Shield with +): Restores 30 shield points
- **Shield Boost** (Cyan Shield with Arrow): Increases maximum shield capacity by 25
- **Structure Repair** (Orange Wrench): Repairs 40 structure points
- **Repair Bot** (Green Robot): Deploys a bot that repairs structure over 15 seconds
- **Wing Cannons** (Green Wings): Adds side cannons to your ship
- **Nose Armor** (Cyan Triangle): Increases shield capacity by 50
- **Cooling System** (Blue Fan): Reduces weapon heat generation

## Docker Deployment

### Prerequisites
- Docker
- Docker Compose

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AgentP9/piniOverKill.git
   cd piniOverKill
   ```

2. **Build and run with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

3. **Play the game**:
   Open your browser and navigate to: `http://localhost:1717`

4. **Stop the game**:
   ```bash
   docker-compose down
   ```

### Manual Docker Build

If you prefer to build and run manually:

```bash
# Build the image
docker build -t pinioverkill .

# Run the container
docker run -d -p 1717:80 --name pinioverkill-game pinioverkill

# Stop the container
docker stop pinioverkill-game
docker rm pinioverkill-game
```

### Custom Port

To run on a different port, modify the `docker-compose.yml` file or use:

```bash
docker run -d -p 3000:80 --name pinioverkill-game pinioverkill
```

Then access at: `http://localhost:3000`

## Architecture

The application runs in a lightweight Docker container:
- **Base Image**: nginx:alpine (~40MB)
- **Web Server**: Nginx with optimized configuration
- **Default Port**: 1717 (mapped from container port 80)
- **Game Files**: Static HTML/CSS/JS served by Nginx

## Controls

| Key | Action |
|-----|--------|
| **Arrow Keys** or **WASD** | Move ship |
| **SPACE** | Fire weapon |
| **TAB** | Switch weapon type |
| **ESC** | Pause/Resume game |

## Game Mechanics

### Health System
- **Shield**: Starts at 100 points and regenerates automatically after 2 seconds without taking damage
- **Structure**: Starts at 100 points and requires pickups to repair
- Enemy projectiles deal 20 damage (to shield first, then structure)
- Colliding with enemy ships deals 30 damage
- Asteroids deal 40 damage
- Game ends when structure reaches 0

### Scoring
- Basic enemies: 10 points
- Tough enemies: 25 points
- Every 20 enemies defeated advances to the next wave

### Weapon Levels
- **Level 1**: Single shot
- **Level 2**: Dual shots
- **Level 3**: Triple shots
- **Spread Mode**: Three-way spread shot (temporary)

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, and JavaScript (no frameworks)
- **Canvas API**: For game rendering
- **Web Server**: Nginx (Alpine Linux)
- **Containerization**: Docker & Docker Compose

## Project Structure

```
piniOverKill/
├── index.html          # Main HTML page with game structure
├── style.css           # Game styling and UI design
├── game.js             # Core game logic and mechanics
├── Dockerfile          # Docker image configuration
├── docker-compose.yml  # Docker Compose configuration
├── nginx.conf          # Nginx web server configuration
├── .dockerignore       # Docker build exclusions
└── README.md           # This file
```

## Development

### Local Development (without Docker)

Simply open `index.html` in a modern web browser. No build process required!

```bash
# Using Python's built-in server
python3 -m http.server 8080

# Or using Node.js http-server
npx http-server -p 8080
```

Then visit: `http://localhost:8080`

### Browser Compatibility

Works best in modern browsers with HTML5 Canvas support:
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)
- Opera (v76+)

## Inspiration

This game is inspired by **OverKill** (1992), a classic DOS shooter by Tech-Noir published by Epic MegaGames. Key influences include:

- Vertical scrolling shooter gameplay
- Shield-based damage system (multiple hits before death)
- Weapon upgrade mechanics with branching paths
- Progressive wave-based difficulty

## License

This project is open source. The original OverKill game was declared freeware in 2008.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## Future Enhancements

Potential features for future versions:
- Multiple levels/worlds
- Boss enemies
- More power-up types
- Local high score storage
- Sound effects and background music
- Mobile touch controls
- Multiplayer support

---

**Enjoy the game! Defend the galaxy!** 🚀
