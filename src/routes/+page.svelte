<script lang="ts">
	import CameraPhoto, { FACING_MODES, IMAGE_TYPES, downloadPhoto } from "jslib-html5-camera-photo";
	import { RefreshCw } from "lucide-svelte";

	let cameraPhoto: CameraPhoto;
	let cameraId: number = 5;
	let cameras: { deviceId: string }[] = [];

	let imageElement: HTMLImageElement;

	$: if (cameraPhoto) {
		cameraPhoto.enumerateCameras().then((camerasList: any): void => {
			cameras = camerasList;
		});
	}

	$: if (cameraPhoto && cameras.length > 0) {
		console.log(cameras[cameraId]);

		cameraPhoto
			.startCamera(cameras[cameraId].deviceId, {})
			.then((stream) => {
				console.log("camera is started !");
			})
			.catch((error) => {
				console.error("Camera not started!", error);
			});
	}

	function createViewfinder(node: HTMLVideoElement) {
		cameraPhoto = new CameraPhoto(node);
	}

	function takePhotoAndDownload() {
		let sizeFactor = 1;
		let imageType = IMAGE_TYPES.JPG;
		let imageCompression = 1;

		let config = {
			sizeFactor,
			imageType,
			imageCompression,
		};

		let dataUri = cameraPhoto.getDataUri(config);
		downloadPhoto(dataUri, "myPhoto", 1);
		imageElement.src = dataUri;
	}
</script>

<main class="w-screen h-screen relative text-white bg-black">
	<div class="fixed top-0 w-full h-24 bg-black/20"></div>
	<video class="block h-full w-full" use:createViewfinder id="viewfinder" autoplay>
		<track kind="captions" /></video
	>
	<div class="fixed bottom-0 pb-24 pt-20 bg-black/20 w-full">
		<nav class="grid grid-cols-3 px-5 items-center justify-items-center">
			<button id="gallery" class="justify-self-start text-white">foo </button>

			<button
				id="shutter"
				on:click={takePhotoAndDownload}
				class="relative after:absolute after:border-[0.25rem] box-border after:border-white after:rounded-full m-1 after:-inset-2 bg-white rounded-full aspect-square w-14 shrink-0 active:bg-yellow-300"
			></button>

			<button
				id="switch"
				class="justify-self-end bg-white/10 rounded-full aspect-square text-2xl w-12 flex items-center justify-center"
				on:click={() => {
					cameraPhoto.stopCamera().catch((error) => console.error(error.message));
					cameraId = (cameraId + 1) % cameras.length;
					cameraPhoto.startCamera(cameras[cameraId].deviceId);
				}}
			>
				<RefreshCw class="w-7 h-7" absoluteStrokeWidth strokeWidth={1.5} />
			</button>
		</nav>
	</div>
	<img
		bind:this={imageElement}
		id="image"
		alt="Captured"
		src=""
		class="bg-white absolute right-0 top-1/2 w-20 block"
	/>
</main>

<style>
</style>
