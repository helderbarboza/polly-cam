<script lang="ts">
	import CameraPhoto, * as CameraLib from "jslib-html5-camera-photo";
	const { FACING_MODES, IMAGE_TYPES } = CameraLib;
	let videoElement = document.getElementById("videoId") as HTMLVideoElement;
	let cameraPhoto = new CameraPhoto(videoElement);

	cameraPhoto
		.startCamera(FACING_MODES.ENVIRONMENT, {})
		.then((stream) => {
			console.log("camera is started !");
		})
		.catch((error) => {
			console.error("Camera not started!", error);
		});
</script>

<pre>{JSON.stringify({}, null, 2)}</pre>

<video id="videoId" autoplay={true}> <track kind="captions" /></video>
