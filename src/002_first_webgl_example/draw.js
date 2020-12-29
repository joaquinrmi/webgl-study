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

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT);
}