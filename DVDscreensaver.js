'use strict';

export var scriptProperties = createScriptProperties()
    .addSlider({
        name: 'movSpeed',
        label: 'Movement Speed',
        value: 100,
        min: 1,
        max: 1000,
        integer: true
    })
    .finish();

import * as WEVector from 'WEVector';

// Choose a random direction in 360 degree range
var direction = new Vec3(WEVector.angleVector2(Math.random() * 360));

/**
 * @param {Vec3} value - for property 'origin'
 * @return {Vec3} - updated origin value
 */
export function update(value) {
    let scale = thisLayer.scale;
    let imageSize = thisLayer.size;
    let canvasSize = engine.canvasSize;

    // We need the size from the center to the bounds.
    imageSize.x *= scale.x * 0.5;
    imageSize.y *= scale.y * 0.5;

    // Move along the direction.
    value = value.add(direction.multiply(engine.frametime * scriptProperties.movSpeed));

    // Hit the screen bounds and reflect the direction.
    if (value.x < imageSize.x) {
        value.x = imageSize.x;
        direction = direction.reflect(new Vec3(1, 0));
    } else if (value.x > canvasSize.x - imageSize.x) {
        value.x = canvasSize.x - imageSize.x;
        direction = direction.reflect(new Vec3(-1, 0));
    }

    if (value.y < imageSize.y) {
        value.y = imageSize.y;
        direction = direction.reflect(new Vec3(0, 1));
    } else if (value.y > canvasSize.y - imageSize.y) {
        value.y = canvasSize.y - imageSize.y;
        direction = direction.reflect(new Vec3(0, -1));
    }

    return value;
}
