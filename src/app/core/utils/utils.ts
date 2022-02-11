import { throwError } from "rxjs";

export class Utils {
    constructor() {
    }

static handleError(response: any) {
    const error = response.error
    const messages = response.error?.message?.map && response.error?.message?.map((err:any) => err?.error);
    return throwError(messages || error);
  }

  static objectToQueryString(obj: any): string {
    let str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }

  /*Return array obect key value to string array*/
  static arrayObjToString(object:any, key:any) {
    if (typeof object === 'object') {
      return object.map(function (obj:any) {
        return obj[key];
      });
    } else {
      return JSON.parse(object).map(function (obj:any) {
        return obj[key];
      });
    }
  }

  /*Return array obect key value to string array*/
  static stringToArrayObj(object:any, key:any) {
    if (typeof object === 'object') {
      return object.map(function (obj:any) {
        return { [key]: obj };
      });
    }
  }

  /*Return object key value to number type*/
  static strNum(object:any, key:any) {
    return JSON.parse(object).map(function (obj:any) {
      return parseInt(obj[key]);
    });
  }

  /*Parse json object*/
  static parse(str:string) {
    if (str && typeof str === 'string') {
      try {
        return JSON.parse(str);
      } catch (e) {
        return 0;
      }
    } else {
      return str;
    }
  }

  /*Convert bytes size in kb, mb, gb etc format */
  static calculateBytes(sizeInBytes:any, longForm?: boolean) {
    if (sizeInBytes === 0) return '0 Bytes';

    const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];

    let units: any;

    units = longForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;

    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);
    const size = sizeInBytes / Math.pow(1024, power); // size in new units
    const formattedSize = Math.round(size * 100) / 100; // keep up to 2 decimals
    const unit = units[power];
    return `${formattedSize}`;
  }

  /*Convert base64 to bytes */
  static base64ToArrayBuffer(base64:any) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  /*Download selected file from client side*/
  static saveFile(name:any, extension:any, byte:any) {
    var blob = new Blob([byte], { type: extension });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    link.click();
  }

  /*Create link from file to open as url */
  static returnLink(name:any, extension:any, byte:any) {
    var blob = new Blob([byte], { type: extension });
    return blob;
  }
}
