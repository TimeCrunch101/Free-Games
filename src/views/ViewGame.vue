<template>
<NavBar/>
<div id="alert" class="alert-container d-none">
    <div class="alert alert-danger d-flex align-items-center" role="alert">
        <i class="bi bi-exclamation-triangle"></i>
        <div id="display-alert-message">
            <!-- ERROR MSG TO DISPLAY -->
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</div>
<div v-if="this.error === false" class="container mt-5 rounded-3">
    <div class="container">
        <h1>{{gameData.title}}</h1>
        <div class="row">
            <div class="col">
                <p><strong>Release Date:</strong> {{gameData.release_date}}</p>
                <p><strong>Publisher:</strong> <a target="_blank" :href="gameData.game_url">{{gameData.publisher}}</a></p>
                <p><strong>Developer:</strong> {{gameData.developer}}</p>
                <p><strong>Genre:</strong> {{gameData.genre}}</p>
                <p><strong>Platform:</strong> {{gameData.platform}}</p>
                <p><strong>Status:</strong> {{gameData.status}}</p>
                <p><strong><a target="_blank" :href="gameData.freetogame_profile_url">FreeToGame Link</a></strong></p>
            </div>
            <div class="col">
                <img id="main-img" class="rounded-3" :src="gameData.thumbnail">
            </div>
        </div>
        <p>{{gameData.description}}</p>
    </div>
    <div v-if="minOS" class="container mb-5">
        <h2 id="sys-requirements">System Requirements</h2>
        <ul class="list-group">
            <li class="list-group-item"><strong>Operating System: </strong>{{minOS.os}}</li>
            <li class="list-group-item"><strong>Processor: </strong>{{minOS.processor}}</li>
            <li class="list-group-item"><strong>Memory: </strong>{{minOS.memory}}</li>
            <li class="list-group-item"><strong>Graphics Card: </strong>{{minOS.graphics}}</li>
            <li class="list-group-item"><strong>Storage: </strong>{{minOS.storage}}</li>
        </ul>
    </div>
    <div class="container mb-5">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img :src="gameData.thumbnail" class="d-block w-100" alt="...">
                </div>
                <div v-for="img in imgs" class="carousel-item">
                    <img :src="img.image" class="d-block w-100" alt="Game IMG">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</div>
</template>
<script>
import NavBar from "../components/NavBar.vue"
export default {
  data() {
    return {
      gameData: {},
      minOS: {},
      imgs: [],
      error: false
    }
  },
  name: 'ViewGame',
  components: {
    NavBar
  },
  beforeRouteEnter(to, from, next) {
    fetch(`/api/game${to.params.game_id}`).then((res => res.json())).then((res) => {
      if (res.msg) {
        return next(vm => vm.setError(res.msg))
      }
      next(vm => vm.setData(res.gameData))
    }).catch((err) => {
      console.error(err)
    })
  },
  methods: {
    setData(data) {
      this.gameData = data
      if (data.minimum_system_requirements !== undefined) {
        this.minOS = data.minimum_system_requirements
      } else {
        this.minOS = false
      }
      this.imgs = data.screenshots
    },
    setError(value) {
      this.error = value
    }
  },
  mounted() {
    if (this.error !== false) {
      $("#display-alert-message").text(this.error);
      $("#alert").removeClass('d-none');
    }
  }
}
</script>
<style>
body {
    background-color: #032236;
    color: #90adc0;
}
#main-img {
    border: 3px solid #78CAFF;
}
#sys-requirements {
    text-align: center;
}
.list-group-item {
    border: 1px solid whitesmoke;
    background-color: #032236;
    color: #708FA3;
}
#back_link {
    font-size: 1.5em;
}
</style>