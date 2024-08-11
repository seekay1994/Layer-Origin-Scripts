'use strict';

import * as WEVector from 'WEVector';
import * as WEMath from 'WEMath';

export var scriptProperties = createScriptProperties()
    .addSlider({
        name: 'radius',
        label: 'Radius',
        value: 200,
        min: 50,
        max: 1000,
        integer: false
    })
    .addSlider({
        name: 'speed',
        label: 'Speed',
        value: 0.1,
        min: 0.01,
        max: 1,
        integer: false
    })
    .finish();

let initialPosition;

export function init(value) {
    // Store the initial position of the layer
    initialPosition = value;
}

export function update(value) {
    // Calculate the current angle in radians based on time and speed
    let angle = engine.runtime * scriptProperties.speed * 360;
    let angleRad = angle * WEMath.deg2rad;

    // Calculate the new position of the layer (x, y) using circular motion formula
    let newX = initialPosition.x + scriptProperties.radius * Math.cos(angleRad);
    let newY = initialPosition.y + scriptProperties.radius * Math.sin(angleRad);
    
    // Update the layer's origin to move in a circle around the initial position
    value.x = newX;
    value.y = newY;

    // Calculate the direction vector (current position to previous position)
    let direction = new Vec2(Math.cos(angleRad), Math.sin(angleRad));
    
    // Calculate the angle the layer should face (towards the movement direction)
    let facingAngle = WEMath.rad2deg * Math.atan2(direction.y, direction.x);
    thisLayer.angles = new Vec3(0, 0, facingAngle); // Face towards the direction

    return value; // Update the origin position
}
