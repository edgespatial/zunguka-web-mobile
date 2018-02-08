<template>
    <div class="modal fade buildings-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">JKUAT Buildings</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body list">
                    <ul>
                        <template v-for="building in buildings">
                            <li>
                                <img class="img-fluid float-left mr-2 mb-3" src="img/placeholder.png">
                                <p class="d-inline">{{ url }}</p>
                                <button class="btn btn-primary float-right locate"><i class="fa fa-map-marker"></i></button>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="modal-footer">
                </div>
            </div>
          </div>
    </div>
</template>

<script>
export default {
    props: [ 'url' ],
    data() {
        return {
            buildings: {},
        }
    },
    mounted() {
        const vm = this;
        axios.get(`${vm.url}/buildings/?format=json`).then((res) => {
            vm.buildings = res.data; 
        }).catch((err) => {
            console.log(err);
        });
    }
}
</script>
