#version 130

in vec2 position;
in vec2 uv;

out vec2 uvCoord;

void main()
{
    uvCoord = uv;
    gl_Position = vec4(position, 0, 1);
}
