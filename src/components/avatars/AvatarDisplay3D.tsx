import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

interface Viseme {
    timeMs: number;
    value: string;
}

interface AvatarProps {
    modelPath: string;
    emotion?: string;
    visemeData?: Viseme[];
    isPlayingAudio?: boolean;
    audioContent?: string; // Base64 audio content
}

// Viseme to BlendShape mapping (Simplified for ReadyPlayerMe style models)
const VISEME_MAP: Record<string, string> = {
    'sil': 'mouthSmile',
    'pp': 'mouthClose',
    'ff': 'mouthFrown',
    'aa': 'vowel_a',
    'e': 'vowel_e',
    'ih': 'vowel_i',
    'oh': 'vowel_o',
    'ou': 'vowel_u',
    'th': 'mouthSmile',
    'dd': 'mouthOpen',
    'kk': 'mouthOpen',
    'ch': 'mouthSmile',
    'ss': 'mouthSmile',
    'nn': 'mouthSmile',
    'rr': 'mouthSmile',
};

function AvatarModel({ modelPath, emotion, visemeData, isPlayingAudio, audioContent }: AvatarProps) {
    const group = useRef<THREE.Group>(null)
    const { scene, animations } = useGLTF(modelPath)
    const { actions } = useAnimations(animations, group)

    // Holographic material created per instance and safe for SSR
    const holographicMaterial = React.useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color('#00f2ff') },
            scanlineIntensity: { value: 0.3 },
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            uniform float scanlineIntensity;
            uniform float time;
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
                float scanline = sin(vUv.y * 100.0 + time * 10.0) * scanlineIntensity;
                float alpha = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
                gl_FragColor = vec4(color * (1.0 + scanline), alpha * 0.7);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
    }), [])
    const [audio] = useState(() => typeof Audio !== 'undefined' ? new Audio() : null)
    const startTimeRef = useRef<number>(0)
    const [internalIsPlaying, setInternalIsPlaying] = useState(false)

    useEffect(() => {
        if (audioContent && audio) {
            audio.src = `data:audio/mp3;base64,${audioContent}`
            audio.play().then(() => {
                startTimeRef.current = Date.now()
                setInternalIsPlaying(true)
            }).catch(console.error)
            audio.onended = () => setInternalIsPlaying(false)
        }
    }, [audioContent, audio])

    useEffect(() => {
        if (!actions) return
        Object.values(actions).forEach(action => action?.stop())

        let newActionName = 'Idle'
        if (isPlayingAudio || internalIsPlaying) {
            newActionName = 'Speaking'
        } else if (emotion === 'thinking') {
            newActionName = 'Think'
        } else if (emotion === 'happy') {
            newActionName = 'Happy'
        } else if (emotion === 'confused') {
            newActionName = 'Confused'
        }

        const action = actions[newActionName] || actions['Idle']
        if (action) {
            action.reset().fadeIn(0.5).play()
        }
    }, [emotion, actions, isPlayingAudio, internalIsPlaying])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        holographicMaterial.uniforms.time.value = time

        if (internalIsPlaying && visemeData && visemeData.length > 0) {
            const elapsedMs = Date.now() - startTimeRef.current

            const currentViseme = visemeData.find((v, i) => {
                const next = visemeData[i + 1]
                return elapsedMs >= v.timeMs && (!next || elapsedMs < next.timeMs)
            })

            if (currentViseme) {
                const targetShape = VISEME_MAP[currentViseme.value] || 'mouthOpen'

                scene.traverse((child) => {
                    if (child instanceof THREE.Mesh && child.morphTargetInfluences) {
                        const index = child.morphTargetDictionary?.[targetShape]
                        if (index !== undefined) {
                            child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
                                child.morphTargetInfluences[index],
                                1.0,
                                0.2
                            )
                        }

                        Object.keys(VISEME_MAP).forEach(v => {
                            const shape = VISEME_MAP[v]
                            if (shape !== targetShape) {
                                const idx = child.morphTargetDictionary?.[shape]
                                if (idx !== undefined) {
                                    child.morphTargetInfluences![idx] = THREE.MathUtils.lerp(
                                        child.morphTargetInfluences![idx],
                                        0,
                                        0.2
                                    )
                                }
                            }
                        })
                    }
                })
            }
        }
    })

    return (
        <group ref={group} dispose={null}>
            <primitive object={scene} scale={1.8} position={[0, -2.8, 0]} />
        </group>
    )
}

export function AvatarDisplay3D({ selectedAvatar, isLoading, mood, isPlayingAudio, visemeData, audioContent }: any) {
    if (typeof window === 'undefined') return null;
    if (selectedAvatar?.modelPath) {
        useGLTF.preload(selectedAvatar.modelPath)
    }

    return (
        <div className="w-full h-full relative border border-primary-500/20 rounded-3xl overflow-hidden bg-primary-950/20 backdrop-blur-sm">
            <Canvas shadows gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 1, 4]} fov={40} />
                <ambientLight intensity={1.5} />
                <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-5, 5, -5]} intensity={1} color="#00f2ff" />

                <React.Suspense fallback={<group><mesh><sphereGeometry args={[0.5, 32, 32]} /><meshStandardMaterial color="#00f2ff" wireframe /></mesh></group>}>
                    {selectedAvatar?.modelPath && (
                        <AvatarModel
                            modelPath={selectedAvatar.modelPath}
                            emotion={mood}
                            visemeData={visemeData}
                            isPlayingAudio={isPlayingAudio}
                            audioContent={audioContent}
                        />
                    )}
                </React.Suspense>
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.8}
                />
            </Canvas>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary-950/50 z-20 backdrop-blur-md">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary-500/30 rounded-full animate-spin" />
                        <div className="absolute inset-0 w-16 h-16 border-t-4 border-primary-400 rounded-full animate-spin" />
                    </div>
                </div>
            )}
        </div>
    )
}
