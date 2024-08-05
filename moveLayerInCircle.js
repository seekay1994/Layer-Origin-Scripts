'use strict';

import * as WEMath from 'WEMath';
import * as WEVector from 'WEVector';

export var scriptProperties = createScriptProperties()
    .addSlider({
        name: 'radius',
        label: 'Radius',
        value: 100,
        min: 0,
        max: 500,
        integer: true
    })
    .addSlider({
        name: 'speed',
        label: 'Speed',
        value: 100,
        min: 10,
        max: 1500,
        integer: true
    })
    .finish();

/**
 * @param {Vec3} value - for property 'origin'
 * @return {Vec3} - update current property value
 */
export function update(value) {
    let radius = scriptProperties.radius;
    let speed = scriptProperties.speed;
    let angle = engine.runtime * speed;
    let position = WEVector.angleVector2(angle).multiply(radius);
    
    // Assuming the center of the circle is in the center of the canvas
    let centerX = engine.canvasSize.x / 2;
    let centerY = engine.canvasSize.y / 2;

    value.x = centerX + position.x;
    value.y = centerY + position.y;
    
    return value;
}
