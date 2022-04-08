export default class Circle {
	constructor(x, y, radius, color, velocity, ctx) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.velocity = velocity;
		this.color = color;
		this.ctx = ctx;
	}
	
	draw() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.fill();
	}
	
	update() {
		this.draw();
		this.x = this.x + this.velocity.x * 3;
		this.y = this.y + this.velocity.y * 3;
	}
}