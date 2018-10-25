import { Component, ElementRef,  ViewChild, OnInit, OnDestroy } from '@angular/core';

// Speeds performance in iterations up
const FULL_ARC = Math.PI * 2;

@Component({
  selector: 'nologig-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})
export class TriangleComponent implements OnDestroy, OnInit {

  // a reference to the canvas element from our template
  @ViewChild('geometry') public canvasGeo: ElementRef;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cWidth = window.innerWidth;
  cHeight = window.innerHeight;

  point_A = {
    x: 400,
    y: 100
  };
  point_B = {
    x: 100,
    y: 700
  };
  point_C = {
    x: 700,
    y: 700
  };
  next_Point = {
    x: 500,
    y: 300
  };

  constructor() { }

  ngOnInit(): void {
    // Get canvas & context
    this.canvas = this.canvasGeo.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    // Canvas settings
    this.canvas.width = this.cWidth;
    this.canvas.height = this.cHeight;
    this.ctx.strokeStyle = '#fff';
    this.ctx.fillStyle = '#fff';


    this.pointXY(this.point_A.x, this.point_A.y);
    this.pointXY(this.point_B.x, this.point_B.y);
    this.pointXY(this.point_C.x, this.point_C.y);

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
      this.next_Point.x = (this.point_A.x + this.next_Point.x) / 2;
      this.next_Point.y = (this.point_A.y + this.next_Point.y) / 2;
      return;
    }
    if (p === 1) {
      this.next_Point.x = (this.point_B.x + this.next_Point.x) / 2;
      this.next_Point.y = (this.point_B.y + this.next_Point.y) / 2;
      return;
    }
    if (p === 2) {
      this.next_Point.x = (this.point_C.x + this.next_Point.x) / 2;
      this.next_Point.y = (this.point_C.y + this.next_Point.y) / 2;
      return;
    }
  }

  pointXY(x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 2, 0, FULL_ARC);
    this.ctx.fill();
  }

}
