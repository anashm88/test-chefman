export default class ToastLib {
  static saveToastRef(ref) {
    this._toastRef = ref;
  }

  static showToast() {
    this._toastRef.toast.show('hello world!');
  }

  static hideToast() {
    this._toastRef.hide();
  }
}
