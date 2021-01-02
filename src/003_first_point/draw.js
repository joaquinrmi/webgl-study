// vertex shader
const VSHADER_SOURCE = `
   void main()
   {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 10.0;
   }
`;

// fragment shader
const FSHADER_SOURCE = `
   void main()
   {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   }
`;

function main()
{
   const myCanvas = document.getElementById("my-canvas");
   if(!myCanvas)
   {
      console.error("Error al obtener el elemento 'canvas'.");
      return;
   }

   const gl = myCanvas.getContext("webgl") || myCanvas.getContext("experimental-webgl");
   if(!gl)
   {
      console.error("Imposible inicializar WebGL en este navegador.");
      return;
   }

   let vertexShader = gl.createShader(gl.VERTEX_SHADER);
   gl.shaderSource(vertexShader, VSHADER_SOURCE);
   gl.compileShader(vertexShader);
   if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
   {
      const info = gl.getShaderInfoLog(vertexShader);
      throw `No se ha podido compilar el shader: ${info}`;
   }

   let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(fragmentShader, FSHADER_SOURCE);
   gl.compileShader(fragmentShader);
   if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
   {
      const info = gl.getShaderInfoLog(fragmentShader);
      throw `No se ha podido compilar el shader: ${info}`;
   }

   let program = gl.createProgram();

   gl.attachShader(program, vertexShader);
   gl.attachShader(program, fragmentShader);

   gl.linkProgram(program);
   if(!gl.getProgramParameter(program, gl.LINK_STATUS))
   {
      const info = gl.getProgramInfoLog(program);
      throw `No se ha podido enlazar el programa: ${info}`;
   }

   gl.useProgram(program);

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT);

   gl.drawArrays(gl.POINTS, 0, 1);
}