<script>
  import { T } from "@threlte/core";
  import { OrbitControls, Stars } from "@threlte/extras";

  let autoRotate = true;
  let rotationSpeed = 1;
  let totalStars = 5000;
</script>

<Stars count={totalStars} />

<T.PerspectiveCamera
  makeDefault
  position={[1, 8]}
  fov={75}
  near={0.1}
  far={1000}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0);
  }}
>
  <OrbitControls
    enableDamping
    dampingFactor={0.05}
    enablePan={false}
    enableZoom={true}
    minDistance={5}
    maxDistance={30}
    {autoRotate}
    autoRotateSpeed={rotationSpeed}
  />
</T.PerspectiveCamera>
