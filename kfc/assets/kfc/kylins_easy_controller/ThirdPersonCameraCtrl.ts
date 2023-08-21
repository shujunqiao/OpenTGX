import { _decorator, Component, Node } from 'cc';
import { ThirdPersonCamera } from '../kylins_camera/ThirdPersonCamera';
import { EasyController, EasyControllerEvent } from './EasyController';
const { ccclass, property } = _decorator;

@ccclass('ThirdPersonCameraCtrl')
export class ThirdPersonCameraCtrl extends ThirdPersonCamera {
    start() {
        EasyController.on(EasyControllerEvent.CAMERA_ROTATE, this.onCameraRotate, this);
        EasyController.on(EasyControllerEvent.CAMERA_ZOOM, this.onCameraZoom, this);

        this._targetLen = this.len;
        this._targetAngles.set(this.node.eulerAngles);
    }

    onDestroy() {
        EasyController.off(EasyControllerEvent.CAMERA_ROTATE, this.onCameraRotate, this);
        EasyController.off(EasyControllerEvent.CAMERA_ZOOM, this.onCameraZoom, this);
    }
}


