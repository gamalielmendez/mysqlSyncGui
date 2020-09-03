<script>
  import { onMount } from "svelte";
  import { ConexionesTree } from "../store/Conexiones";
  import Principal from "../views/Principal.svelte";
  export let CnnClick = null;

  const OnClickItem = (cnn) => {
    
    document.getElementById(cnn.ID).classList.toggle("nested");

    if ("Conections" in cnn) {
      if (CnnClick) {
        CnnClick(cnn.Conections);
      }
    }

  };

  const OnClickLastItem = (ID) => { document.getElementById(ID).classList.toggle("nested"); };
</script>

<style>
  ul,
  #myUL {
    list-style-type: none;
  }
  #myUL {
    margin: 0;
    padding: 0;
  }
  .caret {
    cursor: pointer;
    user-select: none;
  }

  .nested {
    display: none;
  }

  .caret {
    cursor: pointer;
    user-select: none;
  }
  .caret::before {
    content: "\25B6";
    color: black;
    display: inline-block;
    margin-right: 6px;
  }
  .caret-down::before {
    transform: rotate(90deg);
  }
</style>

<ul id="myUL">
  {#each $ConexionesTree as Cnn}
    <li>
      <span class="caret" on:click={() => OnClickItem(Cnn)}>{Cnn.Title}</span>
      <ul id={`${Cnn.ID}`} class="nested">
        {#each Cnn.Schemas as Db}
          <li>
            <span
              class="caret"
              on:click={() => OnClickItem(Db)}>{Db.Title}</span>
            <ul id={`${Db.ID}`} class="nested">
              <li>
                <span
                  on:click={() => OnClickLastItem(`${Db.ID}_tbls`)}
                  class="caret">Tables</span>
                <ul id={`${Db.ID}_tbls`} class="nested">
                  {#each Db.Tablas as tbl}
                    <li>{tbl.Title}</li>
                  {/each}
                </ul>
              </li>
              <li>
                <span class="caret">Views</span>
                <ul class="nested" />
              </li>
            </ul>
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>
