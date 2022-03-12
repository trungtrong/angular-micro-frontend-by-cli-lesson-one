// Factory: Factory function that returns the requested module from the container.
type Factory = () => any;

// Container: An interface with get and init methods.
interface Container {
    init(shareScope: string): void;

    get(module: string): Factory;
}

/**
 * __webpack_init_sharing__: This is a Webpack default variable that initializes the shared scope and adds all the known provided modules from the local build or the remote container build.
 */
declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
/**
 * __webpack_share_scopes__: This is also a default Webpack variable, which initializes the exposed module or the container.
 */
declare const __webpack_share_scopes__: { default: string };

export enum FileType {
    Component = 'Component',
    Module = 'Module',
    Css = 'CSS',
    Html = 'Html'
}

export interface LoadRemoteFileOptions {
    remoteEntry: string;
    remoteName: string;
    exposedFile: string;
    exposeFileType: FileType;
}

export class MfeUtil {
    // holds list of loaded script
    private fileMap: Record<string, boolean> = {};

    /**
     * - This function takes in the loadRemoteFile parameter and returns a promise with the exposed file.
     * - This is a public function that you will use in the app routes.
     */
    async loadRemoteFile(loadRemoteModuleOptions: LoadRemoteFileOptions): Promise<any> {
        await this.loadRemoteEntry(loadRemoteModuleOptions.remoteEntry);
        return await this.findExposedModule<any>(
            loadRemoteModuleOptions.remoteName,
            loadRemoteModuleOptions.exposedFile
        );
    }

    /**
     * This function will get the exposed module from the scope.
     * It will first initialize the shared scope using the default name "default". This name can be changed.
     * - https://webpack.js.org/plugins/module-federation-plugin/
     */
    private findExposedModule = async <T>(uniqueName: string, exposedFile: string): Promise<T | undefined> => {
        // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
        await __webpack_init_sharing__('default');
        const container: Container = (window as any)[uniqueName];  // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        await container.init(__webpack_share_scopes__.default);
        const factory = await container.get(exposedFile);
        const Module = factory();
        return Module as T;
    }

    /**
     * Add a function to Load Remote Entry. This function will get the remote's code and append it to the body of the document.
     * - The promise resolves when the remote script is successfully loaded on the body of the application.
     * - https://webpack.js.org/concepts/module-federation/
     */
    private async loadRemoteEntry(remoteEntry: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const scriptId = `${remoteEntry.substring(remoteEntry.lastIndexOf('/') + 1)}`;
            const getScript = document.getElementById(scriptId);
            if (getScript || this.fileMap[remoteEntry]) {
                resolve();
                return;
            }
            const script = document.createElement("script");
            script.src = remoteEntry;
            script.id = scriptId;

            script.onerror = (error: string | Event) => {
                console.error(error, 'unable to load remote entry, show error or something');
                reject();
            }
            script.onload = () => {
                this.fileMap[remoteEntry] = true;
                resolve(); // window is the global namespace
            };
            document.body.append(script);
        });
    }
}
