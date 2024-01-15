class Column{
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue = [];
        this.color = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
    }

    moveTo(loc, yOffset = 1, frameCount = 20) {
        for (let i = 1; i <= frameCount; i++) {
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            const randomColor = {
                r: Math.floor(Math.random() * 256),
                g: Math.floor(Math.random() * 256),
                b: Math.floor(Math.random() * 256)
            };
            this.queue.push({
                x: lerp(this.x, loc.x, t),
                y: lerp(this.y, loc.y, t) + u * this.width / 2 * yOffset,
                r: lerp(this.color.r, randomColor.r, u),
                g: lerp(this.color.g, randomColor.g, u),
                b: lerp(this.color.b, randomColor.b, u)
            });
        }
        const finalDistinctColor = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
        this.queue[this.queue.length - 1].r = finalDistinctColor.r;
        this.queue[this.queue.length - 1].g = finalDistinctColor.g;
        this.queue[this.queue.length - 1].b = finalDistinctColor.b;
    }
    
    
    
    jump(frameCount = 60) {
        for (let i = 1; i <= frameCount; i++) {
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            const randomColor = {
                r: Math.floor(Math.random() * 256),
                g: Math.floor(Math.random() * 256),
                b: Math.floor(Math.random() * 256)
            };
            this.queue.push({
                x: this.x,
                y: this.y - u * this.width,
                r: lerp(150, randomColor.r, u),
                g: lerp(150, randomColor.g, u),
                b: lerp(150, randomColor.b, u)
            });
        }
        const finalDistinctColor = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
        this.queue[this.queue.length - 1].r = finalDistinctColor.r;
        this.queue[this.queue.length - 1].g = finalDistinctColor.g;
        this.queue[this.queue.length - 1].b = finalDistinctColor.b;
    }
    
    

    draw(ctx) {
        let changed = false;
        if (this.queue.length > 0) {
            const { x, y, r, g, b } = this.queue.shift();
            this.x = x;
            this.y = y;
            this.color = { r, g, b };
            changed = true;
        }
        const left = this.x - this.width / 2;
        const top = this.y - this.height;
        const right = this.x + this.width / 2;
    
        const gradient = ctx.createLinearGradient(left, top, right, this.y);
        gradient.addColorStop(0, `rgba(${this.color.r},${this.color.g},${this.color.b}, 0.8)`);
        gradient.addColorStop(0.5, `rgba(${this.color.r},${this.color.g},${this.color.b}, 1)`);
        gradient.addColorStop(1, `rgba(${this.color.r},${this.color.g},${this.color.b}, 0.8)`);
    
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.moveTo(left, top);
        ctx.lineTo(left, this.y);
        ctx.ellipse(
            this.x,
            this.y,
            this.width / 2,
            this.width / 4,
            0,
            Math.PI,
            Math.PI * 2,
            true
        );
        ctx.lineTo(right, top);
        ctx.ellipse(this.x, top, this.width / 2, this.width / 4, 0, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        return changed;
    }
    
}