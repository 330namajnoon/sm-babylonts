import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import Entity from './Entity';
import Script from './Script';

export type InternalEntity<T> = { id: string, name: string, entity: T }

class AppScene {
    private _engine!: BABYLON.Engine;
    private _scene!: BABYLON.Scene;
    private _canvas!: HTMLCanvasElement;
    private _camera!: BABYLON.ArcRotateCamera;
    private _externalEntities: Entity[] = [];
    private _internalEntities: InternalEntity<any>[] = [];
    private _scripts: Script<InternalEntity<any> | Entity>[] = [];

    public getScene(): BABYLON.Scene {
        return this._scene;
    }

    public getEngine(): BABYLON.Engine {
        return this._engine;
    }

    public getCanvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public getCamera(): BABYLON.ArcRotateCamera {
        return this._camera;
    }

    public getExternalEntities(): Entity[] {
        return this._externalEntities;
    }

    public start(canvas: HTMLCanvasElement): void {
        this._canvas = canvas;
        this._engine = new BABYLON.Engine(canvas, true);
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 7, new BABYLON.Vector3(0, 0, 0), this._scene);
        this._camera.attachControl(canvas, true);
        this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
        this._internalEntities.push({ id: "0", name: "camera", entity: this._camera });
        this._engine.runRenderLoop(() => {
            this._externalEntities.forEach(entity => {
                entity.updateScripts();
            });
            this._scripts.forEach(script => {
                script?.update?.();
            });
            this._scene.render();
        });
    }

    public loadMesh(name = "New model", meshPath: string): Promise<Entity> {
        return new Promise((resolve, reject) => {
            BABYLON.SceneLoader.ImportMesh("", meshPath, "", this._scene, (meshes, particleSystems, skeletons, animationGroups) => {
                const entity = new Entity((this._externalEntities.length + 1).toString(), name, meshes, particleSystems, skeletons, animationGroups, this);
                this._externalEntities.push(entity);
                resolve(entity);
            }, null, (scene, message, exception) => {
                reject(exception);
            });
        });
    }

    public getExternalEntityById(id: string): Entity | null {
        return this._externalEntities.find(entity => entity.getId() === id) || null;
    }

    public createHemisphericLight(name: string, pos: BABYLON.Vector3): InternalEntity<BABYLON.HemisphericLight> {
        const entity = new BABYLON.HemisphericLight(name, pos, this._scene);
        const response: InternalEntity<BABYLON.HemisphericLight> = {
            id: (this._internalEntities.length + 1).toString(),
            name,
            entity
        };
        this._internalEntities.push(response);
        return response;
    }

    public createPointLight(name: string, pos: BABYLON.Vector3): InternalEntity<BABYLON.PointLight> {
        const entity = new BABYLON.PointLight(name, pos, this._scene);
        const response: InternalEntity<BABYLON.PointLight> = {
            id: (this._internalEntities.length + 1).toString(),
            name,
            entity
        };
        this._internalEntities.push(response);
        return response;
    }

    public addScript(entity: any, script: new (appScene: AppScene, entity: any) => Script<any>): void {
        const scriptInstance = new script(this, entity);
        scriptInstance?.initial?.();
        this._scripts.push(scriptInstance);
    }
}

export default AppScene;