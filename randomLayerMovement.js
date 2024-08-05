'use strict';

import * as WEVector from 'WEVector';

export var scriptProperties = createScriptProperties()
    .addSlider({
        name: 'radius',
        label: 'Movement Radius',
        value: 100,
        min: 10,
        max: 500,
        integer: false
    })
    .addSlider({
        name: 'speed',
        label: 'Movement Speed',
        value: 50,
        min: 10,
        max: 200,
        integer: false
    })
    .finish();

let targetPosition;
let initialPosition;
let moving = false;

/**
 * @param {Vec3} value - for property 'origin'
 * @return {Vec3} - update current property value
 */
export function init(value) {
    initialPosition = value;
    targetPosition = value;
    return value;
}

export function update(value) {
    if (!moving || value == targetPosition) {
        // Generate a random target position within the specified radius from the initial position
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * scriptProperties.radius;
        targetPosition = new Vec3(
            initialPosition.x + Math.cos(angle) * distance,
            initialPosition.y + Math.sin(angle) * distance,
            initialPosition.z
        );
        moving = true;
    }

    // Calculate the direction vector towards the target position
    let direction = targetPosition.subtract(value);
    let distanceToTarget = direction.length();
    direction = direction.normalize();

    // Calculate the new position
    let step = direction.multiply(scriptProperties.speed * engine.frametime);
    if (distanceToTarget < step.length()) {
        value = targetPosition;
        moving = false;
    } else {
        value = value.add(step);
    }

    return value;
}
