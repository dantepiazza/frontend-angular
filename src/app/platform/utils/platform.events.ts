/**
 * This enum contains the possible events that can be sent or be obtained from the android app.
 */
export enum PlatformEvent {
    GET_DEVICE_ID = 'GetDeviceId',
    IMAGE_READ = 'ReadImage',
    IMAGE_TAKE = 'TakePicture',
    IMAGE_FRAGMENT = 'GetImageFragment',
    CLOSE_APP = 'CloseApp',
    GET_GPS = 'GetGPS',
    GO_BACK = 'GoBack',
    ERROR = 'Error'
}
