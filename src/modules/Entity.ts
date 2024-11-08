import * as BABYLON from "@babylonjs/core";

class Entity {
  private _id: string;
  private _name: string;
  private _meshes: BABYLON.AbstractMesh[];
  private _particleSystems: BABYLON.IParticleSystem[];
  private _skeletons: BABYLON.Skeleton[];
  private _animationGroups: BABYLON.AnimationGroup[];

  constructor(
    id: string,
    name: string,
    meshes: BABYLON.AbstractMesh[],
    particleSystems: BABYLON.IParticleSystem[],
    skeletons: BABYLON.Skeleton[],
    animationGroups: BABYLON.AnimationGroup[]
  ) {
    this._id = id;
    this._name = name;
    this._meshes = meshes;
    this._particleSystems = particleSystems;
    this._skeletons = skeletons;
    this._animationGroups = animationGroups;
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
      mesh.rotate(axis, Math.PI / 180 * angle, space);
    });
  }
}

export default Entity;
