import { lineHeight } from '@mui/system';
import p5 from 'p5';
import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';

const width = 1200;
const height = 1200

class Particle {
    constructor(x,y) {
        this.x = x
        this.y = y
        this.dx = Math.random()*6-3
        this.dy = Math.random()*6-3
    }

    update() {
        this.x += this.dx
        this.y += this.dy



        if(this.x >= width || this.x < 0) {
            this.dx *= -1
        }
        
        if(this.y >= height || this.y < 0) {
            this.dy *= -1
        }
    }
}

class BezierSketch extends React.Component {
    p0 = null
    p1 = 0
    p2 = 0

	setup = (p5, parentRef) => {
		p5.createCanvas(width, height).parent(parentRef);
        this.p0 = new Particle(0,height/2)
        this.p1 = new Particle(width/2,0)
        this.p2 = new Particle(width/3*2,height/3)
        this.p3 = new Particle(width,height/2)
	};

	draw = (p5) => {
		p5.background(0);
		p5.stroke(255)
        p5.strokeWeight(2)
        
        this.p1.x = p5.mouseX
        this.p1.y = p5.mouseY

        //this.p1.update()
        this.p2.update()

        let delta = 0.05
        p5.colorMode(p5.HSB)
        p5.noFill()

        for (let t = 0; t <= 1.0001; t+= delta) {

            p5.stroke(t*360,255,255,0.5)
            //p5.line(x1,y1,x2,y2)

           let v = this.cubic(p5, this.p0, this.p1, this.p2, this.p3, t)

        }
        
    };

    
    quadratic = (p5, p0,p1,p2,t) => {
        let x1 = p5.lerp(p0.x, p1.x, t)
        let y1 = p5.lerp(p0.y, p1.y, t)
        let x2 = p5.lerp(p1.x, p2.x, t)
        let y2 = p5.lerp(p1.y, p2.y, t)
        let x = p5.lerp(x1, x2, t)
        let y = p5.lerp(y1, y2, t)
        p5.line(x1,y1,x2,y2)

        return p5.createVector(x,y)
    }

    cubic = (p5, p0,p1,p2,p3,t) => {
        let v1 = this.quadratic(p5,p0,p1,p2,t)
        let v2 = this.quadratic(p5,p1,p2,p3,t)

        let x = p5.lerp(v1.x, v2.x, t)
        let y = p5.lerp(v1.y, v2.y, t)

        p5.line(v1.x,v1.y,v2.x,v2.y)
        return p5.createVector(x,y)
    }



	render() {
		return (
			<Sketch setup={this.setup} draw={this.draw} />
		);
	}
}

export default BezierSketch;
