<template>
    <div>
        <canvas></canvas>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import SimpleFixedNetwork from './fixedNetwork/SimpleFixedNetwork'
import NetworkForGUI from './fixedNetwork/GUI/NetworkForGUI'
import NeuronWithCoordinates from './fixedNetwork/GUI/NeuronWithCoordinates'

@Component({
    props: {
        height: Number,
        network: SimpleFixedNetwork
    }
})
export default class NetworkDisplay extends Vue {
    height: number
    ctx: CanvasRenderingContext2D | null
    network: SimpleFixedNetwork
    networkForGUI: NetworkForGUI
    requestId: any;

    constructor() {
        super();
        this.networkForGUI = new NetworkForGUI(this.network);
    }
    mounted() {
        let canvas = this.$el.getElementsByTagName('canvas')[0];
        this.ctx = canvas.getContext('2d');
        if (this.ctx == null) {
            return;
        }
        canvas.width = canvas.offsetWidth;
        canvas.height = this.height;
        // draw input neurons
        var stepX = canvas.width / 4;
        var startX = stepX / 2;
        var stepY = canvas.height / 3; // 3 neurons in input layer
        var startY = stepY / 2;

        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#003300';
        // draw input neurons
        this.networkForGUI.neurons[0].x = startX;
        this.networkForGUI.neurons[0].y = startY;
        startY += stepY;
        this.networkForGUI.neurons[1].x = startX;
        this.networkForGUI.neurons[1].y = startY;
        startY += stepY;
        this.networkForGUI.neurons[2].x = startX;
        this.networkForGUI.neurons[2].y = startY;

        startX += stepX; // move to next column: hidden layer nr. 1
        stepY = canvas.height / 4; // 4 neurons in hidden layer
        startY = stepY / 2;

        this.networkForGUI.neurons[3].x = startX;
        this.networkForGUI.neurons[3].y = startY;
        startY += stepY;
        this.networkForGUI.neurons[4].x = startX;
        this.networkForGUI.neurons[4].y = startY;
        startY += stepY;
        this.networkForGUI.neurons[5].x = startX;
        this.networkForGUI.neurons[5].y = startY;
        startY += stepY;
        this.networkForGUI.neurons[6].x = startX;
        this.networkForGUI.neurons[6].y = startY;

        startX += stepX; // move to next column: hidden layer nr. 2
        stepY = canvas.height / 4; // 4 neurons in hidden layer 2
        startY = stepY / 2;

        this.networkForGUI.neurons[7].x = startX;
        this.networkForGUI.neurons[7].y = startY;
        startY += stepY;
        this.networkForGUI.neurons[8].x = startX;
        this.networkForGUI.neurons[8].y = startY;
        startY += stepY;
        this.networkForGUI.neurons[9].x = startX;
        this.networkForGUI.neurons[9].y = startY;
        startY += stepY;
        this.networkForGUI.neurons[10].x = startX;
        this.networkForGUI.neurons[10].y = startY;

        startX += stepX; // move to next column: output layer
        stepY = canvas.height / 2; // 2 neurons in output layer
        startY = stepY / 2;

        this.networkForGUI.neurons[11].x = startX;
        this.networkForGUI.neurons[11].y = startY;
        startY += stepY;
        this.networkForGUI.neurons[12].x = startX;
        this.networkForGUI.neurons[12].y = startY;

        this.drawSynapses();
        this.drawNeurons();
        this.requestId = window.requestAnimationFrame(this.redrawNetwork);
    }
    beforeDestroy() {
        this.requestId = undefined;
    }
    redrawNetwork() {
        if (this.ctx == null) { return; }
        if (!this.requestId) { return; }
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.drawSynapses();
        this.drawNeurons();
        this.requestId = window.requestAnimationFrame(this.redrawNetwork);
    }
    drawCircle(x: number, y: number, radius: number) {
        if (this.ctx == null) { return; }
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y)
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawNeurons() {
        if (this.ctx == null) { return; }
        this.ctx.lineWidth = 2;
        for (let neuron of this.networkForGUI.neurons) {
            if (neuron.membranePotential >= 0) {
                let blue = 255 - neuron.membranePotential * 255 / neuron.threshold;
                blue = Math.trunc(blue);
                this.ctx.fillStyle = `rgb(${blue}, ${blue}, 255)`;
            } else {
                let red = 255 - (-neuron.membranePotential) * 255 / (-neuron.negativePotentialMin);
                red = Math.trunc(red);
                this.ctx.fillStyle = `rgb(255, ${red}, ${red})`;
            }
            this.drawCircle(neuron.x, neuron.y, 10);
        }
    }
    drawSynapses() {
        if (this.ctx == null) { return; }
        for (let neuron of this.networkForGUI.neurons) {
            for (let synapse of neuron.outputSynapses) {
                this.ctx.beginPath();
                this.ctx.moveTo(neuron.x, neuron.y);
                this.ctx.lineWidth = synapse.outputSignalStrength >= 0
                    ? synapse.outputSignalStrength / synapse.outputSignalMax
                    : synapse.outputSignalStrength / synapse.outputSignalMin;
                if(synapse.outputSignalStrength == 0){
                    this.ctx.lineWidth = 0.000001;
                }
                this.ctx.lineWidth *= 5; // 5px max
                this.ctx.strokeStyle = synapse.outputSignalStrength >= 0
                    ? '#0000FF'
                    : '#FF0000';
                var outputNeuron = synapse.outputNeuron as NeuronWithCoordinates;
                this.ctx.lineTo(outputNeuron.x, outputNeuron.y)
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }
}
</script>
<style scoped>
canvas {
    width: 100%;
}
</style>
