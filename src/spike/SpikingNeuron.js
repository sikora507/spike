export default class SpikingNeuron{
    constructor(spikeCallback){
        this.membranePotential = 0;
        this.decrement = 0.99;
        this.increment = 0.95;
        this.threshold = 250;
        this.negativePotentialMin = -100;
        this.spikeCallback = spikeCallback;
        this.applyingSignal = false;
        this.maxSignalToApply = 0;
    }
    tick(){
        if(this.applyingSignal){
            if(this.membranePotential < this.maxSignalToApply){
                this.membranePotential += this.maxSignalToApply/5;
            } else{
                this.applyingSignal = false;
            }
        } 
        this.membranePotential > 0 
            ? this.membranePotential *= this.decrement
            : this.membranePotential *= this.increment;
        if(this.membranePotential > this.threshold){
            this.membranePotential = this.negativePotentialMin;
            this.applyingSignal = false;
            this.spikeCallback();
        }
    }
    applySignal(amount){
        this.maxSignalToApply = this.membranePotential + amount;
        this.applyingSignal = true;
    }
}