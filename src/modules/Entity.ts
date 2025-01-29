import * as BABYLON from "@babylonjs/core";
import AppScene from "./AppScene";
import Script from "./Script";

class Entity {
  private _id: string;
  private _name: string;
  private _meshes: BABYLON.AbstractMesh[];
  private _particleSystems: BABYLON.IParticleSystem[];
  private _skeletons: BABYLON.Skeleton[];
  private _animationGroups: BABYLON.AnimationGroup[];
  private _scripts: Script<any>[] = [];
  private _appScene: AppScene;

  constructor(
    id: string,
    name: string,
    meshes: BABYLON.AbstractMesh[],
    particleSystems: BABYLON.IParticleSystem[],
    skeletons: BABYLON.Skeleton[],
    animationGroups: BABYLON.AnimationGroup[],
    appScene: AppScene
  ) {
    this._id = id;
    this._name = name;
    this._meshes = meshes;
    this._particleSystems = particleSystems;
    this._skeletons = skeletons;
    this._animationGroups = animationGroups;
    this._appScene = appScene;
  }

  public getId(): string {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getMeshes(): BABYLON.AbstractMesh[] {
    return this._meshes;
  }

  public getParticleSystems(): BABYLON.IParticleSystem[] {
    return this._particleSystems;
  }

  public getSkeletons(): BABYLON.Skeleton[] {
    return this._skeletons;
  }

  public getAnimationGroups(): BABYLON.AnimationGroup[] {
    return this._animationGroups;
  }

  public rotate(axis: BABYLON.Vector3, angle: number, space: number): void {
    this._meshes.forEach((mesh) => {
      mesh.rotate(axis, (Math.PI / 180) * angle, space);
    });
  }

  public scale(axis: BABYLON.Vector3): void {
    this._meshes.forEach((mesh) => {
      mesh.scaling = axis;
    });
  }

  public setPosition(position: BABYLON.Vector3): void {
    this._meshes.forEach((mesh) => {
      mesh.setAbsolutePosition(position);
    });
  }

  public addScript(Script: new (appScene: AppScene, entity: any, ...rest: any[]) => any, ...rest: any[]): void {
    const script = new Script(this._appScene, this);
    script?.initial?.(...rest);
    this._scripts.push(script);
  }

  public updateScripts(): void {
    this._scripts.forEach((script) => {
      script?.update?.();
    });
  }
}

export default Entity;
