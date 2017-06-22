// synapse is here the channel connecting 2 neurons (more like axon + synapse + dendrite)
// array of signals
// each tick signal travels towards the end of the channel from 0 to 1 (or 0% to 100%)
// when signal reaches over 100% next neuron invokes applySignal() function
// weight here can be the speed of signal (maybe also strength of the signal, but it could be redundant)
import SpikingNeuron from './SpikingNeuron'
import BufferQueue from './../BufferQueue'

export default class Synapse {
    // signals currently trawersing through the synapse
    spikeTrain: number[] = [];
    outputNeuron: SpikingNeuron;

    postSynapticSpikesCounter: number = 0;
    postSynapticSpikesCounterLimit: number = 5;

    inhibitionSpikesCounter: number = 0;
    inhibitionSpikesCounterLength: number = 5;

    // from 0 to 1.  
    // Each tick increments all spikes in train by this value up to 1 (100%)
    // this will be changed by evolution by ES-HyperNEAT
    propagationWeight: number = 0.1;

    // output signal strength will be changed by hebbian plasticity rules
    outputSignalStrength: number = 100;

    // saturation levels
    outputSignalMax: number = 200;
    outputSignalMin: number = -100;

    constructor(outputNeuron: SpikingNeuron) {
        this.outputNeuron = outputNeuron;
        this.outputNeuron.FireCallback = this.AppliWeightChanges.bind(this);
    }

    InjectSignal(): void {
        this.spikeTrain.unshift(0);
    }
    Tick(): void {
        for (let i = 0; i < this.spikeTrain.length; ++i) {
            this.spikeTrain[i] += this.propagationWeight;
        }
        let spikeApplied = false;
        while (this.spikeTrain.length > 0 && this.spikeTrain[this.spikeTrain.length - 1] >= 1) {
            this.spikeTrain.pop();
            if (this.outputNeuron) {
                this.outputNeuron.ApplyFromSynapse(this);
                
                spikeApplied = true;

                if(this.outputNeuron.IsInRelaxation()){
                    this.IncrementInhibitorySpikesCounter();
                } else{
                    this.IncrementPostsynapticSpikesCounter();
                }
            }
        }
        if(!spikeApplied){
            if(this.inhibitionSpikesCounter > 0) 
                this.inhibitionSpikesCounter--;
            if(this.postSynapticSpikesCounter > 0) 
                this.postSynapticSpikesCounter--;
        }
    }

    AppliWeightChanges() : void{
        for(let i=0;i<this.postSynapticSpikesCounter;++i){
            this.IncrementOutputSignal();
        }
        for(let i=0;i<this.inhibitionSpikesCounter;++i){
            this.DecrementOutputSignal();
        }
        this.inhibitionSpikesCounter = 0;
        this.postSynapticSpikesCounter = 0;
    }

    IncrementPostsynapticSpikesCounter(){
        if(this.postSynapticSpikesCounter < this.postSynapticSpikesCounterLimit){
            this.postSynapticSpikesCounter++;
        }
    }
    IncrementInhibitorySpikesCounter(){
        if(this.inhibitionSpikesCounter < this.inhibitionSpikesCounterLength){
            this.inhibitionSpikesCounter++;
        }
    }

    IncrementOutputSignal() {
        if (this.outputSignalStrength < this.outputSignalMax) {
            this.outputSignalStrength++;
        }
    }
    DecrementOutputSignal() {
        if (this.outputSignalStrength > this.outputSignalMin) {
            this.outputSignalStrength--;
        }
    }
}