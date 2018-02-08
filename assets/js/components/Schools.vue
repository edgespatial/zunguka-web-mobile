<template>
    <div class="modal fade schools-modal" tabindex="-1" role="dialog"  aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">JKUAT Schools</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body list">
                    <ul>
                        <template v-for="school in schools">
                            <li>
                                <img class="img-fluid float-left mr-2 mb-3 d-inline-block" src="img/placeholder.png">
                                <!--
                                
                                <table class="table d-inline-block">
                                    <tbody>
                                        <tr>
                                            <th> Name </th>
                                            <td> {{ school.name }} <b v-if="school.abrv">({{ school.abrv }})</b>  </td>
                                        </tr>
                                        <tr>
                                            <th> Dean </th>
                                            <td> {{ school.dean }} </td>
                                        </tr>
                                    </tbody>
                                </table>
                                -->
                                <p class="d-inline">
                                    {{ school.name }}
                                    {{ school.abrv ? `(${school.abrv})` : '' }}
                                </p>
                                <button class="btn float-right locate"><i class="fa fa-map-marker"></i></button>
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
    props: [ 'schools' ],
}
</script>
