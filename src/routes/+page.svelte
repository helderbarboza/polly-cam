<script lang="ts">
	import CameraPhoto, { FACING_MODES, type FacingModes } from "jslib-html5-camera-photo";

	let dataUri;

	let cameras: any[] = [];
	let cameraId = 0;

	function nextNumber() {
		cameraId = (cameraId + 1) % cameras.length;
	}

	let cameraPhoto: CameraPhoto;

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
		cameraPhoto.stopCamera().catch((error) => console.error(error.message));
		nextNumber();
		cameraPhoto.startCamera(cameras[cameraId].deviceId);
	}}>Switch</button
>
<br />
<video use:createCamera id="viewfinder" autoplay={true}> <track kind="captions" /></video>

<!-- <pre>{JSON.stringify(cameraPhoto.getCameraSettings(), null, 2)}</pre> -->
<br />
<pre>{JSON.stringify(cameraId, null, 2)}</pre>
{#each cameras as camera}
	<pre>{JSON.stringify(camera, null, 2)}</pre>
{/each}
