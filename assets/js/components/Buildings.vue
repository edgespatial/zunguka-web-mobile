<template>
    <div class="modal fade buildings-modal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">JKUAT Buildings</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body list">
                    <ul v-if="buildings">
                        <template v-for="building in buildings">
                            <li>
                                <template v-if="building.image">
                                    <img class="img-fluid float-left mr-2 mb-3" :src="building.image">
                                </template>
                                <template v-else>
                                    <img class="img-fluid float-left mr-2 mb-3" src="img/placeholder.png">
                                </template>
                                <p class="d-inline">
                                    {{ building.name }} 
                                    {{ building.abrv ? `(${building.abrv})` : '' }}
                                </p>
                                <button @click="locate(building.id)" class="btn btn-primary float-right locate"><i class="fa fa-map-marker"></i></button>
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
    props: [ 'buildings', 'map' ],
    methods: {
        locate(id) {
            this.$emit('locateBuilding', id);
        },
    }
}
</script>
