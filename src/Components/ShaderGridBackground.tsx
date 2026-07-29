import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

// Full-screen-triangle pass-through — one triangle covers the viewport with
// no diagonal seam and one fewer vertex than a two-triangle quad.
const VERTEX_SRC = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

// GLSL ES 1.00 throughout (attribute/varying/gl_FragColor, no #version 300 es)
// so the exact same source compiles whether the context we got back is
// WebGL1 or WebGL2 — WebGL2 is required to accept ESSL 100 for backwards
// compatibility, so there is no dialect to branch on.
const FRAGMENT_SRC = `
precision mediump float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uPrimary;
uniform vec3 uAccent;
uniform vec3 uGlow;
uniform float uColumnMode;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 aspectUv = vec2(uv.x * uResolution.x / uResolution.y, uv.y);
  float t = uTime;

  // Domain warp: two slow, out-of-phase sine fields bend the coordinate
  // space before gridding it, so lines flex like a data plane being
  // deformed instead of sitting on a static lattice.
  vec2 warped = aspectUv + 0.035 * vec2(
    sin(aspectUv.y * 2.4 + t * 0.15),
    cos(aspectUv.x * 2.1 - t * 0.12)
  );

  // Grid SDF via smoothstep (no fwidth/derivatives extension dependency, so
  // it can never fail to compile on a WebGL1 context lacking OES_standard_derivatives).
  vec2 g = warped * 10.0;
  vec2 cellId = floor(g);
  vec2 cellUv = fract(g) - 0.5;
  float lineX = smoothstep(0.02, 0.0, abs(cellUv.x));
  float lineY = smoothstep(0.02, 0.0, abs(cellUv.y));
  float grid = max(lineX, lineY);
  float node = smoothstep(0.09, 0.0, length(cellUv));

  // ~15% of rows/cols are "live" (hashed per cell id, not per pixel) and
  // carry a traveling pulse whose position loops via fract.
  float rowActive = step(0.85, hash21(vec2(cellId.y, 7.0)));
  float colActive = step(0.85, hash21(vec2(cellId.x, 13.0)));
  float travelX = fract(warped.x * 0.5 - t * 0.06 + hash21(vec2(cellId.y, 7.0)));
  float travelY = fract(warped.y * 0.5 - t * 0.05 + hash21(vec2(cellId.x, 13.0)));
  float pulseX = smoothstep(0.04, 0.0, abs(travelX - 0.5)) * rowActive * lineY;
  float pulseY = smoothstep(0.04, 0.0, abs(travelY - 0.5)) * colActive * lineX;
  float pulse = max(pulseX, pulseY);

  // uColumnMode (0 = stacked single-column hero, 1 = two-column desktop hero)
  // is set from JS off the same 1024px breakpoint Hero.tsx's grid uses. In
  // stacked mode there's no left/right split to protect — text and avatar
  // occupy the SAME horizontal band, just stacked vertically — so the whole
  // canvas stays at the quiet floor uniformly (leftFade = 0 everywhere)
  // rather than going full-strength. In two-column mode, the centered
  // max-w-6xl container puts the text/avatar split at screen-space
  // uv.x ≈ 0.5 for every viewport width (converges from ~0.477 at 1024px to
  // ~0.494 on a 4K monitor, per the container's fixed 48px gap), so the ramp
  // starts at 0.48 — comfortably before that boundary at every width — and
  // only reaches full strength once solidly inside the avatar column.
  // The floor is deliberately near-zero (not a partial dim) — this sits
  // directly behind body text and must not compete with it for contrast.
  float leftFade = mix(0.0, smoothstep(0.48, 0.68, uv.x), uColumnMode);
  float textSafe = mix(0.12, 1.0, leftFade);

  vec3 col = uPrimary * grid * 0.35 * textSafe;
  col += mix(uAccent, uGlow, 0.5) * pulse * 1.4 * textSafe;
  col += uAccent * node * 0.5 * textSafe;

  float vignette = 1.0 - smoothstep(0.4, 1.05, length(uv - 0.5));
  float alpha = (grid * 0.16 + pulse * 0.5 + node * 0.25) * vignette * textSafe;
  alpha = clamp(alpha, 0.0, 0.85);

  gl_FragColor = vec4(col, alpha);
}
`;

type GL = WebGL2RenderingContext | WebGLRenderingContext;

const hslTripleToRgb = (triple: string): [number, number, number] => {
  const match = triple.match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  if (!match) return [1, 1, 1];
  const h = parseFloat(match[1]) / 360;
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  return [hue2rgb(h + 1 / 3), hue2rgb(h), hue2rgb(h - 1 / 3)];
};

// Same live-theme-token pattern as ParticleBackground.tsx, just converted to
// RGB 0-1 since GLSL uniforms need numbers, not "H S% L%" strings.
const readColorTokens = () => {
  const css = getComputedStyle(document.documentElement);
  const raw = (name: string) => css.getPropertyValue(name).trim();
  return {
    primary: hslTripleToRgb(raw("--primary")),
    accent: hslTripleToRgb(raw("--accent")),
    glow: hslTripleToRgb(raw("--primary-glow")),
  };
};

