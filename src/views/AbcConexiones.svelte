<script>
  import FormCtrl from "../components/FormCtrl.svelte";
  import { push } from "svelte-spa-router";
  import { Host, User, Pass, Port, Db } from "../store/AbcConexion";
  const { Mysql } = require("@gamalielmh921230/mysqlsync");

  const Conexiones = window.require("./src/database/models/conexiones");
  const onCancel = () => {
    push("/");
  };

  const onSave = async () => {
    try {
      
      if(await TestCnn()){
        const Result =await Conexiones.create({ HOST:$Host,USER:$User,PASSWORD:$Pass,PORT:$Port,DATABASE:$Db})
        if(Result){
          push("/");
        }
      }else{
        alert("Error al conectar con servidor.");     
      }
     
    } catch (error) {
      alert("Error al guardar Conexion");
    }
  };

  const TestCnn = async () => {
    try {
      
      const test = new Mysql({
        host: $Host,
        user: $User,
        password: $Pass,
        database: $Db,
        port: $Port,
        timeout: 60000,
      });

      //se conecta con el servidor
      await test.connect();
      //se cierra la conexion
      await test.release();
      return true;

    } catch (error) {
      return false;
    }
  };
</script>

<style>
  .row1 {
    display: flex;
    flex-direction: row;
  }
</style>

<div class="container">
  <div class="row1">
    <FormCtrl
      label="Host:"
      styles="flex:1"
      placeholder="localhost"
      value={Host} />
    <FormCtrl label="User:" styles="flex:1" placeholder="root" value={User} />
  </div>
  <div class="row1">
    <FormCtrl
      label="Password:"
      styles="flex:1"
      placeholder="Password"
      type="password"
      value={Pass} />
    <FormCtrl
      label="Port:"
      styles="flex:1"
      placeholder="3306"
      type="number"
      value={Port} />
  </div>
  <div class="row1">
    <FormCtrl label="Data Base:" styles="flex:1" value={Db} />
  </div>
  <div class="row1">
    <div
      class="btn-group"
      role="group"
      aria-label="Basic example"
      style="flex:1;margin-top:20px;">
      <button
        type="button"
        class="btn btn-secondary"
        on:click={onCancel}>Cancel</button>
      <button
        type="button"
        class="btn btn-primary"
        on:click={onSave}>Save</button>
    </div>
  </div>
</div>
