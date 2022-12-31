<script>
export default {
  props: {
    todo: Object
  }
}
</script>
<template>
    <div class="col-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{todo.text}}</h5>
                <p class="card-text">{{todo.text}}</p>
            </div>
        </div>

    </div>
  </template>