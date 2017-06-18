import Synapse from './Synapse'

export default class SpikingNeuron {
    membranePotential: number = 0;
    increment: number = 0.95;
    threshold: number = 250;
    negativePotentialMin: number = -50;
    outputSynapses: Synapse[] = [];
    private ticksFromLastActivation: number = 0;

    Tick() {
        this.membranePotential *= this.increment;
        if (this.membranePotential > this.threshold) {
            this.membranePotential = this.negativePotentialMin;
            this.ticksFromLastActivation = 0;
            for (let synapse of this.outputSynapses) {
                synapse.InjectSignal();
            }
        } else {
            this.ticksFromLastActivation++;
        }
        if (this.membranePotential < this.negativePotentialMin) {
            this.membranePotential = this.negativePotentialMin;
        }
    }
    ApplyFromSynapse(synapse: Synapse): void {
        // this signal played most important role in further activation
        // let's strenghten the signal
        if (this.membranePotential + synapse.outputSignalStrength >= this.threshold) {
            synapse.IncrementOutputSignal();
        } else if (this.membranePotential < 0 && this.ticksFromLastActivation < 5) {
            synapse.DecrementOutputSignal();
        }
        this.membranePotential += synapse.outputSignalStrength;
    }
    ApplySignal(signal:number): void {
        this.membranePotential += signal;
    }
}