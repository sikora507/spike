<template>
    <v-layout row wrap>
        <v-flex xs3>
            <v-card>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <h5>Firing rate of input</h5>
                        </v-flex>
                        <v-flex xs9>
                            <v-slider label="1" dark v-bind:max="100" v-bind:min="1" v-model="neuron1Rate"></v-slider>
                        </v-flex>
                        <v-flex xs3>
                            <v-text-field dark v-model="neuron1Rate" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs9>
                            <v-slider label="2" dark v-bind:max="100" v-bind:min="1" v-model="neuron2Rate"></v-slider>
                        </v-flex>
                        <v-flex xs3>
                            <v-text-field dark v-model="neuron2Rate" readonly></v-text-field>
                        </v-flex>
                        <v-flex xs9>
                            <v-slider label="3" dark v-bind:max="100" v-bind:min="1" v-model="neuron3Rate"></v-slider>
                        </v-flex>
                        <v-flex xs3>
                            <v-text-field dark v-model="neuron3Rate" readonly></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs9>
            <v-card>
                <v-card-text>
                    <NetworkDisplay :height="400" :network="network"></NetworkDisplay>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script lang="ts">
import { Component, Inject, Model, Prop, Vue, Watch } from 'vue-property-decorator'

import SimpleFixedNetwork from './fixedNetwork/SimpleFixedNetwork'
import NetworkDisplay from './NetworkDisplay.vue';
import SpikingNeuron from './fixedNetwork/SpikingNeuron';

@Component({
    components: {
        NetworkDisplay: NetworkDisplay
    }
})
export default class FixedNetwork extends Vue {
    network: SimpleFixedNetwork;
    neuron1Rate: number = 5;
    neuron2Rate: number = 8;
    neuron3Rate: number = 10;
    neuron1Interval: any = null;
    neuron2Interval: any = null;
    neuron3Interval: any = null;

    networkTickInterval: any = null;

    mounted() {
        var network = this.network;
        this.neuron1Interval = setInterval(function () {
            network.inputNeuron1.ApplySignal(100);
        }, 1000 / this.neuron1Rate);
        this.neuron2Interval = setInterval(function () {
            network.inputNeuron2.ApplySignal(100);
        }, 1000 / this.neuron2Rate);
        this.neuron3Interval = setInterval(function () {
            network.inputNeuron3.ApplySignal(100);
        }, 1000 / this.neuron3Rate);
        this.networkTickInterval = setInterval(function () {
            network.Tick();
        }, 1000 / 30);
    }

    setNewInterval(value: number, interval: any, neuron: SpikingNeuron): void {

        interval = setInterval(function () {
            neuron.ApplySignal(100);
        }, 1000 / value);
    }

    @Watch('neuron1Rate')
    changeNeuron1Rate(newVal: number) {
        clearInterval(this.neuron1Interval);
        let network = this.network;
        this.neuron1Interval = setInterval(function () { network.inputNeuron1.ApplySignal(100); }, 1000 / newVal);
    }

    @Watch('neuron2Rate')
    changeNeuron2Rate(newVal: number) {
        clearInterval(this.neuron2Interval);
        let network = this.network;
        this.neuron2Interval = setInterval(function () { network.inputNeuron2.ApplySignal(100); }, 1000 / newVal);
    }

    @Watch('neuron3Rate')
    changeNeuron3Rate(newVal: number) {
        clearInterval(this.neuron3Interval);
        let network = this.network;
        this.neuron3Interval = setInterval(function () { network.inputNeuron3.ApplySignal(100); }, 1000 / newVal);
    }

    beforeDestroy() {
        clearInterval(this.neuron1Interval);
        clearInterval(this.neuron2Interval);
        clearInterval(this.neuron3Interval);
        clearInterval(this.networkTickInterval);
    }

    constructor() {
        super();
        this.network = new SimpleFixedNetwork();
    }
}
</script>
<style>

</style>
