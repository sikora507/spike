import SpikingNeuron from './SpikingNeuron';
import Synapse from './Synapse';

export default class SimpleFixedNetwork {
    // input
    inputNeuron1: SpikingNeuron = new SpikingNeuron();
    inputNeuron2: SpikingNeuron = new SpikingNeuron();
    inputNeuron3: SpikingNeuron = new SpikingNeuron();
    // layer 2
    hiddenNeuron1: SpikingNeuron = new SpikingNeuron();
    hiddenNeuron2: SpikingNeuron = new SpikingNeuron();
    hiddenNeuron3: SpikingNeuron = new SpikingNeuron();
    hiddenNeuron4: SpikingNeuron = new SpikingNeuron();
    // layer 3
    hiddenNeuron5: SpikingNeuron = new SpikingNeuron();
    hiddenNeuron6: SpikingNeuron = new SpikingNeuron();
    hiddenNeuron7: SpikingNeuron = new SpikingNeuron();
    hiddenNeuron8: SpikingNeuron = new SpikingNeuron();
    // output layer
    outputNeuron1: SpikingNeuron = new SpikingNeuron();
    outputNeuron2: SpikingNeuron = new SpikingNeuron();

    neurons: SpikingNeuron[] = [];
    synapses: Synapse[] = [];
    constructor(){

        // first layer connections to hidden
        this.inputNeuron1.outputSynapses.push(new Synapse(this.hiddenNeuron1));
        this.inputNeuron1.outputSynapses.push(new Synapse(this.hiddenNeuron4));

        this.inputNeuron2.outputSynapses.push(new Synapse(this.hiddenNeuron1));
        this.inputNeuron2.outputSynapses.push(new Synapse(this.hiddenNeuron2));
        this.inputNeuron2.outputSynapses.push(new Synapse(this.hiddenNeuron3));
        this.inputNeuron2.outputSynapses.push(new Synapse(this.hiddenNeuron4));

        this.inputNeuron3.outputSynapses.push(new Synapse(this.hiddenNeuron1));
        this.inputNeuron3.outputSynapses.push(new Synapse(this.hiddenNeuron4));
        
        // first hidden layer setup to hidden 2
        this.hiddenNeuron1.outputSynapses.push(new Synapse(this.hiddenNeuron5));
        this.hiddenNeuron1.outputSynapses.push(new Synapse(this.hiddenNeuron6));

        this.hiddenNeuron2.outputSynapses.push(new Synapse(this.hiddenNeuron6));
        this.hiddenNeuron2.outputSynapses.push(new Synapse(this.hiddenNeuron7));

        this.hiddenNeuron3.outputSynapses.push(new Synapse(this.hiddenNeuron7));
        this.hiddenNeuron3.outputSynapses.push(new Synapse(this.hiddenNeuron8));

        this.hiddenNeuron4.outputSynapses.push(new Synapse(this.hiddenNeuron8));
        this.hiddenNeuron4.outputSynapses.push(new Synapse(this.hiddenNeuron5));

        // second hidden layer to output layer
        this.hiddenNeuron5.outputSynapses.push(new Synapse(this.outputNeuron1));
        this.hiddenNeuron5.outputSynapses.push(new Synapse(this.outputNeuron2));
        this.hiddenNeuron6.outputSynapses.push(new Synapse(this.outputNeuron1));
        this.hiddenNeuron6.outputSynapses.push(new Synapse(this.outputNeuron2));
        this.hiddenNeuron7.outputSynapses.push(new Synapse(this.outputNeuron1));
        this.hiddenNeuron7.outputSynapses.push(new Synapse(this.outputNeuron2));
        this.hiddenNeuron8.outputSynapses.push(new Synapse(this.outputNeuron1));
        this.hiddenNeuron8.outputSynapses.push(new Synapse(this.outputNeuron2));

        // add neurons to collection
        this.neurons.push(this.inputNeuron1);
        this.neurons.push(this.inputNeuron2);
        this.neurons.push(this.inputNeuron3);
        this.neurons.push(this.hiddenNeuron1);
        this.neurons.push(this.hiddenNeuron2);
        this.neurons.push(this.hiddenNeuron3);
        this.neurons.push(this.hiddenNeuron4);
        this.neurons.push(this.hiddenNeuron5);
        this.neurons.push(this.hiddenNeuron6);
        this.neurons.push(this.hiddenNeuron7);
        this.neurons.push(this.hiddenNeuron8);
        this.neurons.push(this.outputNeuron1);
        this.neurons.push(this.outputNeuron2);

        // add synapses to collection
        for(let neuron of this.neurons){
            for(let synapse of neuron.outputSynapses){
                this.synapses.push(synapse);
            }
        }
    }

    Tick(){
        for(let neuron of this.neurons){
            neuron.Tick();
        }
        for(let synapse of this.synapses){
            synapse.Tick();
        }
    }
}