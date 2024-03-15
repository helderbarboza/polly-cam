<script lang="ts">
  import CameraPhoto, { IMAGE_TYPES, downloadPhoto } from "jslib-html5-camera-photo";
  import { RefreshCw } from "lucide-svelte";

  let cameraPhoto: CameraPhoto;
  let cameraId: number = 0;
  let cameras: { deviceId: string }[] = [];

  let imageElement: HTMLImageElement;

  $: if (cameraPhoto) {
    cameraPhoto.enumerateCameras().then((camerasList: any): void => {
      cameras = camerasList;
    });
  }

  $: if (cameraPhoto && cameras.length > 0) {
    console.log(cameras[cameraId]);

    navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
      console.log(mediaStream);
    });

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

  let dataUri: string;

  function takePhotoAndDownload() {
    let sizeFactor = 1;
    let imageType = IMAGE_TYPES.JPG;
    let imageCompression = 1;

    let config = {
      sizeFactor,
      imageType,
      imageCompression,
    };

    dataUri = cameraPhoto.getDataUri(config);
    downloadPhoto(dataUri, "myPhoto", 1);
    imageElement.src = dataUri;
  }

  // let permissionStatus = new PermissionStatus()

  // navigator.permissions.query({name: ""})
</script>

<main class="relative h-screen w-screen bg-black text-white">
  <div class="fixed top-0 h-24 w-full bg-black/20"></div>
  <video class="block h-full w-full" use:createViewfinder id="viewfinder" autoplay>
    <track kind="captions" /></video
  >
  <div class="fixed bottom-0 w-full bg-black/20 pb-24 pt-20">
    <nav class="grid grid-cols-3 items-center justify-items-center px-5">
      <button
        id="gallery"
        class="flex h-12 w-12 items-center justify-center justify-self-start border border-white bg-gray-800"
        on:click={() => {
          navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
            console.log(mediaStream);
          });
        }}
      >
        {#if dataUri !== undefined}
          <img
            bind:this={imageElement}
            id="image"
            alt="Captured"
            src=""
            class="h-full w-full bg-contain"
          />
        {/if}
      </button>

      <button
        id="shutter"
        on:click={takePhotoAndDownload}
        class="relative m-1 box-border aspect-square w-14 shrink-0 rounded-full bg-white after:absolute after:-inset-2 after:rounded-full after:border-[0.25rem] after:border-white active:bg-yellow-300"
      ></button>

      <button
        id="switch"
        class="flex aspect-square w-12 items-center justify-center justify-self-end rounded-full bg-white/10 text-2xl"
        on:click={() => {
          cameraPhoto.stopCamera().catch((error) => console.error(error.message));
          cameraId = (cameraId + 1) % cameras.length;
          cameraPhoto.startCamera(cameras[cameraId].deviceId);
        }}
      >
        <RefreshCw class="h-7 w-7" absoluteStrokeWidth strokeWidth={1.5} />
      </button>
    </nav>
  </div>
  <!-- <pre class="absolute left-1/2 top-1/2 text-white">{JSON.stringify(cameraPhoto, null, 2)}</pre> -->
</main>

<style>
</style>
