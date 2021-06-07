<template>
    <app-layout>
        <template v-slot:app-content>
            <div id="app">
                定位(geolocation)----<br />

                緯度(latitude) :
                <template v-if="position!=null">
                    {{position.lat}}
                </template><br />
                經度(longitude) :
                <template v-if="position!=null">
                    {{position.lng}}
                </template><br />
                <v-text-field v-model="searchAddress"></v-text-field>
                地圖(map)----<br />
                <GmapMap ref="gmap" v-if="position!=null"
                         :options="{
                           zoomControl: false,
                           mapTypeControl: false,
                           scaleControl: false,
                           streetViewControl: false,
                           rotateControl: false,
                           fullscreenControl: false,
                           disableDefaultUi: false,
                           fillColor:'blue',
                           fillOpacity:0.5
                         }"     
                         :radius="100000"                    
                         :clickable="true"
                         @click="panTo"
                         :center="gmapCenter"
                         :zoom="10"
                         style="width: 100%; height:400px">

                    <GmapMarker v-for="(mark,index) in marks" :key="index" :position="mark" />
                </GmapMap>
                <v-btn @click="panTo">panTo</v-btn>
            </div>
        </template>
    </app-layout>
</template>

<script>

    import appLayout from 'components/app_layout'
    import axios from 'axios'
    import { mapState } from 'vuex'
    export default {
        // router,
        data: () => ({
            axiosState: '',
            momentState: new Date(),
            position: null,
            searchAddress: '',
            gmapApi: null ,
        }),
        computed: {
            ...mapState('user', ['moduleEnabled']),
            ...mapState('config', ['configEnabled']),
            marks: function () {
                var marks = []; 
                if (this.position) {
                    marks.push({ lat: this.position.lat, lng: this.position.lng });
                }
                return marks;
            },
            gmapCenter: function () {
                if (!this.position) return null;
                return { lat: this.position.lat, lng: this.position.lng };
            }
        },
        props: {

        },
        created: function () {
            this.getPosition();
            axios.get('/api/state').then(r => {
                this.$set(this, 'axiosState', r.data.axiosEnabled);
            })
        },
        watch: {
            searchAddress: function (val) {
                console.log(val);
                //const geocoder = new google.maps.Geocoder();
                //geocoder.geocode({ 'address': val }, (results, status) => {
                //    if (status === 'OK') {
                //        this.panTo({
                //            lat: results[0].geometry.location.lat(),
                //            lng: results[0].geometry.location.lng()
                //        })
                //    }
                //});
            }
        },
        methods: {
            clickTo: function (location) {
                this.panTo({
                    lat: location.latLng.lat(), 
                    lng: location.latLng.lng()
                })
            },
            panTo: function (position) {                
                console.log(this.$refs.gmap);
                this.$refs.gmap.panTo({ lat: position.lat, lng: position.lng });
                this.position.lat = position.lat;
                this.position.lng = position.lng;
                //this.$refs.gmap.setZoom(2);
            },
            updateCoordinates(location) {
                this.gmapCenter.lat = location.latLng.lat();
                this.gmapCenter.lng = location.latLng.lng();
            },
            getPosition: async function () {
                if (!("geolocation" in navigator)) return;
                var comp = this;
                await navigator.geolocation.getCurrentPosition(function (position) {
                    console.log(position);
                    comp.position = { lat: position.coords.latitude, lng: position.coords.longitude };
                });
            }
        },
        components: {
            appLayout
        }
    }
</script>
<style>
</style>
