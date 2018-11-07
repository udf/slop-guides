#version 120

uniform sampler2D desktop;
uniform sampler2D texture;

uniform vec2 screenSize;
uniform vec2 mouse;

varying vec2 uvCoord;

// configurables
uniform vec4 colours[] = {
    vec4(1, 1, 1, 1),
    vec4(0.375, 0.375, 0.375, 1)
};
uniform float ant_size = 2;

vec4 get_ant_colour(float n) {
    return colours[int(mod(int(n / ant_size), colours.length()))];
}

void main() {
    // unflipped uv coordinates
    vec2 uv = vec2(uvCoord.x, 1 - uvCoord.y);
    // uv coordinates in screen space
    vec2 screenUV = uv * screenSize;

    vec4 colour = texture2D(texture, uvCoord);
    if (screenUV.x > mouse.x && screenUV.x < mouse.x + 1) {
        colour = get_ant_colour(screenUV.y);
    }
    if (screenUV.y > mouse.y && screenUV.y < mouse.y + 1) {
        colour = get_ant_colour(screenUV.x);
    }
    gl_FragColor = colour;
}
