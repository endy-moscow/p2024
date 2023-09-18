import React, { useRef, FC, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export const Manq: FC<any> = (props) => {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF('/manq.glb');
  const { actions, names } = useAnimations(animations, group);
  
  // Состояние индекса анимации
  const [index, setIndex] = useState(0); // Изначально установим первую анимацию

  useEffect(() => {
    // Сброс и плавное включение анимации после изменения индекса
    actions[names[index]].reset().fadeIn(0.5).play();
    // При завершении, плавно выключаем анимацию
    return () => actions[names[index]].fadeOut(0.5);
  }, [index, actions, names]);

  // Функция для переключения анимации при клике
  const handleModelClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % names.length);
  };

  return (
    <group ref={group} {...props} dispose={null} onClick={handleModelClick}>
      <group name="Scene">
        <group name="Idle" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorig1Hips} />
        </group>
        <skinnedMesh 
          name="Ch36001" 
          geometry={nodes.Ch36001.geometry} 
          material={materials['Ch36_Body.002']} 
          skeleton={nodes.Ch36001.skeleton} 
          rotation={[Math.PI / 2, 0, 0]} 
          scale={0.01} 
        />
      </group>
    </group>
  );
};

useGLTF.preload('/manq.glb');

