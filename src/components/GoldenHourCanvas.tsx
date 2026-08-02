import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform float u_sunY;
uniform float u_cloudSpeed;
uniform float u_wispStrength;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

vec3 skyGradient(vec2 uv, float sunY) {
  float horizon = uv.y;
  vec2 sunPos = vec2(0.5, sunY);
  float sunDist = length(uv - sunPos);
  float sunMask = smoothstep(0.5, 0.0, sunDist);

  vec3 skyTop = vec3(0.92, 0.78, 0.68);
  vec3 skyMid = vec3(0.98, 0.88, 0.72);
  vec3 skyHorizon = vec3(0.99, 0.94, 0.88);
  vec3 sunGlow = vec3(1.0, 0.92, 0.82);
  vec3 sunCore = vec3(1.0, 0.97, 0.92);

  vec3 col = mix(skyHorizon, skyMid, smoothstep(0.0, 0.25, horizon));
  col = mix(col, skyTop, smoothstep(0.25, 0.7, horizon));
  col = mix(col, sunGlow, sunMask * 0.6);
  col += sunCore * smoothstep(0.08, 0.0, sunDist) * 0.4;

  return col;
}

float cloudLayer(vec2 uv, float t, float speed, float yOffset, float scale) {
  vec2 p = uv * scale + vec2(t * 0.02 * speed, yOffset);
  float n = fbm(p);
  float density = smoothstep(0.45, 0.65, n) * 0.9;
  density *= smoothstep(0.9, 0.3, uv.y);
  density *= smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);
  return density;
}

float wispyClouds(vec2 uv, float t, float speed) {
  vec2 p = uv * 2.0 + vec2(t * 0.015 * speed, 0.0);
  float n = fbm(p);
  float wisps = smoothstep(0.5, 0.7, n) * 0.3;
  wisps *= smoothstep(0.85, 0.4, uv.y);
  return wisps;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time;
  float sunY = u_sunY;

  vec3 col = skyGradient(uv, sunY);

  float wisp = wispyClouds(uv, t, u_cloudSpeed) * u_wispStrength;
  col = mix(col, vec3(0.99, 0.94, 0.88), wisp * 0.7);

  float cloud1 = cloudLayer(uv, t, u_cloudSpeed, 0.1, 1.5);
  col = mix(col, vec3(0.99, 0.94, 0.88), cloud1 * 0.75);

  float cloud2 = cloudLayer(uv, t, u_cloudSpeed * 0.7, 0.3, 2.5);
  float brightness2 = 0.92 + 0.08 * sin(t * 0.3);
  col = mix(col, vec3(0.99, 0.94, 0.88) * brightness2, cloud2 * 0.6);

  float cloud3 = cloudLayer(uv, t, u_cloudSpeed * 0.4, 0.5, 4.0);
  col = mix(col, vec3(0.98, 0.92, 0.84), cloud3 * 0.35);

  col = mix(col, col * vec3(1.05, 0.97, 0.88), smoothstep(0.5, 0.0, uv.y) * 0.2);

  float grain = (hash(gl_FragCoord.xy + fract(t * 43.0) * 1000.0) - 0.5) * 0.02;
  col += grain;

  col = pow(max(col, 0.0), vec3(0.95));

  gl_FragColor = vec4(col, 1.0);
}
`;

const SUN_Y = 0.55;
const CLOUD_SPEED = 0.4;
const WISP_STRENGTH = 0.6;

function compileShader(gl: WebGLRenderingContext, src: string, type: number): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

export default function GoldenHourCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    if (!gl) return;

    const vertShader = compileShader(gl, VERTEX_SHADER, gl.VERTEX_SHADER);
    const fragShader = compileShader(gl, FRAGMENT_SHADER, gl.FRAGMENT_SHADER);

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      u_time: gl.getUniformLocation(prog, 'u_time'),
      u_res: gl.getUniformLocation(prog, 'u_res'),
      u_sunY: gl.getUniformLocation(prog, 'u_sunY'),
      u_cloudSpeed: gl.getUniformLocation(prog, 'u_cloudSpeed'),
      u_wispStrength: gl.getUniformLocation(prog, 'u_wispStrength'),
    };

    let time = 0.0;
    let running = true;
    let rafId: number;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function render(now: number) {
      if (!running) return;
      time = now * 0.00015;

      gl!.uniform1f(uniforms.u_time, time);
      gl!.uniform2f(uniforms.u_res, canvas!.width, canvas!.height);
      gl!.uniform1f(uniforms.u_sunY, SUN_Y);
      gl!.uniform1f(uniforms.u_cloudSpeed, CLOUD_SPEED);
      gl!.uniform1f(uniforms.u_wispStrength, WISP_STRENGTH);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      rafId = requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    resize();
    rafId = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
