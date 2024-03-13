declare module "jslib-html5-camera-photo" {
	export const FACING_MODES: {
		ENVIRONMENT: string;
		USER: string;
	};

	export const IMAGE_TYPES: {
		JPG: string;
		PNG: string;
	};

	export function downloadPhoto(e: any, ...args: any[]): void;
}
