
export { AppScene, Entity, Script } from "./modules";

// const createScene = async (canvas: HTMLCanvasElement) => {
//     const ngine = new BABYLON.Engine(canvas, true);
//     const scene = new BABYLON.Scene(ngine);

//     const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 3, new BABYLON.Vector3(0, 0, 0), scene);
//     camera.attachControl(canvas, true);
//     const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);

//     ngine.runRenderLoop(() => scene.render());
//     (await BABYLON.SceneLoader.ImportMeshAsync("mesh", "./", "davo.stl", scene)).meshes.forEach(mesh => {
//         mesh.scaling.scaleInPlace(200);
//     });
//     return scene;
// };