function main()
{
   const myCanvas = document.getElementById("my-canvas");
   if(!myCanvas)
   {
      console.error("Error al obtener el elemento 'canvas'.");
      return;
   }

   const ctx = myCanvas.getContext("2d");

   ctx.fillStyle = "red";
   ctx.fillRect(120, 10, 150, 150);
}