import { Component, ElementRef, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';

interface IPoint {
  x: number;
  y: number;
}

const FULL_ARC = Math.PI * 2;

@Component({
  selector: 'nologig-triangle-sierpinski',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})
export class TriangleComponent implements OnDestroy, OnInit {

  @ViewChild('geometry') public canvasGeo: ElementRef;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cWidth = window.innerWidth;
  cHeight = window.innerHeight;

  points: IPoint[] = [];
  next_Point = {
    x: Math.random() * this.cWidth,
    y: Math.random() * this.cHeight
  };
  
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

    this.ctx.fillText('A', 4, this.cHeight);
    this.ctx.fillText('B', this.cWidth - 32, this.cHeight);
    this.ctx.fillText('C', this.cWidth * .5, 32);

    // ToDo: implement method to attach/capture events => test
    this.attachEvent(this.canvas, 'click', this.createNode);

    this.points.push({
      x: 32,
      y: this.cHeight - 32
    });
    this.points.push({
      x: this.cWidth - 32,
      y: this.cHeight - 32
    });
    this.points.push({
      x: this.cWidth * .5,
      y: 32
    });

    this.pointXY(this.points[0].x, this.points[0].y);
    this.pointXY(this.points[1].x, this.points[1].y);
    this.pointXY(this.points[2].x, this.points[2].y);

    this.render();
  }

  attachEvent(ele: HTMLElement, event: string, fn: (e: KeyboardEvent | MouseEvent) => void) {
    ele.addEventListener(event, fn);
  }

  detachEvent(ele: HTMLElement, event: string, fn: (e: KeyboardEvent | MouseEvent) => void) {
    ele.removeEventListener(event, fn);
  }

  createNode = (e: MouseEvent) => {
    this.points.push({
      x: e.clientX,
      y: e.clientY
    });
  }

  ngOnDestroy(): void {
    this.detachEvent(this.canvas, 'click', this.createNode);
  }

  render(): void {
    requestAnimationFrame(() => this.render());

    this.pointXY(this.next_Point.x, this.next_Point.y);
    this.update();
  }

  update(): void {
    let i = Math.floor(Math.random() * this.points.length);

    this.next_Point.x = (this.points[i].x + this.next_Point.x) * .5;
    this.next_Point.y = (this.points[i].y + this.next_Point.y) * .5;
    return;
  }

  pointXY(x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 2, 0, FULL_ARC);
    this.ctx.fill();
  }

}
