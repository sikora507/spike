import Synapse from './Synapse'

export default class SpikingNeuron {
    membranePotential: number = 0;
    increment: number = 0.95;
    threshold: number = 250;
    negativePotentialMin: number = -50;
    outputSynapses: Synapse[] = [];
    x: number;
    y: number;

    private relaxationTicks = 6;
    private relaxationCounter = 0;

    Tick() {
        this.membranePotential *= this.increment;
        if (this.membranePotential > this.threshold) {
            this.membranePotential = this.negativePotentialMin;
            if(this.FireCallback){
                this.FireCallback();
            }
            this.relaxationCounter = this.relaxationTicks;

            for (let synapse of this.outputSynapses) {
                synapse.InjectSignal();
            }
        }
        if (this.membranePotential < this.negativePotentialMin) {
            this.membranePotential = this.negativePotentialMin;
        }
        if (this.relaxationCounter > 0) {
            this.relaxationCounter--;
        }

    }
    ApplyFromSynapse(synapse: Synapse): void {
        this.membranePotential += synapse.outputSignalStrength;
    }
    ApplySignal(signal: number): void {
        this.membranePotential += signal;
    }

    IsInRelaxation() {
        return this.relaxationCounter > 0;
    }

    public FireCallback: () => void;
}