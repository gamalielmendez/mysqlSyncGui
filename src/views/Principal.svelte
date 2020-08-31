<script>
      
    import { onMount } from "svelte";
    import Separator from "../components/Separator.svelte";
    let myTextArea
    let editor
    
    onMount(() => {
  
        editor = CodeMirror.fromTextArea(document.getElementById('Editor'), {
            lineNumbers: true
        });
        
    });

</script>

<style>
  .mycontainer {
    display: flex;
    widows: 100%;
    height: 100%;
    flex-direction: row;
  }

  #conections {
    width: 20%;
    height: 100%;
    min-width: 10px;
  }

  #actions {
    width: 80%;
    height: 100%;
    min-width: 10px;
    display: flex;
    flex-direction: column;
  }

  #querEditor {
    width: 100%;
    height: 50%;
    min-height: 10px;

  }

  #Result {
    width:100%;
    height: 50%;
    min-height: 10px;
  }

</style>

<div class="mycontainer">
  <div id="conections" />
   <Separator cIdFirst="conections" cIdSecond="actions" Directions="H" />
  <div id="actions">
    <div id="querEditor">
         <textarea id="Editor"name="Editor" bind:this={myTextArea} /> 
    </div>
    <Separator cIdFirst="querEditor" cIdSecond="Result" Directions="V" />
    <div id="Result" />
  </div>
</div>
