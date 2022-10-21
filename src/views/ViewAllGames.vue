<template>
<NavBar/>
<h1 class="text-light"><i class="bi bi-controller"></i>FREE GAMES<i class="bi bi-controller"></i></h1>
<div id="alert" class="alert-container d-none">
    <div class="alert alert-danger d-flex align-items-center" role="alert">
        <i class="bi bi-exclamation-triangle"></i>
        <div id="display-alert-message">
            <!-- ALERT MESSAGE TO DISPLAY -->
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</div>
<div id="data-block" class="container d-flex flex-row flex-wrap gap-3 justify-content-center">
    <!-- GAME DATA -->
</div>
</template>
<script>
import NavBar from "../components/NavBar.vue"
export default {
    name: 'ViewAllGames',
    components: {
        NavBar
    },
    data() {
        return {
            error: null
        }
    },
    created() {
        getAllGames((callback) => {
            if (this.error === null) {
                callback.forEach(game => {
                    $("#data-block").append(`
                    <div class="card" style="width: 18rem;">
                    <img src="${game.thumbnail}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${game.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${game.developer}</h6>
                            <p class="card-text">${game.short_description}</p>
                            <a href="/viewgame/${game.id}" class="card-link">Check It Out</a>
                
                        </div>
                    </div>`);
                    });
            }
        })
    }
}
const getAllGames = (callback) => {
fetch('/api')
    .then(response => response.json())
    .then((response) => {
        if (response.msg) {
            console.log(response)
            throw response.msg
        }
        return callback(response);
    })
    .catch((err) => {
        $("#display-alert-message").text(err);
        $("#alert").removeClass('d-none');
    });
}
</script>

<style>
    body {
        background-color: rgb(14,19,44);
    }
    .alert-container {
        width: max-content;
        margin: 0 auto;
    }
    #display-alert-message {
        padding-left: 1em;
        padding-right: 1em;
    }
</style>
