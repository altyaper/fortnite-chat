import { Player, Particle, Bullet, Enemy } from './';
import { BULLET_SIZE } from './constants';

export default class Game {
	constructor(canvas, config = {}) {
        if(!canvas) return
		this.playerInstanse = null;
		this.animationId = null;
		this.scoreEl = document.getElementById('scoreEl');
		this.canvas = canvas;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = canvas.getContext('2d');
		this.setCanvasSize();
		this.particles = [];
		this.bgColor = 'rgba(0, 0, 0, 0.1)'; 
		this.bullets = [];
		this.enemies = [];
		this.score = 0;
		this.BULLET_SIZE = BULLET_SIZE;
		this.player = config.player || {
			color: '#4a2dff',
			size: 20,
		};
		this.bullet = config.bullet || {
			size: 2
		}
		this.enemy = config.enemy || {
			color: 'blue',
			radius: 30
		}
	}

	setCanvasSize() {
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	init() {
		if (this.ctx) {
			this.animate();
			this.bindEvents();
		}
	}

	clearCanvas() {
		this.ctx.fillStyle = this.bgColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawPlayer() {
		const player = new Player(
			this.canvas.clientWidth / 2,
			this.canvas.clientHeight / 2,
			this.player.size,
			this.player.color,
			null,
			this.ctx
		);
		this.playerInstanse = player;
		player.draw();
	}

	randomColor() { return Math.floor(Math.random()*16777215).toString(16) }

	bindEvents() {
		window.addEventListener('click', (e) => {
			const angle = Math.atan2(e.clientY - this.canvas.height / 2, e.clientX - this.canvas.width / 2);
			const velocity = {
				x: Math.cos(angle),
				y: Math.sin(angle),
			}
			const xBullet = this.canvas.clientWidth / 2;
			const yBullet = this.canvas.clientHeight / 2;
			const bullet = new Bullet(
				xBullet,
				yBullet,
				this.BULLET_SIZE,
				`#ffffff`,
				velocity,
				this.ctx
			);
			this.bullets.push(bullet);
		});

		window.addEventListener('keypress', (event) => {
			this.addEnemy();
		})
	}

	generateParticle(x, y, color) {
		const velocity = {
			x: Math.random() > 0.5 ? Math.random() * 2 : -Math.random(),
			y: Math.random() > 0.5 ? Math.random() * 2 : -Math.random()
		}
		return new Particle(x, y, Math.random() * 2, color, velocity, this.ctx);
	}

	generateParticles(x, y, color) {
		for(let i = 0; i < 100; i++) {
			this.particles.push(this.generateParticle(x, y, color));
		}
	}

	renderBullets() {
		this.bullets.forEach((bullet, idx) => {
			if(bullet.x < 0 ||
				bullet.y < 0 ||
				bullet.x > this.canvas.width ||
				bullet.y > this.canvas.height) {
				this.bullets.splice(idx, 1);
				this.generateParticles(bullet.x, bullet.y, bullet.color);
			}
			bullet.update();
		});
	}

	renderParticles() {
		this.particles.forEach((particle, idx) => {
			if(particle.x < 0 - particle.radius ||
				particle.y < 0 - particle.radius ||
				particle.x > this.canvas.width + particle.radius ||
				particle.y > this.canvas.height + particle.radius ||
				particle.alpha <= 0) {
					this.particles.splice(idx, 1);
			}
			particle.update();
		});
	}

	addEnemy() {
		const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
		const enemy = new Enemy(this.canvas, this.enemy.radius, color, this.ctx);
		this.enemies.push(enemy);
	}

	renderEnemies() {
		this.enemies.forEach((enemy, idx) => {
			
			// Edge collition
			if(enemy.x < 0 - enemy.radius ||
				enemy.y < 0 - enemy.radius ||
				enemy.x > this.canvas.width + enemy.radius ||
				enemy.y > this.canvas.height + enemy.radius) {
					this.enemies.splice(idx, 1);
			}

			const dist = Math.hypot(this.playerInstanse.x - enemy.x, this.playerInstanse.y - enemy.y);
			if (dist - enemy.radius - this.playerInstanse.radius < 1) {
				cancelAnimationFrame(this.animationId);
			}

			this.bullets.forEach((bullet, bulletIndex) => {
				const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
				if (dist - bullet.radius - enemy.radius < 1) {
					setTimeout(() => {
						this.bullets.splice(bulletIndex, 1);
						this.enemies.splice(idx, 1)
						this.generateParticles(enemy.x, enemy.y, enemy.color)
						this.score += 100;
						this.scoreEl.innerHTML = this.score;
					}, 0);
				}
			});
			enemy.update();
		});
	}

	animate() {
		this.animationId = requestAnimationFrame(this.animate.bind(this));
		this.clearCanvas();
		this.drawPlayer();
		this.renderBullets();
		this.renderParticles();
		this.renderEnemies();
	}
}