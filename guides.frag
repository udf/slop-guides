#version 130

// inputs/outputs
uniform sampler2D texture;
uniform vec2 screenSize;
uniform vec2 mouse;

in vec2 uvCoord;

out vec4 outColour;

// configurables
const uniform vec4 colours[2] = {
    vec4(1, 1, 1, 1),
    vec4(0.375, 0.375, 0.375, 1)
};
const uniform float ant_size = 2;

int mod_i(float n, int m) {
    return int(mod(int(n), m));
}

vec4 get_ant_colour(float n) {
    return colours[mod_i(n / ant_size, 2)];
}

vec4 checkerboard(vec2 p) {
    return colours[mod_i(p.x, 2) ^ mod_i(p.y, 2)];
}

void main() {
    // unflipped uv coordinates
    vec2 uv = vec2(uvCoord.x, 1 - uvCoord.y);
    // uv coordinates in screen space
    vec2 screenUV = uv * screenSize;

    vec4 colour = texture2D(texture, uvCoord) * checkerboard(screenUV / ant_size);
    if (screenUV.x > mouse.x && screenUV.x <= mouse.x + 1) {
        colour = get_ant_colour(screenUV.y);
    }
    if (screenUV.y > mouse.y && screenUV.y <= mouse.y + 1) {
        colour = get_ant_colour(screenUV.x);
    }
    outColour = colour;
}
