<template>
    <div>
        <canvas v-bind:style="styleObject"></canvas>
    </div>
</template>
<script lang="ts">
import Vue, { ComponentOptions } from 'vue'
interface Display extends Vue{
    width: Number,
    height: Number,
    buffer: any,
    reverse: Boolean,
    ctx: any,
    draw() : void
}
const defaultHeight = 300;
export default {
    props: {
        width: Number,
        height: Number,
        buffer: Object,
        reverse: Boolean
    },
    data: function () {
        return {
            styleObject: {
                height: this.height ? this.height : defaultHeight + 'px'
            },
            ctx: null
        }
    },
    methods: {
        draw: function (timestamp) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            if (this.buffer != null) {
                this.ctx.beginPath();
                if(!this.reverse){
                    this.ctx.moveTo(0, this.ctx.canvas.height/1.2);
                    for (let i = 0; i < this.buffer.length - 1; ++i) {
                        this.ctx.lineTo(i, this.ctx.canvas.height/1.2 - this.buffer.next());
                    }
                } else {
                    this.ctx.moveTo(this.buffer.length - 1, this.ctx.canvas.height/1.2);
                    for (let i = this.buffer.length - 2; i >= 0; --i) {
                        this.ctx.lineTo(i, this.ctx.canvas.height/1.2 - this.buffer.next());
                    }
                }
                this.buffer.next();
                this.ctx.stroke();
            } 
            window.requestAnimationFrame(this.draw)
        }
    },
    mounted() {
        let canvas = this.$el.getElementsByTagName('canvas')[0];
        this.ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        var width = canvas.offsetWidth;
        var height = canvas.offsetHeight;
        this.ctx.fillStyle = 'rgb(200, 0, 0)';
        this.ctx.fillRect(10, 10, 50, 50);

        this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        this.ctx.fillRect(30, 30, 50, 50);
        window.requestAnimationFrame(this.draw)
    }
} as ComponentOptions<Display>
</script>
<style scoped>
canvas {
    width: 100%;
}
</style>
