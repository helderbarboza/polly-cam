<script lang="ts">
	// @ts-expect-error
	import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from "jslib-html5-camera-photo";

	let dataUri;

	$: cameras = [];

	let cameraPhoto: any;

	function createCamera(node: HTMLVideoElement) {
		cameraPhoto = new CameraPhoto(node);

		cameraPhoto
			.startCamera(FACING_MODES.ENVIRONMENT, {})
			.then((stream) => {
				console.log("camera is started !");
			})
			.catch((error) => {
				console.error("Camera not started!", error);
			});

		cameraPhoto.enumerateCameras().then((camerasList) => {
			cameras = camerasList;
		});
	}
</script>

<button
	on:click={() => {
		let facingMode = cameraPhoto.getCameraSettings()?.facingMode;

		cameraPhoto.stopCamera();
		cameraPhoto.startCamera(
			facingMode == FACING_MODES.ENVIRONMENT ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT
		);
	}}>Switch</button
>

<video use:createCamera id="viewfinder" autoplay={true}> <track kind="captions" /></video>

<!-- <pre>{JSON.stringify(cameraPhoto.getCameraSettings(), null, 2)}</pre> -->
<br />
{#each cameras as camera}
	<pre>{JSON.stringify(camera, null, 2)}</pre>
{/each}
