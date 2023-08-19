<template>
  <div class="flex flex-col items-center justify-center w-full h-screen">
    <p class="font-mulish text-[20px] text-bold text-center">Mohon Maaf, Media yang digunakan terlalu lebar </p>
    <p class="font-mulish text-[20px] text-bold text-center">Silahkan Gunakan Di Mobile Handphone </p>
    <img src="@/assets/images/errorWidth.svg" alt="" srcset="" class="w-1/3 ">
    <div class="wave-container">
      <canvas ref="waveCanvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.canvas = this.$refs.waveCanvas;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.wave = {
      amplitude: 50,
      frequency: 0.01,
      phase: 0,
      speed: 0.1,
    };

    this.drawWave();
  },
  methods: {
    drawWave() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.beginPath();
      this.ctx.moveTo(0, this.canvas.height / 2);

      for (let x = 0; x < this.canvas.width; x++) {
        const y = this.canvas.height / 2 + this.wave.amplitude * Math.sin(this.wave.frequency * x + this.wave.phase);
        this.ctx.lineTo(x, y);
      }

      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      this.ctx.lineTo(0, this.canvas.height);
      this.ctx.closePath();

      this.ctx.fillStyle = '#3C8DBC';
      this.ctx.fill();

      this.wave.phase += this.wave.speed;

      requestAnimationFrame(this.drawWave);
    },
  },
};
</script>

<style>
.wave-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}
</style>