// synapse is here the channel connecting 2 neurons (more like axon + synapse + dendrite)
// array of signals
// each tick signal travels towards the end of the channel from 0 to 1 (or 0% to 100%)
// when signal reaches over 100% next neuron invokes applySignal() function
// weight here can be the speed of signal (maybe also strength of the signal, but it could be redundant)
import SpikingNeuron from './SpikingNeuron'

export default class Synapse {
    // signals currently trawersing through the synapse
    spikeTrain: number[] = [];
    outputNeuron: SpikingNeuron;

    // from 0 to 1.  
    // Each tick increments all spikes in train by this value up to 1 (100%)
    // this will be changed by evolution by ES-HyperNEAT
    propagationWeight: number = 0.1;

    // output signal strength will be changed by hebbian plasticity rules
    outputSignalStrength: number = 100;

    constructor(outputNeuron: SpikingNeuron) {
        this.outputNeuron = outputNeuron;
    }

    InjectSignal(): void {
        this.spikeTrain.unshift(0);
    }
    Tick(): void {
        for (let i = 0; i< this.spikeTrain.length;++i) {
            this.spikeTrain[i] += this.propagationWeight;
        }
        while (this.spikeTrain.length > 0 && this.spikeTrain[this.spikeTrain.length - 1] >= 1) {
            this.spikeTrain.pop();
            if (this.outputNeuron) {
                this.outputNeuron.ApplySignal(this.outputSignalStrength);
            }
        }
    }
}