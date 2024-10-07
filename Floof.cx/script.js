const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Player properties
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: 'blue',
    speed: 2,
};

// Collectible properties
let collectibles = [];
const collectibleCount = 5;
const collectibleRadius = 10;

// Controls
let keys = {};

// Generate random collectibles
function spawnCollectibles() {
    collectibles = [];
    for (let i = 0; i < collectibleCount; i++) {
        const collectible = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: collectibleRadius,
            color: 'yellow',
        };
        collectibles.push(collectible);
    }
}

// Handle player movement
function movePlayer() {
    if (keys['w'] && player.y > 0) player.y -= player.speed;
    if (keys['s'] && player.y < canvas.height) player.y += player.speed;
    if (keys['a'] && player.x > 0) player.x -= player.speed;
    if (keys['d'] && player.x < canvas.width) player.x += player.speed;
}

// Check collision between player and collectible
function checkCollision(collectible) {
    const dist = Math.hypot(player.x - collectible.x, player.y - collectible.y);
    return dist - player.radius - collectible.radius < 0;
}

// Update game state
function update() {
    movePlayer();

    collectibles = collectibles.filter(collectible => {
        if (checkCollision(collectible)) {
            player.radius += 1; // Increase player size
            return false; // Remove the collectible
        }
        return true;
    });

    if (collectibles.length === 0) spawnCollectibles(); // Respawn collectibles
}

// Draw player and collectibles
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();

    // Draw collectibles
    collectibles.forEach(collectible => {
        ctx.beginPath();
        ctx.arc(collectible.x, collectible.y, collectible.radius, 0, Math.PI * 2);
        ctx.fillStyle = collectible.color;
        ctx.fill();
        ctx.closePath();
    });
}

// Main game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Event listeners for player controls
window.addEventListener('keydown', (e) => { keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

// Initialize game
spawnCollectibles();
gameLoop();
