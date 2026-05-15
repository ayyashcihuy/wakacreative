'use client';
import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

export default function BackgroundGradient() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const gradientRef = useRef<NeatGradient | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		gradientRef.current = new NeatGradient({
			ref: canvasRef.current,
			colors: [
				{
					color: '#242424',
					enabled: true,
				},
				{
					color: '#4CB4BB',
					enabled: false,
				},
				{
					color: '#FFC600',
					enabled: false,
				},
				{
					color: '#8B6AE6',
					enabled: false,
				},
				{
					color: '#2E0EC7',
					enabled: false,
				},
				{
					color: '#FF9A9E',
					enabled: false,
				},
			],
			speed: 4.5,
			horizontalPressure: 10,
			verticalPressure: 10,
			waveFrequencyX: 1,
			waveFrequencyY: 1,
			waveAmplitude: 5,
			shadows: 10,
			highlights: 0,
			colorBrightness: 0.9,
			colorSaturation: -10,
			wireframe: false,
			colorBlending: 10,
			backgroundColor: '#000000',
			backgroundAlpha: 1,
			grainScale: 0,
			grainSparsity: 0,
			grainIntensity: 0.125,
			grainSpeed: 1,
			resolution: 1,
			yOffset: 0,
			yOffsetWaveMultiplier: 20,
			yOffsetColorMultiplier: 20,
			yOffsetFlowMultiplier: 20,
			flowDistortionA: 3.7,
			flowDistortionB: 1.4,
			flowScale: 2.9,
			flowEase: 0.32,
			flowEnabled: true,
			mouseDistortionStrength: 0.12,
			mouseDistortionRadius: 0.37,
			mouseDecayRate: 0.921,
			mouseDarken: 0.24,
			enableProceduralTexture: false,
			textureVoidLikelihood: 0.27,
			textureVoidWidthMin: 60,
			textureVoidWidthMax: 420,
			textureBandDensity: 1.2,
			textureColorBlending: 0.06,
			textureSeed: 333,
			textureEase: 0.5,
			proceduralBackgroundColor: '#0E0707',
			textureShapeTriangles: 20,
			textureShapeCircles: 15,
			textureShapeBars: 15,
			textureShapeSquiggles: 10,
		});

		return () => gradientRef.current?.destroy();
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: 0,
				pointerEvents: "none",
			}}
		/>
	);
}