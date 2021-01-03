// vertex shader
const VSHADER_SOURCE = `
   attribute vec4 a_position;
   attribute float a_point_size;

   void main()
   {
      gl_Position = a_position;
      gl_PointSize = a_point_size;
   }
`;

// fragment shader
const FSHADER_SOURCE = `
   void main()
   {
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
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

   const pointPositionLocation = gl.getAttribLocation(program, `a_position`);
   if(pointPositionLocation < 0)
   {
      throw `Error al obtener la ubicación del atributo "a_position".`;
   }

   const pointSizeLocation = gl.getAttribLocation(program, `a_point_size`);
   if(pointSizeLocation < 0)
   {
      throw `Error al obtener la ubicación del atributo "a_point_size".`;
   }

   gl.vertexAttrib1f(pointSizeLocation, 10.0)

   myCanvas.onmousedown = ev => {
      onClick(ev, gl, myCanvas, pointPositionLocation);
   };

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT);
}

let pointArray = [];

function onClick(ev, gl, canvas, pointPositionLocation)
{
   const rect = ev.target.getBoundingClientRect();

   const x = ((ev.clientX - rect.left) - canvas.height / 2) / (canvas.height / 2);
   const y = (canvas.width / 2 - (ev.clientY - rect.top)) / (canvas.width / 2);

   pointArray.push([x, y, 0.0]);

   drawPoints(gl, pointPositionLocation, pointArray);
}

function drawPoints(gl, pointPositionLocation, pointArray)
{
   gl.clear(gl.COLOR_BUFFER_BIT);

   for(let i = 0; i < pointArray.length; ++i)
   {
      gl.vertexAttrib3fv(pointPositionLocation, pointArray[i]);

      gl.drawArrays(gl.POINTS, 0, 1);
   }
}