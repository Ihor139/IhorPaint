class MyCanvas {
    constructor() {
        // Elements
        this.canvas = document.querySelector('.canvas');
        this.ctx = this.canvas.getContext('2d');
        this.penBtn = document.querySelector('.fa-paint-brush');
        this.eraserBtn = document.querySelector('.fa-eraser');
        this.backspaceBtn = document.querySelector('.fa-backspace');
        this.sizeBrushBtn = document.querySelector('.size_range');
        this.colorhBtn = document.querySelector('.color');

        // 
        this.isMouseDown = false;

        // Events
        this.canvas.addEventListener('mousedown', (e) => this.draw(e));
        this.canvas.addEventListener('mousemove', (e) => { this.drawing(e) });
        this.canvas.addEventListener('mouseup', (e) => { this.isMouseDown = false; });

        this.penBtn.onclick = () => console.log('hr')
        this.backspaceBtn.onclick = () => this.delete();
        this.eraserBtn.onclick = () => {this.colorhBtn.value = '#ffffff'};
        
        // Method
        this.fixDPI();
    };

    fixDPI() {
        this.onScreenSizeChanged = function (forceResize) {
            if (forceResize || (this.canvas.width != window.innerWidth ||
                this.canvas.height != window.innerHeight)) {

                let image = this.ctx.getImageData(0, 0,
                    this.canvas.width,
                    this.canvas.height);

                this.canvas.width = (window.innerWidth);
                this.canvas.height = (window.innerHeight);

                this.ctx.putImageData(image, 0, 0);

            }
        }
        this.onScreenSizeChanged(true);
    }

    mousePosition(e) {
        let rect = this.canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
            y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
        };
    }

    draw(e) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.mousePosition(e).x, this.mousePosition(e).y);
        this.isMouseDown = true;
    }

    drawing(e) {
        if (this.isMouseDown) {
            this.ctx.strokeStyle = this.colorhBtn.value;
            this.ctx.lineWidth = this.sizeBrushBtn.value;
            this.ctx.lineTo(this.mousePosition(e).x, this.mousePosition(e).y);
            this.ctx.stroke();
        }
    }
    delete(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

let myCanvas = new MyCanvas();