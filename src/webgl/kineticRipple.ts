const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform float u_waveSpeed;
uniform float u_lineCount;
uniform vec2 u_mouse;

#define PI 3.14159265359
#define TAU 6.28318530718

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float concentricWaves(vec2 uv, float t) {
  float r = length(uv);
  float angle = atan(uv.y, uv.x);
  float intensity = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float freq = 2.0 + fi * 1.5;
    float phase = t * (0.8 + fi * 0.2) + fi * 1.7;
    intensity += sin(r * freq - phase) * exp(-r * (1.5 + fi * 0.3));
  }
  intensity += vnoise(vec2(angle * 3.0, r * 2.0 - t * 0.5)) * 0.06 * smoothstep(0.1, 0.5, r);
  return intensity;
}

float crossWaves(vec2 uv, float t) {
  float waves = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float angle = fi * PI / 4.0 + 0.2;
    vec2 dir = vec2(cos(angle), sin(angle));
    float proj = dot(uv, dir);
    float freq = 3.0 + fi * 0.7;
    float phase = t * (1.0 + fi * 0.15);
    waves += sin(proj * freq - phase) * exp(-abs(proj) * (1.2 + fi * 0.2)) * 0.7;
  }
  return waves;
}

float interferenceWaves(vec2 uv, float t) {
  float d1 = length(uv - vec2(0.35, 0.0));
  float d2 = length(uv + vec2(0.35, 0.0));
  return sin(d1 * 8.0 - t * 2.0) * exp(-d1 * 2.0) + sin(d2 * 8.0 - t * 1.8) * exp(-d2 * 2.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
  vec2 centeredUV = (uv - 0.5) * aspect;
  vec2 mouseOffset = (u_mouse - 0.5) * aspect;

  vec2 velocity = vec2(
    sin(u_time * 1.3 + u_mouse.y * 5.0) * 0.02,
    cos(u_time * 1.1 + u_mouse.x * 5.0) * 0.015
  ) * smoothstep(0.0, 0.3, length(mouseOffset));

  float waveSpeed = u_waveSpeed;
  float numLines = u_lineCount;
  float t = u_time * waveSpeed;

  float ripple = 0.0;
  if (u_mouse.x > 0.0) {
    vec2 mousePos = mouseOffset * 0.2;
    float mDist = length(centeredUV - mousePos);
    ripple += concentricWaves(centeredUV - mousePos, t) * exp(-mDist * 1.5) * 0.9;
  }
  ripple += (crossWaves(centeredUV, t) + interferenceWaves(centeredUV, t) * 0.3) * 0.15;

  vec3 finalColor = vec3(0.0);

  float spacing, linePos, dist, width, intensity, glow;
  vec3 lineColor, glowColor;

  float centerDist = length(centeredUV);
  float falloff = exp(-centerDist * centerDist * 0.8);

  // Horizontal grid lines
  spacing = aspect.y / numLines;
  for (int i = 0; i < 24; i++) {
    linePos = -aspect.y * 0.5 + float(i) * spacing;
    dist = abs(centeredUV.y + sin(centeredUV.x * 3.0 + t * 0.7 + float(i) * 0.4) * 0.015 + ripple * 0.04 * (1.0 + sin(centeredUV.x * 5.0 + float(i)) * 0.3) - linePos);
    width = 0.0008 + (1.0 - smoothstep(0.0, aspect.y * 0.6, abs(linePos))) * 0.001;
    intensity = smoothstep(width, 0.0, dist);
    if (intensity > 0.0) {
      lineColor = vec3(0.15, 0.18, 0.22) * (0.6 + 0.4 * sin(float(i) * 0.5 + t * 0.3));
      finalColor += lineColor * intensity * (0.7 + falloff * 0.3);
    }
    glow = exp(-dist * dist / (width * 8.0)) * 0.25;
    glowColor = mix(vec3(0.08, 0.09, 0.1), vec3(0.1, 0.12, 0.14), smoothstep(0.0, aspect.y * 0.5, abs(linePos)));
    finalColor += glowColor * glow * falloff;
  }

  // Vertical grid lines
  spacing = aspect.x / (numLines * aspect.x / aspect.y);
  for (int i = 0; i < 36; i++) {
    linePos = -aspect.x * 0.5 + float(i) * spacing;
    dist = abs(centeredUV.x + cos(centeredUV.y * 2.5 + t * 0.5 + float(i) * 0.3) * 0.012 + ripple * 0.03 * (1.0 + cos(centeredUV.y * 4.0 + float(i) * 1.1) * 0.2) - linePos);
    width = 0.0006 + (1.0 - smoothstep(0.0, aspect.x * 0.6, abs(linePos))) * 0.0008;
    intensity = smoothstep(width, 0.0, dist);
    if (intensity > 0.0) {
      lineColor = vec3(0.14, 0.17, 0.21) * (0.5 + 0.3 * sin(float(i) * 0.4 + t * 0.2));
      finalColor += lineColor * intensity * (0.6 + falloff * 0.4);
    }
    glow = exp(-dist * dist / (width * 10.0)) * 0.18;
    glowColor = mix(vec3(0.06, 0.07, 0.08), vec3(0.09, 0.1, 0.12), smoothstep(0.0, aspect.x * 0.5, abs(linePos)));
    finalColor += glowColor * glow * falloff;
  }

  // Vertex highlight
  float d = centerDist;
  float vertexHighlight = smoothstep(0.08, 0.0, d) * 0.03 * (0.7 + 0.3 * sin(t * 0.8));
  finalColor += vec3(0.12, 0.15, 0.18) * vertexHighlight;

  // Background base
  finalColor += vec3(0.02, 0.025, 0.03) + vec3(0.01, 0.012, 0.015) * exp(-d * d * 1.5);

  // Post-processing
  finalColor *= 0.85 + (1.0 - smoothstep(0.3, 1.2, d)) * 0.15;
  finalColor += (hash(gl_FragCoord.xy + fract(u_time * 43.0) * 1000.0) - 0.5) * 0.012;
  finalColor = pow(finalColor, vec3(1.05, 1.02, 0.98));

  gl_FragColor = vec4(finalColor, 1.0);
}
`

export interface KineticRippleState {
  gl: WebGLRenderingContext
  program: WebGLProgram
  uniforms: Record<string, WebGLUniformLocation | null>
  rafId: number
  mouse: { x: number; y: number }
  targetMouse: { x: number; y: number }
  canvas: HTMLCanvasElement
  destroyed: boolean
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function initKineticRipple(canvas: HTMLCanvasElement): KineticRippleState | null {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
  if (!gl) return null

  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  if (!vs || !fs) return null

  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program))
    return null
  }

  gl.useProgram(program)

  // Fullscreen triangle
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

  const aPos = gl.getAttribLocation(program, 'a_pos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const state: KineticRippleState = {
    gl,
    program,
    uniforms: {
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_res: gl.getUniformLocation(program, 'u_res'),
      u_waveSpeed: gl.getUniformLocation(program, 'u_waveSpeed'),
      u_lineCount: gl.getUniformLocation(program, 'u_lineCount'),
      u_mouse: gl.getUniformLocation(program, 'u_mouse'),
    },
    rafId: 0,
    mouse: { x: 0.5, y: 0.5 },
    targetMouse: { x: 0.5, y: 0.5 },
    canvas,
    destroyed: false,
  }

  // Set constants
  gl.uniform1f(state.uniforms.u_waveSpeed, 1.0)
  gl.uniform1f(state.uniforms.u_lineCount, 12.0)

  // Resize handler
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio, 2)
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(state.uniforms.u_res, canvas.width, canvas.height)
  }
  resize()

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)

  // Render loop
  const render = () => {
    if (state.destroyed) return

    const time = performance.now() * 0.001
    gl.uniform1f(state.uniforms.u_time, time)

    // Smooth mouse
    state.mouse.x += (state.targetMouse.x - state.mouse.x) * 0.05
    state.mouse.y += (state.targetMouse.y - state.mouse.y) * 0.05
    gl.uniform2f(state.uniforms.u_mouse, state.mouse.x, state.mouse.y)

    gl.drawArrays(gl.TRIANGLES, 0, 3)
    state.rafId = requestAnimationFrame(render)
  }
  state.rafId = requestAnimationFrame(render)

  return state
}

export function destroyKineticRipple(state: KineticRippleState) {
  state.destroyed = true
  cancelAnimationFrame(state.rafId)
  const gl = state.gl
  gl.deleteProgram(state.program)
  // Clean up any remaining resources
}
