<script>
  
	import Router from './config/Router.svelte'
  
  </script>
  
  <style>
	
	:global(body) {
	  background-color: #f8f9fa;
	  color: rgba(38, 38, 38, 0.7);
	  font-family: "Lato", sans-serif;
	  margin: 0;
	  padding: 0;
	  height: 100vh;
	}
  
	:global(h1, h2, h3) {
	  margin: 0;
	  padding: 0;
	}
  
	.main{
	  background-color: #f8f9fa;  
	  height: 100vh;
	}
  
  </style>
  
  <div class="main">
	<Router/>
  </div>
  
  