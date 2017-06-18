import SimpleFixedNetwork from './../SimpleFixedNetwork'
import NeuronWithCoordinates from './NeuronWithCoordinates'

export default class NetworkForGUI {

    neurons: NeuronWithCoordinates[] = [];

    constructor(network: SimpleFixedNetwork) {
        for(let neuron of network.neurons){
            this.neurons.push(neuron as NeuronWithCoordinates);
        }
    }
}