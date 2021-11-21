uniform mat4 u_matrix;
attribute vec4 a_position;
attribute float a_pointSize;
void main() {
    gl_Position = u_matrix * a_position;
    gl_PointSize = a_pointSize;
}