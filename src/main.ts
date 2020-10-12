window.addEventListener('load', () => {
    new Canvas('#mainCanvas', window.innerWidth, window.innerHeight);
});


class Canvas {

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public status: 'drawing' | 'holding';

    constructor(public id: string, public width: number, public height: number) {
        this.canvas = this.createCanvas();
        this.context = this.getContext();
        this.status = 'holding';

        this.initEvents();
    }

    private initEvents(): void {
        this.canvas.addEventListener('mousedown', () => this.startDrawing());
        this.canvas.addEventListener('mouseup', () => this.finishDrawing());
        this.canvas.addEventListener('mousemove', (event: MouseEvent) => this.draw(event));
    }

    private destroyEvents(): void {
        this.canvas.removeEventListener('mousedown', () => {});
        this.canvas.removeEventListener('mouseup', () => {});
        this.canvas.removeEventListener('mousemove', () => {});
    }

    private createCanvas(): HTMLCanvasElement {
        const canvas = document.querySelector(this.id) as HTMLCanvasElement;
        canvas.width = this.width;
        canvas.height = this.height;
        return canvas;
    }

    private getContext(): CanvasRenderingContext2D {
        return this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    public startDrawing(): void {
        this.status = 'drawing';
    }

    public finishDrawing(): void {
        this.status = 'holding';
        this.context.beginPath();
    }

    public draw(event: MouseEvent): void {
        if (this.status === 'holding') return;

        this.context.lineTo(event.clientX, event.clientY);
        this.context.lineCap = 'round';
        this.context.lineWidth = 5;
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo(event.clientX, event.clientY);
    }
}