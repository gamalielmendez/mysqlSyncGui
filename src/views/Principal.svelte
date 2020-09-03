<script>
  import { onMount } from "svelte";
  import Separator from "../components/Separator.svelte";
  import TreeView from "../components/TreeView.svelte";
  import Toolbar from "../components/Toolbar.svelte";
  import Modal from "../components/Modal.svelte";
  import CreateConections from "../components/CreateConections.svelte";
  import { push } from "svelte-spa-router";
  import { ConexionesTree } from "../store/Conexiones";

  const { Mysql } = require("@gamalielmh921230/mysqlsync");
  const Conexiones = window.require("./src/database/models/conexiones");

  let myTextArea;
  let editor;
  let regConexiones = [];
  let TreeConexiones = [];
  let CurrentCnn = null;

  onMount(async () => {
    //SE CONFIGURA EL EDITOR SQL
    editor = CodeMirror.fromTextArea(document.getElementById("Editor"), { lineNumbers: true });
    //SE OBTIENEN LAS CONEXIONES GUARDADAS
    regConexiones = await Conexiones.findAll();
    $ConexionesTree= await inicializeTree();
  });

  const onSelConection = (Cnn) => { CurrentCnn = Cnn; };

  async function inicializeTree() {
    
    if (regConexiones.length > 0) {
      const Result=[]
      for (let index = 0; index < regConexiones.length; index++) {
        const C = regConexiones[index];
        //obtiene las bases de datos
        const Cnn = new Mysql({
          host: C.HOST,
          user: C.USER,
          password: C.PASSWORD,
          database: C.DATABASE,
          port: C.PORT,
          timeout: 60000,
        });
        //se conecta con el servidor
        await Cnn.connect();

        //obtiene las bases de datos
        const Database = await ObtenerDbSchema(Cnn, C.CONEXION_ID);
        Result.push({
          ID: C.CONEXION_ID,
          Title: `${C.USER}@${C.HOST}`,
          Schemas: Database,
          CurrentClass: "nested",
          Conections: Cnn,
        });

        //se cierra la conexion
        await Cnn.release();
      }

      return Result
      
    }else{
      return []
    }

  }

  const ObtenerDbSchema = async (Cnn, ParentId) => {
    //se obtienen las bases de datos
    const Result = await Cnn.query("SHOW DATABASES");

    if (Result.length > 0) {
      const Dbs = [];
      for (let index = 0; index < Result.length; index++) {
        const element = Result[index];
        const ID = `${ParentId}_${element.Database}_${index}`;

        await Cnn.query(`USE ${element.Database}`);
        const Tablas = await ObtenerDbTablas(Cnn, element.Database, ID);

        Dbs.push({
          ID,
          Title: element.Database,
          Tablas,
        });
      }

      return Dbs;

    } else {
      return [];
    }
  };

  const ObtenerDbTablas = async (Cnn, dbName, ParentId) => {
    //se obtienen las tablas
    const Result = await Cnn.query("SHOW TABLES");

    if (Result.length > 0) {
      const Tablas = [];
      for (let index = 0; index < Result.length; index++) {
        const element = Result[index];
        const Key = `Tables_in_${dbName}`;

        Tablas.push({
          ID: `${ParentId}_${element[Key]}_${index}`,
          Title: element[Key],
        });
      }

      return Tablas;
    } else {
      return [];
    }
  };

  const OnAddConectionClick = () => {
    push("/AbcConexiones");
  };

  const onCancel = () => {};

  const onOkay = () => {};
</script>

<style>
  .mycontainer {
    display: flex;
    widows: 100%;
    height: 93%;
    flex-direction: row;
  }

  #conections {
    width: 20%;
    height: 100%;
    min-width: 250px;
    overflow: scroll;
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
    width: 100%;
    height: 50%;
    min-height: 10px;
  }
</style>

<Modal>
  <Toolbar {OnAddConectionClick} />
</Modal>
<div class="mycontainer">
  <div id="conections">
    <TreeView CnnClick={onSelConection} />
  </div>
  <Separator cIdFirst="conections" cIdSecond="actions" Directions="H" />
  <div id="actions">
    <div id="querEditor">
      <textarea id="Editor" name="Editor" bind:this={myTextArea} />
    </div>
    <Separator cIdFirst="querEditor" cIdSecond="Result" Directions="V" />
    <div id="Result" />
  </div>
</div>