const compileShader = (gl: GL, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const REDUCED_MOTION_TIME = 12.0;
const isColumnLayout = () => window.matchMedia("(min-width: 1024px)").matches;

const ShaderGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [glEpoch, setGlEpoch] = useState(0);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: GL | null = null;
    try {
      const opts: WebGLContextAttributes = {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      };
      gl =
        (canvas.getContext("webgl2", opts) as WebGL2RenderingContext | null) ??
        (canvas.getContext("webgl", opts) as WebGLRenderingContext | null);
    } catch {
      gl = null;
    }
    if (!gl) return;
    const glCtx = gl;

    const vertexShader = compileShader(glCtx, glCtx.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(glCtx, glCtx.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) {
      if (vertexShader) glCtx.deleteShader(vertexShader);
      if (fragmentShader) glCtx.deleteShader(fragmentShader);
      return;
    }

    const program = glCtx.createProgram();
    if (!program) {
      glCtx.deleteShader(vertexShader);
      glCtx.deleteShader(fragmentShader);
      return;
    }
    glCtx.attachShader(program, vertexShader);
    glCtx.attachShader(program, fragmentShader);
    glCtx.linkProgram(program);
    if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS)) {
      glCtx.deleteProgram(program);
      glCtx.deleteShader(vertexShader);
      glCtx.deleteShader(fragmentShader);
      return;
    }
    glCtx.useProgram(program);

    const posBuffer = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, posBuffer);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      glCtx.STATIC_DRAW,
    );
    const aPos = glCtx.getAttribLocation(program, "aPos");
    glCtx.enableVertexAttribArray(aPos);
    glCtx.vertexAttribPointer(aPos, 2, glCtx.FLOAT, false, 0, 0);

    const uResolution = glCtx.getUniformLocation(program, "uResolution");
    const uTime = glCtx.getUniformLocation(program, "uTime");
    const uPrimary = glCtx.getUniformLocation(program, "uPrimary");
    const uAccent = glCtx.getUniformLocation(program, "uAccent");
    const uGlow = glCtx.getUniformLocation(program, "uGlow");
    const uColumnMode = glCtx.getUniformLocation(program, "uColumnMode");

    const applyColors = () => {
      const colors = readColorTokens();
      glCtx.uniform3f(uPrimary, ...colors.primary);
      glCtx.uniform3f(uAccent, ...colors.accent);
      glCtx.uniform3f(uGlow, ...colors.glow);
    };
    applyColors();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      glCtx.viewport(0, 0, canvas.width, canvas.height);
      glCtx.uniform2f(uResolution, canvas.width, canvas.height);
      glCtx.uniform1f(uColumnMode, isColumnLayout() ? 1 : 0);
    };
    resize();

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animFrame: number | null = null;
    let lastTime = 0;
    let startTime = 0;
    const FPS = 30;
    const INTERVAL = 1000 / FPS;

    const render = (t: number) => {
      glCtx.uniform1f(uTime, t);
      glCtx.drawArrays(glCtx.TRIANGLES, 0, 3);
    };

    const loop = (timestamp: number) => {
      animFrame = requestAnimationFrame(loop);
      if (timestamp - lastTime < INTERVAL) return;
      lastTime = timestamp;
      if (!startTime) startTime = timestamp;
      render((timestamp - startTime) / 1000);
    };

    const startLoop = () => {
      if (animFrame !== null) return;
      lastTime = 0;
      startTime = 0;
      animFrame = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (animFrame !== null) {
        cancelAnimationFrame(animFrame);
        animFrame = null;
      }
    };

    if (reducedMotionQuery.matches) {
      render(REDUCED_MOTION_TIME);
    } else if (!document.hidden) {
      startLoop();
    }

    const handleReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        stopLoop();
        render(REDUCED_MOTION_TIME);
      } else if (!document.hidden) {
        startLoop();
      }
    };
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (!reducedMotionQuery.matches) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      stopLoop();
    };
    // The GL spec restores the SAME context object, but every GL resource
    // (program/buffers/shaders) tied to it is gone — bump glEpoch so this
    // whole effect tears down and reruns, rebuilding everything from scratch.
    const handleContextRestored = () => {
      setGlEpoch((e) => e + 1);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ResizeObserver only fires on a content-box size change, so dragging the
    // window to a monitor with a different devicePixelRatio (no CSS-pixel
    // resize) would otherwise leave the canvas rendering at a stale
    // resolution. Re-subscribe at the new DPR each time it changes.
    let dprQuery: MediaQueryList | null = null;
    const handleDprChange = () => {
      resize();
      watchDpr();
    };
    const watchDpr = () => {
      dprQuery?.removeEventListener("change", handleDprChange);
      dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      dprQuery.addEventListener("change", handleDprChange);
    };
    watchDpr();

    return () => {
      stopLoop();
      ro.disconnect();
      dprQuery?.removeEventListener("change", handleDprChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      // This effect reruns on every theme toggle (resolvedTheme is a dep) on
      // the SAME live canvas/context — free the previous run's GL objects or
      // they'd accumulate on the context for as long as the page stays open.
      glCtx.deleteProgram(program);
      glCtx.deleteShader(vertexShader);
      glCtx.deleteShader(fragmentShader);
      glCtx.deleteBuffer(posBuffer);
    };
  }, [isMobile, resolvedTheme, glEpoch]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

export default ShaderGridBackground;
