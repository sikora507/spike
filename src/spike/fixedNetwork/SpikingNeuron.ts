import Synapse from './Synapse'

export default class SpikingNeuron {
    membranePotential: number = 0;
    increment: number = 0.95;
    threshold: number = 250;
    negativePotentialMin: number = -50;
    outputSynapses: Synapse[] = [];

    Tick() {
        this.membranePotential *= this.increment;
        if (this.membranePotential > this.threshold) {
            this.membranePotential = this.negativePotentialMin;
            for (let synapse of this.outputSynapses) {
                synapse.InjectSignal();
            }
        }
    }
    ApplySignal(signalStrength: number): void {
        this.membranePotential += signalStrength;
    }
}