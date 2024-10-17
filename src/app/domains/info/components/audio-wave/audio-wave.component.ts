import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-audio-wave',
  standalone: true,
  imports: [],
  templateUrl: './audio-wave.component.html',
  styleUrl: './audio-wave.component.css'
})
export class AudioWaveComponent {
  @Input({ required: true }) audioUrl!: string;
  @ViewChild('wave_container') container!: ElementRef;
  private waveSurferRef!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit() {
    //Se ejecuta después de que se inicializa la vista del componente y la de sus hijos (renderizados)
    //Sólo se ejecuta una vez
    console.log('ngAfterViewInit-audio-wave');
    console.log('-'.repeat(10));
    this.waveSurferRef = WaveSurfer.create({
      container: this.container.nativeElement,
      waveColor: '#4F4A85',
      progressColor: '#383351',
      url: this.audioUrl,
      mediaControls: true,
    });
    this.waveSurferRef.on('play', () => {
      console.log('Play');
      this.isPlaying.set(true);
    })
    this.waveSurferRef.on('pause', () => {
      console.log('Pause');
      this.isPlaying.set(false);
    })
  }
    
  playPause() {
    this.waveSurferRef.playPause();
  }
}
