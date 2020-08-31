<script>
  import { v4 as uuidv4 } from "uuid";
  import { onMount } from "svelte";

  // se declaran las props
  export let cIdFirst = "";
  export let cIdSecond = "";
  export let Directions = "H";

  //declaracion de variables
  let element;
  let Id;
  let DirectionStyle = "";
  const drag = { x: 0, y: 0 };
  const delta = { x: 0, y: 0 };

  //declaracion de metodos
  onMount(() => {
    DirectionStyle =
      Directions === "H"
        ? "cursor: col-resize;width:10px;height:100%;"
        : "cursor: row-resize;width:100%;height:15px;";
    //element = document.getElementById("separator");
    dragElement();
  });

  // function that will be called whenever the down event of the mouse is raised
  function dragMouseDown(e) {
    drag.x = e.clientX;
    drag.y = e.clientY;

    document.onmousemove = onMouseMove;
    document.onmouseup = () => {
      document.onmousemove = document.onmouseup = null;
    };
  }

  // function that will be called whenever the up event of the mouse is raised
  function onMouseMove(e) {
    const currentX = e.clientX;
    const currentY = e.clientY;

    delta.x = currentX - drag.x;
    delta.y = currentY - drag.y;

    const offsetLeft = element.offsetLeft;
    const offsetTop = element.offsetTop;

    const first = document.getElementById(cIdFirst);
    const second = document.getElementById(cIdSecond);

    if (Directions === "H") {
      let firstWidth = first.offsetWidth;
      let secondWidth = second.offsetWidth;

      // Horizontal
      element.style.left = offsetLeft + delta.x + "px";
      firstWidth += delta.x;
      secondWidth -= delta.x;

      drag.x = currentX;
      drag.y = currentY;
      first.style.width = firstWidth + "px";
      second.style.width = secondWidth + "px";
    } else {
      let firstHeight = first.offsetHeight;
      let secondHeight = second.offsetHeight;

      // Vertical
      element.style.top = offsetTop + delta.y + "px";
      firstHeight += delta.y;
      secondHeight -= delta.y;

      drag.x = currentX;
      drag.y = currentY;
      first.style.height = firstHeight + "px";
      second.style.height = secondHeight + "px";
    }
  }

  // function is used for dragging and moving
  function dragElement(handler) {
    /* if present, the handler is where you move the DIV from
     otherwise, move the DIV from anywhere inside the DIV */
    handler
      ? (handler.onmousedown = dragMouseDown)
      : (element.onmousedown = dragMouseDown);
  }
</script>

<style>
  .separator {
    background-color: #aaa;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='30'><path d='M2 0 v30 M5 0 v30 M8 0 v30' fill='none' stroke='black'/></svg>");
    background-repeat: no-repeat;
    background-position: center;
    /* prevent browser's built-in drag from interfering */
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

<div bind:this={element} class="separator" style={DirectionStyle} />
