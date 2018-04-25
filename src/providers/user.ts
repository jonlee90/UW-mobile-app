import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {
  private authUrl: string = 'http://45.58.0.252/ultimatevzw/user-auth.php';
  private changePwUrl: string = 'http://45.58.0.252/ultimatevzw/user-changePW.php';
  private forgotPwUrl: string = 'http://45.58.0.252/ultimatevzw/user-forgotPW.php';
  private userCheckUrl: string = 'http://45.58.0.252/ultimatevzw/user-check.php';
  private getCurrentUserUrl: string = 'http://45.58.0.252/ultimatevzw/user-get.php?userId=';
  private updateUserUrl: string = 'http://45.58.0.252/ultimatevzw/user-edit.php';
  private getUserDeviceNameUrl: string = 'http://45.58.0.252/ultimatevzw/user-get-deviceName.php?device=';
  private currentUser = new Subject<IUserInfo>();
  private loginKey = new Subject<string>();
  
  constructor(public http: Http,
              public storage: Storage) {}

  changePassword(values: URLSearchParams) {
    return this.http.post(this.changePwUrl, values)
                    .map((res: Response) => res.json());
  }
  checkUser(id: number) {
    return this.http.get(this.userCheckUrl + '?id=' + id)
                    .map((res: Response) => res.json());
  }
  forgotPassword(values: URLSearchParams) {
    return this.http.post(this.forgotPwUrl, values)
                    .map((res: Response) => res.json());
  }
  getCurrentUser() {
    return this.currentUser.asObservable();
  }
  getCurrentUserData(id: number) {
    return this.http.get(this.getCurrentUserUrl + id)
                    .map((res: Response) => res.json());
  }
  getLoginKey() {
    return this.loginKey.asObservable();
  }
  getUserDeviceName(device: string) {
    return this.http.get(this.getUserDeviceNameUrl + device)
                    .map((res: Response) => res.json());
  }
  login(values: URLSearchParams) {
    return this.http.post(this.authUrl, values)
                    .map((res: Response) => res.json());
  }
  logout() {
    this.loginKey.next();
    this.currentUser.next();
    this.storage.clear();
  }
  saveCurrentUser(user: IUserInfo) {
    this.currentUser.next(user);
  }
  saveLoginKey(key: string) {
    this.loginKey.next(key);
  }
  saveToken(token: string) {
    return this.http.get(this.userCheckUrl + '?fireId=' + token) 
                    .map((res: Response) => res.json());
  }
  signup(values: URLSearchParams) {
    return this.http.post(this.authUrl, values)
                    .map((res: Response) => res.json());
  }
  updateUser(values: URLSearchParams) {
    return this.http.post(this.updateUserUrl, values)
                    .map((res: Response) => res.json());
  }
}
