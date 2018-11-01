import { Component, ElementRef,  ViewChild, OnInit, OnDestroy } from '@angular/core';

// Speeds performance in iterations up
const FULL_ARC = Math.PI * 2;
interface IPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'nologig-triangle-sierpinski',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})
export class TriangleComponent implements OnDestroy, OnInit {

  // Reference to canvas
  @ViewChild('geometry') public canvasGeo: ElementRef;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cWidth = window.innerWidth;
  cHeight = window.innerHeight;

  next_Point = {
    x: Math.random() * this.cWidth,
    y: Math.random() * this.cHeight
  };

  points: IPoint[];

  constructor() { }

  ngOnInit(): void {
    // Get canvas & context
    this.canvas = this.canvasGeo.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    // Canvas settings
    this.canvas.width = this.cWidth;
    this.canvas.height = this.cHeight;
    this.ctx.strokeStyle = '#0ff';
    this.ctx.fillStyle = '#0ff';
    // A
    this.ctx.font = '32px Roboto';
    this.pointXY(32, this.cHeight - 32);
    this.ctx.fillText('A', 4, this.cHeight);
    // B
    this.pointXY(this.cWidth - 32, this.cHeight - 32);
    this.ctx.fillText('B', this.cWidth - 32, this.cHeight);
    // C
    this.pointXY(this.cWidth * .5, 32);
    this.ctx.fillText('C', this.cWidth * .5, 32);

    // ToDo: implement method to attach/capture events
    this.render();
  }

  ngOnDestroy(): void { }

  render(): void {
    requestAnimationFrame(() => this.render());

    this.pointXY(this.next_Point.x, this.next_Point.y);
    this.update();
  }

  update(): void {
    let p = Math.floor(Math.random() * 3);
    if (p === 0) {
      this.next_Point.x = (10 + this.next_Point.x) / 2;
      this.next_Point.y = (this.cHeight - 32 + this.next_Point.y) / 2;
      return;
    }
    if (p === 1) {
      this.next_Point.x = (this.cWidth - 32 + this.next_Point.x) / 2;
      this.next_Point.y = (this.cHeight - 32 + this.next_Point.y) / 2;
      return;
    }
    if (p === 2) {
      this.next_Point.x = (this.cWidth * .5 + this.next_Point.x) / 2;
      this.next_Point.y = (32 + this.next_Point.y) / 2;
      return;
    }
  }

  pointXY(x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 2, 0, FULL_ARC);
    this.ctx.fill();
  }

}
