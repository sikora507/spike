<template>
    <v-layout row wrap>
        <v-flex xs3>
            <v-card>
                <v-card-text>
                    <div>
                        <v-btn dark default v-on:click.native="applySpike">Spike!</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs9>
            <v-card>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs4>
                            <LineChartDisplay v-bind:buffer="inputBuffer"></LineChartDisplay>
                        </v-flex>
                        <v-flex xs4>
                            <LineChartDisplay v-bind:buffer="neuronBuffer"></LineChartDisplay>
                        </v-flex>
                        <v-flex xs4>
                            <LineChartDisplay v-bind:buffer="outputBuffer" :reverse="true"></LineChartDisplay>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import LineChartDisplay from './LineChartDisplay.vue'
import SpikingNeuronSimple from './SpikingNeuronSimple'
import BufferQueue from './BufferQueue'

export default {
    data() {
        return {
            inputBuffer: new BufferQueue(310),
            neuronBuffer: new BufferQueue(310),
            outputBuffer: new BufferQueue(310),
            neuron: new SpikingNeuronSimple(this.spikeCallback),
            interval: null
        }
    },
    methods:{
        applySpike(){
            this.inputBuffer.push(100);
            this.neuron.applySignal(100);
        },
        neuronTick(){
            this.neuron.tick();
            this.neuronBuffer.push(this.neuron.membranePotential);
            this.inputBuffer.push(0);
            this.outputBuffer.push(0);
        },
        spikeCallback(){
            this.outputBuffer.push(100);
        }
    },
    mounted(){
         this.interval = setInterval(this.neuronTick, 10);
    },
    beforeDestroy(){
        clearInterval(this.interval);
    },
    components: {
        LineChartDisplay
    }
}
</script>
<style>

</style>

