import { Turtle, SimpleTurtle, Point, Color } from "./turtle";
import * as fs from "fs";
import { execSync } from "child_process";
 
// Function to draw a square
export function drawSquare(turtle: Turtle, sideLength: number): void {
    for (let i = 0; i < 4; i++) {
        turtle.forward(sideLength);
        turtle.turn(90);
    }
}
 
// Function to calculate chord length
export function chordLength(radius: number, angleInDegrees: number): number {
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    return Math.round(2 * radius * Math.sin(angleInRadians/2) * 100) / 100;
}
 
// Function to draw an approximate circle
export function drawApproximateCircle(turtle: Turtle, radius: number, numSides: number): void {
    const angle = 360 / numSides;
    const sideLength = chordLength(radius, angle);
    for (let i = 0; i < numSides; i++) {
        turtle.forward(sideLength);
        turtle.turn(angle);
    }
}
 
// Function to calculate distance between two points
export function distance(p1: Point, p2: Point): number {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}
 
// Function to find a path (Basic Implementation)
export function findPath(turtle: Turtle, points: Point[]): string[] {
    let instructions: string[] = [];
    for (let i = 0; i < points.length - 1; i++) {
        let p1 = points[i];
        let p2 = points[i + 1];
        let dist = distance(p1, p2);
        instructions.push(`Move from (${p1.x}, ${p1.y}) to (${p2.x}, ${p2.y}), distance: ${dist}`);
    }
    return instructions;
}
 
// Function to draw personal art
export function drawPersonalArt(turtle: Turtle): void {
    for (let i = 0; i < 36; i++) {
        turtle.forward(100);
        turtle.turn(170);
    }
}
 
function generateHTML(pathData: { start: Point; end: Point; color: Color }[]): string {
    const canvasWidth = 500;
    const canvasHeight = 500;
    const scale = 1;
    const offsetX = canvasWidth / 2;
    const offsetY = canvasHeight / 2;
 
    let pathStrings = "";
    for (const segment of pathData) {
        const x1 = segment.start.x * scale + offsetX;
        const y1 = segment.start.y * scale + offsetY;
        const x2 = segment.end.x * scale + offsetX;
        const y2 = segment.end.y * scale + offsetY;
        pathStrings += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${segment.color}" stroke-width="2"/>`;
    }
 
    return `<!DOCTYPE html>
<html>
<head>
    <title>Turtle Graphics Output</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <svg width="${canvasWidth}" height="${canvasHeight}" style="background-color:#f0f0f0;">
        ${pathStrings}
    </svg>
</body>
</html>`;
}
 
function saveHTMLToFile(htmlContent: string, filename: string = "output.html"): void {
    fs.writeFileSync(filename, htmlContent);
    console.log(`Drawing saved to ${filename}`);
}
 
function openHTML(filename: string = "output.html"): void {
    try {
        execSync(`open ${filename}`);
    } catch {
        try {
            execSync(`start ${filename}`);
        } catch {
            try {
                execSync(`xdg-open ${filename}`);
            } catch {
                console.log("Could not open the file automatically");
            }
        }
    }
}
 
export function main(): void {
    const turtle = new SimpleTurtle();
    drawSquare(turtle, 100);
    drawApproximateCircle(turtle, 50, 36);
    drawPersonalArt(turtle);
    const htmlContent = generateHTML((turtle as SimpleTurtle).getPath());
    saveHTMLToFile(htmlContent);
    openHTML();
}
 
if (require.main === module) {
    main();
}