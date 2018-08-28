import {TokenModel} from '../dto/token.model';

export class StoreProvider {
  saveToken(token: string): void {
    localStorage.setItem('TOKEN', token);
  }

  getToken(): string | null {
    return localStorage.getItem('TOKEN');
  }

  clearToken(): void {
    localStorage.removeItem('TOKEN');
  }

  getState(): boolean {
    if (this.getToken()) {
      console.log('true');
      return true;
    } else {
      return false;
    }
  }
}
