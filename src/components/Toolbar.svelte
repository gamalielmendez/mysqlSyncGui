<script>

    export let OnAddConectionClick=null

    const onAddConection = () => {
        if(OnAddConectionClick){
            OnAddConectionClick()
        }
    }
</script>

<style>
    .toolbar{
        width: 100%;
        height: 7%;
        display: flex;
        flex-direction: row;
        padding: 5px;
    }

    .btnfix{
        margin-left: 5px;
    }
</style>

<div class="toolbar">
    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary" on:click={onAddConection}>Add Conections</button>
        <button type="button" class="btn btn-secondary">Delete Conections</button>
    </div>
    <div class="btn-group btnfix" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-success">Execute Query</button>
        <button type="button" class="btn btn-info">Sync DataBase</button>
        <button type="button" class="btn btn-secondary">Copy Tables</button>
    </div>
</div>