export default class SpikingNeuronSimple{
    constructor(spikeCallback){
        this.membranePotential = 0;
        this.increment = 0.99;
        this.threshold = 250;
        this.spikeCallback = spikeCallback;
        this.negativePotentialMin = -50;
    }
    tick(){
        this.membranePotential *= this.increment;
        if(this.membranePotential > this.threshold){
            this.membranePotential = this.negativePotentialMin;
            this.spikeCallback();
        }
    }
    applySignal(amount){
        this.membranePotential += amount;
    }
}