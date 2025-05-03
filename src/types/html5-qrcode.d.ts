declare module 'html5-qrcode' {
  export class Html5Qrcode {
    constructor(elementId: string);
    
    start(
      cameraIdOrConfig: string | { facingMode: string },
      config: {
        fps: number;
        qrbox: {
          width: number;
          height: number;
        };
      },
      qrCodeSuccessCallback: (decodedText: string, result: any) => void,
      qrCodeErrorCallback: (error: any) => void
    ): Promise<void>;
    
    stop(): Promise<void>;
    
    isScanning: boolean;
  }
  
  export class Html5QrcodeScanner {
    constructor(
      elementId: string,
      config: {
        fps: number;
        qrbox: {
          width: number;
          height: number;
        };
      },
      verbose: boolean
    );
    
    render(
      qrCodeSuccessCallback: (decodedText: string, result: any) => void,
      qrCodeErrorCallback?: (error: any) => void
    ): void;
    
    clear(): void;
  }
}
